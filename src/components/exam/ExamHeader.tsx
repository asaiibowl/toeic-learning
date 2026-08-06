/**
 * 演習画面の上部固定ヘッダー
 *
 * タイマー（残10分で赤）、進捗ドット、採点ボタンを含む。
 * Part5/6/7 共通コンポーネント。
 */
'use client';

import { ProgressDots } from './ProgressDots';
import { Button } from '@/components/ui/Button';

interface ExamHeaderProps {
  /** 残り秒数 */
  remainingSeconds: number;
  /** 総問数 */
  totalQuestions: number;
  /** 回答済み問番号の Set */
  answeredNos: Set<number>;
  /** 現在表示中のインデックス */
  currentIndex: number;
  /** 問番号ジャンプ */
  onJump: (index: number) => void;
  /** 採点ボタンクリック */
  onSubmit: () => void;
  /** タイマー非表示（practice モード） */
  hideTimer?: boolean;
  /** 開始問番号 */
  startNo?: number;
  /** 右端ボタンの文言 */
  submitLabel?: string;
}

/** 秒数を MM:SS 形式にフォーマット */
function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function ExamHeader({
  remainingSeconds,
  totalQuestions,
  answeredNos,
  currentIndex,
  onJump,
  onSubmit,
  hideTimer = false,
  startNo = 1,
  submitLabel = '採点する',
}: ExamHeaderProps) {
  const isWarning = remainingSeconds <= 10 * 60 && !hideTimer; // 残10分以下で警告

  return (
    <div className="sticky top-14 z-10 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700 shadow-sm">
      <div className="mx-auto max-w-4xl px-4 py-2">
        <div className="flex items-center gap-3 flex-wrap">
          {/* タイマー */}
          {!hideTimer && (
            <div
              className={[
                'flex-shrink-0 font-mono text-lg font-bold tabular-nums px-3 py-1 rounded-lg',
                isWarning
                  ? 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200',
              ].join(' ')}
              aria-live="polite"
              aria-label={`残り時間 ${formatTime(remainingSeconds)}`}
            >
              {formatTime(remainingSeconds)}
            </div>
          )}

          {/* 進捗ドット */}
          <div className="flex-1 min-w-0 overflow-x-auto">
            <ProgressDots
              total={totalQuestions}
              answeredNos={answeredNos}
              currentIndex={currentIndex}
              onJump={onJump}
              startNo={startNo}
            />
          </div>

          {/* 採点ボタン */}
          <Button
            variant="primary"
            size="sm"
            onClick={onSubmit}
            className="flex-shrink-0"
          >
            {submitLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
