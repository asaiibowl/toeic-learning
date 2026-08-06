'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { fetchPartData } from '@/lib/data/loader';
import { useExamFlow } from '@/hooks/useExamFlow';
import { PART_QUESTION_RANGE } from '@/lib/constants';
import { ExamHeader } from '@/components/exam/ExamHeader';
import { ChoiceList } from '@/components/exam/ChoiceList';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import type { ExamMode } from '@/lib/storage/idb';
import type { Part7Data, Part7Question, Part7Set, Passage } from '@/types/question';

interface Part7ExamProps {
  testId: string;
  mode: ExamMode;
  parts: (5 | 6 | 7)[];
  restart?: boolean;
}

const TYPE_LABEL: Record<Part7Question['type'], string> = {
  main_idea: '主旨',
  detail: '詳細',
  not: 'NOT',
  infer: '推測',
  intention: '発言意図',
  synonym: '同義語',
  insertion: '文挿入',
};

const DOC_TYPE_LABEL: Record<string, string> = {
  email: 'Email',
  letter: 'Letter',
  memo: 'Memo',
  notice: 'Notice',
  advertisement: 'Advertisement',
  article: 'Article',
  web_page: 'Web page',
  text_message_chain: 'Text messages',
  online_chat: 'Online chat',
  form: 'Form',
  invoice: 'Invoice',
  schedule: 'Schedule',
  receipt: 'Receipt',
  other: 'Document',
};

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** 文挿入位置と同義語の対象語を英語本文内で強調する */
function renderMarkedText(text: string, targetWord?: string): ReactNode[] {
  const patterns = ['\\[[1-4]\\]'];
  if (targetWord) patterns.push(escapeRegExp(targetWord));
  const regex = new RegExp(`(${patterns.join('|')})`, 'gi');

  return text.split(regex).filter(Boolean).map((piece, index) => {
    if (/^\[[1-4]\]$/.test(piece)) {
      return (
        <span
          key={`${piece}-${index}`}
          className="mx-1 inline-flex min-w-7 items-center justify-center rounded-full bg-amber-100 px-1.5 py-0.5 text-xs font-bold text-amber-800 dark:bg-amber-900 dark:text-amber-200"
        >
          {piece}
        </span>
      );
    }
    if (targetWord && piece.toLocaleLowerCase() === targetWord.toLocaleLowerCase()) {
      return (
        <mark
          key={`${piece}-${index}`}
          className="rounded bg-yellow-200 px-0.5 text-inherit dark:bg-yellow-700"
        >
          {piece}
        </mark>
      );
    }
    return piece;
  });
}

