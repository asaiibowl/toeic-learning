/**
 * 採点ロジック
 *
 * Part5/6/7 すべてに対応した汎用実装。
 * Part6/7 も同じ関数で扱えるよう、パート番号をキーにした設計。
 */

import type { Part5Data, Part6Data, Part7Data } from '@/types/question';
import type { AnswerRecord, ExamMode, HistoryEntry } from '@/lib/storage/idb';

// ============================================================
// 型定義
// ============================================================

export type GradeResult = {
  /** 正答数 */
  correct: number;
  /** 総問数 */
  total: number;
  /** 正答率（0〜1） */
  accuracy: number;
  /** 誤答した問番号リスト */
  wrongQuestions: number[];
  /** タグ/タイプ別集計 */
  typeStats: Record<string, { correct: number; total: number }>;
};

export type SessionGradeResult = {
  overall: GradeResult;
  /** パート別採点結果 */
  byPart: Partial<Record<5 | 6 | 7, GradeResult>>;
  /** 推定リーディングスコア（あくまで目安） */
  estimatedScore: number;
};

// ============================================================
// Part5 採点
// ============================================================

/** Part5 の採点を行う */
export function gradePart5(
  data: Part5Data,
  answers: Record<number, AnswerRecord>,
): GradeResult {
  const typeStats: Record<string, { correct: number; total: number }> = {};
  const wrongQuestions: number[] = [];
  let correct = 0;

  for (const q of data.questions) {
    const tag = q.tag ?? 'other';
    if (!typeStats[tag]) typeStats[tag] = { correct: 0, total: 0 };
    typeStats[tag].total++;

    const answer = answers[q.no];
    if (answer?.isCorrect) {
      correct++;
      typeStats[tag].correct++;
    } else {
      wrongQuestions.push(q.no);
    }
  }

  const total = data.questions.length;
  return {
    correct,
    total,
    accuracy: total > 0 ? correct / total : 0,
    wrongQuestions,
    typeStats,
  };
}

// ============================================================
// Part6 採点
// ============================================================

/** Part6 の採点を行う */
export function gradePart6(
  data: Part6Data,
  answers: Record<number, AnswerRecord>,
): GradeResult {
  const typeStats: Record<string, { correct: number; total: number }> = {};
  const wrongQuestions: number[] = [];
  let correct = 0;
  let total = 0;

  for (const passage of data.passages) {
    for (const q of passage.questions) {
      const qType = q.type;
      if (!typeStats[qType]) typeStats[qType] = { correct: 0, total: 0 };
      typeStats[qType].total++;
      total++;

      const answer = answers[q.no];
      if (answer?.isCorrect) {
        correct++;
        typeStats[qType].correct++;
      } else {
        wrongQuestions.push(q.no);
      }
    }
  }

  return {
    correct,
    total,
    accuracy: total > 0 ? correct / total : 0,
    wrongQuestions,
    typeStats,
  };
}

// ============================================================
// Part7 採点
// ============================================================

/** Part7 の採点を行う */
export function gradePart7(
  data: Part7Data,
  answers: Record<number, AnswerRecord>,
): GradeResult {
  const typeStats: Record<string, { correct: number; total: number }> = {};
  const wrongQuestions: number[] = [];
  let correct = 0;
  let total = 0;

  for (const set of data.sets) {
    for (const q of set.questions) {
      const qType = q.type;
      if (!typeStats[qType]) typeStats[qType] = { correct: 0, total: 0 };
      typeStats[qType].total++;
      total++;

      const answer = answers[q.no];
      if (answer?.isCorrect) {
        correct++;
        typeStats[qType].correct++;
      } else {
        wrongQuestions.push(q.no);
      }
    }
  }

  return {
    correct,
    total,
    accuracy: total > 0 ? correct / total : 0,
    wrongQuestions,
    typeStats,
  };
}

// ============================================================
// セッション全体の採点
// ============================================================

/**
 * セッション全体の採点
 * @param partsData - 各パートのデータ（解くパートのみ）
 * @param answers - 解答記録
 */
