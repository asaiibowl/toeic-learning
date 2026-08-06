'use client';

/**
 * 採点結果ページ — クライアントコンポーネント
 *
 * IndexedDB から最新の完了セッションを取得し、採点結果を表示する。
 * Part5 のデータは fetchPartData で取得し、gradeSession で採点する。
 */

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { listSessions } from '@/lib/storage/idb';
import type { Session } from '@/lib/storage/idb';
import { fetchPartData } from '@/lib/data/loader';
import { gradeSession } from '@/lib/scoring/calculator';
import type { SessionGradeResult } from '@/lib/scoring/calculator';
import type { Part5Data, Part6Data, Part7Data } from '@/types/question';
import { ScoreBar } from '@/components/ui/ScoreBar';
import { Card } from '@/components/ui/Card';
import { PART_LABEL } from '@/lib/constants';

interface ResultClientProps {
  testId: string;
}

/** 経過秒数を「分:秒」形式に変換する */
function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

/** タグ名を日本語ラベルに変換する（なければそのまま表示） */
const TAG_LABEL: Record<string, string> = {
  grammar: '文法',
  vocab: '語彙',
  preposition: '前置詞',
  conjunction: '接続詞',
  verb_form: '動詞の形',
  pronoun: '代名詞',
  other: 'その他',
  blank: '語句補充',
  insertion: '文挿入',
  main_idea: '主旨',
  detail: '詳細',
  not: 'NOT',
  infer: '推測',
  intention: '発言意図',
  synonym: '同義語',
};

