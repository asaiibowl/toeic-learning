/**
 * IndexedDB 永続化レイヤー
 *
 * DB名: toeic-learning, version: 1
 * SSR/静的エクスポート対策: typeof indexedDB === 'undefined' の環境でクラッシュしない
 * （DB オープンは呼び出し時に遅延実行）
 */

import { openDB, type IDBPDatabase } from 'idb';

// ============================================================
// 型定義
// ============================================================

export type ExamMode = 'full' | 'part' | 'practice';
// full = リーディング通し75分 / part = パート別時間 / practice = タイマーなし・即時解説

export type AnswerRecord = {
  chosen: 'A' | 'B' | 'C' | 'D';
  isCorrect: boolean;
  timeSpentSeconds?: number;
};

export type Session = {
  sessionId: string;       // `${testId}-${startedAt のエポックms}`
  testId: string;
  mode: ExamMode;
  parts: (5 | 6 | 7)[];   // このセッションで解く対象パート
  currentPart?: 5 | 6 | 7; // 再開時に戻るパート（旧データでは省略される）
  startedAt: string;       // ISO8601
  completedAt?: string;
  status: 'in_progress' | 'completed';
  elapsedSeconds: number;
  /** パート別モードの経過時間。通しモードは elapsedSeconds のみを使う */
  elapsedByPart?: Partial<Record<5 | 6 | 7, number>>;
  answers: Record<number, AnswerRecord>;  // key = 問番号
};

export type HistoryEntry = {
  sessionId: string;
  testId: string;
  completedAt: string;
  mode: ExamMode;
  elapsedSeconds: number;
  partStats: Partial<Record<5 | 6 | 7, { answered: number; correct: number; total: number }>>;
  typeStats: Record<string, { correct: number; total: number }>;
  wrongQuestions: number[];
};

// ============================================================
// DB スキーマ型
// ============================================================

interface ToeicDB {
  sessions: {
    key: string;
    value: Session;
    indexes: {
      testId: string;
      status: string;
    };
  };
  history: {
    key: string;
    value: HistoryEntry;
    indexes: {
      completedAt: string;
      testId: string;
    };
  };
}

// ============================================================
// DB 接続（遅延初期化）
// ============================================================

let dbPromise: Promise<IDBPDatabase<ToeicDB>> | null = null;

export function getDb(): Promise<IDBPDatabase<ToeicDB>> {
  // SSR/静的エクスポート環境対策: indexedDB が存在しない場合は呼び出し時にエラー
  if (typeof indexedDB === 'undefined') {
    return Promise.reject(new Error('IndexedDB は利用できません（サーバー環境）'));
  }
  if (!dbPromise) {
    dbPromise = openDB<ToeicDB>('toeic-learning', 1, {
      upgrade(db) {
        // sessions ストア
        const sessionsStore = db.createObjectStore('sessions', { keyPath: 'sessionId' });
        sessionsStore.createIndex('testId', 'testId');
        sessionsStore.createIndex('status', 'status');

        // history ストア
        const historyStore = db.createObjectStore('history', { keyPath: 'sessionId' });
        historyStore.createIndex('completedAt', 'completedAt');
        historyStore.createIndex('testId', 'testId');
      },
    });
  }
  return dbPromise;
}

// ============================================================
// 公開 API
// ============================================================

/** セッションを保存（upsert） */
export async function putSession(session: Session): Promise<void> {
  const db = await getDb();
  await db.put('sessions', session);
}

/** セッションを取得 */
export async function getSession(sessionId: string): Promise<Session | undefined> {
  const db = await getDb();
  return db.get('sessions', sessionId);
}

