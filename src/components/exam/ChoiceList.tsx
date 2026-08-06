/**
 * 選択肢リスト（A〜D）コンポーネント
 *
 * Part5/6/7 共通。タップターゲット min-height 44px。
 * practice モードでは選択後に正誤を色で表示。
 */
'use client';

import type { Choice } from '@/types/question';

interface ChoiceListProps {
  choices: Choice[];
  /** 選択済みラベル */
  selected?: 'A' | 'B' | 'C' | 'D';
  /** 選択時コールバック */
  onSelect: (label: 'A' | 'B' | 'C' | 'D') => void;
  /** 正誤表示するか（practice モード or 解説モード） */
  showResult?: boolean;
  /** 操作を無効にするか */
  disabled?: boolean;
}

const labelColors = {
  default: 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 hover:border-blue-400 dark:hover:border-blue-500',
  selected: 'bg-blue-50 dark:bg-blue-950 border-blue-500 dark:border-blue-400',
  correct: 'bg-green-50 dark:bg-green-950 border-green-500 dark:border-green-400',
  wrong: 'bg-red-50 dark:bg-red-950 border-red-400 dark:border-red-500',
};

export function ChoiceList({
  choices,
  selected,
  onSelect,
  showResult = false,
  disabled = false,
}: ChoiceListProps) {
  return (
    <div className="space-y-2">
      {choices.map((choice) => {
        const isSelected = selected === choice.label;
        let colorClass = labelColors.default;

        if (showResult && isSelected) {
          colorClass = choice.isCorrect ? labelColors.correct : labelColors.wrong;
        } else if (showResult && choice.isCorrect) {
          colorClass = labelColors.correct;
        } else if (isSelected) {
          colorClass = labelColors.selected;
        }

        return (
          <button
            key={choice.label}
            onClick={() => !disabled && onSelect(choice.label)}
            disabled={disabled && !showResult}
            className={[
              'w-full flex items-start gap-3 rounded-lg border-2 p-3 text-left transition-colors duration-150 min-h-[44px]',
              colorClass,
              disabled ? 'cursor-default' : 'cursor-pointer',
            ].join(' ')}
          >
            {/* ラベル */}
            <span
              className={[
                'flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold',
                isSelected
                  ? 'bg-blue-600 text-white'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400',
              ].join(' ')}
            >
              {choice.label}
            </span>
            {/* 選択肢テキスト */}
            <span className="flex-1 pt-0.5 text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed">
              {choice.text}
            </span>
            {/* 正誤アイコン（showResult 時） */}
            {showResult && (
              <span className="flex-shrink-0 pt-0.5 text-lg">
                {choice.isCorrect ? '✓' : isSelected ? '✗' : ''}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