export function ResultClient({ testId }: ResultClientProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [gradeResult, setGradeResult] = useState<SessionGradeResult | null>(null);
  // Part5 データ（誤答一覧のプレビュー文取得用）
  const [part5Data, setPart5Data] = useState<Part5Data | null>(null);
  // Part6 データ（誤答一覧のプレビュー文取得用）
  const [part6Data, setPart6Data] = useState<Part6Data | null>(null);
  const [part7Data, setPart7Data] = useState<Part7Data | null>(null);

  useEffect(() => {
    async function loadResult() {
      try {
        // IndexedDB から最新の完了セッションを取得
        const sessions = await listSessions();
        const completed = sessions
          .filter((s) => s.testId === testId && s.status === 'completed')
          .sort(
            (a, b) =>
              new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime(),
          );
        const latest = completed[0];

        if (!latest) {
          setError('完了したセッションが見つかりません。テストを最初から解いてください。');
          setLoading(false);
          return;
        }

        setSession(latest);

        // セッションの parts 配列に基づいて必要なパートデータを並列 fetch
        // fetchPartData はオーバーロードのため、パート番号ごとに分岐して fetch する
        const partFetches = latest.parts.map((p) => {
          if (p === 5) return fetchPartData(testId, 5);
          if (p === 6) return fetchPartData(testId, 6);
          return fetchPartData(testId, 7);
        });
        const partsData = await Promise.all(partFetches);

        // Part5 データはプレビュー文取得に使う
        const p5 = partsData.find((d): d is Part5Data => d.part === 5) ?? null;
        setPart5Data(p5);

        // Part6 データもプレビュー文取得に使う
        const p6 = partsData.find((d): d is Part6Data => d.part === 6) ?? null;
        setPart6Data(p6);
        const p7 = partsData.find((d): d is Part7Data => d.part === 7) ?? null;
        setPart7Data(p7);

        const result = gradeSession(partsData, latest.answers);
        setGradeResult(result);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : '結果の読み込みに失敗しました',
        );
      } finally {
        setLoading(false);
      }
    }

    void loadResult();
  }, [testId]);

  // ローディング中
  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-zinc-500 dark:text-zinc-400 animate-pulse">
          採点中...
        </div>
      </div>
    );
  }

  // エラー表示
  if (error || !session || !gradeResult) {
    return (
      <div className="max-w-lg mx-auto py-12 space-y-4">
        <div className="rounded-xl border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950 p-6">
          <h2 className="text-base font-semibold text-red-700 dark:text-red-400">
            結果を取得できませんでした
          </h2>
          <p className="mt-2 text-sm text-red-600 dark:text-red-300">
            {error ?? '不明なエラーが発生しました'}
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href={`/test/${testId}/`}
            className="flex-1 block rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold text-center py-3 transition-colors min-h-[44px] flex items-center justify-center"
          >
            テストに戻る
          </Link>
          <Link
            href="/"
            className="flex-1 block rounded-lg border-2 border-zinc-300 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800 text-sm font-semibold text-center py-3 transition-colors min-h-[44px] flex items-center justify-center"
          >
            一覧へ戻る
          </Link>
        </div>
      </div>
    );
  }

  const { overall, byPart, estimatedScore } = gradeResult;
  const accuracyPct = Math.round(overall.accuracy * 100);
  // 正答率によって色を変える
  const scoreColor =
    accuracyPct >= 80
      ? 'text-green-600 dark:text-green-400'
      : accuracyPct >= 60
      ? 'text-blue-600 dark:text-blue-400'
      : 'text-amber-600 dark:text-amber-400';

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 space-y-6">
      {/* ページタイトル */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          採点結果
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          テストセット: {testId}
        </p>
      </div>

      {/* 全体スコアカード */}
      <Card>
        <div className="text-center space-y-2">
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            総合正答率
          </p>
          <p className={`text-5xl font-bold tabular-nums ${scoreColor}`}>
            {accuracyPct}%
          </p>
          <p className="text-lg text-zinc-700 dark:text-zinc-300 tabular-nums">
            {overall.correct} / {overall.total} 問正解
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 tabular-nums">
            所要時間: {formatTime(session.elapsedSeconds)}
          </p>
        </div>
      </Card>

      {/* 推定 Reading スコア */}
      <Card>
        <div className="space-y-2">
          <h2 className="text-base font-semibold text-zinc-800 dark:text-zinc-200">
            推定 Reading スコア
          </h2>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-blue-600 dark:text-blue-400 tabular-nums">
              {estimatedScore}
            </span>
            <span className="text-zinc-500 dark:text-zinc-400">点</span>
            <span className="text-xs text-zinc-400 dark:text-zinc-500">/ 495点</span>
          </div>
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            ※ あくまで目安です。実際のTOEICスコアは統計的等化法で算出されるため、この推定値とは異なる場合があります。
          </p>
        </div>
      </Card>

      {/* パート別正答率 */}
      {Object.keys(byPart).length > 0 && (
        <Card>
          <h2 className="text-base font-semibold text-zinc-800 dark:text-zinc-200 mb-4">
            パート別正答率
          </h2>
          <div className="space-y-3">
            {(Object.entries(byPart) as [string, { correct: number; total: number }][]).map(
              ([partKey, stat]) => {
                const part = Number(partKey) as 5 | 6 | 7;
                const colorClass =
                  part === 5
                    ? 'bg-blue-500'
                    : part === 6
                    ? 'bg-green-500'
                    : 'bg-purple-500';
                return (
                  <ScoreBar
                    key={partKey}
                    label={PART_LABEL[part]}
                    correct={stat.correct}
                    total={stat.total}
                    colorClass={colorClass}
                  />
                );
              },
            )}
          </div>
        </Card>
      )}

      {/* タグ/タイプ別正答率 */}
      {Object.keys(overall.typeStats).length > 0 && (
        <Card>
          <h2 className="text-base font-semibold text-zinc-800 dark:text-zinc-200 mb-4">
            タグ別正答率
          </h2>
          <div className="space-y-3">
            {Object.entries(overall.typeStats).map(([tag, stat]) => (
              <ScoreBar
                key={tag}
                label={TAG_LABEL[tag] ?? tag}
                correct={stat.correct}
                total={stat.total}
                colorClass="bg-amber-500"
              />
            ))}
          </div>
        </Card>
      )}

      {/* 誤答一覧 */}
      {overall.wrongQuestions.length > 0 && (
        <Card>
          <h2 className="text-base font-semibold text-zinc-800 dark:text-zinc-200 mb-3">
            誤答一覧（{overall.wrongQuestions.length}問）
          </h2>
          <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {overall.wrongQuestions.map((no) => {
              // Part5 → Part6 → フォールバック の順でプレビューを生成
              const p5q = part5Data?.questions.find((q) => q.no === no);
              let preview: string;
              if (p5q) {
                preview =
                  p5q.sentence.replace(/______/g, '___').slice(0, 30) +
                  (p5q.sentence.length > 30 ? '…' : '');
                } else {
                  // Part6 の問題から探す
                const p6passage = part6Data?.passages.find((p) =>
                  p.questions.some((q) => q.no === no),
                );
                const p6q = p6passage?.questions.find((q) => q.no === no);
                if (p6passage && p6q) {
                  preview = `文書${p6passage.passageNo} / ${p6q.type === 'insertion' ? '文挿入' : '語句補充'}`;
                  } else {
                    const p7q = part7Data?.sets
                      .flatMap((set) => set.questions)
                      .find((question) => question.no === no);
                    if (p7q) {
                      preview = p7q.questionEn.slice(0, 40) + (p7q.questionEn.length > 40 ? '…' : '');
                    } else {
                      preview = `No. ${no}`;
                    }
                }
              }
              return (
                <li
                  key={no}
                  className="flex items-center justify-between gap-3 py-2.5"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="flex-shrink-0 text-sm font-bold text-red-600 dark:text-red-400 tabular-nums">
                      No.{no}
                    </span>
                    <span className="text-sm text-zinc-600 dark:text-zinc-400 truncate">
                      {preview}
                    </span>
                  </div>
                  <Link
                    href={`/test/${testId}/review/?session=${encodeURIComponent(session.sessionId)}#q${no}`}
                    className="flex-shrink-0 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline min-h-[44px] flex items-center"
                  >
                    解説を見る
                  </Link>
                </li>
              );
            })}
          </ul>
        </Card>
      )}

      {/* 正解の場合のメッセージ */}
      {overall.wrongQuestions.length === 0 && (
        <Card>
          <div className="text-center py-4">
            <div className="text-4xl mb-2" aria-hidden>
              🎉
            </div>
            <p className="font-semibold text-green-700 dark:text-green-400">
              全問正解！素晴らしいです！
            </p>
          </div>
        </Card>
      )}

      {/* ボタン行 */}
      <div className="flex flex-col sm:flex-row gap-3 print:hidden">
        {overall.wrongQuestions.length > 0 && (
          <Link
            href={`/test/${testId}/review/?session=${encodeURIComponent(session.sessionId)}&onlyWrong=1`}
            className="flex-1 flex items-center justify-center rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-3 transition-colors min-h-[48px]"
          >
            誤答だけ復習
          </Link>
        )}
        <Link
          href={`/test/${testId}/review/?session=${encodeURIComponent(session.sessionId)}`}
          className="flex-1 flex items-center justify-center rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold py-3 transition-colors min-h-[48px]"
        >
          解説をすべて見る
        </Link>
        <Link
          href={`/test/${testId}/`}
          className="flex-1 flex items-center justify-center rounded-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 text-sm font-semibold py-3 transition-colors min-h-[48px]"
        >
          もう一度解く
        </Link>
        <Link
          href="/"
          className="flex-1 flex items-center justify-center rounded-lg border-2 border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-sm font-semibold py-3 transition-colors min-h-[48px]"
        >
          一覧へ戻る
        </Link>
      </div>
    </div>
  );
}
