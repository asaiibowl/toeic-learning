/**
 * 汎用カードコンポーネント
 */

interface CardProps {
  children: React.ReactNode;
  className?: string;
  /** パディング有無 */
  padded?: boolean;
}

export function Card({ children, className = '', padded = true }: CardProps) {
  return (
    <div
      className={[
        'rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-sm',
        padded ? 'p-5' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}
