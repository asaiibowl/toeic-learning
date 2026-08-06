/**
 * サーバーサイド専用 データユーティリティ
 *
 * generateStaticParams 用のヘルパ関数群。
 * fs モジュールを使用するため、クライアントコンポーネントから import しないこと。
 */

import * as fs from 'fs';
import * as path from 'path';
import { TestIndexSchema } from '@/schemas/question.schema';

/** public/data/tests/ ディレクトリのパス */
const TESTS_DIR = path.join(process.cwd(), 'public', 'data', 'tests');
const INDEX_FILE = path.join(process.cwd(), 'public', 'data', 'index.json');

/**
 * テスト ID の一覧を返す（generateStaticParams 用）
 * ディレクトリが存在しない場合は空配列を返す
 */
export function listTestIds(): string[] {
  if (!fs.existsSync(TESTS_DIR) || !fs.existsSync(INDEX_FILE)) {
    return [];
  }
  const parsed = TestIndexSchema.safeParse(
    JSON.parse(fs.readFileSync(INDEX_FILE, 'utf8')) as unknown,
  );
  if (!parsed.success) {
    throw new Error(`public/data/index.json が不正です: ${parsed.error.message}`);
  }
  return parsed.data.tests
    .map((test) => test.testId)
    .filter((testId) => fs.existsSync(path.join(TESTS_DIR, testId)));
}
