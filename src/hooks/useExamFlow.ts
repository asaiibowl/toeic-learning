'use client';

/**
 * パート間の遷移・共有タイマー・最終採点をまとめるフック。
 * 各パート画面が個別にセッションを完了してしまわないよう、進行制御を一元化する。
 */

import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { fetchPartData } from '@/lib/data/loader';
import { FULL_TIME_SECONDS, PART_TIME_SECONDS } from '@/lib/constants';
import { gradeSession } from '@/lib/scoring/calculator';
import { useSession } from '@/hooks/useSession';
import { useTimer } from '@/hooks/useTimer';
import type { ExamMode } from '@/lib/storage/idb';
import type { Part5Data, Part6Data, Part7Data } from '@/types/question';

type PartNumber = 5 | 6 | 7;

interface UseExamFlowOptions {
  testId: string;
  mode: ExamMode;
  parts: PartNumber[];
  part: PartNumber;
  restart?: boolean;
}

function timerStorageKey(
  testId: string,
  mode: ExamMode,
  parts: PartNumber[],
  part: PartNumber,
): string | undefined {
  if (mode === 'practice') return undefined;
  const scope = `${testId}-${mode}-${parts.join('-')}`;
  return mode === 'full' ? `timer-${scope}` : `timer-${scope}-part${part}`;
}

function examHref(
  testId: string,
  mode: ExamMode,
  parts: PartNumber[],
  part: PartNumber,
): string {
  const params = new URLSearchParams({ mode, parts: parts.join(',') });
  return `/test/${testId}/part/${part}/?${params.toString()}`;
}

async function loadParts(
  testId: string,
  parts: PartNumber[],
): Promise<Array<Part5Data | Part6Data | Part7Data>> {
  return Promise.all(
    parts.map((part) => {
      if (part === 5) return fetchPartData(testId, 5);
      if (part === 6) return fetchPartData(testId, 6);
      return fetchPartData(testId, 7);
    }),
  );
}

export function useExamFlow({
  testId,
  mode,
  parts,
  part,
  restart = false,
}: UseExamFlowOptions) {
  const router = useRouter();
  const partsKey = [...parts].sort((a, b) => a - b).join(',');
  const stableParts = useMemo(
    () => partsKey.split(',').filter(Boolean).map(Number) as PartNumber[],
    [partsKey],
  );
  const {
    session,
    isLoading: sessionLoading,
    answer,
    setElapsed,
    setCurrentPart,
    complete,
    reset: resetSession,
    getSnapshot,
  } = useSession({ testId, mode, parts: stableParts });
  const expireHandlerRef = useRef<() => void>(() => undefined);
  const isFinishingRef = useRef(false);
  const hasResetRef = useRef(false);

  const totalSeconds = mode === 'full'
    ? FULL_TIME_SECONDS
    : mode === 'part'
      ? PART_TIME_SECONDS[part]
      : 24 * 60 * 60;
  const storageKey = timerStorageKey(testId, mode, stableParts, part);

  const {
    remaining,
    elapsed,
    clearPersisted,
    reset: resetTimer,
  } = useTimer({
    totalSeconds,
    autoStart: mode !== 'practice',
    storageKey,
    onExpire: () => expireHandlerRef.current(),
  });

  useEffect(() => {
    if (mode !== 'practice') {
      setElapsed(elapsed, part);
    }
  }, [elapsed, mode, part, setElapsed]);

  useEffect(() => {
    if (!restart || hasResetRef.current || sessionLoading) return;
    hasResetRef.current = true;

    for (const selectedPart of stableParts) {
      const key = timerStorageKey(testId, mode, stableParts, selectedPart);
      if (key) localStorage.removeItem(key);
    }
    resetTimer();
    void resetSession();
  }, [mode, resetSession, resetTimer, restart, sessionLoading, stableParts, testId]);

  const finish = useCallback(async (forceComplete: boolean) => {
    if (isFinishingRef.current) return;
    isFinishingRef.current = true;

    try {
      const currentIndex = stableParts.indexOf(part);
      const nextPart = !forceComplete && currentIndex >= 0
        ? stableParts[currentIndex + 1]
        : undefined;

      if (nextPart) {
        if (mode === 'part') clearPersisted();
        await setCurrentPart(nextPart);
        router.push(examHref(testId, mode, stableParts, nextPart));
        return;
      }

      clearPersisted();
      const snapshot = getSnapshot();
      if (!snapshot) throw new Error('セッションを読み込めませんでした');
      const partsData = await loadParts(testId, stableParts);
      const grade = gradeSession(partsData, snapshot.answers);
      await complete(grade);
      router.push(`/test/${testId}/result/`);
    } catch (error) {
      isFinishingRef.current = false;
      throw error;
    }
  }, [clearPersisted, complete, getSnapshot, mode, part, router, setCurrentPart, stableParts, testId]);

  const finishPart = useCallback(() => finish(false), [finish]);

  useEffect(() => {
    expireHandlerRef.current = () => {
      // 通しモードは75分終了時点で即採点。パート別は次パートへ進む。
      void finish(mode === 'full');
    };
  }, [finish, mode]);

  return {
    session,
    sessionLoading,
    answer,
    remaining,
    finishPart,
    isLastPart: stableParts[stableParts.length - 1] === part,
  };
}
