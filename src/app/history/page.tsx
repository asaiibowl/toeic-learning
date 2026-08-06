'use client';

/**
 * 学習履歴ページ
 *
 * IndexedDB に保存された履歴を一覧・集計し、端末間移行用の
 * JSON エクスポート / インポートを提供する。
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  listHistory,
  listSessions,
  putHistory,
  putSession,
  deleteHistoryWithCompletedSession,
  deleteAllHistoryWithCompletedSessions,
  type ExamMode,
  type HistoryEntry,
  type Session,
} from '@/lib/storage/idb';
import { Card } from '@/components/ui/Card';
import { ScoreBar } from '@/components/ui/ScoreBar';
import { Button } from '@/components/ui/Button';
import { PART_LABEL } from '@/lib/constants';

type ImportPayload = {
  version: 1;
  exportedAt?: string;
  history: HistoryEntry[];
  sessions: Session[];
};

type AggregateStat = { correct: number; total: number };

const MODE_LABEL: Record<ExamMode, string> = {
  full: '通し',
  part: 'パート別',
  practice: '練習',
};

const TYPE_LABEL: Record<string, string> = {
  grammar: '文法',
  vocab: '語彙',
  preposition: '前置詞',
  conjunction: '接続詞',
  verb_form: '動詞の形',
  pronoun: '代名詞',
  other: 'その他',
  blank: '語句補充',
  insertion: '文挿入',
  main_idea: '主旨・目的',
  detail: '詳細情報',
  not: 'NOT問題',
  infer: '推測',
  intention: '発言意図',
  synonym: '同義語',
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isFiniteNonNegative(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0;
}

function isExamMode(value: unknown): value is ExamMode {
  return value === 'full' || value === 'part' || value === 'practice';
}

function isStat(value: unknown): value is AggregateStat {
  return (
    isRecord(value) &&
    isFiniteNonNegative(value.correct) &&
    isFiniteNonNegative(value.total) &&
    value.correct <= value.total
  );
}

function isHistoryEntry(value: unknown): value is HistoryEntry {
  if (!isRecord(value)) return false;
  if (
    typeof value.sessionId !== 'string' ||
    typeof value.testId !== 'string' ||
    typeof value.completedAt !== 'string' ||
    Number.isNaN(Date.parse(value.completedAt)) ||
    !isExamMode(value.mode) ||
    !isFiniteNonNegative(value.elapsedSeconds) ||
    !isRecord(value.partStats) ||
    !isRecord(value.typeStats) ||
    !Array.isArray(value.wrongQuestions)
  ) {
    return false;
  }

  const validParts = Object.entries(value.partStats).every(
    ([part, stat]) =>
      (part === '5' || part === '6' || part === '7') &&
      isRecord(stat) &&
      isFiniteNonNegative(stat.answered) &&
      isFiniteNonNegative(stat.correct) &&
      isFiniteNonNegative(stat.total) &&
      stat.correct <= stat.answered &&
      stat.answered <= stat.total,
  );
  const validTypes = Object.values(value.typeStats).every(isStat);
  const validWrongQuestions = value.wrongQuestions.every(
    (no) => Number.isInteger(no) && no >= 101 && no <= 200,
  );

  return validParts && validTypes && validWrongQuestions;
}

function isSession(value: unknown): value is Session {
  if (!isRecord(value)) return false;
  if (
    typeof value.sessionId !== 'string' ||
    typeof value.testId !== 'string' ||
    !isExamMode(value.mode) ||
    !Array.isArray(value.parts) ||
    typeof value.startedAt !== 'string' ||
    Number.isNaN(Date.parse(value.startedAt)) ||
    typeof value.completedAt !== 'string' ||
    Number.isNaN(Date.parse(value.completedAt)) ||
    value.status !== 'completed' ||
    !isFiniteNonNegative(value.elapsedSeconds) ||
    !isRecord(value.answers)
  ) {
    return false;
  }

  const validParts = value.parts.every((part) => part === 5 || part === 6 || part === 7);
  const validAnswers = Object.entries(value.answers).every(([no, answer]) => {
    if (!/^\d+$/.test(no) || !isRecord(answer)) return false;
    return (
      (answer.chosen === 'A' || answer.chosen === 'B' || answer.chosen === 'C' || answer.chosen === 'D') &&
      typeof answer.isCorrect === 'boolean' &&
      (answer.timeSpentSeconds === undefined || isFiniteNonNegative(answer.timeSpentSeconds))
    );
  });

  return validParts && value.parts.length > 0 && validAnswers;
}

function parseImportPayload(value: unknown): ImportPayload {
  if (!isRecord(value) || value.version !== 1) {
    throw new Error('対応していないJSON形式です（version: 1 が必要です）。');
  }
  if (!Array.isArray(value.history) || !Array.isArray(value.sessions)) {
    throw new Error('history と sessions は配列である必要があります。');
  }
  if (!value.history.every(isHistoryEntry)) {
    throw new Error('history に不正な履歴データが含まれています。');
  }
  if (!value.sessions.every(isSession)) {
    throw new Error('sessions に不正な完了セッションが含まれています。');
  }
  if (value.exportedAt !== undefined && typeof value.exportedAt !== 'string') {
    throw new Error('exportedAt の形式が不正です。');
  }

  return {
    version: 1,
    exportedAt: value.exportedAt,
    history: value.history,
    sessions: value.sessions,
  };
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const rest = Math.floor(seconds % 60);
  if (hours > 0) return `${hours}時間${minutes}分${rest}秒`;
  return `${minutes}分${rest}秒`;
}

function sumHistory(entry: HistoryEntry): AggregateStat & { answered: number } {
  return Object.values(entry.partStats).reduce(
    (sum, stat) => ({
      answered: sum.answered + stat.answered,
      correct: sum.correct + stat.correct,
      total: sum.total + stat.total,
    }),
    { answered: 0, correct: 0, total: 0 },
  );
}

function accuracy(stat: AggregateStat): number {
  return stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [completedSessions, setCompletedSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyAction, setBusyAction] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const busy = busyAction !== null;

  const reload = useCallback(async () => {
    const [historyEntries, sessions] = await Promise.all([listHistory(), listSessions()]);
    setHistory(historyEntries);
    setCompletedSessions(sessions.filter((session) => session.status === 'completed'));
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [historyEntries, sessions] = await Promise.all([listHistory(), listSessions()]);
        if (!cancelled) {
          setHistory(historyEntries);
          setCompletedSessions(sessions.filter((session) => session.status === 'completed'));
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : '学習履歴の読み込みに失敗しました。');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const partAggregates = useMemo(() => {
    const result: Partial<Record<5 | 6 | 7, AggregateStat>> = {};
    for (const entry of history) {
      for (const part of [5, 6, 7] as const) {
        const stat = entry.partStats[part];
        if (!stat) continue;
        const current = result[part] ?? { correct: 0, total: 0 };
        result[part] = {
          correct: current.correct + stat.correct,
          total: current.total + stat.total,
        };
      }
    }
    return result;
  }, [history]);

  const typeAggregates = useMemo(() => {
    const result: Record<string, AggregateStat> = {};
    for (const entry of history) {
      for (const [type, stat] of Object.entries(entry.typeStats)) {
        const current = result[type] ?? { correct: 0, total: 0 };
        result[type] = {
          correct: current.correct + stat.correct,
          total: current.total + stat.total,
        };
      }
    }
    return Object.entries(result).sort(([, a], [, b]) => accuracy(a) - accuracy(b));
  }, [history]);

  const overall = useMemo(
    () =>
      history.reduce(
        (sum, entry) => {
          const stat = sumHistory(entry);
          return {
            correct: sum.correct + stat.correct,
            total: sum.total + stat.total,
          };
        },
        { correct: 0, total: 0 },
      ),
    [history],
  );

  const scoreTrend = useMemo(
    () => [...history].slice(0, 12).reverse().map((entry) => ({
      entry,
      score: accuracy(sumHistory(entry)),
    })),
    [history],
  );

  const handleExport = () => {
    setError(null);
    setMessage(null);
    try {
      const payload: ImportPayload = {
        version: 1,
        exportedAt: new Date().toISOString(),
        history,
        sessions: completedSessions,
      };
      const blob = new Blob([JSON.stringify(payload, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = `toeic-learning-history-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);
      setMessage('学習履歴をJSONファイルに書き出しました。');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エクスポートに失敗しました。');
    }
  };

  const handleImport = async (file: File) => {
    setBusyAction('import');
    setError(null);
    setMessage(null);
    try {
      const parsed = JSON.parse(await file.text()) as unknown;
      const payload = parseImportPayload(parsed);
      if (payload.history.length === 0 && payload.sessions.length === 0) {
        throw new Error('インポートできる履歴または完了セッションがありません。');
      }

      const knownIds = new Set([
        ...history.map((entry) => entry.sessionId),
        ...completedSessions.map((session) => session.sessionId),
      ]);
      const importedIds = new Set([
        ...payload.history.map((entry) => entry.sessionId),
        ...payload.sessions.map((session) => session.sessionId),
      ]);
      const overwriteCount = [...importedIds].filter((id) => knownIds.has(id)).length;
      const confirmation = overwriteCount > 0
        ? `${payload.history.length}件の履歴と${payload.sessions.length}件の完了セッションを読み込みます。同じIDのデータ${overwriteCount}件は上書きされます。続行しますか？`
        : `${payload.history.length}件の履歴と${payload.sessions.length}件の完了セッションを読み込みます。続行しますか？`;
      if (!window.confirm(confirmation)) return;

      for (const session of payload.sessions) {
        await putSession(session);
      }
      for (const entry of payload.history) {
        await putHistory(entry);
      }
      await reload();
      setMessage(
        `履歴${payload.history.length}件、完了セッション${payload.sessions.length}件を読み込みました。`,
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'インポートに失敗しました。');
    } finally {
      setBusyAction(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDeleteEntry = async (entry: HistoryEntry) => {
    const confirmed = window.confirm(
      `「${entry.testId}」（${formatDate(entry.completedAt)}）の受験履歴を削除します。\n対応する完了セッションも削除され、この操作は元に戻せません。続行しますか？`,
    );
    if (!confirmed) return;

    setBusyAction(`delete:${entry.sessionId}`);
    setError(null);
    setMessage(null);
    try {
      const result = await deleteHistoryWithCompletedSession(entry.sessionId);
      await reload();
      setMessage(
        result.sessionDeleted
          ? `「${entry.testId}」の履歴と完了セッションを削除しました。`
          : `「${entry.testId}」の履歴を削除しました。`,
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : '履歴の削除に失敗しました。');
    } finally {
      setBusyAction(null);
    }
  };

  const handleDeleteAll = async () => {
    const confirmed = window.confirm(
      `学習履歴${history.length}件と、端末内の完了セッションをすべて削除します。\n進行中のセッションは残りますが、削除したデータは元に戻せません。続行しますか？`,
    );
    if (!confirmed) return;

    setBusyAction('delete-all');
    setError(null);
    setMessage(null);
    try {
      const result = await deleteAllHistoryWithCompletedSessions();
      await reload();
      setMessage(
        `履歴${result.historyDeleted}件、完了セッション${result.sessionsDeleted}件を削除しました。`,
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : '全履歴の削除に失敗しました。');
    } finally {
      setBusyAction(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="animate-pulse text-zinc-500 dark:text-zinc-400">学習履歴を読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">学習履歴</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            受験結果の振り返りと、端末内データの移行ができます。
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="secondary"
            size="md"
            onClick={handleExport}
            disabled={busy || (history.length === 0 && completedSessions.length === 0)}
          >
            JSONを書き出す
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={() => fileInputRef.current?.click()}
            disabled={busy}
          >
            {busyAction === 'import' ? '読込中...' : 'JSONを読み込む'}
          </Button>
          {(history.length > 0 || completedSessions.length > 0) && (
            <Button
              variant="danger"
              size="md"
              onClick={() => void handleDeleteAll()}
              disabled={busy}
            >
              {busyAction === 'delete-all' ? '全履歴を削除中...' : '全履歴を削除'}
            </Button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json,.json"
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void handleImport(file);
            }}
          />
        </div>
      </div>

      {error && (
        <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300">
          {error}
        </div>
      )}
      {message && (
        <div role="status" className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300">
          {message}
        </div>
      )}

      {history.length === 0 ? (
        <Card>
          <div className="py-10 text-center">
            <p className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
              まだ学習履歴がありません
            </p>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              問題を採点すると、ここに正答率や弱点が表示されます。
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              テストセットを選ぶ
            </Link>
          </div>
        </Card>
      ) : (
        <>
          <section aria-labelledby="summary-heading" className="space-y-3">
            <h2 id="summary-heading" className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
              全体サマリー
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Card>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">受験回数</p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-zinc-900 dark:text-zinc-50">
                  {history.length}<span className="ml-1 text-sm font-normal">回</span>
                </p>
              </Card>
              <Card>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">総合正答率</p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-blue-600 dark:text-blue-400">
                  {accuracy(overall)}%
                </p>
              </Card>
              <Card>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">正答数</p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-zinc-900 dark:text-zinc-50">
                  {overall.correct}<span className="ml-1 text-sm font-normal">問</span>
                </p>
              </Card>
              <Card>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">出題数</p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-zinc-900 dark:text-zinc-50">
                  {overall.total}<span className="ml-1 text-sm font-normal">問</span>
                </p>
              </Card>
            </div>
          </section>

          <section aria-labelledby="trend-heading" className="space-y-3">
            <h2 id="trend-heading" className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
              スコア推移
            </h2>
            <Card>
              <div className="flex h-48 items-end gap-2 overflow-x-auto border-b border-zinc-200 px-1 pt-6 dark:border-zinc-700">
                {scoreTrend.map(({ entry, score }) => (
                  <div
                    key={entry.sessionId}
                    className="flex h-full min-w-12 flex-1 flex-col items-center justify-end gap-1"
                    title={`${formatDate(entry.completedAt)}: ${score}%`}
                  >
                    <span className="text-xs font-bold tabular-nums text-blue-700 dark:text-blue-300">{score}%</span>
                    <div
                      className="w-full max-w-12 rounded-t-md bg-blue-500"
                      style={{ height: `${Math.max(4, score)}%` }}
                      aria-hidden
                    />
                  </div>
                ))}
              </div>
              <div className="mt-2 flex justify-between text-xs text-zinc-400">
                <span>過去</span>
                <span>最新（最大12回）</span>
              </div>
            </Card>
          </section>

          <section aria-labelledby="weakness-heading" className="space-y-3">
            <h2 id="weakness-heading" className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
              弱点分析
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <h3 className="mb-4 text-sm font-semibold text-zinc-800 dark:text-zinc-200">Part別</h3>
                <div className="space-y-4">
                  {([5, 6, 7] as const).map((part) => {
                    const stat = partAggregates[part];
                    return stat ? (
                      <ScoreBar
                        key={part}
                        label={PART_LABEL[part]}
                        correct={stat.correct}
                        total={stat.total}
                        colorClass={part === 5 ? 'bg-blue-500' : part === 6 ? 'bg-green-500' : 'bg-purple-500'}
                      />
                    ) : null;
                  })}
                </div>
              </Card>
              <Card>
                <h3 className="mb-1 text-sm font-semibold text-zinc-800 dark:text-zinc-200">設問タイプ別</h3>
                <p className="mb-4 text-xs text-zinc-500 dark:text-zinc-400">正答率が低い順に表示しています。</p>
                {typeAggregates.length > 0 ? (
                  <div className="max-h-80 space-y-4 overflow-y-auto pr-1">
                    {typeAggregates.map(([type, stat]) => (
                      <ScoreBar
                        key={type}
                        label={TYPE_LABEL[type] ?? type}
                        correct={stat.correct}
                        total={stat.total}
                        colorClass={accuracy(stat) < 60 ? 'bg-red-500' : 'bg-amber-500'}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">集計できる設問タイプがありません。</p>
                )}
              </Card>
            </div>
          </section>

          <section aria-labelledby="entries-heading" className="space-y-3">
            <h2 id="entries-heading" className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
              受験履歴
            </h2>
            <div className="space-y-4">
              {history.map((entry) => {
                const total = sumHistory(entry);
                return (
                  <Card key={entry.sessionId}>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-zinc-900 dark:text-zinc-50">{entry.testId}</p>
                        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                          {formatDate(entry.completedAt)} ・ {MODE_LABEL[entry.mode]} ・ {formatTime(entry.elapsedSeconds)}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                        <div className="flex items-baseline gap-2 sm:text-right">
                          <span className="text-2xl font-bold tabular-nums text-blue-600 dark:text-blue-400">
                            {accuracy(total)}%
                          </span>
                          <span className="text-xs text-zinc-500 dark:text-zinc-400">
                            {total.correct}/{total.total}問
                          </span>
                        </div>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => void handleDeleteEntry(entry)}
                          disabled={busy}
                          aria-label={`${entry.testId} の受験履歴を削除`}
                        >
                          {busyAction === `delete:${entry.sessionId}` ? '削除中...' : '削除'}
                        </Button>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-2 sm:grid-cols-3">
                      {([5, 6, 7] as const).map((part) => {
                        const stat = entry.partStats[part];
                        return stat ? (
                          <div key={part} className="rounded-lg bg-zinc-50 px-3 py-2 dark:bg-zinc-800">
                            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Part {part}</p>
                            <p className="mt-0.5 text-sm font-semibold tabular-nums text-zinc-800 dark:text-zinc-200">
                              {stat.correct}/{stat.total}問正解
                              <span className="ml-1 text-xs font-normal text-zinc-500">（{stat.answered}問回答）</span>
                            </p>
                          </div>
                        ) : null;
                      })}
                    </div>

                    {entry.wrongQuestions.length > 0 && (
                      <div className="mt-4 border-t border-zinc-100 pt-3 dark:border-zinc-800">
                        <p className="mb-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                          誤答した問題（{entry.wrongQuestions.length}問）
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {entry.wrongQuestions.map((no) => (
                            <Link
                              key={no}
                              href={`/test/${entry.testId}/review/?session=${encodeURIComponent(entry.sessionId)}#q${no}`}
                              className="inline-flex min-h-[36px] items-center rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 transition-colors hover:bg-red-100 dark:border-red-800 dark:bg-red-950 dark:text-red-300 dark:hover:bg-red-900"
                            >
                              No.{no} の解説
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
