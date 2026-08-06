/**
 * 空所（______）を視覚的な下線として描画するコンポーネント
 *
 * Part5: "______" 記法（単純分割）
 * Part6: "______[131]" 記法（問番号付き空所）
 *
 * 下位互換を保ちつつ Part6 拡張に対応。
 */

import type { ReactNode } from 'react';

interface BlankTextProps {
  /** 問題文（"______" または "______[N]" を含む） */
  text: string;
  /** 空所に表示するテキスト（Part5 用・省略時は下線のみ） */
  filledAnswer?: string;
  // ---- Part6 拡張 ----
  /** 問番号 → 表示テキストのマップ（Part6 の複数空所対応） */
  filledAnswersByNo?: Record<number, string>;
  /** ハイライト対象の問番号（ring でフォーカスを表示） */
  highlightNo?: number;
  /** 空所クリック時コールバック（問番号を渡す） */
  onBlankClick?: (no: number) => void;
  className?: string;
}

// Part6 の空所記法（______[131] 形式）を検出する正規表現
const PART6_BLANK_RE = /______\[(\d+)\]/g;

/**
 * テキストを ReactNode[] に変換するユーティリティ。
 *
 * Part6 の "______[N]" 記法を優先検出し、なければ Part5 の "______" で分割する。
 * いずれにも一致しない場合はテキストをそのまま返す。
 */
export function renderBlank(
  text: string,
  filledAnswer?: string,
  filledAnswersByNo?: Record<number, string>,
  highlightNo?: number,
  onBlankClick?: (no: number) => void,
): ReactNode[] {
  // ---- Part6: 問番号付き空所の処理 ----
  if (PART6_BLANK_RE.test(text)) {
    // exec 使用のため lastIndex をリセット
    PART6_BLANK_RE.lastIndex = 0;

    const nodes: ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = PART6_BLANK_RE.exec(text)) !== null) {
      // マッチ前のテキスト
      if (match.index > lastIndex) {
        nodes.push(text.slice(lastIndex, match.index));
      }

      const no = parseInt(match[1], 10);
      const filled = filledAnswersByNo?.[no];
      const isHighlighted = highlightNo === no;

      nodes.push(
        <span
          key={`blank-${no}`}
          onClick={onBlankClick ? () => onBlankClick(no) : undefined}
          className={[
            'inline-flex items-center gap-1 mx-1 px-1.5 py-0.5 rounded border-b-2',
            // 入力済み vs 空所
            filled
              ? 'border-blue-500 dark:border-blue-400 text-blue-700 dark:text-blue-300 font-semibold'
              : 'border-zinc-500 dark:border-zinc-400 min-w-[4rem]',
            // ハイライト
            isHighlighted ? 'ring-2 ring-blue-400 dark:ring-blue-500 bg-blue-50 dark:bg-blue-950' : '',
            // クリック可能
            onBlankClick ? 'cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-950 hover:border-blue-400 transition-colors' : '',
          ].join(' ')}
          role={onBlankClick ? 'button' : undefined}
          tabIndex={onBlankClick ? 0 : undefined}
          aria-label={`No.${no} の空所`}
          onKeyDown={
            onBlankClick
              ? (e) => { if (e.key === 'Enter' || e.key === ' ') onBlankClick(no); }
              : undefined
          }
        >
          {/* 問番号バッジ */}
          <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 flex-shrink-0">
            {no}
          </span>
          {/* 入力内容 or 空白 */}
          <span className="text-sm">
            {filled ?? '      '}
          </span>
        </span>,
      );

      lastIndex = match.index + match[0].length;
    }

    // マッチ後の残りテキスト
    if (lastIndex < text.length) {
      nodes.push(text.slice(lastIndex));
    }

    return nodes;
  }

  // ---- Part5 (下位互換): "______" のみの処理 ----
  const parts = text.split('______');
  if (parts.length === 1) return [text];

  return parts.flatMap((part, i) => {
    if (i === parts.length - 1) return [part];
    return [
      part,
      <span
        key={`blank-${i}`}
        className="inline-block min-w-[5rem] border-b-2 border-zinc-700 dark:border-zinc-300 text-center font-semibold text-blue-700 dark:text-blue-400 mx-1 px-1"
      >
        {filledAnswer ?? '      '}
      </span>,
    ];
  });
}

export function BlankText({
  text,
  filledAnswer,
  filledAnswersByNo,
  highlightNo,
  onBlankClick,
  className = '',
}: BlankTextProps) {
  return (
    <span className={className}>
      {renderBlank(text, filledAnswer, filledAnswersByNo, highlightNo, onBlankClick)}
    </span>
  );
}
