/**
 * オリジナル問題「テストセット02」のメタデータ・Part5・Part6 を生成する。
 * 公式問題の転載はせず、業務場面を題材に独自作成した問題のみを出力する。
 *
 * 実行: npx tsx scripts/generate-test-02-base.ts
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import {
  Part5DataSchema,
  Part6DataSchema,
  TestIndexSchema,
  TestMetaSchema,
} from '../src/schemas/question.schema';
import { part5Questions } from './test-02/part5-seeds';
import { part6Passages } from './test-02/part6-seeds';

const TEST_ID = 'test-02';
const DATA_ROOT = path.join(process.cwd(), 'public', 'data');
const TEST_DIR = path.join(DATA_ROOT, 'tests', TEST_ID);

const part5Data = Part5DataSchema.parse({ testId: TEST_ID, part: 5, questions: part5Questions });
const part6Data = Part6DataSchema.parse({ testId: TEST_ID, part: 6, passages: part6Passages });

const meta = TestMetaSchema.parse({
  testId: TEST_ID,
  title: 'テストセット02（75分・100問）',
  description:
    'TOEIC L&R Readingの現行公式構成に準拠したオリジナル100問セット（やや難・730〜860点帯）。Part 5: 30問、Part 6: 16問、Part 7: 単一文書29問・複数文書25問。',
  createdAt: '2026-08-07T10:00:00+09:00',
  tags: ['full-test', '75-minutes', 'original', 'advanced'],
  completeness: { part5: 30, part6: 16, part7: 54 },
});

fs.mkdirSync(TEST_DIR, { recursive: true });
fs.writeFileSync(path.join(TEST_DIR, 'meta.json'), `${JSON.stringify(meta, null, 2)}\n`, 'utf8');
fs.writeFileSync(path.join(TEST_DIR, 'part5.json'), `${JSON.stringify(part5Data, null, 2)}\n`, 'utf8');
fs.writeFileSync(path.join(TEST_DIR, 'part6.json'), `${JSON.stringify(part6Data, null, 2)}\n`, 'utf8');

// index.json は新しいセットを先頭に置く（一覧では新着順に並ぶ）
const indexPath = path.join(DATA_ROOT, 'index.json');
const index = TestIndexSchema.parse(JSON.parse(fs.readFileSync(indexPath, 'utf8')) as unknown);
const tests = [meta, ...index.tests.filter((test) => test.testId !== TEST_ID)];
fs.writeFileSync(indexPath, `${JSON.stringify({ version: 1, tests }, null, 2)}\n`, 'utf8');

console.log(
  `Generated ${TEST_ID}: Part5=${part5Data.questions.length}, Part6=${part6Data.passages.reduce(
    (sum, passage) => sum + passage.questions.length,
    0,
  )}`,
);
