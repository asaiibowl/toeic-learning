/**
 * TOEIC L&R リーディング演習アプリ — Zod スキーマ定義
 *
 * このファイルが唯一の真実(Single Source of Truth)。
 * TypeScript 型は z.infer<> で導出し、別ファイルで手書きしない。
 */

import { z } from 'zod';

// ============================================================
// 共通: 文書タイプ
// ============================================================
export const DocTypeSchema = z.enum([
  'email',
  'letter',
  'memo',
  'notice',
  'advertisement',
  'article',
  'web_page',
  'text_message_chain',
  'online_chat',
  'form',
  'invoice',
  'schedule',
  'receipt',
  'other',
]);
export type DocType = z.infer<typeof DocTypeSchema>;

// ============================================================
// 共通: 選択肢
// ============================================================
export const ChoiceSchema = z.object({
  /** 選択肢ラベル */
  label: z.enum(['A', 'B', 'C', 'D']),
  /** 選択肢本文 */
  text: z.string().min(1),
  /** 正解・不正解を問わず解説は必須（空文字禁止） */
  explanation: z.string().min(1, '解説（explanation）は空にできません'),
  /** 正解フラグ */
  isCorrect: z.boolean(),
});
export type Choice = z.infer<typeof ChoiceSchema>;

/**
 * choices 配列の共通バリデーション:
 * - 必ず4件
 * - isCorrect:true がちょうど1件
 */
export function validateChoices(choices: Choice[]): boolean {
  if (choices.length !== 4) return false;
  const correctCount = choices.filter((c) => c.isCorrect).length;
  return correctCount === 1;
}

/** choices 配列に対して refine をかけるヘルパ */
export const ChoicesArraySchema = z
  .array(ChoiceSchema)
  .length(4, '選択肢は必ず4件でなければなりません')
  .refine(
    (choices) => new Set(choices.map((choice) => choice.label)).size === 4,
    { message: '選択肢ラベルは A・B・C・D を1件ずつ指定してください' },
  )
  .refine(
    (choices) => choices.filter((c) => c.isCorrect).length === 1,
    { message: '正解（isCorrect:true）はちょうど1件でなければなりません' },
  );

// ============================================================
// 共通: 英日バイリンガル段落
// ============================================================
export const BilingualParagraphSchema = z.object({
  /** 英語本文 */
  en: z.string().min(1),
  /** 日本語訳 */
  ja: z.string().min(1),
});
export type BilingualParagraph = z.infer<typeof BilingualParagraphSchema>;

// ============================================================
// 共通: 根拠スニペット
// ============================================================
export const EvidenceSchema = z.object({
  /** 該当する passageId（Part7 での複数文書参照時に使用） */
  passageId: z.string().optional(),
  /** BilingualParagraph 配列のインデックス（0始まり） */
  paragraphIndex: z.number().int().min(0),
  /** 本文（en）中の根拠となるスニペット（部分一致で照合） */
  snippetEn: z.string().min(1),
});
export type Evidence = z.infer<typeof EvidenceSchema>;

// ============================================================
// Part 5 — 短文穴埋め（No.101–130、30問）
// ============================================================
export const Part5QuestionSchema = z.object({
  /** 問番号 101〜130 */
  no: z.number().int().min(101).max(130),
  /** 問題文。空所は "______" で表記 */
  sentence: z.string().min(1),
  /** 問題文の日本語訳 */
  sentenceJa: z.string().min(1),
  /** 選択肢（4件、正解ちょうど1件） */
  choices: ChoicesArraySchema,
  /** 問題全体の解説 */
  explanationOverall: z.string().min(1),
  /** 問題タグ（任意） */
  tag: z
    .enum(['grammar', 'vocab', 'preposition', 'conjunction', 'verb_form', 'pronoun', 'other'])
    .optional(),
});
export type Part5Question = z.infer<typeof Part5QuestionSchema>;

export const Part5DataSchema = z.object({
  testId: z.string().min(1),
  part: z.literal(5),
  questions: z.array(Part5QuestionSchema),
});
export type Part5Data = z.infer<typeof Part5DataSchema>;

// ============================================================
// Part 6 — 長文穴埋め（No.131–146、16問 = 4文書×4問）
// ============================================================
export const Part6QuestionSchema = z.object({
  /** 問番号 131〜146 */
  no: z.number().int().min(131).max(146),
  /** blank: 語句補充問題 / insertion: 文挿入問題 */
  type: z.enum(['blank', 'insertion']),
  /** 選択肢（4件、正解ちょうど1件） */
  choices: ChoicesArraySchema,
  /** 根拠スニペット（任意） */
  evidence: EvidenceSchema.optional(),
  /** 問題全体の解説 */
  explanationOverall: z.string().min(1),
});
export type Part6Question = z.infer<typeof Part6QuestionSchema>;

export const Part6PassageSchema = z.object({
  /** 文書番号（1〜4） */
  passageNo: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]),
  docType: DocTypeSchema,
  /** 文書タイトル（任意） */
  title: z.string().optional(),
  /**
   * 英日対訳段落リスト。
   * 本文中の空所は "______[131]" のように問番号を埋め込む記法を使用。
   */
  paragraphs: z.array(BilingualParagraphSchema).min(1),
  /** この文書に紐づく問題（最大4問） */
  questions: z.array(Part6QuestionSchema).min(1).max(4),
});
export type Part6Passage = z.infer<typeof Part6PassageSchema>;

export const Part6DataSchema = z.object({
  testId: z.string().min(1),
  part: z.literal(6),
  passages: z.array(Part6PassageSchema).min(1).max(4),
});
export type Part6Data = z.infer<typeof Part6DataSchema>;

