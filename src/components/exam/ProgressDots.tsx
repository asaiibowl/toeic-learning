/**
 * 進捗ドットコンポーネント
 *
 * 問数ぶんのドットを表示。未回答/回答済/現在問を色分け。
 * タップでその問にジャンプ。
 */
'use client';

interface ProgressDotsProps {
  /** 総問数 */
  total: number;
  /** 回答済み問番号の Set */
  answeredNos: Set<number>;
  /** 現在表示中のインデックス（0始まり） */
  currentIndex: number;
  /** ジャンプコールバック */
  onJump: (index: number) => void;
  /** 開始問番号（例: 101） */
  startNo?: number;
}

export function ProgressDots({
  total,
  answeredNos,
  currentIndex,
  onJump,
  startNo = 1,
}: ProgressDotsProps) {
  return (
    <div className="flex flex-wrap gap-1" role="navigation" aria-label="問題一覧">
      {Array.from({ length: total }, (_, i) => {
        const no = startNo + i;
        const isCurrent = i === currentIndex;
        const isAnswered = answeredNos.has(no);

        let dotClass =
          'w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center transition-colors duration-150 cursor-pointer min-h-[24px]';

        if (isCurrent) {
          dotClass += ' bg-blue-600 text-white ring-2 ring-blue-300';
        } else if (isAnswered) {
          dotClass += ' bg-green-500 text-white hover:bg-green-600';
        } else {
          dotClass += ' bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-300 dark:hover:bg-zinc-600';
        }

        return (
          <button
            key={no}
            onClick={() => onJump(i)}
            className={dotClass}
            aria-label={`No.${no}${isAnswered ? '（回答済）' : '（未回答）'}`}
            aria-current={isCurrent ? 'true' : undefined}
          >
            {no - startNo + 1}
          </button>
        );
      })}
    </div>
  );
}
