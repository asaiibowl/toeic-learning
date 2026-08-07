/**
 * テストセット02 Part 7（No.147〜200）生成スクリプト。
 * 収録文・設問・選択肢はすべて本プロジェクト用のオリジナル。
 *
 * 実行: npx tsx scripts/generate-test-02-part7.ts
 */

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { Part7DataSchema } from '../src/schemas/question.schema';
import { singleSets } from './test-02/part7-single';
import { multiSets } from './test-02/part7-multi';

async function main(): Promise<void> {
  const parsed = Part7DataSchema.parse({
    testId: 'test-02',
    part: 7,
    sets: [...singleSets, ...multiSets],
  });

  const outputPath = path.resolve(process.cwd(), 'public', 'data', 'tests', 'test-02', 'part7.json');
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(parsed, null, 2)}\n`, 'utf8');
  console.log(`Generated ${outputPath}`);
}

void main();
