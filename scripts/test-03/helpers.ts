/**
 * テストセット03（test-03）用の共通ビルダ。
 *
 * test-02 と同一のインターフェース。
 * 「選択肢ごとに個別の解説を書く」方針を全パート共通で貫く。
 *
 * 収録するのはすべて本プロジェクト用のオリジナル問題。公式問題の転載はしない。
 */

import type {
  Choice,
  DocType,
  Part5Question,
  Part6Passage,
  Part6Question,
  Part7Question,
  Passage,
} from '../../src/schemas/question.schema';

const LABELS = ['A', 'B', 'C', 'D'] as const;

/** 選択肢1件のシード。[選択肢本文, その選択肢についての個別解説] */
export type Option = readonly [text: string, explanation: string];
/** 選択肢4件のシード */
export type Options4 = readonly [Option, Option, Option, Option];
export type CorrectIndex = 0 | 1 | 2 | 3;

/**
 * 正解ラベルが A・B へ偏らないよう、問番号から安定した配置先を決める。
 * 101〜200 の範囲で A:26 / B:24 / C:25 / D:25 とほぼ均等に散る。
 *
 * 注意: この関数により選択肢の並びは執筆時の順序から入れ替わる。
 * 解説文で「選択肢A」のようにラベルを参照してはならない。
 */
function targetIndexFor(no: number): CorrectIndex {
  return (((no * 13 + 5) ^ (no >> 3)) & 3) as CorrectIndex;
}

/**
 * シードの選択肢配列を、正解が targetIndexFor(no) の位置に来るよう巡回シフトする。
 * [本文, 解説] のペアごと動かすので、個別解説とのひも付けは崩れない。
 */
function buildChoices(no: number, options: Options4, correctIndex: CorrectIndex): Choice[] {
  const targetIndex = targetIndexFor(no);
  const shift = (targetIndex - correctIndex + 4) % 4;

  return LABELS.map((label, index) => {
    const [text, explanation] = options[(index - shift + 4) % 4];
    const isCorrect = index === targetIndex;
    return {
      label,
      text,
      explanation: `${explanation}${isCorrect ? ' 正解です。' : ' 正解ではありません。'}`,
      isCorrect,
    };
  });
}

// ============================================================
// Part 5
// ============================================================

export function p5q(
  no: number,
  sentence: string,
  sentenceJa: string,
  options: Options4,
  correctIndex: CorrectIndex,
  explanationOverall: string,
  tag: Part5Question['tag'],
): Part5Question {
  return {
    no,
    sentence,
    sentenceJa,
    choices: buildChoices(no, options, correctIndex),
    explanationOverall,
    tag,
  };
}

// ============================================================
// Part 6
// ============================================================

/** Part6 の根拠シード。[paragraphIndex, snippetEn] */
export type P6EvidenceSeed = readonly [paragraphIndex: number, snippetEn: string];

export function p6q(
  no: number,
  type: Part6Question['type'],
  options: Options4,
  correctIndex: CorrectIndex,
  explanationOverall: string,
  evidence?: P6EvidenceSeed,
): Part6Question {
  return {
    no,
    type,
    choices: buildChoices(no, options, correctIndex),
    ...(evidence ? { evidence: { paragraphIndex: evidence[0], snippetEn: evidence[1] } } : {}),
    explanationOverall,
  };
}

export function p6Passage(
  passageNo: Part6Passage['passageNo'],
  docType: DocType,
  title: string,
  paragraphs: readonly (readonly [en: string, ja: string])[],
  questions: Part6Question[],
): Part6Passage {
  return {
    passageNo,
    docType,
    title,
    paragraphs: paragraphs.map(([en, ja]) => ({ en, ja })),
    questions,
  };
}

// ============================================================
// Part 7
// ============================================================

/** Part7 の根拠シード。[passageId, paragraphIndex（messages の場合は発言インデックス）, snippetEn] */
export type P7EvidenceSeed = readonly [passageId: string, paragraphIndex: number, snippetEn: string];

/** synonym / intention 問題で追加が必要なフィールド */
export type P7Extra = {
  targetWord?: string;
  intentionTarget?: { sender: string; utteranceEn: string };
};

export function q(
  no: number,
  type: Part7Question['type'],
  questionEn: string,
  questionJa: string,
  options: Options4,
  correctIndex: CorrectIndex,
  explanationOverall: string,
  evidence: readonly P7EvidenceSeed[] = [],
  extra: P7Extra = {},
): Part7Question {
  return {
    no,
    type,
    questionEn,
    questionJa,
    ...extra,
    choices: buildChoices(no, options, correctIndex),
    ...(evidence.length > 0
      ? {
          evidence: evidence.map(([passageId, paragraphIndex, snippetEn]) => ({
            passageId,
            paragraphIndex,
            snippetEn,
          })),
        }
      : {}),
    explanationOverall,
  };
}

/** 段落型の文書。extra で from / to / hasInsertionMarkers を足せる */
export function passage(
  passageId: string,
  docType: DocType,
  title: string,
  paragraphs: readonly (readonly [en: string, ja: string])[],
  extra: { from?: string; to?: string; hasInsertionMarkers?: boolean } = {},
): Passage {
  return {
    passageId,
    docType,
    title,
    ...extra,
    paragraphs: paragraphs.map(([en, ja]) => ({ en, ja })),
  };
}

/** チャット / テキストメッセージ型の文書 */
export function messages(
  passageId: string,
  docType: 'text_message_chain' | 'online_chat',
  title: string,
  items: readonly (readonly [sender: string, timeLabel: string, bodyEn: string, bodyJa: string])[],
): Passage {
  return {
    passageId,
    docType,
    title,
    messages: items.map(([sender, timeLabel, bodyEn, bodyJa]) => ({
      sender,
      timeLabel,
      bodyEn,
      bodyJa,
    })),
  };
}