function PassageDocument({
  passage,
  targetWord,
}: {
  passage: Passage;
  targetWord?: string;
}) {
  return (
    <article className="space-y-4 text-zinc-800 dark:text-zinc-200">
      <header className="space-y-1 border-b border-zinc-200 pb-3 dark:border-zinc-700">
        <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
          {DOC_TYPE_LABEL[passage.docType] ?? passage.docType}
        </p>
        {passage.title && <h3 className="text-base font-bold">{passage.title}</h3>}
        {passage.from && <p className="text-xs"><span className="font-semibold">From:</span> {passage.from}</p>}
        {passage.to && <p className="text-xs"><span className="font-semibold">To:</span> {passage.to}</p>}
      </header>

      {passage.paragraphs && (
        <div className="space-y-3">
          {passage.paragraphs.map((paragraph, index) => (
            <p key={index} className="whitespace-pre-line text-sm leading-7">
              {renderMarkedText(paragraph.en, targetWord)}
            </p>
          ))}
        </div>
      )}

      {passage.messages && (
        <div className="space-y-3">
          {passage.messages.map((message, index) => (
            <div
              key={`${message.sender}-${index}`}
              className={[
                'max-w-[88%] rounded-2xl px-4 py-3',
                index % 2 === 0
                  ? 'mr-auto rounded-tl-sm bg-zinc-100 dark:bg-zinc-800'
                  : 'ml-auto rounded-tr-sm bg-blue-50 dark:bg-blue-950',
              ].join(' ')}
            >
              <div className="mb-1 flex items-baseline justify-between gap-3">
                <span className="text-xs font-bold">{message.sender}</span>
                {message.timeLabel && <span className="text-[11px] text-zinc-400">{message.timeLabel}</span>}
              </div>
              <p className="whitespace-pre-line text-sm leading-6">
                {renderMarkedText(message.bodyEn, targetWord)}
              </p>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

export function Part7Exam({
  testId,
  mode,
  parts,
  restart = false,
}: Part7ExamProps) {
  const [partData, setPartData] = useState<Part7Data | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeSetIndex, setActiveSetIndex] = useState(0);
  const [activePassageBySet, setActivePassageBySet] = useState<Record<number, number>>({});
  const [mobilePassageOpen, setMobilePassageOpen] = useState<Record<number, boolean>>({ 0: true });
  const [expandedExplanations, setExpandedExplanations] = useState<Set<number>>(new Set());

  const {
    session,
    sessionLoading,
    answer,
    remaining,
    finishPart,
    isLastPart,
  } = useExamFlow({ testId, mode, parts, part: 7, restart });

  useEffect(() => {
    let cancelled = false;
    fetchPartData(testId, 7)
      .then((data) => {
        if (!cancelled) {
          setPartData(data);
          setDataLoading(false);
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setLoadError(error instanceof Error ? error.message : 'データの取得に失敗しました');
          setDataLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, [testId]);

  const allQuestions = useMemo(
    () => partData?.sets.flatMap((set) => set.questions) ?? [],
    [partData],
  );
  const questionNos = useMemo(() => new Set(allQuestions.map((question) => question.no)), [allQuestions]);
  const answeredNos = useMemo(() => {
    if (!session) return new Set<number>();
    return new Set(
      Object.keys(session.answers).map(Number).filter((no) => questionNos.has(no)),
    );
  }, [questionNos, session]);
  const focusedQuestion = allQuestions[currentIndex];

  const locateQuestion = useCallback((index: number) => {
    const question = allQuestions[index];
    if (!question || !partData) return;
    const setIndex = partData.sets.findIndex((set) => set.questions.some((item) => item.no === question.no));
    if (setIndex >= 0) setActiveSetIndex(setIndex);
    setCurrentIndex(index);
    setTimeout(() => {
      document.getElementById(`q-no-${question.no}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);
  }, [allQuestions, partData]);

  const handleSelect = useCallback((question: Part7Question, label: 'A' | 'B' | 'C' | 'D') => {
    if (mode === 'practice' && expandedExplanations.has(question.no)) return;
    const correct = question.choices.find((choice) => choice.isCorrect)?.label === label;
    answer(question.no, label, correct);
    if (mode === 'practice') {
      setExpandedExplanations((previous) => new Set([...previous, question.no]));
    }
  }, [answer, expandedExplanations, mode]);

  if (dataLoading || sessionLoading) {
    return <div className="py-24 text-center text-zinc-500 animate-pulse">読み込み中...</div>;
  }
  if (loadError || !partData) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300">
        {loadError ?? '問題がありません'}
      </div>
    );
  }

  const renderQuestionCard = (question: Part7Question, setIndex: number) => {
    const answerRecord = session?.answers[question.no];
    const isExpanded = expandedExplanations.has(question.no);
    const globalIndex = allQuestions.findIndex((item) => item.no === question.no);

    return (
      <div
        key={question.no}
        id={`q-no-${question.no}`}
        className="scroll-mt-32"
        onMouseEnter={() => {
          setActiveSetIndex(setIndex);
          setCurrentIndex(globalIndex);
        }}
        onFocusCapture={() => {
          setActiveSetIndex(setIndex);
          setCurrentIndex(globalIndex);
        }}
      >
        <Card className={globalIndex === currentIndex ? 'ring-2 ring-purple-400 dark:ring-purple-500' : ''}>
          <button
            type="button"
            className="mb-3 flex w-full items-center gap-2 text-left"
            onClick={() => {
              setCurrentIndex(globalIndex);
              setActiveSetIndex(setIndex);
            }}
          >
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400">No. {question.no}</span>
            {mode === 'practice' && (
              <span className="rounded-full bg-purple-50 px-2 py-0.5 text-xs font-medium text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                {TYPE_LABEL[question.type]}
              </span>
            )}
          </button>

          {question.intentionTarget && (
            <blockquote className="mb-3 rounded-lg border-l-4 border-cyan-400 bg-cyan-50 px-3 py-2 text-sm text-cyan-900 dark:bg-cyan-950 dark:text-cyan-100">
              <span className="font-semibold">{question.intentionTarget.sender}: </span>
              &ldquo;{question.intentionTarget.utteranceEn}&rdquo;
            </blockquote>
          )}
          {mode === 'practice' && question.targetWord && (
            <p className="mb-2 text-xs text-zinc-500 dark:text-zinc-400">
              Target word: <mark className="rounded bg-yellow-200 px-1 font-semibold text-inherit dark:bg-yellow-700">{question.targetWord}</mark>
            </p>
          )}
          <p className="mb-4 text-base font-medium leading-7 text-zinc-900 dark:text-zinc-100">
            {question.questionEn}
          </p>
          <ChoiceList
            choices={question.choices}
            selected={answerRecord?.chosen}
            onSelect={(label) => handleSelect(question, label)}
            showResult={isExpanded}
            disabled={mode === 'practice' && isExpanded}
          />
          {isExpanded && (
            <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950">
              <p className="mb-1 text-xs font-semibold text-blue-700 dark:text-blue-300">解説</p>
              <p className="text-sm leading-6 text-blue-900 dark:text-blue-100">{question.explanationOverall}</p>
            </div>
          )}
        </Card>
      </div>
    );
  };

  const passageTabs = (set: Part7Set, setIndex: number) => {
    const activePassageIndex = activePassageBySet[setIndex] ?? 0;
    return (
      <>
        {set.passages.length > 1 && (
          <div className="mb-3 flex gap-2 overflow-x-auto">
            {set.passages.map((passage, passageIndex) => (
              <button
                key={passage.passageId}
                type="button"
                onClick={() => setActivePassageBySet((previous) => ({ ...previous, [setIndex]: passageIndex }))}
                className={[
                  'min-h-10 flex-shrink-0 rounded-lg px-3 py-2 text-xs font-semibold',
                  passageIndex === activePassageIndex
                    ? 'bg-purple-600 text-white'
                    : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300',
                ].join(' ')}
              >
                Document {passageIndex + 1}
              </button>
            ))}
          </div>
        )}
        <PassageDocument
          passage={set.passages[activePassageIndex] ?? set.passages[0]}
          targetWord={mode === 'practice' ? focusedQuestion?.targetWord : undefined}
        />
      </>
    );
  };

  return (
    <div className="mx-auto max-w-6xl">
      <ExamHeader
        remainingSeconds={remaining}
        totalQuestions={allQuestions.length}
        answeredNos={answeredNos}
        currentIndex={currentIndex}
        onJump={locateQuestion}
        onSubmit={finishPart}
        hideTimer={mode === 'practice'}
        startNo={PART_QUESTION_RANGE[7][0]}
        submitLabel={isLastPart ? '採点する' : '次のパートへ'}
      />
      <p className="border-b border-zinc-200 bg-zinc-50 px-4 py-2 text-xs text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
        Read each document or group of documents and choose the best answer to each question.
      </p>

      {/* スマホ: セットごとに文書を折りたたみ表示 */}
      <div className="space-y-8 px-4 py-5 md:hidden">
        {partData.sets.map((set, setIndex) => {
          const isOpen = mobilePassageOpen[setIndex] ?? false;
          return (
            <section key={setIndex} className="space-y-4">
              <button
                type="button"
                onClick={() => setMobilePassageOpen((previous) => ({ ...previous, [setIndex]: !isOpen }))}
                className="flex min-h-12 w-full items-center justify-between rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-bold dark:border-zinc-700 dark:bg-zinc-900"
              >
                <span>Set {setIndex + 1} · {set.setType}</span>
                <span aria-hidden>{isOpen ? '▲ 文書を閉じる' : '▼ 文書を開く'}</span>
              </button>
              {isOpen && (
                <div className="max-h-[55vh] overflow-y-auto rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900">
                  {passageTabs(set, setIndex)}
                </div>
              )}
              <div className="space-y-4">
                {set.questions.map((question) => renderQuestionCard(question, setIndex))}
              </div>
            </section>
          );
        })}
        {answeredNos.size > 0 && (
          <Button variant="primary" size="lg" fullWidth onClick={finishPart}>
            {isLastPart ? '採点する' : '次のパートへ'}（{answeredNos.size}/{allQuestions.length}問 回答済み）
          </Button>
        )}
      </div>

      {/* PC: 左文書・右設問の独立スクロール */}
      <div className="hidden items-start gap-6 px-4 py-6 md:grid md:grid-cols-2">
        <aside className="sticky top-32 max-h-[calc(100vh-9rem)] overflow-y-auto rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
          <div className="mb-4 flex gap-2 overflow-x-auto border-b border-zinc-200 pb-3 dark:border-zinc-700">
            {partData.sets.map((set, setIndex) => (
              <button
                key={setIndex}
                type="button"
                onClick={() => setActiveSetIndex(setIndex)}
                className={[
                  'min-h-9 flex-shrink-0 rounded-lg px-3 py-1.5 text-xs font-bold',
                  setIndex === activeSetIndex
                    ? 'bg-purple-600 text-white'
                    : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300',
                ].join(' ')}
              >
                Set {setIndex + 1}
              </button>
            ))}
          </div>
          {partData.sets[activeSetIndex] && passageTabs(partData.sets[activeSetIndex], activeSetIndex)}
        </aside>

        <div className="space-y-8">
          {partData.sets.map((set, setIndex) => (
            <section key={setIndex} className="space-y-4">
              <h2 className="border-l-4 border-purple-500 pl-3 text-sm font-bold text-zinc-700 dark:text-zinc-300">
                Set {setIndex + 1} · {set.setType}
              </h2>
              {set.questions.map((question) => renderQuestionCard(question, setIndex))}
            </section>
          ))}
          {answeredNos.size > 0 && (
            <div className="flex justify-center pb-8">
              <Button variant="primary" size="lg" onClick={finishPart}>
                {isLastPart ? '採点する' : '次のパートへ'}（{answeredNos.size}/{allQuestions.length}問 回答済み）
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