export function gradeSession(
  partsData: Array<Part5Data | Part6Data | Part7Data>,
  answers: Record<number, AnswerRecord>,
): SessionGradeResult {
  const byPart: Partial<Record<5 | 6 | 7, GradeResult>> = {};

  for (const data of partsData) {
    if (data.part === 5) {
      byPart[5] = gradePart5(data as Part5Data, answers);
    } else if (data.part === 6) {
      byPart[6] = gradePart6(data as Part6Data, answers);
    } else if (data.part === 7) {
      byPart[7] = gradePart7(data as Part7Data, answers);
    }
  }

  // 全体集計
  const allResults = Object.values(byPart);
  const totalCorrect = allResults.reduce((sum, r) => sum + r.correct, 0);
  const totalQuestions = allResults.reduce((sum, r) => sum + r.total, 0);
  const allWrong = allResults.flatMap((r) => r.wrongQuestions);
  const mergedTypeStats: Record<string, { correct: number; total: number }> = {};
  for (const r of allResults) {
    for (const [type, stat] of Object.entries(r.typeStats)) {
      if (!mergedTypeStats[type]) mergedTypeStats[type] = { correct: 0, total: 0 };
      mergedTypeStats[type].correct += stat.correct;
      mergedTypeStats[type].total += stat.total;
    }
  }

  const overall: GradeResult = {
    correct: totalCorrect,
    total: totalQuestions,
    accuracy: totalQuestions > 0 ? totalCorrect / totalQuestions : 0,
    wrongQuestions: allWrong.sort((a, b) => a - b),
    typeStats: mergedTypeStats,
  };

  return {
    overall,
    byPart,
    estimatedScore: estimateReadingScore(totalCorrect, totalQuestions),
  };
}

// ============================================================
// HistoryEntry 変換ヘルパ
// ============================================================

/**
 * SessionGradeResult + Session の情報を HistoryEntry の各フィールドに変換する。
 *
 * @param grade - gradeSession() の戻り値
 * @param session - 完了したセッション（answers で answered 数を数える）
 * @param completedAt - 完了日時（ISO8601）
 */
export function toHistoryStats(
  grade: SessionGradeResult,
  session: { sessionId: string; testId: string; mode: ExamMode; elapsedSeconds: number; answers: Record<number, AnswerRecord> },
  completedAt: string,
): HistoryEntry {
  // partStats: パートごとに answered（answers に存在する問数）を計算
  const partStats: HistoryEntry['partStats'] = {};
  for (const [partKeyStr, gradeResult] of Object.entries(grade.byPart)) {
    const partKey = Number(partKeyStr) as 5 | 6 | 7;
    // answered = そのパートの問番号範囲内で answers に存在するもの
    // gradeResult.wrongQuestions と correct から全問番号を逆算するのは難しいので
    // answers 全体から計算する（セッション内には対象パートの問番号しか入らない前提）
    // total から wrongQuestions を引いた数 = 正答、wrongQuestions は誤答（回答済）
    // 未回答は wrongQuestions に含まれるが answers に存在しない
    const answeredInPart = gradeResult.wrongQuestions.filter((no) => no in session.answers).length
      + gradeResult.correct;
    partStats[partKey] = {
      answered: answeredInPart,
      correct: gradeResult.correct,
      total: gradeResult.total,
    };
  }

  return {
    sessionId: session.sessionId,
    testId: session.testId,
    completedAt,
    mode: session.mode,
    elapsedSeconds: session.elapsedSeconds,
    partStats,
    typeStats: grade.overall.typeStats,
    wrongQuestions: grade.overall.wrongQuestions,
  };
}

// ============================================================
// 推定スコア計算
// ============================================================

/**
 * TOEIC Reading 推定スコアを計算する（あくまで目安）
 *
 * 100問満点前提で線形換算（5〜495、5点刻み）。
 * 満数でない場合は正答率から比例換算する。
 *
 * ※ 実際のTOEICスコアは統計的等化法で算出されるため、
 *    この推定は参考値にすぎません。
 */
export function estimateReadingScore(correctCount: number, totalCount: number): number {
  if (totalCount === 0) return 5;

  // 正答率を使って100問満点に換算
  const accuracy = correctCount / totalCount;
  const equivalentCorrect = Math.round(accuracy * 100);

  // 線形換算: 0問正解 → 5点、100問正解 → 495点
  const rawScore = 5 + Math.round((equivalentCorrect / 100) * 490);

  // 5点刻みに丸める
  const rounded = Math.round(rawScore / 5) * 5;

  // 範囲クランプ
  return Math.max(5, Math.min(495, rounded));
}
