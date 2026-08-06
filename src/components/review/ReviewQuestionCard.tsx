/**
 * 解答・解説カード（ReviewQuestionCard）
 *
 * 解説ページで各問ごとに表示する共通コンポーネント。
 * Part5/6/7 で共通使用。
 *
 * 表示内容:
 *   1. 問番号・タグ・自分の解答 vs 正解（正誤アイコン）
 *   2. 英文（空所に正解を埋めた完成形も併記）
 *   3. 日本語訳
 *   4. A〜D全選択肢（ChoiceExplanation コンポーネント）
 *   5. explanationOverall（文法ポイント等）
 */

import type { Part5Question } from '@/types/question';
import { BlankText } from '@/components/exam/BlankText';
import { ChoiceExplanation } from './ChoiceExplanation';

interface ReviewQuestionCardProps {
  question: Part5Question;
  /** ユーザーの選択（ない場合は解説のみ表示） */
  userChoice?: 'A' | 'B' | 'C' | 'D';
  /** アンカー用 id（例: "q101"） */
  anchorId?: string;
}

export function ReviewQuestionCard({
  question,
  userChoice,
  anchorId,
}: ReviewQuestionCardProps) {
  const correctChoice = question.choices.find((c) => c.isCorrect);
  const isCorrect = userChoice ? userChoice === correctChoice?.label : undefined;

  return (
    <div
      id={anchorId}
      className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden print:break-inside-avoid"
    >
      {/* ヘッダー: 問番号・タグ・正誤 */}
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
            No. {question.no}
          </span>
          {question.tag && (
            <span className="text-xs rounded-full bg-zinc-200 dark:bg-zinc-700 px-2 py-0.5 text-zinc-600 dark:text-zinc-400">
              {question.tag}
            </span>
          )}
          {userChoice && (
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              あなたの解答:{' '}
              <span
                className={[
                  'font-bold',
                  isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400',
                ].join(' ')}
              >
                {userChoice}
              </span>
              {' → '}正解:{' '}
              <span className="font-bold text-green-700 dark:text-green-400">
                {correctChoice?.label}
              </span>
            </span>
          )}
        </div>
        {/* 正誤アイコン */}
        {isCorrect !== undefined && (
          <span className="text-2xl flex-shrink-0">
            {isCorrect ? '✓' : '✗'}
          </span>
        )}
      </div>

      {/* 本文 */}
      <div className="p-4 space-y-4">
        {/* 英文（空所表示） */}
        <div className="space-y-1">
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">問題文</p>
          <p className="text-base text-zinc-900 dark:text-zinc-100 leading-relaxed">
            <BlankText text={question.sentence} />
          </p>
          {/* 正解を埋めた完成形 */}
          {correctChoice && (
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <span className="font-medium text-green-700 dark:text-green-400">完成形: </span>
              <BlankText text={question.sentence} filledAnswer={correctChoice.text} />
            </p>
          )}
        </div>

        {/* 日本語訳 */}
        <div className="space-y-1">
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">日本語訳</p>
          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed border-l-2 border-zinc-200 dark:border-zinc-700 pl-3">
            {question.sentenceJa}
          </p>
        </div>

        {/* 選択肢と解説 */}
        <div className="space-y-1">
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">選択肢の解説</p>
          <ChoiceExplanation choices={question.choices} userChoice={userChoice} />
        </div>

        {/* 総合解説 */}
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 p-3 space-y-1">
          <p className="text-sm font-medium text-amber-700 dark:text-amber-400">文法ポイント</p>
          <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
            {question.explanationOverall}
          </p>
        </div>
      </div>
    </div>
  );
}