/** 指定 testId の進行中セッションを取得（最新1件: startedAt 降順で最初の in_progress） */
export async function findInProgressSession(
  testId: string,
  mode?: ExamMode,
  parts?: (5 | 6 | 7)[],
): Promise<Session | undefined> {
  const db = await getDb();
  const all = await db.getAllFromIndex('sessions', 'testId', testId);
  const partsKey = parts ? [...parts].sort((a, b) => a - b).join(',') : null;
  // startedAt の降順にソートして最初の in_progress を返す
  const sorted = all
    .filter((s) => {
      if (s.status !== 'in_progress') return false;
      if (mode && s.mode !== mode) return false;
      if (partsKey !== null) {
        const sessionPartsKey = [...s.parts].sort((a, b) => a - b).join(',');
        if (sessionPartsKey !== partsKey) return false;
      }
      return true;
    })
    .sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime());
  return sorted[0];
}

/** 全セッション一覧を取得 */
export async function listSessions(): Promise<Session[]> {
  const db = await getDb();
  return db.getAll('sessions');
}

/** セッションを完了状態に更新 */
export async function completeSession(
  sessionId: string,
  completedAt: string,
  elapsedSeconds: number,
): Promise<void> {
  const db = await getDb();
  const session = await db.get('sessions', sessionId);
  if (!session) throw new Error(`セッションが見つかりません: ${sessionId}`);
  await db.put('sessions', {
    ...session,
    completedAt,
    elapsedSeconds,
    status: 'completed',
  });
}

/** 履歴エントリを保存 */
export async function putHistory(entry: HistoryEntry): Promise<void> {
  const db = await getDb();
  await db.put('history', entry);
}

/** 履歴一覧を取得（新しい順） */
export async function listHistory(): Promise<HistoryEntry[]> {
  const db = await getDb();
  const all = await db.getAllFromIndex('history', 'completedAt');
  return all.reverse();
}

/**
 * 履歴1件と、同じ sessionId の完了セッションを削除する。
 * 同じIDの進行中セッションが存在しても削除しない。
 */
export async function deleteHistoryWithCompletedSession(
  sessionId: string,
): Promise<{ historyDeleted: boolean; sessionDeleted: boolean }> {
  const db = await getDb();
  const transaction = db.transaction(['history', 'sessions'], 'readwrite');
  const historyStore = transaction.objectStore('history');
  const sessionsStore = transaction.objectStore('sessions');

  const [historyEntry, session] = await Promise.all([
    historyStore.get(sessionId),
    sessionsStore.get(sessionId),
  ]);

  const operations: Promise<unknown>[] = [];
  if (historyEntry) operations.push(historyStore.delete(sessionId));
  if (session?.status === 'completed') operations.push(sessionsStore.delete(sessionId));
  await Promise.all(operations);
  await transaction.done;

  return {
    historyDeleted: historyEntry !== undefined,
    sessionDeleted: session?.status === 'completed',
  };
}

/**
 * 全履歴と全完了セッションを削除する。
 * 進行中セッションは中断復帰に必要なため保持する。
 */
export async function deleteAllHistoryWithCompletedSessions(): Promise<{
  historyDeleted: number;
  sessionsDeleted: number;
}> {
  const db = await getDb();
  const transaction = db.transaction(['history', 'sessions'], 'readwrite');
  const historyStore = transaction.objectStore('history');
  const sessionsStore = transaction.objectStore('sessions');

  const historyCountPromise = historyStore.count();
  const completedKeysPromise = sessionsStore.index('status').getAllKeys('completed');
  const clearHistoryPromise = historyStore.clear();
  const [historyCount, completedKeys] = await Promise.all([
    historyCountPromise,
    completedKeysPromise,
  ]);

  await Promise.all([
    clearHistoryPromise,
    ...completedKeys.map((sessionId) => sessionsStore.delete(sessionId)),
  ]);
  await transaction.done;

  return {
    historyDeleted: historyCount,
    sessionsDeleted: completedKeys.length,
  };
}

/** セッションを削除 */
export async function deleteSession(sessionId: string): Promise<void> {
  const db = await getDb();
  await db.delete('sessions', sessionId);
}
