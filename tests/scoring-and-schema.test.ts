import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';
import {
  ChoicesArraySchema,
  Part5DataSchema,
  Part6DataSchema,
  Part7DataSchema,
} from '../src/schemas/question.schema';
import {
  estimateReadingScore,
  gradeSession,
  toHistoryStats,
} from '../src/lib/scoring/calculator';
import type { AnswerRecord, Session } from '../src/lib/storage/idb';

function readSample(fileName: string): unknown {
  const path = join(process.cwd(), 'public', 'data', 'tests', 'sample-01', fileName);
  return JSON.parse(readFileSync(path, 'utf8')) as unknown;
}

test('選択肢ラベルは A〜D が1件ずつ必要', () => {
  const choices = ['A', 'A', 'C', 'D'].map((label, index) => ({
    label,
    text: `choice-${index}`,
    explanation: `explanation-${index}`,
    isCorrect: index === 0,
  }));
  assert.equal(ChoicesArraySchema.safeParse(choices).success, false);
});

test('サンプル全パートをまとめて採点し履歴へ変換できる', () => {
  const part5 = Part5DataSchema.parse(readSample('part5.json'));
  const part6 = Part6DataSchema.parse(readSample('part6.json'));
  const part7 = Part7DataSchema.parse(readSample('part7.json'));
  const selectedQuestions = [
    part5.questions[0],
    part6.passages[0].questions[0],
    part7.sets[0].questions[0],
  ];
  const answers: Record<number, AnswerRecord> = {};
  for (const question of selectedQuestions) {
    const correct = question.choices.find((choice) => choice.isCorrect);
    assert.ok(correct);
    answers[question.no] = { chosen: correct.label, isCorrect: true };
  }

  const grade = gradeSession([part5, part6, part7], answers);
  assert.equal(grade.overall.total, 16);
  assert.equal(grade.overall.correct, 3);
  assert.equal(grade.byPart[5]?.total, 5);
  assert.equal(grade.byPart[6]?.total, 8);
  assert.equal(grade.byPart[7]?.total, 3);
  assert.equal(grade.overall.wrongQuestions.length, 13);

  const session: Session = {
    sessionId: 'sample-01-test',
    testId: 'sample-01',
    mode: 'full',
    parts: [5, 6, 7],
    currentPart: 7,
    startedAt: '2026-01-01T00:00:00.000Z',
    status: 'in_progress',
    elapsedSeconds: 120,
    answers,
  };
  const history = toHistoryStats(grade, session, '2026-01-01T00:02:00.000Z');
  assert.equal(history.partStats[5]?.answered, 1);
  assert.equal(history.partStats[6]?.answered, 1);
  assert.equal(history.partStats[7]?.answered, 1);
});

test('推定Readingスコアは範囲内の5点刻み', () => {
  assert.equal(estimateReadingScore(0, 100), 5);
  assert.equal(estimateReadingScore(100, 100), 495);
  const middle = estimateReadingScore(50, 100);
  assert.equal(middle % 5, 0);
  assert.ok(middle >= 5 && middle <= 495);
});

// 満数（100問）セットは全件が同じ公式構成を満たすこと
for (const testId of ['test-01', 'test-02']) {
  test(`${testId} は公式Reading構成の100問を収録する`, () => {
    const testRoot = join(process.cwd(), 'public', 'data', 'tests', testId);
    const part5 = Part5DataSchema.parse(
      JSON.parse(readFileSync(join(testRoot, 'part5.json'), 'utf8')) as unknown,
    );
    const part6 = Part6DataSchema.parse(
      JSON.parse(readFileSync(join(testRoot, 'part6.json'), 'utf8')) as unknown,
    );
    const part7 = Part7DataSchema.parse(
      JSON.parse(readFileSync(join(testRoot, 'part7.json'), 'utf8')) as unknown,
    );

    const singleSets = part7.sets.filter((set) => set.setType === 'single');
    const multipleSets = part7.sets.filter((set) => set.setType !== 'single');
    assert.equal(part5.questions.length, 30);
    assert.equal(part6.passages.length, 4);
    assert.equal(part6.passages.reduce((sum, passage) => sum + passage.questions.length, 0), 16);
    assert.equal(singleSets.length, 10);
    assert.equal(singleSets.reduce((sum, set) => sum + set.questions.length, 0), 29);
    assert.equal(multipleSets.reduce((sum, set) => sum + set.questions.length, 0), 25);

    const answers: Record<number, AnswerRecord> = {};
    const allQuestions = [
      ...part5.questions,
      ...part6.passages.flatMap((passage) => passage.questions),
      ...part7.sets.flatMap((set) => set.questions),
    ];
    for (const question of allQuestions) {
      const correct = question.choices.find((choice) => choice.isCorrect);
      assert.ok(correct, `No.${question.no} に正解が必要です`);
      answers[question.no] = { chosen: correct.label, isCorrect: true };
    }
    const grade = gradeSession([part5, part6, part7], answers);
    assert.equal(grade.overall.total, 100);
    assert.equal(grade.overall.correct, 100);
    assert.equal(grade.estimatedScore, 495);
  });
}
