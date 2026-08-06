"use client";

/**
 * テストセット一覧ページ（トップページ）
 *
 * index.json をクライアントで fetch し、テストセットをカード表示する。
 * レスポンシブ: スマホ1列 / タブレット2列 / PC3列
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchTestIndex } from "@/lib/data/loader";
import type { TestIndex } from "@/types/question";
import { listHistory, type HistoryEntry } from "@/lib/storage/idb";

export default function HomePage() {
  const [testIndex, setTestIndex] = useState<TestIndex | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    Promise.all([fetchTestIndex(), listHistory().catch(() => [])])
      .then(([data, historyEntries]) => {
        setTestIndex(data);
        setHistory(historyEntries);
        setLoading(false);
      })
      .catch((err: unknown) => {
        setError(
          err instanceof Error ? err.message : "データの取得に失敗しました"
        );
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-zinc-500 dark:text-zinc-400 animate-pulse">
          読み込み中...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950 p-6">
        <h2 className="text-base font-semibold text-red-700 dark:text-red-400">
          エラー
        </h2>
        <p className="mt-1 text-sm text-red-600 dark:text-red-300">{error}</p>
      </div>
    );
  }

  const tests = testIndex?.tests ?? [];

  return (
    <>
      {/* ページタイトル */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          テストセット一覧
        </h1>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          練習するテストセットを選んでください
        </p>
      </div>

      {tests.length === 0 ? (
        /* テストセットが存在しない場合 */
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-8 text-center">
          <p className="text-zinc-500 dark:text-zinc-400">
            テストセットがまだありません
          </p>
        </div>
      ) : (
        /* テストカードグリッド: スマホ1列 / タブレット2列 / PC3列 */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {tests.map((test) => (
            <TestCard key={test.testId} test={test} history={history} />
          ))}
        </div>
      )}
    </>
  );
}

function TestCard({
  test,
  history,
}: {
  test: TestIndex['tests'][number];
  history: HistoryEntry[];
}) {
  const latest = history.find((entry) => entry.testId === test.testId);
  const latestStats = latest
    ? Object.values(latest.partStats).reduce(
        (sum, stat) => ({ correct: sum.correct + stat.correct, total: sum.total + stat.total }),
        { correct: 0, total: 0 },
      )
    : null;
  const totalQuestions = test.completeness.part5 + test.completeness.part6 + test.completeness.part7;

  return (
    <article className="flex flex-col rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex-1 p-5">
                <div className="mb-3 flex flex-wrap gap-2">
                  {totalQuestions < 100 && (
                    <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-900 dark:text-amber-200">
                      ドリル · {totalQuestions}問
                    </span>
                  )}
                  {latestStats && latestStats.total > 0 && (
                    <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700 dark:bg-green-900 dark:text-green-200">
                      受験済み · {Math.round((latestStats.correct / latestStats.total) * 100)}%
                    </span>
                  )}
                </div>
                {/* タイトル */}
                <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 leading-snug">
                  {test.title}
                </h2>

                {/* 説明文 */}
                {test.description && (
                  <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2">
                    {test.description}
                  </p>
                )}

                {/* 収録問数 */}
                <dl className="mt-4 grid grid-cols-3 gap-2">
                  <div className="rounded-lg bg-blue-50 dark:bg-blue-950 px-3 py-2 text-center">
                    <dt className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                      Part 5
                    </dt>
                    <dd className="text-lg font-bold text-blue-700 dark:text-blue-300">
                      {test.completeness.part5}
                      <span className="text-xs font-normal text-blue-500 dark:text-blue-500">
                        問
                      </span>
                    </dd>
                  </div>
                  <div className="rounded-lg bg-green-50 dark:bg-green-950 px-3 py-2 text-center">
                    <dt className="text-xs text-green-600 dark:text-green-400 font-medium">
                      Part 6
                    </dt>
                    <dd className="text-lg font-bold text-green-700 dark:text-green-300">
                      {test.completeness.part6}
                      <span className="text-xs font-normal text-green-500 dark:text-green-500">
                        問
                      </span>
                    </dd>
                  </div>
                  <div className="rounded-lg bg-purple-50 dark:bg-purple-950 px-3 py-2 text-center">
                    <dt className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                      Part 7
                      {test.completeness.part7 === 54 && (
                        <span className="block text-[10px] font-normal">単一29・複数25</span>
                      )}
                    </dt>
                    <dd className="text-lg font-bold text-purple-700 dark:text-purple-300">
                      {test.completeness.part7}
                      <span className="text-xs font-normal text-purple-500 dark:text-purple-500">
                        問
                      </span>
                    </dd>
                  </div>
                </dl>

                {/* タグ */}
                {test.tags && test.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1">
                    {test.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block rounded-full bg-zinc-100 dark:bg-zinc-800 px-2.5 py-0.5 text-xs text-zinc-600 dark:text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* 開始ボタン */}
              <div className="border-t border-zinc-100 dark:border-zinc-800 p-4">
                <Link
                  href={`/test/${test.testId}/`}
                  className="block w-full rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold text-center py-2.5 transition-colors duration-150"
                >
                  開始する
                </Link>
              </div>
    </article>
  );
}
