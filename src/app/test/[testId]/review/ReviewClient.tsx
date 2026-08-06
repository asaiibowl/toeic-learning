'use client';

/**
 * 解答・解説ページ — クライアントコンポーネント
 *
 * Part5 の全問を縦並びで表示し、各問に "#q{no}" アンカーを付ける。
 * Part6 の解説も同じページに続けて表示する。
 * IndexedDB から最新の完了セッションを取得して解答状況を表示する。
 * 上部 sticky ナビで問番号ジャンプと「誤答のみ表示」トグルを提供する。
 */

import { useEffect, useState, useCallback, type ReactNode } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { listSessions } from '@/lib/storage/idb';
import type { AnswerRecord } from '@/lib/storage/idb';
import { fetchPartData } from '@/lib/data/loader';
import type { Part5Data, Part5Question, Part6Data, Part6Question, Part7Data } from '@/types/question';
import { ReviewQuestionCard } from '@/components/review/ReviewQuestionCard';
import { ChoiceExplanation } from '@/components/review/ChoiceExplanation';
import { Part7Review } from '@/components/review/Part7Review';

interface ReviewClientProps {
  testId: string;
}

// ============================================================
// DocType ラベル（日本語）
// ============================================================
const DOC_TYPE_LABEL: Record<string, string> = {
  email: 'メール',
  letter: '手紙',
  memo: '社内メモ',
  notice: 'お知らせ',
  advertisement: '求人・広告',
  article: '記事',
  web_page: 'ウェブページ',
  text_message_chain: 'テキストメッセージ',
  online_chat: 'オンラインチャット',
  form: 'フォーム',
  invoice: '請求書',
  schedule: 'スケジュール',
  receipt: '領収書',
  other: 'その他',
};

// ============================================================
// Part6 完成形パッセージ描画ヘルパ
// ============================================================

/**
 * para.en 中の ______[N] を、正解テキストに差し替えて ReactNode[] を返す。
 * 解説ページ用（緑色強調・クリック不可）。
 */
function renderPart6CompletedPassage(
  en: string,
  questions: Part6Question[],
  answers: Record<number, AnswerRecord>,
  paragraphIndex: number,
): ReactNode[] {
  const BLANK_RE = /______\[(\d+)\]/g;
  const evidenceSnippets = questions
    .filter((question) => question.evidence?.paragraphIndex === paragraphIndex)
    .map((question) => question.evidence?.snippetEn)
    .filter((snippet): snippet is string => Boolean(snippet));
  let evidenceKey = 0;

  const highlightText = (text: string): ReactNode[] => {
    if (evidenceSnippets.length === 0) return [text];
    const snippets = [...evidenceSnippets].sort((a, b) => b.length - a.length);
    const nodes: ReactNode[] = [];
    let rest = text;
    while (rest.length > 0) {
      const next = snippets
        .map((snippet) => ({ snippet, index: rest.indexOf(snippet) }))
        .filter((item) => item.index >= 0)
        .sort((a, b) => a.index - b.index)[0];
      if (!next) {
        nodes.push(rest);
        break;
      }
      if (next.index > 0) nodes.push(rest.slice(0, next.index));
      nodes.push(
        <mark key={`p6-evidence-${paragraphIndex}-${evidenceKey++}`} className="rounded bg-yellow-200 px-0.5 text-inherit dark:bg-yellow-700">
          {next.snippet}
        </mark>,
      );
      rest = rest.slice(next.index + next.snippet.length);
    }
    return nodes;
  };

  if (!BLANK_RE.test(en)) return highlightText(en);
  BLANK_RE.lastIndex = 0;

  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = BLANK_RE.exec(en)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(...highlightText(en.slice(lastIndex, match.index)));
    }

    const no = parseInt(match[1], 10);
    const question = questions.find((q) => q.no === no);
    const correctChoice = question?.choices.find((c) => c.isCorrect);
    const userAnswer = answers[no];
    const isCorrect = userAnswer?.isCorrect;

    nodes.push(
      <span
        key={`filled-${no}`}
        className={[
          'inline-flex items-center gap-1 mx-1 px-1.5 py-0.5 rounded border-b-2 font-semibold text-sm',
          isCorrect === true
            ? 'border-green-500 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300'
            : isCorrect === false
            ? 'border-red-400 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300'
            : 'border-zinc-400 bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300',
        ].join(' ')}
      >
        <span className="text-xs font-normal text-zinc-500 dark:text-zinc-400 flex-shrink-0">
          {no}
        </span>
        {correctChoice?.text ?? '?'}
      </span>,
    );

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < en.length) {
    nodes.push(...highlightText(en.slice(lastIndex)));
  }

  return nodes;
}

// ============================================================
// メインコンポーネント
// ============================================================

