/**
 * TOEIC 型定義の re-export。
 * 型の真実は src/schemas/question.schema.ts (Zod) にあります。
 * このファイルは z.infer<> で導出された型をそのまま再エクスポートするだけです。
 */

export type {
  DocType,
  Choice,
  BilingualParagraph,
  Evidence,
  Part5Question,
  Part5Data,
  Part6Question,
  Part6Passage,
  Part6Data,
  Message,
  Passage,
  Part7Question,
  Part7Set,
  Part7Data,
  TestMeta,
  TestIndex,
} from '@/schemas/question.schema';