// ============================================================
// Part 7 — 読解（No.147–200、54問）
// ============================================================

/** チャット/テキストメッセージの1発言 */
export const MessageSchema = z.object({
  sender: z.string().min(1),
  timeLabel: z.string().optional(),
  bodyEn: z.string().min(1),
  bodyJa: z.string().min(1),
});
export type Message = z.infer<typeof MessageSchema>;

/**
 * 読解文書。
 * paragraphs か messages の少なくとも一方が必須。
 */
export const PassageSchema = z
  .object({
    passageId: z.string().min(1),
    docType: DocTypeSchema,
    /** 文書タイトル（任意） */
    title: z.string().optional(),
    /** 送信者（メール等） */
    from: z.string().optional(),
    /** 受信者（メール等） */
    to: z.string().optional(),
    /** 通常段落（英日対訳） */
    paragraphs: z.array(BilingualParagraphSchema).optional(),
    /** チャット/テキストメッセージ */
    messages: z.array(MessageSchema).optional(),
    /** 本文に [1]〜[4] の挿入マーカーがあるか */
    hasInsertionMarkers: z.boolean().optional(),
  })
  .refine(
    (data) =>
      (data.paragraphs != null && data.paragraphs.length > 0) ||
      (data.messages != null && data.messages.length > 0),
    { message: 'paragraphs か messages の少なくとも一方が必要です' },
  );
export type Passage = z.infer<typeof PassageSchema>;

/** Part7 問題タイプ */
export const Part7QuestionTypeSchema = z.enum([
  'main_idea',  // 主題・目的
  'detail',     // 詳細情報
  'not',        // NOT問題
  'infer',      // 推測
  'intention',  // 発言意図
  'synonym',    // 同義語
  'insertion',  // 文挿入
]);

export const Part7QuestionSchema = z.object({
  /** 問番号 147〜200 */
  no: z.number().int().min(147).max(200),
  type: Part7QuestionTypeSchema,
  /** 問題文（英語） */
  questionEn: z.string().min(1),
  /** 問題文（日本語訳） */
  questionJa: z.string().min(1),
  /** synonym 問題での対象語 */
  targetWord: z.string().optional(),
  /** intention 問題での対象発言 */
  intentionTarget: z
    .object({
      sender: z.string().min(1),
      utteranceEn: z.string().min(1),
    })
    .optional(),
  /** 選択肢（4件、正解ちょうど1件） */
  choices: ChoicesArraySchema,
  /** 根拠スニペット（複数文書にまたがる場合は passageId で区別） */
  evidence: z.array(EvidenceSchema).optional(),
  /** 問題全体の解説 */
  explanationOverall: z.string().min(1),
}).superRefine((question, context) => {
  if (question.type === 'synonym' && !question.targetWord) {
    context.addIssue({
      code: 'custom',
      path: ['targetWord'],
      message: 'synonym 問題には targetWord が必要です',
    });
  }
  if (question.type === 'intention' && !question.intentionTarget) {
    context.addIssue({
      code: 'custom',
      path: ['intentionTarget'],
      message: 'intention 問題には intentionTarget が必要です',
    });
  }
  if (
    question.type === 'insertion' &&
    new Set(question.choices.map((choice) => choice.text)).size !== 4
  ) {
    context.addIssue({
      code: 'custom',
      path: ['choices'],
      message: 'insertion 問題には異なる4つの挿入位置が必要です',
    });
  }
});
export type Part7Question = z.infer<typeof Part7QuestionSchema>;

/** Part7 問題セット（single / double / triple） */
export const Part7SetSchema = z.discriminatedUnion('setType', [
  z.object({
    setType: z.literal('single'),
    /** 文書は必ず1件 */
    passages: z.array(PassageSchema).length(1),
    /** 2〜4問 */
    questions: z.array(Part7QuestionSchema).min(2).max(4),
  }),
  z.object({
    setType: z.literal('double'),
    /** 文書は必ず2件 */
    passages: z.array(PassageSchema).length(2),
    /** 必ず5問 */
    questions: z.array(Part7QuestionSchema).length(5),
  }),
  z.object({
    setType: z.literal('triple'),
    /** 文書は必ず3件 */
    passages: z.array(PassageSchema).length(3),
    /** 必ず5問 */
    questions: z.array(Part7QuestionSchema).length(5),
  }),
]);
export type Part7Set = z.infer<typeof Part7SetSchema>;

export const Part7DataSchema = z.object({
  testId: z.string().min(1),
  part: z.literal(7),
  sets: z.array(Part7SetSchema).min(1),
});
export type Part7Data = z.infer<typeof Part7DataSchema>;

// ============================================================
// メタデータ
// ============================================================

/**
 * テストセットのメタデータ。
 * completeness は実際の収録問数（満数未満でもエラーにしない、ドリルモード対応）。
 */
export const TestMetaSchema = z.object({
  testId: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  /** ISO8601 形式の作成日時 */
  createdAt: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/, 'ISO8601 形式で入力してください'),
  tags: z.array(z.string()).optional(),
  /** 実際の収録問数（満数: Part5=30, Part6=16, Part7=54） */
  completeness: z.object({
    part5: z.number().int().min(0),
    part6: z.number().int().min(0),
    part7: z.number().int().min(0),
  }),
});
export type TestMeta = z.infer<typeof TestMetaSchema>;

export const TestIndexSchema = z.object({
  version: z.literal(1),
  tests: z.array(TestMetaSchema),
});
export type TestIndex = z.infer<typeof TestIndexSchema>;
