/**
 * セッション管理フック
 *
 * - マウント時に進行中セッションを検索し再開、なければ新規作成
 * - 解答変更は 500ms デバウンスで IndexedDB に保存
 * - beforeunload / visibilitychange(hidden) で即時フラッシュ
 * - complete() で採点して history に書き込み
 */

'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ExamMode, Session } from '@/lib/storage/idb';
import {
  putSession,
  findInProgressSession,
  putHistory,
  deleteSession,
} from '@/lib/storage/idb';
import type { SessionGradeResult } from '@/lib/scoring/calculator';
import { toHistoryStats } from '@/lib/scoring/calculator';

// ============================================================
// 型定義
// ============================================================

interface UseSessionOptions {
  testId: string;
  mode: ExamMode;
  parts: (5 | 6 | 7)[];
}

interface UseSessionResult {
  session: Session | null;
  isLoading: boolean;
  /** 解答を記録する */
  answer: (no: number, label: 'A' | 'B' | 'C' | 'D', isCorrect: boolean) => void;
  /** 経過時間を更新する */
  setElapsed: (seconds: number, part: 5 | 6 | 7) => void;
  /** 再開位置を更新し、即時保存する */
  setCurrentPart: (part: 5 | 6 | 7) => Promise<void>;
  /** セッションを完了状態にして history に書き込む */
  complete: (grade: SessionGradeResult) => Promise<void>;
  /** セッションをリセット（新規作成）する */
  reset: () => Promise<void>;
  /** React の再描画を待たずに最新状態を取得する */
  getSnapshot: () => Session | null;
}

// ============================================================
// フック実装
// ============================================================

export function useSession({ testId, mode, parts }: UseSessionOptions): UseSessionResult {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // デバウンス用タイマー ref
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // 即時フラッシュ用の最新セッション ref
  const sessionRef = useRef<Session | null>(null);
  const partsKey = [...parts].sort((a, b) => a - b).join(',');
  const stableParts = useMemo(
    () => partsKey.split(',').filter(Boolean).map(Number) as (5 | 6 | 7)[],
    [partsKey],
  );

  // sessionRef を常に最新に保つ
  useEffect(() => {
    sessionRef.current = session;
  }, [session]);

  // ============================================================
  // 新規セッション作成
  // ============================================================
  const createNewSession = useCallback(async (): Promise<Session> => {
    const startedAt = new Date().toISOString();
    const newSession: Session = {
      sessionId: `${testId}-${Date.now()}`,
      testId,
      mode,
      parts: stableParts,
      currentPart: stableParts[0],
      startedAt,
      status: 'in_progress',
      elapsedSeconds: 0,
      answers: {},
    };
    await putSession(newSession);
    return newSession;
  }, [testId, mode, stableParts]);

  // ============================================================
  // 初期化: 進行中セッション検索 or 新規作成
  // ============================================================
  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        const existing = await findInProgressSession(testId, mode, stableParts);
        if (!cancelled) {
          if (existing) {
            setSession(existing);
          } else {
            const newSession = await createNewSession();
            setSession(newSession);
          }
          setIsLoading(false);
        }
      } catch (err) {
        console.error('セッション初期化エラー:', err);
        if (!cancelled) setIsLoading(false);
      }
    }

    void init();
    return () => { cancelled = true; };
  }, [testId, mode, stableParts, createNewSession]);

  // ============================================================
  // 即時フラッシュ（beforeunload / visibilitychange）
  // ============================================================
  useEffect(() => {
    const flush = () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
        debounceTimer.current = null;
      }
      if (sessionRef.current) {
        void putSession(sessionRef.current);
      }
    };

    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') flush();
    };

    window.addEventListener('beforeunload', flush);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.removeEventListener('beforeunload', flush);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  // ============================================================
  // 解答記録（500ms デバウンス保存）
  // ============================================================
  const answer = useCallback(
    (no: number, label: 'A' | 'B' | 'C' | 'D', isCorrect: boolean) => {
      setSession((prev) => {
        if (!prev) return prev;
        const updated: Session = {
          ...prev,
          answers: {
            ...prev.answers,
            [no]: { chosen: label, isCorrect },
          },
        };

        // complete() が直後に呼ばれても最新解答を参照できるよう ref も同期する
        sessionRef.current = updated;

        // デバウンス保存
        if (debounceTimer.current) clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(() => {
          void putSession(updated);
        }, 500);

        return updated;
      });
    },
    [],
  );

  // ============================================================
  // 経過時間更新
  // ============================================================
  const setElapsed = useCallback((seconds: number, part: 5 | 6 | 7) => {
    setSession((prev) => {
      if (!prev) return prev;
      const updated = mode === 'part'
        ? (() => {
            const elapsedByPart = { ...prev.elapsedByPart, [part]: seconds };
            return {
              ...prev,
              elapsedByPart,
              elapsedSeconds: Object.values(elapsedByPart).reduce(
                (sum, value) => sum + (value ?? 0),
                0,
              ),
            };
          })()
        : { ...prev, elapsedSeconds: seconds };
      sessionRef.current = updated;
      return updated;
    });
  }, [mode]);

  // ============================================================
  // 現在パート更新（パート遷移前に永続化）
  // ============================================================
  const setCurrentPart = useCallback(async (part: 5 | 6 | 7) => {
    const current = sessionRef.current;
    if (!current) return;
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
      debounceTimer.current = null;
    }
    const updated: Session = { ...current, currentPart: part };
    sessionRef.current = updated;
    setSession(updated);
    await putSession(updated);
  }, []);

  // ============================================================
  // セッション完了
  // ============================================================
  const complete = useCallback(async (grade: SessionGradeResult) => {
    const current = sessionRef.current;
    if (!current) return;

    const completedAt = new Date().toISOString();
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
      debounceTimer.current = null;
    }
    const completedSession: Session = {
      ...current,
      completedAt,
      status: 'completed',
    };

    // DB上の古いセッションを読み直さず、最新解答を含むスナップショットを保存する
    await putSession(completedSession);

    // 採点結果を HistoryEntry に変換して保存
    const historyEntry = toHistoryStats(grade, current, completedAt);
    await putHistory(historyEntry);

    sessionRef.current = completedSession;
    setSession(completedSession);
  }, []);

  // ============================================================
  // リセット（既存 in_progress セッションを削除してから新規作成）
  // ============================================================
  const reset = useCallback(async () => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
      debounceTimer.current = null;
    }
    // 既存の in_progress セッションをすべて削除
    const current = sessionRef.current;
    if (current && current.status === 'in_progress') {
      await deleteSession(current.sessionId);
    }
    const newSession = await createNewSession();
    sessionRef.current = newSession;
    setSession(newSession);
  }, [createNewSession]);

  const getSnapshot = useCallback(() => sessionRef.current, []);

  return {
    session,
    isLoading,
    answer,
    setElapsed,
    setCurrentPart,
    complete,
    reset,
    getSnapshot,
  };
}
