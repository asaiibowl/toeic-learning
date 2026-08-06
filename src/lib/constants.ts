/**
 * TOEIC L&R リーディング演習 — 定数定義
 *
 * ユーザー設定で上書き可能な形にしておく（将来的な設定画面向け）
 */

export const PART_TIME_SECONDS: Record<5 | 6 | 7, number> = {
  5: 10 * 60,  // Part5: 10分
  6: 8 * 60,   // Part6: 8分
  7: 57 * 60,  // Part7: 57分
};

export const FULL_TIME_SECONDS = 75 * 60; // リーディング全体: 75分

// 問番号の範囲（実際のTOEIC L&R 問題番号）
export const PART_QUESTION_RANGE: Record<5 | 6 | 7, [number, number]> = {
  5: [101, 130],
  6: [131, 146],
  7: [147, 200],
};

export const PART_LABEL: Record<5 | 6 | 7, string> = {
  5: 'Part 5 短文穴埋め',
  6: 'Part 6 長文穴埋め',
  7: 'Part 7 読解（単一文書29問・複数文書25問）',
};