export function ReviewClient({ testId }: ReviewClientProps) {
  const searchParams = useSearchParams();
  const requestedSessionId = searchParams.get('session');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [part5Data, setPart5Data] = useState<Part5Data | null>(null);
  const [part6Data, setPart6Data] = useState<Part6Data | null>(null);
  const [part7Data, setPart7Data] = useState<Part7Data | null>(null);
  const [answers, setAnswers] = useState<Record<number, AnswerRecord>>({});
  const [onlyWrong, setOnlyWrong] = useState(searchParams.get('onlyWrong') === '1');

  useEffect(() => {
    async function load() {
      try {
        // IndexedDB から最新の完了セッションを取得（なければ解説のみ表示）
        const sessions = await listSessions();
        const completed = sessions
          .filter((s) => s.testId === testId && s.status === 'completed')
          .sort(
            (a, b) =>
              new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime(),
          );
        const latest = requestedSessionId
          ? completed.find((session) => session.sessionId === requestedSessionId)
          : completed[0];
        if (latest) {
          setAnswers(latest.answers);
        }

        // Part5 データを取得（常に取得してデフォルト表示）
        try {
          const data = await fetchPartData(testId, 5);
          setPart5Data(data);
        } catch {
          // Part5 データがない場合はスキップ
        }

        // Part6 データを取得
        try {
          const data6 = await fetchPartData(testId, 6);
          setPart6Data(data6);
        } catch {
          // Part6 データがない場合はスキップ
        }

        // Part7 データを取得
        try {
          const data7 = await fetchPartData(testId, 7);
          setPart7Data(data7);
        } catch {
          // Part7 データがない場合はスキップ
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'データの読み込みに失敗しました',
        );
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, [requestedSessionId, testId]);

  // 問番号クリックでスムーズスクロール
  const scrollToQuestion = useCallback((no: number) => {
    const el = document.getElementById(`q${no}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // ローディング中
  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-zinc-500 dark:text-zinc-400 animate-pulse">
          読み込み中...
        </div>
      </div>
    );
  }

  // エラー表示
  if (error) {
    return (
      <div className="max-w-2xl mx-auto py-12 space-y-4">
        <div className="rounded-xl border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950 p-6">
          <h2 className="text-base font-semibold text-red-700 dark:text-red-400">
            データを取得できませんでした
          </h2>
          <p className="mt-2 text-sm text-red-600 dark:text-red-300">
            {error ?? '不明なエラーが発生しました'}
          </p>
        </div>
        <Link
          href="/"
          className="block w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold text-center py-3 min-h-[44px] flex items-center justify-center transition-colors"
        >
          一覧へ戻る
        </Link>
      </div>
    );
  }

  const questions: Part5Question[] = part5Data?.questions ?? [];

  // Part5 + Part6 + Part7 全問から復習対象問番号 Set を生成
  const allQuestionNos: number[] = [
    ...questions.map((q) => q.no),
    ...(part6Data?.passages.flatMap((p) => p.questions.map((q) => q.no)) ?? []),
    ...(part7Data?.sets.flatMap((set) => set.questions.map((q) => q.no)) ?? []),
  ];

  const wrongNos = new Set(
    allQuestionNos.filter((no) => {
      const ans = answers[no];
      return !ans || !ans.isCorrect;
    }),
  );

  // 「誤答のみ表示」フィルタリング（Part5）
  const filteredQuestions: Part5Question[] = onlyWrong
    ? questions.filter((q) => {
        const ans = answers[q.no];
        return !ans || !ans.isCorrect;
      })
    : questions;

  // 解答済みかどうかの判定
  const hasAnswers = Object.keys(answers).length > 0;

  return (
    <div className="max-w-5xl mx-auto">
      {/* ページタイトル（印刷時は表示） */}
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          解答・解説
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          テストセット: {testId}
        </p>
        {!hasAnswers && (
          <p className="mt-2 text-sm text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg px-3 py-2">
            ※ 解答記録が見つかりません。解説のみ表示しています。
          </p>
        )}
      </div>

      {/* Sticky ナビゲーション（印刷時非表示） */}
      <div className="sticky top-0 z-10 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700 shadow-sm px-4 py-2 print:hidden">
        {/* 誤答のみ表示トグル */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            問番号ジャンプ
          </span>
          {hasAnswers && (
            <button
              type="button"
              onClick={() => setOnlyWrong((prev) => !prev)}
              className={[
                'text-xs font-semibold rounded-full px-3 py-1.5 min-h-[36px] transition-colors border',
                onlyWrong
                  ? 'bg-red-600 text-white border-red-600 hover:bg-red-700'
                  : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-700',
              ].join(' ')}
            >
              {onlyWrong ? '誤答のみ表示 ON' : '誤答のみ表示 OFF'}
            </button>
          )}
        </div>

        {/* 問番号リスト（横スクロール） */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {/* Part5 ラベル */}
          {questions.length > 0 && (
            <span className="flex-shrink-0 self-center text-xs font-bold text-zinc-400 dark:text-zinc-500 mr-1">
              P5
            </span>
          )}
          {questions.map((q) => {
            const ans = answers[q.no];
            const isCorrect = ans?.isCorrect;
            const isWrong = ans && !ans.isCorrect;
            const isFiltered = onlyWrong && !wrongNos.has(q.no);
            return (
              <button
                key={q.no}
                type="button"
                onClick={() => scrollToQuestion(q.no)}
                disabled={isFiltered}
                className={[
                  'flex-shrink-0 w-10 h-10 rounded-lg text-xs font-bold transition-colors border',
                  isFiltered
                    ? 'opacity-30 cursor-not-allowed border-zinc-200 dark:border-zinc-700 text-zinc-400'
                    : isCorrect
                    ? 'bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800'
                    : isWrong
                    ? 'bg-red-100 dark:bg-red-900 border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800'
                    : 'bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700',
                ].join(' ')}
              >
                {q.no}
              </button>
            );
          })}

          {/* Part6 ラベル */}
          {part6Data && (
            <span className="flex-shrink-0 self-center text-xs font-bold text-zinc-400 dark:text-zinc-500 mx-1">
              P6
            </span>
          )}
          {part6Data?.passages.flatMap((p) => p.questions).map((q) => {
            const ans = answers[q.no];
            const isCorrect = ans?.isCorrect;
            const isWrong = ans && !ans.isCorrect;
            const isFiltered = onlyWrong && !wrongNos.has(q.no);
            return (
              <button
                key={q.no}
                type="button"
                onClick={() => scrollToQuestion(q.no)}
                disabled={isFiltered}
                className={[
                  'flex-shrink-0 w-10 h-10 rounded-lg text-xs font-bold transition-colors border',
                  isFiltered
                    ? 'opacity-30 cursor-not-allowed border-zinc-200 dark:border-zinc-700 text-zinc-400'
                    : isCorrect
                    ? 'bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800'
                    : isWrong
                    ? 'bg-red-100 dark:bg-red-900 border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800'
                    : 'bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700',
                ].join(' ')}
              >
                {q.no}
              </button>
            );
          })}

          {/* Part7 ラベル */}
          {part7Data && (
            <span className="flex-shrink-0 self-center text-xs font-bold text-zinc-400 dark:text-zinc-500 mx-1">
              P7
            </span>
          )}
          {part7Data?.sets.flatMap((set) => set.questions).map((q) => {
            const ans = answers[q.no];
            const isCorrect = ans?.isCorrect;
            const isWrong = ans && !ans.isCorrect;
            const isFiltered = onlyWrong && !wrongNos.has(q.no);
            return (
              <button
                key={q.no}
                type="button"
                onClick={() => scrollToQuestion(q.no)}
                disabled={isFiltered}
                className={[
                  'flex-shrink-0 w-10 h-10 rounded-lg text-xs font-bold transition-colors border',
                  isFiltered
                    ? 'opacity-30 cursor-not-allowed border-zinc-200 dark:border-zinc-700 text-zinc-400'
                    : isCorrect
                    ? 'bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800'
                    : isWrong
                    ? 'bg-red-100 dark:bg-red-900 border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800'
                    : 'bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700',
                ].join(' ')}
              >
                {q.no}
              </button>
            );
          })}
        </div>
      </div>

      {/* Part5 問題カード一覧 */}
      {part5Data && (
        <div className="px-4 py-4 space-y-4">
          <h2 className="text-base font-semibold text-zinc-800 dark:text-zinc-200 px-1">
            Part 5 短文穴埋め
          </h2>
          {filteredQuestions.length === 0 ? (
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-8 text-center">
              <p className="text-zinc-500 dark:text-zinc-400">
                表示する問題がありません
              </p>
            </div>
          ) : (
            filteredQuestions.map((q) => {
              const ans = answers[q.no];
              return (
                <ReviewQuestionCard
                  key={q.no}
                  question={q}
                  userChoice={ans?.chosen}
                  anchorId={`q${q.no}`}
                />
              );
            })
          )}
        </div>
      )}

      {/* Part6 解説 UI */}
      {part6Data && (
        <div className="px-4 py-4 space-y-6">
          <h2 className="text-base font-semibold text-zinc-800 dark:text-zinc-200 px-1">
            Part 6 長文穴埋め
          </h2>

          {part6Data.passages.map((passage) => {
            // 「誤答のみ表示」フィルタ
            const visibleQuestions = onlyWrong
              ? passage.questions.filter((q) => {
                  const ans = answers[q.no];
                  return !ans || !ans.isCorrect;
                })
              : passage.questions;

            if (onlyWrong && visibleQuestions.length === 0) return null;

            return (
              <div key={passage.passageNo} className="space-y-4">
                {/* 文書ヘッダー */}
                <h3 className="text-sm font-bold text-zinc-700 dark:text-zinc-300 border-l-4 border-green-500 pl-3">
                  文書 {passage.passageNo} —{' '}
                  {passage.title
                    ? `${passage.title}（${DOC_TYPE_LABEL[passage.docType] ?? passage.docType}）`
                    : DOC_TYPE_LABEL[passage.docType] ?? passage.docType}
                </h3>

                {/* 完成形パッセージ（正解埋め込み） */}
                <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 overflow-hidden">
                  <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800 px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">
                    本文（正解埋め込み）
                  </p>
                  <div className="p-4 space-y-3">
                    {passage.paragraphs.map((para, i) => (
                      <div key={i} className="space-y-1">
                        <p className="text-sm leading-relaxed text-zinc-800 dark:text-zinc-200 whitespace-pre-line">
                          {renderPart6CompletedPassage(para.en, passage.questions, answers, i)}
                        </p>
                        <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 whitespace-pre-line border-l-2 border-zinc-200 dark:border-zinc-700 pl-2">
                          {para.ja}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 各設問カード */}
                {visibleQuestions.map((q) => {
                  const ans = answers[q.no];
                  const correctChoice = q.choices.find((c) => c.isCorrect);
                  const isCorrect = ans ? ans.isCorrect : undefined;

                  return (
                    <div
                      key={q.no}
                      id={`q${q.no}`}
                      className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden print:break-inside-avoid"
                    >
                      {/* カードヘッダー */}
                      <div
                        className={[
                          'flex items-center justify-between px-4 py-3 border-b',
                          isCorrect === true
                            ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800'
                            : isCorrect === false
                            ? 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800'
                            : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700',
                        ].join(' ')}
                      >
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-zinc-800 dark:text-zinc-200">
                            No. {q.no}
                          </span>
                          {q.type === 'insertion' && (
                            <span className="text-xs rounded-full bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 px-2 py-0.5 font-medium">
                              文挿入
                            </span>
                          )}
                          {ans && (
                            <span className="text-sm text-zinc-600 dark:text-zinc-400">
                              あなたの解答:{' '}
                              <span
                                className={[
                                  'font-bold',
                                  isCorrect
                                    ? 'text-green-700 dark:text-green-400'
                                    : 'text-red-700 dark:text-red-400',
                                ].join(' ')}
                              >
                                {ans.chosen}
                              </span>
                              {' → '}正解:{' '}
                              <span className="font-bold text-green-700 dark:text-green-400">
                                {correctChoice?.label}
                              </span>
                            </span>
                          )}
                        </div>
                        {isCorrect !== undefined && (
                          <span className="text-2xl flex-shrink-0">
                            {isCorrect ? '✓' : '✗'}
                          </span>
                        )}
                      </div>

                      {/* カード本文 */}
                      <div className="p-4 space-y-4">
                        {/* 選択肢の解説 */}
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">選択肢の解説</p>
                          <ChoiceExplanation choices={q.choices} userChoice={ans?.chosen} />
                        </div>

                        {/* 総合解説 */}
                        <div className="rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 p-3 space-y-1">
                          <p className="text-sm font-medium text-amber-700 dark:text-amber-400">文法ポイント</p>
                          <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
                            {q.explanationOverall}
                          </p>
                        </div>

                        {/* 根拠箇所 */}
                        {q.evidence && (
                          <div className="rounded-lg bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 p-3">
                            <p className="text-xs font-semibold text-yellow-700 dark:text-yellow-400 mb-1">根拠箇所</p>
                            <p className="text-sm italic text-yellow-800 dark:text-yellow-300">
                              &ldquo;{q.evidence.snippetEn}&rdquo;
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}

      {part7Data && (
        <Part7Review data={part7Data} answers={answers} onlyWrong={onlyWrong} />
      )}

      {/* ページ下部ボタン（印刷時非表示） */}
      <div className="px-4 pb-8 flex flex-col sm:flex-row gap-3 print:hidden">
        <Link
          href={`/test/${testId}/result/`}
          className="flex-1 flex items-center justify-center rounded-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 text-sm font-semibold py-3 transition-colors min-h-[48px]"
        >
          採点結果に戻る
        </Link>
        <Link
          href={`/test/${testId}/`}
          className="flex-1 flex items-center justify-center rounded-lg border-2 border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-sm font-semibold py-3 transition-colors min-h-[48px]"
        >
          もう一度解く
        </Link>
        <Link
          href="/"
          className="flex-1 flex items-center justify-center rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3 transition-colors min-h-[48px]"
        >
          一覧へ戻る
        </Link>
      </div>
    </div>
  );
}
