/**
 * スコアバー（正答率を視覚化するプログレスバー）
 */

interface ScoreBarProps {
  /** ラベル */
  label: string;
  /** 正答数 */
  correct: number;
  /** 総問数 */
  total: number;
  /** バーの色（Tailwindクラス） */
  colorClass?: string;
}

export function ScoreBar({
  label,
  correct,
  total,
  colorClass = 'bg-blue-500',
}: ScoreBarProps) {
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="text-zinc-700 dark:text-zinc-300 font-medium">{label}</span>
        <span className="text-zinc-500 dark:text-zinc-400 tabular-nums">
          {correct}/{total}（{percentage}%）
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${colorClass}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
