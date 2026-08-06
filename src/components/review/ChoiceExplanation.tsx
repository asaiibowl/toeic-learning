/**
 * 全選択肢の正誤解説コンポーネント
 *
 * 解答・解説ページで使用。A〜D全選択肢を正誤アイコン付きで一覧し、
 * それぞれの explanation を必ず表示（1つも省略しない）。
 * Part5/6/7 共通。
 */

import type { Choice } from '@/types/question';

interface ChoiceExplanationProps {
  choices: Choice[];
  /** ユーザーの選択（ない場合は undefined） */
  userChoice?: 'A' | 'B' | 'C' | 'D';
}

export function ChoiceExplanation({ choices, userChoice }: ChoiceExplanationProps) {
  return (
    <div className="space-y-3">
      {choices.map((choice) => {
        const isCorrect = choice.isCorrect;
        const isUserChoice = userChoice === choice.label;

        return (
          <div
            key={choice.label}
            className={[
              'rounded-lg border p-3',
              isCorrect
                ? 'border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-950'
                : isUserChoice
                ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-950'
                : 'border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800',
            ].join(' ')}
          >
            <div className="flex items-start gap-2">
              {/* 正誤アイコン */}
              <span className="flex-shrink-0 text-lg leading-none mt-0.5">
                {isCorrect ? '✓' : isUserChoice ? '✗' : '　'}
              </span>
              <div className="flex-1 min-w-0">
                {/* 選択肢ラベルと本文 */}
                <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                  <span className="font-bold">{choice.label}.</span>{' '}
                  {choice.text}
                  {isCorrect && (
                    <span className="ml-1.5 text-xs font-normal text-green-700 dark:text-green-400">
                      （正解）
                    </span>
                  )}
                  {isUserChoice && !isCorrect && (
                    <span className="ml-1.5 text-xs font-normal text-red-700 dark:text-red-400">
                      （あなたの解答）
                    </span>
                  )}
                </p>
                {/* 解説 */}
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {choice.explanation}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
