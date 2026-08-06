/**
 * クライアントサイド データローダ
 *
 * fetch を使って public/data/ 以下の JSON を取得します。
 * basePath は NEXT_PUBLIC_BASE_PATH 環境変数で制御します（ハードコード禁止）。
 */

import type { TestIndex, Part5Data, Part6Data, Part7Data } from '@/types/question';

/** GitHub Pages のサブパスに対応するベースパス */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/**
 * 汎用 JSON フェッチャー
 * @param path - '/data/...' 形式のパス（先頭スラッシュあり）
 */
export async function fetchJson<T>(path: string): Promise<T> {
  const url = `${BASE}${path}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`データの取得に失敗しました: ${url} (${res.status} ${res.statusText})`);
  }
  return res.json() as Promise<T>;
}

/**
 * テストセット一覧（index.json）を取得する
 */
export async function fetchTestIndex(): Promise<TestIndex> {
  return fetchJson<TestIndex>('/data/index.json');
}

/**
 * 特定テストセットの Part データを取得する
 * @param testId - テストセット ID
 * @param part - パート番号（5, 6, 7 のいずれか）
 */
export async function fetchPartData(
  testId: string,
  part: 5,
): Promise<Part5Data>;
export async function fetchPartData(
  testId: string,
  part: 6,
): Promise<Part6Data>;
export async function fetchPartData(
  testId: string,
  part: 7,
): Promise<Part7Data>;
export async function fetchPartData(
  testId: string,
  part: 5 | 6 | 7,
): Promise<Part5Data | Part6Data | Part7Data> {
  return fetchJson(`/data/tests/${testId}/part${part}.json`);
}
