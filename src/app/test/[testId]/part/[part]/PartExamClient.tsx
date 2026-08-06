'use client';

/**
 * パート演習クライアントコンポーネント
 *
 * - Part5/6/7 の演習UIをパート番号で振り分ける
 * - useSession でセッション管理、useTimer でタイマー管理
 * - practice モードは選択直後に正誤と解説を展開
 * - 採点ボタン or タイマー0 → complete() → /test/{testId}/result/ へ遷移
 */

import { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchPartData } from '@/lib/data/loader';
import { useExamFlow } from '@/hooks/useExamFlow';
import { ExamHeader } from '@/components/exam/ExamHeader';
import { ChoiceList } from '@/components/exam/ChoiceList';
import { BlankText } from '@/components/exam/BlankText';
import { Part7Exam } from '@/components/exam/Part7Exam';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { PART_QUESTION_RANGE } from '@/lib/constants';
import type { ExamMode } from '@/lib/storage/idb';
import type {
  Part5Data,
  Part5Question,
  Part6Data,
  Part6Question,
} from '@/types/question';

// ============================================================
// DocType ラベル（日本語）
// ============================================================
const DOC_TYPE_LABEL: Record<string, string> = {
  email: 'メール',
  letter: '手紙',
  memo: '社内メモ',
  notice: 'お知らせ',
  advertisement: '求人・広告',
  article: '記事',
  web_page: 'ウェブページ',
  text_message_chain: 'テキストメッセージ',
  online_chat: 'オンラインチャット',
  form: 'フォーム',
  invoice: '請求書',
  schedule: 'スケジュール',
  receipt: '領収書',
  other: 'その他',
};

// ============================================================
// 型定義
// ============================================================

interface PartExamClientProps {
  testId: string;
  /** URL から渡されるパート番号文字列 ('5' | '6' | '7') */
  part: string;
}

// ============================================================
// Part5 演習コンポーネント（本体）
// ============================================================

interface Part5ExamProps {
  testId: string;
  mode: ExamMode;
  parts: (5 | 6 | 7)[];
  /** 最初からやり直す（既存セッションをリセット） */
  restart?: boolean;
}

