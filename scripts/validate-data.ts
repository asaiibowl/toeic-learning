/**
 * データ検証 CLI — npm run validate-data で実行（tsx 使用）
 *
 * public/data/index.json → 各テストセットの part5/6/7.json を Zod でパースし、
 * エラー（exit 1）と警告（exit 0）をコンソールに出力する。
 */

import * as fs from 'fs';
import * as path from 'path';
import { ZodError } from 'zod';
import {
  TestIndexSchema,
  TestMetaSchema,
  Part5DataSchema,
  Part6DataSchema,
  Part7DataSchema,
  type Part5Data,
  type Part6Data,
  type Part7Data,
} from '../src/schemas/question.schema';

// ============================================================
// ユーティリティ
// ============================================================

const DATA_DIR = path.resolve(process.cwd(), 'public', 'data');
const TESTS_DIR = path.join(DATA_DIR, 'tests');

let errorCount = 0;
let warningCount = 0;

/** エラーメッセージ出力（exit 1 対象） */
function reportError(message: string): void {
  console.error(`[ERROR] ${message}`);
  errorCount++;
}

/** 警告メッセージ出力（exit 0 のまま） */
function reportWarning(message: string): void {
  console.warn(`[WARN]  ${message}`);
  warningCount++;
}

/** JSON ファイルを読み込んで parse する（ファイルが存在しない場合は null） */
function readJson(filePath: string): unknown | null {
  if (!fs.existsSync(filePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch (e) {
    reportError(`${filePath} の JSON パースに失敗しました: ${String(e)}`);
    return null;
  }
}

/** ZodError をファイル・パス付きで全件展開する */
function reportZodError(label: string, err: ZodError): void {
  for (const issue of err.issues) {
    const issuePath = issue.path.length > 0 ? issue.path.join('.') : '(root)';
    reportError(`${label} > ${issuePath}: ${issue.message}`);
  }
}

// ============================================================
// index.json の検証
// ============================================================

const indexPath = path.join(DATA_DIR, 'index.json');
if (!fs.existsSync(indexPath)) {
  reportError(`index.json が存在しません: ${indexPath}`);
  console.error(`\n合計: ${errorCount} 件のエラー、${warningCount} 件の警告`);
  process.exit(1);
}

const rawIndex = readJson(indexPath);
if (rawIndex === null) {
  console.error(`\n合計: ${errorCount} 件のエラー、${warningCount} 件の警告`);
  process.exit(1);
}

const indexResult = TestIndexSchema.safeParse(rawIndex);
if (!indexResult.success) {
  reportZodError('index.json', indexResult.error);
  console.error(`\n合計: ${errorCount} 件のエラー、${warningCount} 件の警告`);
  process.exit(1);
}

const testIndex = indexResult.data;

// ============================================================
// 孤児ディレクトリのチェック
// ============================================================

const registeredIds = new Set(testIndex.tests.map((t) => t.testId));

if (fs.existsSync(TESTS_DIR)) {
  const existingDirs = fs
    .readdirSync(TESTS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  for (const dir of existingDirs) {
    if (!registeredIds.has(dir)) {
      reportError(`tests/${dir} が index.json に登録されていない孤児ディレクトリです`);
    }
  }
}

// ============================================================
// 各テストセットの検証
// ============================================================

for (const meta of testIndex.tests) {
  const testDir = path.join(TESTS_DIR, meta.testId);
  const prefix = meta.testId;

  // ディレクトリ存在チェック
  if (!fs.existsSync(testDir)) {
    reportError(`${prefix}: ディレクトリが存在しません (${testDir})`);
    continue;
  }

  // meta.json の検証
  const metaPath = path.join(testDir, 'meta.json');
  const rawMeta = readJson(metaPath);
  if (rawMeta !== null) {
    const metaResult = TestMetaSchema.safeParse(rawMeta);
    if (!metaResult.success) {
      reportZodError(`${prefix}/meta.json`, metaResult.error);
    } else if (metaResult.data.testId !== meta.testId) {
      reportError(
        `${prefix}/meta.json > testId: index.json の "${meta.testId}" と一致しません`,
      );
    }
  } else {
    reportError(`${prefix}/meta.json が存在しません`);
  }

  // ----------------------------------------------------------
  // Part 5 の検証
  // ----------------------------------------------------------
  const part5Path = path.join(testDir, 'part5.json');
  if (fs.existsSync(part5Path)) {
    const raw = readJson(part5Path);
    if (raw !== null) {
      const result = Part5DataSchema.safeParse(raw);
      if (!result.success) {
        reportZodError(`${prefix}/part5.json`, result.error);
      } else {
        if (result.data.testId !== meta.testId) {
          reportError(`${prefix}/part5.json > testId: index.json の "${meta.testId}" と一致しません`);
        }
        validatePart5(prefix, result.data, meta.completeness.part5);
      }
    }
  } else if (meta.completeness.part5 > 0) {
    reportError(`${prefix}/part5.json が存在しませんが completeness.part5=${meta.completeness.part5} です`);
  }

  // ----------------------------------------------------------
  // Part 6 の検証
  // ----------------------------------------------------------
  const part6Path = path.join(testDir, 'part6.json');
  if (fs.existsSync(part6Path)) {
    const raw = readJson(part6Path);
    if (raw !== null) {
      const result = Part6DataSchema.safeParse(raw);
      if (!result.success) {
        reportZodError(`${prefix}/part6.json`, result.error);
      } else {
        if (result.data.testId !== meta.testId) {
          reportError(`${prefix}/part6.json > testId: index.json の "${meta.testId}" と一致しません`);
        }
        validatePart6(prefix, result.data, meta.completeness.part6);
      }
    }
  } else if (meta.completeness.part6 > 0) {
    reportError(`${prefix}/part6.json が存在しませんが completeness.part6=${meta.completeness.part6} です`);
  }

  // ----------------------------------------------------------
  // Part 7 の検証
  // ----------------------------------------------------------
  const part7Path = path.join(testDir, 'part7.json');
  if (fs.existsSync(part7Path)) {
    const raw = readJson(part7Path);
    if (raw !== null) {
      const result = Part7DataSchema.safeParse(raw);
      if (!result.success) {
        reportZodError(`${prefix}/part7.json`, result.error);
      } else {
        if (result.data.testId !== meta.testId) {
          reportError(`${prefix}/part7.json > testId: index.json の "${meta.testId}" と一致しません`);
        }
        validatePart7(prefix, result.data, meta.completeness.part7);
      }
    }
  } else if (meta.completeness.part7 > 0) {
    reportError(`${prefix}/part7.json が存在しませんが completeness.part7=${meta.completeness.part7} です`);
  }
}

// ============================================================
// Part5 詳細検証
// ============================================================

function validateContinuousNumbers(label: string, numbers: number[]): void {
  const sorted = [...numbers].sort((a, b) => a - b);
  for (let index = 1; index < sorted.length; index++) {
    if (sorted[index] !== sorted[index - 1] + 1) {
      reportError(
        `${label}: 問番号が連続していません（${sorted[index - 1]} の次が ${sorted[index]} です）`,
      );
      return;
    }
  }
}

function validatePart5(prefix: string, data: Part5Data, expectedCount: number): void {
  const label = `${prefix}/part5.json`;

  // 問番号の重複・範囲外
  const seenNos = new Set<number>();
  for (const q of data.questions) {
    if (seenNos.has(q.no)) {
      reportError(`${label} > questions: 問番号 ${q.no} が重複しています`);
    }
    seenNos.add(q.no);
    if (q.no < 101 || q.no > 130) {
      reportError(`${label} > questions: 問番号 ${q.no} が範囲外です（101〜130）`);
    }
    if (!q.sentence.includes('______')) {
      reportError(`${label} > questions[no=${q.no}].sentence: 空所 "______" がありません`);
    }
  }
  validateContinuousNumbers(label, [...seenNos]);

  // completeness との整合
  const actualCount = data.questions.length;
  if (actualCount !== expectedCount) {
    reportError(
      `${label}: meta.completeness.part5=${expectedCount} ですが実際の問数は ${actualCount} です`,
    );
  }

  // 満数未満の警告
  if (actualCount < 30) {
    reportWarning(`${label}: 問数が ${actualCount}/30 問です（満数未達）`);
  }
}

// ============================================================
// Part6 詳細検証
// ============================================================

function validatePart6(prefix: string, data: Part6Data, expectedCount: number): void {
  const label = `${prefix}/part6.json`;

  let totalQuestions = 0;
  const seenNos = new Set<number>();

  for (const passage of data.passages) {
    const passageLabel = `${label} > passageNo=${passage.passageNo}`;

    for (const q of passage.questions) {
      // 問番号の重複・範囲外
      if (seenNos.has(q.no)) {
        reportError(`${passageLabel} > questions: 問番号 ${q.no} が重複しています`);
      }
      seenNos.add(q.no);
      if (q.no < 131 || q.no > 146) {
        reportError(`${passageLabel} > questions: 問番号 ${q.no} が範囲外です（131〜146）`);
      }
      const passageText = passage.paragraphs.map((paragraph) => paragraph.en).join('\n');
      if (!passageText.includes(`______[${q.no}]`)) {
        reportError(`${passageLabel} > questions[no=${q.no}]: 本文に空所 "______[${q.no}]" がありません`);
      }

      // evidence の snippetEn が本文に含まれているか検証
      if (q.evidence) {
        const para = passage.paragraphs[q.evidence.paragraphIndex];
        if (!para) {
          reportError(
            `${passageLabel} > questions[no=${q.no}].evidence: paragraphIndex=${q.evidence.paragraphIndex} が範囲外です`,
          );
        } else if (!para.en.includes(q.evidence.snippetEn)) {
          reportError(
            `${passageLabel} > questions[no=${q.no}].evidence.snippetEn: 本文に含まれていません → "${q.evidence.snippetEn}"`,
          );
        }
      }

      totalQuestions++;
    }

    // 問題が4問揃っている文書のみ: insertion が1問あることをチェック
    if (passage.questions.length === 4) {
      const insertionCount = passage.questions.filter((q) => q.type === 'insertion').length;
      if (insertionCount !== 1) {
        reportError(
          `${passageLabel}: 4問揃っている文書には insertion が1問必要ですが ${insertionCount} 問です`,
        );
      }
    }
  }
  validateContinuousNumbers(label, [...seenNos]);

  // completeness との整合
  if (totalQuestions !== expectedCount) {
    reportError(
      `${label}: meta.completeness.part6=${expectedCount} ですが実際の問数は ${totalQuestions} です`,
    );
  }

  // 満数未満の警告
  if (totalQuestions < 16) {
    reportWarning(`${label}: 問数が ${totalQuestions}/16 問です（満数未達）`);
  }
  if (totalQuestions === 16 && data.passages.length !== 4) {
    reportError(`${label}: 満数セットのPart6は4文書必要ですが ${data.passages.length} 文書です`);
  }
}

// ============================================================
// Part7 詳細検証
// ============================================================

function validatePart7(prefix: string, data: Part7Data, expectedCount: number): void {
  const label = `${prefix}/part7.json`;

  let totalQuestions = 0;
  const seenNos = new Set<number>();

  let singleCount = 0;
  let doubleCount = 0;
  let tripleCount = 0;
  let singleQuestions = 0;
  let multipleQuestions = 0;

  for (const set of data.sets) {
    const setLabel = `${label} > sets[${data.sets.indexOf(set)}](${set.setType})`;

    if (set.setType === 'single') singleCount++;
    if (set.setType === 'double') doubleCount++;
    if (set.setType === 'triple') tripleCount++;
    if (set.setType === 'single') singleQuestions += set.questions.length;
    else multipleQuestions += set.questions.length;

    for (const q of set.questions) {
      // 問番号の重複・範囲外
      if (seenNos.has(q.no)) {
        reportError(`${setLabel} > questions: 問番号 ${q.no} が重複しています`);
      }
      seenNos.add(q.no);
      if (q.no < 147 || q.no > 200) {
        reportError(`${setLabel} > questions: 問番号 ${q.no} が範囲外です（147〜200）`);
      }

      // evidence の snippetEn が対応する本文に含まれているか検証
      if (q.evidence) {
        for (const ev of q.evidence) {
          // passageId が指定されている場合は対応するpassageを探す
          const targetPassage = set.passages.find(
            (p) => !ev.passageId || p.passageId === ev.passageId,
          );
          if (!targetPassage) {
            reportError(
              `${setLabel} > questions[no=${q.no}].evidence: passageId="${ev.passageId}" が見つかりません`,
            );
            continue;
          }

          if (targetPassage.paragraphs) {
            const para = targetPassage.paragraphs[ev.paragraphIndex];
            if (!para) {
              reportError(
                `${setLabel} > questions[no=${q.no}].evidence: paragraphIndex=${ev.paragraphIndex} が範囲外です`,
              );
            } else if (!para.en.includes(ev.snippetEn)) {
              reportError(
                `${setLabel} > questions[no=${q.no}].evidence.snippetEn: 本文に含まれていません → "${ev.snippetEn}"`,
              );
            }
          } else if (targetPassage.messages) {
            const message = targetPassage.messages[ev.paragraphIndex];
            if (!message) {
              reportError(
                `${setLabel} > questions[no=${q.no}].evidence: messageIndex=${ev.paragraphIndex} が範囲外です`,
              );
            } else if (!message.bodyEn.includes(ev.snippetEn)) {
              reportError(
                `${setLabel} > questions[no=${q.no}].evidence.snippetEn: messages に含まれていません → "${ev.snippetEn}"`,
              );
            }
          }
        }
      }

      if (q.type === 'insertion') {
        const allPassageText = set.passages
          .flatMap((passage) => [
            ...(passage.paragraphs?.map((paragraph) => paragraph.en) ?? []),
            ...(passage.messages?.map((message) => message.bodyEn) ?? []),
          ])
          .join('\n');
        for (const marker of ['[1]', '[2]', '[3]', '[4]']) {
          if (!allPassageText.includes(marker)) {
            reportError(`${setLabel} > questions[no=${q.no}]: 本文に挿入位置 ${marker} がありません`);
          }
        }
      }

      totalQuestions++;
    }
  }
  validateContinuousNumbers(label, [...seenNos]);

  // completeness との整合
  if (totalQuestions !== expectedCount) {
    reportError(
      `${label}: meta.completeness.part7=${expectedCount} ですが実際の問数は ${totalQuestions} です`,
    );
  }

  // 満数未満の警告
  if (totalQuestions < 54) {
    reportWarning(`${label}: 問数が ${totalQuestions}/54 問です（満数未達）`);
  }

  if (totalQuestions === 54) {
    const noEvidence = data.sets
      .flatMap((set) => set.questions)
      .filter((question) => question.type !== 'insertion' && (!question.evidence || question.evidence.length === 0));
    if (noEvidence.length > 0) {
      reportError(`${label}: 満数セットの非挿入問題には根拠 evidence が必要です（No.${noEvidence.map((question) => question.no).join(', ')}）`);
    }
    if (singleQuestions !== 29 || multipleQuestions !== 25) {
      reportError(
        `${label}: Part7満数セットは単一文書29問・複数文書25問ですが、単一=${singleQuestions}問・複数=${multipleQuestions}問です`,
      );
    }
    if (singleCount !== 10 || doubleCount !== 2 || tripleCount !== 3) {
      reportError(
        `${label}: Part7満数セットは single=10 / double=2 / triple=3 が必要です`,
      );
    }
  }

  // セット構成の警告（公式: single10/double2/triple3）
  if (totalQuestions < 54 && (singleCount !== 10 || doubleCount !== 2 || tripleCount !== 3)) {
    reportWarning(
      `${label}: セット構成が公式と異なります（single=${singleCount}/10, double=${doubleCount}/2, triple=${tripleCount}/3）`,
    );
  }
}

// ============================================================
// 最終サマリ
// ============================================================

console.log('');
console.log(`合計: ${errorCount} 件のエラー、${warningCount} 件の警告`);

if (errorCount > 0) {
  process.exit(1);
}
