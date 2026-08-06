/**
 * タイマーフック
 *
 * - 実時間ベース（Date.now() の差分）で計算
 * - 残時間は 5 秒ごとに localStorage へフラッシュし、リロードで復元
 * - onExpire コールバックはタイマー0になった時に呼ばれる
 */

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface UseTimerOptions {
  /** 合計秒数（カウントダウン） */
  totalSeconds: number;
  /** マウント直後に自動スタートするか */
  autoStart?: boolean;
  /** タイマーが0になった時のコールバック */
  onExpire?: () => void;
  /** localStorage のキー（リロード復元用。省略時は復元しない） */
  storageKey?: string;
}

interface UseTimerResult {
  /** 残り秒数 */
  remaining: number;
  /** 経過秒数 */
  elapsed: number;
  isRunning: boolean;
  pause: () => void;
  resume: () => void;
  /** 保存済み残時間を破棄する（採点完了・やり直し時に使用） */
  clearPersisted: () => void;
  /** 残時間を初期値へ戻して再スタートする */
  reset: () => void;
}

export function useTimer({
  totalSeconds,
  autoStart = false,
  onExpire,
  storageKey,
}: UseTimerOptions): UseTimerResult {
  // 残り秒数（初期値は必ず totalSeconds: SSR/クライアント不一致を避けるため）
  const [remaining, setRemaining] = useState<number>(totalSeconds);
  // 復元完了前はタイマーを走らせない（autoStart でも復元完了後に開始）
  const [isRunning, setIsRunning] = useState(false);
  // localStorage からの復元が完了したかどうか（ref で管理してタイマー起動判定に使う）
  const isRestoredRef = useRef(false);
  const remainingRef = useRef(totalSeconds);
  const skipCleanupPersistRef = useRef(false);

  // マウント後に localStorage から残り秒数を復元する（クライアントサイドのみ）
  // setState はタスクキュー経由で呼び出し、直接呼び出しによる lint エラーを回避する
  useEffect(() => {
    const restoreAndStart = () => {
      let restored = totalSeconds;
      if (storageKey) {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
          const val = Number(stored);
          if (!isNaN(val) && val > 0 && val <= totalSeconds) {
            restored = val;
          }
        }
      }
      remainingRef.current = restored;
      setRemaining(restored);
      isRestoredRef.current = true;
      skipCleanupPersistRef.current = false;
      if (autoStart) {
        setIsRunning(true);
      }
    };
    // setTimeout(fn, 0) でマイクロタスクキューに積み、effect body から setState を外す
    const id = setTimeout(restoreAndStart, 0);
    return () => clearTimeout(id);
  }, [autoStart, storageKey, totalSeconds]);

  // タイマー開始時刻 ref（Date.now() 基準）
  const startTimeRef = useRef<number | null>(null);
  const startRemainingRef = useRef(remaining);
  const onExpireRef = useRef(onExpire);
  // localStorage フラッシュの最終実行時刻（0 で初期化 → 最初の tick で即 flush）
  const lastFlushRef = useRef<number>(0);

  // onExpire を ref で保持（クロージャの古参照を防ぐ）
  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  // ============================================================
  // インターバルでタイマーを更新
  // ============================================================
  useEffect(() => {
    if (!isRunning) {
      startTimeRef.current = null;
      return;
    }

    // 開始時刻を記録
    if (startTimeRef.current === null) {
      startTimeRef.current = Date.now();
      startRemainingRef.current = remaining;
    }

    const intervalId = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.floor((now - (startTimeRef.current ?? now)) / 1000);
      const newRemaining = Math.max(0, startRemainingRef.current - elapsed);

      setRemaining(newRemaining);
      remainingRef.current = newRemaining;

      // 5秒ごとに localStorage へフラッシュ
      if (storageKey && now - lastFlushRef.current >= 5000) {
        localStorage.setItem(storageKey, String(newRemaining));
        lastFlushRef.current = now;
      }

      // タイマー0 → 停止 & コールバック
      if (newRemaining === 0) {
        clearInterval(intervalId);
        setIsRunning(false);
        if (storageKey) localStorage.removeItem(storageKey);
        onExpireRef.current?.();
      }
    }, 250); // 250ms ポーリングで精度を保つ

    return () => {
      clearInterval(intervalId);
      if (storageKey && !skipCleanupPersistRef.current && remainingRef.current > 0) {
        localStorage.setItem(storageKey, String(remainingRef.current));
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning, storageKey]);

  const pause = useCallback(() => {
    setIsRunning(false);
    startTimeRef.current = null;
  }, []);

  const resume = useCallback(() => {
    startRemainingRef.current = remaining;
    startTimeRef.current = Date.now();
    setIsRunning(true);
  }, [remaining]);

  const clearPersisted = useCallback(() => {
    skipCleanupPersistRef.current = true;
    if (storageKey) localStorage.removeItem(storageKey);
  }, [storageKey]);

  const reset = useCallback(() => {
    skipCleanupPersistRef.current = true;
    if (storageKey) localStorage.removeItem(storageKey);
    remainingRef.current = totalSeconds;
    startRemainingRef.current = totalSeconds;
    startTimeRef.current = autoStart ? Date.now() : null;
    setRemaining(totalSeconds);
    setIsRunning(autoStart);
    // 既存 interval の cleanup が終わった後は、新しい残時間を通常どおり保存する
    setTimeout(() => {
      skipCleanupPersistRef.current = false;
    }, 0);
  }, [autoStart, storageKey, totalSeconds]);

  const elapsed = totalSeconds - remaining;

  return { remaining, elapsed, isRunning, pause, resume, clearPersisted, reset };
}
