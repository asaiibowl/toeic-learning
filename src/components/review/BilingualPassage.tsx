/**
 * 英日対訳パッセージコンポーネント
 *
 * Part6/7 で使用する。英語と日本語訳を並べて表示。
 * Part5 では不使用だが、今後のために作成。
 */

import type { BilingualParagraph } from '@/types/question';

interface BilingualPassageProps {
  paragraphs: BilingualParagraph[];
  /** タイトル（任意） */
  title?: string;
  /** 日本語訳を表示するか */
  showJapanese?: boolean;
}

export function BilingualPassage({
  paragraphs,
  title,
  showJapanese = true,
}: BilingualPassageProps) {
  return (
    <div className="space-y-4">
      {title && (
        <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-200">
          {title}
        </h3>
      )}
      {paragraphs.map((para, i) => (
        <div key={i} className="space-y-1">
          {/* 英語本文 */}
          <p className="text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed">
            {para.en}
          </p>
          {/* 日本語訳 */}
          {showJapanese && (
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed border-l-2 border-zinc-200 dark:border-zinc-700 pl-3">
              {para.ja}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
