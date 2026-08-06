'use client';

/**
 * テスト開始・再開画面（クライアントコンポーネント）
 *
 * - IndexedDB から進行中セッションを確認して再開ボタンを出す
 * - モード（通し / パート別 / 練習）と対象パートを選択
 * - 開始 → /test/{testId}/part/{part}/ へ遷移
 */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchTestIndex } from '@/lib/data/loader';
import { deleteSession, findInProgressSession } from '@/lib/storage/idb';
import type { ExamMode, Session } from '@/lib/storage/idb';
import type { TestMeta } from '@/types/question';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface TestStartClientProps {
  testId: string;
}

/** パート番号の表示名 */
const PART_LABELS: Record<number, string> = {
  5: 'Part 5（短文穴埋め）',
  6: 'Part 6（長文穴埋め）',
  7: 'Part 7（読解）',
};

/** completeness のキー → パート番号のマッピング */
const COMPLETENESS_KEYS: { part: 5 | 6 | 7; key: keyof TestMeta['completeness'] }[] = [
  { part: 5, key: 'part5' },
  { part: 6, key: 'part6' },
  { part: 7, key: 'part7' },
];

export function TestStartClient({ testId }: TestStartClientProps) {
  const router = useRouter();

  // テストメタデータ
  const [meta, setMeta] = useState<TestMeta | null>(null);
  // 進行中セッション
  const [inProgressSession, setInProgressSession] = useState<Session | undefined>(undefined);
  // ロード状態
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // モード選択（デフォルト: 通し）
  const [mode, setMode] = useState<ExamMode>('full');
  // 選択パート（デフォルト: 全パート選択）
  const [selectedParts, setSelectedParts] = useState<Set<5 | 6 | 7>>(new Set([5, 6, 7]));

  const buildExamHref = (
    targetMode: ExamMode,
    targetParts: (5 | 6 | 7)[],
    targetPart: 5 | 6 | 7,
    restart = false,
  ) => {
    const params = new URLSearchParams({
      mode: targetMode,
      parts: targetParts.join(','),
    });
    if (restart) params.set('restart', '1');
    return `/test/${testId}/part/${targetPart}/?${params.toString()}`;
  };

  // データ取得
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        // テスト一覧からメタデータを取得
        const index = await fetchTestIndex();
        const found = index.tests.find((t) => t.testId === testId);
        if (!found) throw new Error(`テストセット "${testId}" が見つかりません`);

        // 進行中セッションを確認
        const session = await findInProgressSession(testId);

        if (!cancelled) {
          setMeta(found);
          setInProgressSession(session);
          const availableParts = COMPLETENESS_KEYS
            .filter(({ key }) => found.completeness[key] > 0)
            .map(({ part }) => part);
          setSelectedParts(new Set(availableParts));
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'データの取得に失敗しました');
          setLoading(false);
        }
      }
    }

    void load();
    return () => { cancelled = true; };
  }, [testId]);

  // パートのチェックボックスを切り替える
  const togglePart = (part: 5 | 6 | 7) => {
    setSelectedParts((prev) => {
      const next = new Set(prev);
      if (next.has(part)) {
        // 最低1パートは残す
        if (next.size > 1) next.delete(part);
      } else {
        next.add(part);
      }
      return next;
    });
  };

  // 演習を開始: 選択パートの最初のパートへ遷移（モードを SearchParams で渡す）
  const handleStart = () => {
    const sortedParts = ([5, 6, 7] as const).filter(
      (p) => selectedParts.has(p) && (meta?.completeness[`part${p}`] ?? 0) > 0,
    );
    const firstPart = sortedParts[0];
    if (!firstPart) return;
    router.push(buildExamHref(mode, [...sortedParts], firstPart));
  };

  // 前回の続きから再開
  const handleResume = () => {
    if (!inProgressSession) return;
    const resumePart = inProgressSession.currentPart ?? inProgressSession.parts[0];
    if (!resumePart) return;
    router.push(
      buildExamHref(inProgressSession.mode, inProgressSession.parts, resumePart),
    );
  };

  // 最初からやり直す（セッションを無視して新規開始）
  const handleRestart = async () => {
    const sortedParts = ([5, 6, 7] as const).filter(
      (p) => selectedParts.has(p) && (meta?.completeness[`part${p}`] ?? 0) > 0,
    );
    const firstPart = sortedParts[0];
    if (!firstPart) return;
    if (inProgressSession) await deleteSession(inProgressSession.sessionId);
    router.push(buildExamHref(mode, [...sortedParts], firstPart, true));
  };

  // ---- レンダリング ----

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-zinc-500 dark:text-zinc-400 animate-pulse">読み込み中...</div>
      </div>
    );
  }

  if (error || !meta) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950 p-6">
        <h2 className="text-base font-semibold text-red-700 dark:text-red-400">エラー</h2>
        <p className="mt-1 text-sm text-red-600 dark:text-red-300">
          {error ?? 'テストデータが見つかりません'}
        </p>
      </div>
    );
  }

  // 収録問数が 0 のパートは disabled
  const partQuestionCounts: Record<5 | 6 | 7, number> = {
    5: meta.completeness.part5,
    6: meta.completeness.part6,
    7: meta.completeness.part7,
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* テストタイトル */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          {meta.title}
        </h1>
        {meta.description && (
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{meta.description}</p>
        )}
        {/* 収録問数サマリー */}
        <dl className="mt-4 grid grid-cols-3 gap-2">
          <div className="rounded-lg bg-blue-50 dark:bg-blue-950 px-3 py-2 text-center">
            <dt className="text-xs text-blue-600 dark:text-blue-400 font-medium">Part 5</dt>
            <dd className="text-lg font-bold text-blue-700 dark:text-blue-300">
              {meta.completeness.part5}
              <span className="text-xs font-normal text-blue-500 dark:text-blue-500">問</span>
            </dd>
          </div>
          <div className="rounded-lg bg-green-50 dark:bg-green-950 px-3 py-2 text-center">
            <dt className="text-xs text-green-600 dark:text-green-400 font-medium">Part 6</dt>
            <dd className="text-lg font-bold text-green-700 dark:text-green-300">
              {meta.completeness.part6}
              <span className="text-xs font-normal text-green-500 dark:text-green-500">問</span>
            </dd>
          </div>
          <div className="rounded-lg bg-purple-50 dark:bg-purple-950 px-3 py-2 text-center">
            <dt className="text-xs text-purple-600 dark:text-purple-400 font-medium">
              Part 7
              {meta.completeness.part7 === 54 && (
                <span className="block text-[10px] font-normal">単一29・複数25</span>
              )}
            </dt>
            <dd className="text-lg font-bold text-purple-700 dark:text-purple-300">
              {meta.completeness.part7}
              <span className="text-xs font-normal text-purple-500 dark:text-purple-500">問</span>
            </dd>
          </div>
        </dl>
      </div>

      {/* 中断中セッション再開バナー */}
      {inProgressSession && (
        <Card className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950">
          <div className="flex items-start gap-3">
            <span className="text-amber-500 text-xl mt-0.5" aria-hidden>⏸</span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
                前回の続きがあります
              </p>
              <p className="mt-1 text-xs text-amber-700 dark:text-amber-400">
                モード:{' '}
                {inProgressSession.mode === 'full'
                  ? '通し（75分）'
                  : inProgressSession.mode === 'part'
                  ? 'パート別'
                  : '練習'}
                {'　'}
                開始日時: {new Date(inProgressSession.startedAt).toLocaleString('ja-JP')}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button variant="primary" size="md" onClick={handleResume}>
                  前回の続きから再開
                </Button>
                <Button variant="secondary" size="md" onClick={handleRestart}>
                  最初からやり直す
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* モード選択 */}
      <Card>
        <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
          演習モードを選択
        </h2>
        <div className="space-y-3">
          {/* 通し */}
          <label className="flex items-start gap-3 cursor-pointer min-h-[44px] rounded-lg border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-800 p-2 -mx-2 transition-colors">
            <input
              type="radio"
              name="mode"
              value="full"
              checked={mode === 'full'}
              onChange={() => setMode('full')}
              className="mt-1 w-4 h-4 accent-blue-600"
            />
            <div>
              <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                通し（75分）
              </div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                本番同様にリーディングセクション全体を75分で解く
              </div>
            </div>
          </label>

          {/* パート別 */}
          <label className="flex items-start gap-3 cursor-pointer min-h-[44px] rounded-lg border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-800 p-2 -mx-2 transition-colors">
            <input
              type="radio"
              name="mode"
              value="part"
              checked={mode === 'part'}
              onChange={() => setMode('part')}
              className="mt-1 w-4 h-4 accent-blue-600"
            />
            <div>
              <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                パート別
              </div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                パートごとに制限時間（Part5: 10分 / Part6: 8分 / Part7: 57分）を設けて解く
              </div>
            </div>
          </label>

          {/* 練習 */}
          <label className="flex items-start gap-3 cursor-pointer min-h-[44px] rounded-lg border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-800 p-2 -mx-2 transition-colors">
            <input
              type="radio"
              name="mode"
              value="practice"
              checked={mode === 'practice'}
              onChange={() => setMode('practice')}
              className="mt-1 w-4 h-4 accent-blue-600"
            />
            <div>
              <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                練習（タイマーなし・即時解説）
              </div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                時間制限なし。選択直後に正誤と解説を確認しながら学習する
              </div>
            </div>
          </label>
        </div>
      </Card>

      {/* パート選択（通し以外で表示） */}
      {mode !== 'full' && (
        <Card>
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
            対象パートを選択
          </h2>
          <div className="space-y-3">
            {COMPLETENESS_KEYS.map(({ part }) => {
              const count = partQuestionCounts[part];
              const isDisabled = count === 0;
              const isChecked = selectedParts.has(part);

              return (
                <label
                  key={part}
                  className={[
                    'flex items-center gap-3 min-h-[44px] rounded-lg border-2 border-transparent p-2 -mx-2 transition-colors',
                    isDisabled
                      ? 'opacity-40 cursor-not-allowed'
                      : 'cursor-pointer hover:border-blue-200 dark:hover:border-blue-800',
                  ].join(' ')}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    disabled={isDisabled}
                    onChange={() => !isDisabled && togglePart(part)}
                    className="w-4 h-4 accent-blue-600 disabled:cursor-not-allowed"
                  />
                  <span className="flex-1 text-sm font-medium text-zinc-900 dark:text-zinc-50">
                    {PART_LABELS[part]}
                  </span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    {isDisabled ? '収録なし' : `${count}問`}
                  </span>
                </label>
              );
            })}
          </div>
          {/* 未選択時の警告 */}
          {selectedParts.size === 0 && (
            <p className="mt-2 text-xs text-red-600 dark:text-red-400">
              最低1パートを選択してください
            </p>
          )}
        </Card>
      )}

      {/* 開始ボタン（中断中セッションがない場合のみ表示） */}
      {!inProgressSession && (
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleStart}
          disabled={selectedParts.size === 0}
        >
          演習を開始する
        </Button>
      )}
    </div>
  );
}