function Part5Exam({ testId, mode, parts, restart = false }: Part5ExamProps) {

  // Part5 問題データ
  const [partData, setPartData] = useState<Part5Data | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [dataLoading, setDataLoading] = useState(true);

  // 現在表示中の問題インデックス（0始まり）
  const [currentIndex, setCurrentIndex] = useState(0);

  // practice モード: 解説を展開中の問番号 Set
  const [expandedExplanations, setExpandedExplanations] = useState<Set<number>>(new Set());

  // ---- セッション・パート遷移・共有タイマー ----
  const {
    session,
    sessionLoading,
    answer,
    remaining,
    finishPart,
    isLastPart,
  } = useExamFlow({
    testId,
    mode,
    parts,
    part: 5,
    restart,
  });

  // ---- Part5 データ読み込み ----
  useEffect(() => {
    let cancelled = false;
    fetchPartData(testId, 5)
      .then((data) => {
        if (!cancelled) {
          setPartData(data);
          setDataLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setLoadError(err instanceof Error ? err.message : 'データの取得に失敗しました');
          setDataLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, [testId]);

  // ---- 採点処理 ----
  const handleSubmit = finishPart;

  // ---- 計算値 ----
  const questions = useMemo(() => partData?.questions ?? [], [partData]);
  const currentQuestion: Part5Question | undefined = questions[currentIndex];
  const startNo = PART_QUESTION_RANGE[5][0]; // 101

  // 回答済み問番号 Set
  const answeredNos = useMemo(() => {
    if (!session) return new Set<number>();
    const questionNos = new Set(questions.map((question) => question.no));
    return new Set(Object.keys(session.answers).map(Number).filter((no) => questionNos.has(no)));
  }, [questions, session]);

  // ---- ロード中 / エラー ----
  if (dataLoading || sessionLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-zinc-500 dark:text-zinc-400 animate-pulse">読み込み中...</div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950 p-6">
        <h2 className="text-base font-semibold text-red-700 dark:text-red-400">エラー</h2>
        <p className="mt-1 text-sm text-red-600 dark:text-red-300">{loadError}</p>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="text-center py-24 text-zinc-500 dark:text-zinc-400">
        問題がありません
      </div>
    );
  }

  // ---- 選択肢クリック ----
  const handleSelect = (label: 'A' | 'B' | 'C' | 'D') => {
    if (!currentQuestion) return;
    const no = currentQuestion.no;

    // すでに回答済みの場合（practice モードでは変更不可）
    if (mode === 'practice' && expandedExplanations.has(no)) return;

    const correctChoice = currentQuestion.choices.find((c) => c.isCorrect);
    const isCorrect = correctChoice?.label === label;
    answer(no, label, isCorrect);

    // practice モード: 即時解説を展開
    if (mode === 'practice') {
      setExpandedExplanations((prev) => new Set([...prev, no]));
    }
  };

  // 前の問へ
  const handlePrev = () => {
    setCurrentIndex((i) => Math.max(0, i - 1));
  };

  // 次の問へ
  const handleNext = () => {
    setCurrentIndex((i) => Math.min(questions.length - 1, i + 1));
  };

  // 現在問の回答状態
  const currentAnswer = session?.answers[currentQuestion.no];
  const isCurrentAnswered = currentAnswer !== undefined;
  const isExplanationExpanded = expandedExplanations.has(currentQuestion.no);

  // practice モードで解説展開中は disabled
  const choicesDisabled = mode === 'practice' && isExplanationExpanded;

  // ============================================================
  // スマホ: 1問ずつ表示 / PC(md以上): スクロール表示
  // ============================================================

  return (
    <div className="max-w-4xl mx-auto">
      {/* スティッキーヘッダー */}
      <ExamHeader
        remainingSeconds={remaining}
        totalQuestions={questions.length}
        answeredNos={answeredNos}
        currentIndex={currentIndex}
        onJump={setCurrentIndex}
        onSubmit={handleSubmit}
        hideTimer={mode === 'practice'}
        startNo={startNo}
        submitLabel={isLastPart ? '採点する' : '次のパートへ'}
      />
      <p className="border-b border-zinc-200 bg-zinc-50 px-4 py-2 text-xs text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
        Choose the option that best completes each sentence.
      </p>

      {/* ---- スマホ: 1問ずつ表示 ---- */}
      <div className="block md:hidden px-4 py-6 space-y-4">
        {/* 問題カード */}
        <Card>
          {/* 問番号・タグ */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
              No. {currentQuestion.no}
            </span>
            {mode === 'practice' && currentQuestion.tag && (
              <span className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 px-2 py-0.5 rounded-full">
                {currentQuestion.tag}
              </span>
            )}
          </div>

          {/* 問題文 */}
          <p className="text-base leading-relaxed text-zinc-800 dark:text-zinc-200 mb-4">
            <BlankText
              text={currentQuestion.sentence}
              filledAnswer={
                isCurrentAnswered && mode === 'practice'
                  ? currentQuestion.choices.find((c) => c.label === currentAnswer.chosen)?.text
                  : undefined
              }
            />
          </p>

          {/* ※ 演習中は日本語訳・解説・正解を一切表示しない（問題パートと解答パートの隔離）。
              訳と解説は採点後の解説ページ（/test/[testId]/review）でのみ提供する。 */}

          {/* 選択肢 */}
          <ChoiceList
            choices={currentQuestion.choices}
            selected={currentAnswer?.chosen}
            onSelect={handleSelect}
            showResult={isExplanationExpanded}
            disabled={choicesDisabled}
          />

          {/* practice モード: 解説 */}
          {isExplanationExpanded && (
            <div className="mt-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 p-4">
              <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-1">解説</p>
              <p className="text-sm text-blue-900 dark:text-blue-200 leading-relaxed">
                {currentQuestion.explanationOverall}
              </p>
            </div>
          )}
        </Card>

        {/* 前へ / 次へ ナビゲーション */}
        <div className="flex gap-3">
          <Button
            variant="secondary"
            size="md"
            fullWidth
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            ← 前へ
          </Button>
          <Button
            variant="secondary"
            size="md"
            fullWidth
            onClick={handleNext}
            disabled={currentIndex === questions.length - 1}
          >
            次へ →
          </Button>
        </div>

        {/* 最終問で全問回答済み → 採点ボタン */}
        {currentIndex === questions.length - 1 && answeredNos.size === questions.length && (
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleSubmit}
          >
            {isLastPart ? '採点する' : '次のパートへ'}
          </Button>
        )}
      </div>

      {/* ---- PC(md以上): 連続スクロール表示 ---- */}
      <div className="hidden md:block px-4 py-6 space-y-6">
        {questions.map((q, idx) => {
          const qAnswer = session?.answers[q.no];
          const isAnswered = qAnswer !== undefined;
          const isExpanded = expandedExplanations.has(q.no);
          const isChoicesDisabled = mode === 'practice' && isExpanded;

          // PC ではビューポートに入った問を currentIndex として追跡
          // （簡易実装: currentIndex はスクロール連動しない。ヘッダー dot タップでジャンプ）

          return (
            <div
              key={q.no}
              id={`q-${idx}`}
              className="scroll-mt-32"
            >
            <Card
              className={[
                'transition-shadow duration-200',
                idx === currentIndex ? 'ring-2 ring-blue-400 dark:ring-blue-500' : '',
              ].join(' ')}
            >
              {/* 問番号・タグ */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                  No. {q.no}
                </span>
                {mode === 'practice' && q.tag && (
                  <span className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 px-2 py-0.5 rounded-full">
                    {q.tag}
                  </span>
                )}
              </div>

              {/* 問題文 */}
              <p className="text-base leading-relaxed text-zinc-800 dark:text-zinc-200 mb-4">
                <BlankText
                  text={q.sentence}
                  filledAnswer={
                    isAnswered && mode === 'practice'
                      ? q.choices.find((c) => c.label === qAnswer.chosen)?.text
                      : undefined
                  }
                />
              </p>

              {/* ※ 演習中は日本語訳を表示しない（問題パートと解答パートの隔離） */}

              {/* 選択肢 */}
              <ChoiceList
                choices={q.choices}
                selected={qAnswer?.chosen}
                onSelect={(label) => {
                  if (mode === 'practice' && isExpanded) return;
                  const correctChoice = q.choices.find((c) => c.isCorrect);
                  const isCorrect = correctChoice?.label === label;
                  answer(q.no, label, isCorrect);
                  if (mode === 'practice') {
                    setExpandedExplanations((prev) => new Set([...prev, q.no]));
                  }
                  // PC: クリックした問を currentIndex に設定
                  setCurrentIndex(idx);
                }}
                showResult={isExpanded}
                disabled={isChoicesDisabled}
              />

              {/* practice モード: 解説 */}
              {isExpanded && (
                <div className="mt-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 p-4">
                  <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-1">解説</p>
                  <p className="text-sm text-blue-900 dark:text-blue-200 leading-relaxed">
                    {q.explanationOverall}
                  </p>
                </div>
              )}
            </Card>
            </div>
          );
        })}

        {/* 採点ボタン（全問回答済みで表示） */}
        {answeredNos.size > 0 && (
          <div className="flex justify-center pb-8">
            <Button variant="primary" size="lg" onClick={handleSubmit}>
              {isLastPart ? '採点する' : '次のパートへ'}（{answeredNos.size}/{questions.length}問 回答済み）
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// Part6 演習コンポーネント（本体）
// ============================================================

interface Part6ExamProps {
  testId: string;
  mode: ExamMode;
  parts: (5 | 6 | 7)[];
  restart?: boolean;
}

function Part6Exam({ testId, mode, parts, restart = false }: Part6ExamProps) {

  // Part6 問題データ
  const [partData, setPartData] = useState<Part6Data | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [dataLoading, setDataLoading] = useState(true);

  // フラット問インデックス（ProgressDots・ExamHeader 用）
  const [currentIndex, setCurrentIndex] = useState(0);
  // スマホで現在表示中の文書インデックス
  const [activePassageIndex, setActivePassageIndex] = useState(0);
  // フォーカス中の問番号（本文の空所クリック or 設問カードクリックで設定）
  const [focusedQuestionNo, setFocusedQuestionNo] = useState<number | null>(null);
  // practice モード: 解説展開中の問番号 Set
  const [expandedExplanations, setExpandedExplanations] = useState<Set<number>>(new Set());

  // ---- セッション・パート遷移・共有タイマー ----
  const {
    session,
    sessionLoading,
    answer,
    remaining,
    finishPart,
    isLastPart,
  } = useExamFlow({
    testId,
    mode,
    parts,
    part: 6,
    restart,
  });

  // ---- Part6 データ読み込み ----
  useEffect(() => {
    let cancelled = false;
    fetchPartData(testId, 6)
      .then((data) => {
        if (!cancelled) {
          setPartData(data);
          setDataLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setLoadError(err instanceof Error ? err.message : 'データの取得に失敗しました');
          setDataLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, [testId]);

  // ---- 採点処理 ----
  const handleSubmit = finishPart;

  // ---- 計算値 ----
  // 全問フラット展開（passages をまたいで順序通り）
  const allQuestions = useMemo<Part6Question[]>(
    () => partData?.passages.flatMap((p) => p.questions) ?? [],
    [partData],
  );

  // 回答済み問番号 Set
  const answeredNos = useMemo(() => {
    if (!session) return new Set<number>();
    const questionNos = new Set(allQuestions.map((question) => question.no));
    return new Set(Object.keys(session.answers).map(Number).filter((no) => questionNos.has(no)));
  }, [allQuestions, session]);

  // ---- 空所クリックハンドラ ----
  const handleBlankClick = useCallback((no: number) => {
    setFocusedQuestionNo(no);
    setTimeout(() => {
      document.getElementById(`q-no-${no}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);
    if (partData) {
      const pIdx = partData.passages.findIndex((p) => p.questions.some((q) => q.no === no));
      if (pIdx !== -1) setActivePassageIndex(pIdx);
    }
  }, [partData]);

  // ---- ジャンプハンドラ（ProgressDots → 設問へ） ----
  const handleJump = useCallback((i: number) => {
    setCurrentIndex(i);
    const q = allQuestions[i];
    if (!q) return;
    setFocusedQuestionNo(q.no);
    setTimeout(() => {
      document.getElementById(`q-no-${q.no}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);
  }, [allQuestions]);

  // ---- 選択肢クリック ----
  const handleSelect = useCallback((q: Part6Question, label: 'A' | 'B' | 'C' | 'D') => {
    if (mode === 'practice' && expandedExplanations.has(q.no)) return;
    const correctChoice = q.choices.find((c) => c.isCorrect);
    const isCorrect = correctChoice?.label === label;
    answer(q.no, label, isCorrect);
    if (mode === 'practice') {
      setExpandedExplanations((prev) => new Set([...prev, q.no]));
    }
  }, [mode, expandedExplanations, answer]);

  // ---- ロード中 / エラー ----
  if (dataLoading || sessionLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-zinc-500 dark:text-zinc-400 animate-pulse">読み込み中...</div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950 p-6">
        <h2 className="text-base font-semibold text-red-700 dark:text-red-400">エラー</h2>
        <p className="mt-1 text-sm text-red-600 dark:text-red-300">{loadError}</p>
      </div>
    );
  }

  if (!partData) {
    return (
      <div className="text-center py-24 text-zinc-500 dark:text-zinc-400">
        問題がありません
      </div>
    );
  }

  // ---- 設問カード（共通ヘルパ） ----
  const renderQuestionCard = (q: Part6Question, passageNo: number) => {
    const qAnswer = session?.answers[q.no];
    const isExpanded = expandedExplanations.has(q.no);
    const isChoicesDisabled = mode === 'practice' && isExpanded;
    const isFocused = focusedQuestionNo === q.no;
    const flatIdx = allQuestions.findIndex((fq) => fq.no === q.no);

    return (
      <div key={q.no} id={`q-no-${q.no}`} className="scroll-mt-32">
        <Card
          className={[
            'transition-shadow duration-200',
            isFocused ? 'ring-2 ring-blue-400 dark:ring-blue-500' : '',
          ].join(' ')}
        >
          {/* ヘッダー */}
          <div className="flex items-center gap-2 flex-wrap mb-3">
            <button
              type="button"
              onClick={() => {
                setFocusedQuestionNo(q.no);
                setCurrentIndex(flatIdx >= 0 ? flatIdx : 0);
              }}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide hover:underline"
            >
              No. {q.no}
            </button>
            <span className="text-xs text-zinc-400 dark:text-zinc-500">文書 {passageNo}</span>
            {mode === 'practice' && q.type === 'insertion' && (
              <span className="text-xs bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-full font-medium">
                文挿入
              </span>
            )}
          </div>

          {/* 選択肢 */}
          <ChoiceList
            choices={q.choices}
            selected={qAnswer?.chosen}
            onSelect={(label) => handleSelect(q, label)}
            showResult={isExpanded}
            disabled={isChoicesDisabled}
          />

          {/* practice モード: 解説 */}
          {isExpanded && (
            <div className="mt-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 p-4">
              <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-1">解説</p>
              <p className="text-sm text-blue-900 dark:text-blue-200 leading-relaxed">
                {q.explanationOverall}
              </p>
            </div>
          )}
        </Card>
      </div>
    );
  };

  // ---- 本文エリア（共通ヘルパ） ----
  const renderPassageText = (passage: Part6Data['passages'][number]) => {
    const filledAnswersByNo: Record<number, string> = {};
    passage.questions.forEach((q) => {
      const qAnswer = session?.answers[q.no];
      if (qAnswer) {
        const choice = q.choices.find((c) => c.label === qAnswer.chosen);
        if (choice) filledAnswersByNo[q.no] = choice.text;
      }
    });

    return (
      <div className="space-y-3">
        {passage.title && (
          <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{passage.title}</p>
        )}
        {passage.paragraphs.map((para, i) => (
          <p key={i} className="text-sm leading-relaxed text-zinc-800 dark:text-zinc-200 whitespace-pre-line">
            <BlankText
              text={para.en}
              filledAnswersByNo={filledAnswersByNo}
              highlightNo={focusedQuestionNo ?? undefined}
              onBlankClick={handleBlankClick}
            />
          </p>
        ))}
      </div>
    );
  };

  // ============================================================
  // レンダリング
  // ============================================================
  return (
    <div className="max-w-5xl mx-auto">
      {/* スティッキーヘッダー */}
      <ExamHeader
        remainingSeconds={remaining}
        totalQuestions={allQuestions.length}
        answeredNos={answeredNos}
        currentIndex={currentIndex}
        onJump={handleJump}
        onSubmit={handleSubmit}
        hideTimer={mode === 'practice'}
        startNo={PART_QUESTION_RANGE[6][0]}
        submitLabel={isLastPart ? '採点する' : '次のパートへ'}
      />
      <p className="border-b border-zinc-200 bg-zinc-50 px-4 py-2 text-xs text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
        Read each text and choose the option that best fills each numbered blank.
      </p>

      {/* ---- スマホ（md 未満）---- */}
      <div className="block md:hidden">
        {/* 文書選択タブ */}
        <div className="flex gap-1 px-4 pt-4 overflow-x-auto border-b border-zinc-200 dark:border-zinc-700">
          {partData.passages.map((passage, pIdx) => (
            <button
              key={passage.passageNo}
              type="button"
              onClick={() => setActivePassageIndex(pIdx)}
              className={[
                'flex-shrink-0 px-4 py-2 text-sm font-medium rounded-t-lg transition-colors border border-b-0',
                activePassageIndex === pIdx
                  ? 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-blue-600 dark:text-blue-400'
                  : 'bg-zinc-50 dark:bg-zinc-800 border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300',
              ].join(' ')}
            >
              文書 {passage.passageNo}
              <span className="ml-1 text-xs opacity-70">
                ({DOC_TYPE_LABEL[passage.docType] ?? passage.docType})
              </span>
            </button>
          ))}
        </div>

        {/* 選択中文書の本文 */}
        {partData.passages[activePassageIndex] && (
          <div className="px-4 py-3 max-h-60 overflow-y-auto border-b border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800">
            {renderPassageText(partData.passages[activePassageIndex])}
          </div>
        )}

        {/* 選択中文書の設問カード */}
        <div className="px-4 py-4 space-y-4">
          {partData.passages[activePassageIndex]?.questions.map((q) =>
            renderQuestionCard(q, partData.passages[activePassageIndex].passageNo),
          )}

          {activePassageIndex === partData.passages.length - 1 && answeredNos.size === allQuestions.length && (
            <Button variant="primary" size="lg" fullWidth onClick={handleSubmit}>
              {isLastPart ? '採点する' : '次のパートへ'}
            </Button>
          )}
        </div>
      </div>

      {/* ---- PC（md 以上）左右 2 ペイン ---- */}
      <div className="hidden md:flex gap-6 px-4 py-6 items-start">
        {/* 左ペイン: 本文 */}
        <div className="w-1/2 sticky top-32 self-start overflow-y-auto max-h-[calc(100vh-8rem)] space-y-6 pr-2">
          {partData.passages.map((passage) => (
            <div key={passage.passageNo} className="space-y-2">
              <h3 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                文書 {passage.passageNo} — {DOC_TYPE_LABEL[passage.docType] ?? passage.docType}
              </h3>
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 p-4">
                {renderPassageText(passage)}
              </div>
            </div>
          ))}
        </div>

        {/* 右ペイン: 設問 */}
        <div className="w-1/2 space-y-8">
          {partData.passages.map((passage) => (
            <div key={passage.passageNo} className="space-y-4">
              <h3 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                文書 {passage.passageNo} の設問
              </h3>
              {passage.questions.map((q) => renderQuestionCard(q, passage.passageNo))}
            </div>
          ))}

          {answeredNos.size > 0 && (
            <div className="flex justify-center pb-8">
              <Button variant="primary" size="lg" onClick={handleSubmit}>
                {isLastPart ? '採点する' : '次のパートへ'}（{answeredNos.size}/{allQuestions.length}問 回答済み）
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// PartExamClient 本体（part 振り分け）
// ============================================================

/** URL SearchParams からモードを取得するコンポーネント（Suspense 必須） */
function PartExamInner({ testId, part }: PartExamClientProps) {
  const searchParams = useSearchParams();

  // URL クエリパラメータ ?mode=full|part|practice からモードを取得
  // 未指定の場合は 'full' をデフォルトとする
  const rawMode = searchParams.get('mode');
  const mode: ExamMode =
    rawMode === 'part' || rawMode === 'practice' || rawMode === 'full'
      ? rawMode
      : 'full';

  // ?restart=1 が付いている場合は既存セッションをリセット
  const restart = searchParams.get('restart') === '1';

  const partNum = parseInt(part, 10);
  const parsedParts = (searchParams.get('parts') ?? '')
    .split(',')
    .map(Number)
    .filter((value): value is 5 | 6 | 7 => value === 5 || value === 6 || value === 7);
  const parts = [...new Set(parsedParts)].sort((a, b) => a - b);
  const selectedParts: (5 | 6 | 7)[] = parts.length > 0
    ? parts
    : partNum === 5 || partNum === 6 || partNum === 7
      ? [partNum]
      : [];

  // Part6 本実装
  if (partNum === 6) {
    return <Part6Exam testId={testId} mode={mode} parts={selectedParts} restart={restart} />;
  }

  // Part7 本実装
  if (partNum === 7) {
    return <Part7Exam testId={testId} mode={mode} parts={selectedParts} restart={restart} />;
  }

  // Part5 本実装
  if (partNum === 5) {
    return <Part5Exam testId={testId} mode={mode} parts={selectedParts} restart={restart} />;
  }

  // 不正なパート番号
  return (
    <div className="max-w-2xl mx-auto py-24 text-center">
      <p className="text-zinc-500 dark:text-zinc-400">
        パート番号 {part} は無効です
      </p>
    </div>
  );
}

/** useSearchParams を使うため Suspense でラップ */
export function PartExamClient({ testId, part }: PartExamClientProps) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-24">
          <div className="text-zinc-500 dark:text-zinc-400 animate-pulse">読み込み中...</div>
        </div>
      }
    >
      <PartExamInner testId={testId} part={part} />
    </Suspense>
  );
}
