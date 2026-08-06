import type { ReactNode } from 'react';
import type { AnswerRecord } from '@/lib/storage/idb';
import type { Evidence, Part7Data, Part7Question, Passage } from '@/types/question';
import { ChoiceExplanation } from '@/components/review/ChoiceExplanation';

interface Part7ReviewProps {
  data: Part7Data;
  answers: Record<number, AnswerRecord>;
  onlyWrong: boolean;
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

function highlightEvidence(text: string, evidence: Evidence[]): ReactNode[] {
  const snippets = evidence
    .map((item) => item.snippetEn)
    .filter((snippet) => text.includes(snippet))
    .sort((a, b) => b.length - a.length);
  if (snippets.length === 0) return [text];

  const nodes: ReactNode[] = [];
  let rest = text;
  let key = 0;
  while (rest.length > 0) {
    const next = snippets
      .map((snippet) => ({ snippet, index: rest.indexOf(snippet) }))
      .filter((match) => match.index >= 0)
      .sort((a, b) => a.index - b.index)[0];
    if (!next) {
      nodes.push(rest);
      break;
    }
    if (next.index > 0) nodes.push(rest.slice(0, next.index));
    nodes.push(
      <mark
        key={`evidence-${key++}`}
        className="rounded bg-yellow-200 px-0.5 text-inherit dark:bg-yellow-700"
      >
        {next.snippet}
      </mark>,
    );
    rest = rest.slice(next.index + next.snippet.length);
  }
  return nodes;
}

function PassageReview({
  passage,
  evidence,
}: {
  passage: Passage;
  evidence: Evidence[];
}) {
  return (
    <article className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900 print:break-inside-avoid">
      <header className="mb-4 space-y-1 border-b border-zinc-200 pb-3 dark:border-zinc-700">
        <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">{passage.docType}</p>
        {passage.title && <h4 className="font-bold text-zinc-900 dark:text-zinc-100">{passage.title}</h4>}
        {passage.from && <p className="text-xs text-zinc-600 dark:text-zinc-400"><b>From:</b> {passage.from}</p>}
        {passage.to && <p className="text-xs text-zinc-600 dark:text-zinc-400"><b>To:</b> {passage.to}</p>}
      </header>

      {passage.paragraphs && (
        <div className="space-y-4">
          {passage.paragraphs.map((paragraph, index) => {
            const paragraphEvidence = evidence.filter((item) => item.paragraphIndex === index);
            return (
              <div key={index} className="space-y-1">
                <p className="whitespace-pre-line text-sm leading-7 text-zinc-800 dark:text-zinc-200">
                  {highlightEvidence(paragraph.en, paragraphEvidence)}
                </p>
                <p className="border-l-2 border-zinc-200 pl-3 text-sm leading-6 text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
                  {paragraph.ja}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {passage.messages && (
        <div className="space-y-3">
          {passage.messages.map((message, index) => {
            const messageEvidence = evidence.filter((item) => item.paragraphIndex === index);
            return (
              <div key={`${message.sender}-${index}`} className="rounded-xl bg-zinc-50 p-3 dark:bg-zinc-800">
                <div className="mb-1 flex justify-between gap-3 text-xs">
                  <b>{message.sender}</b>
                  <span className="text-zinc-400">{message.timeLabel}</span>
                </div>
                <p className="whitespace-pre-line text-sm leading-6 text-zinc-800 dark:text-zinc-200">
                  {highlightEvidence(message.bodyEn, messageEvidence)}
                </p>
                <p className="mt-2 border-l-2 border-zinc-200 pl-3 text-sm leading-6 text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
                  {message.bodyJa}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </article>
  );
}

function QuestionReview({
  question,
  answer,
}: {
  question: Part7Question;
  answer?: AnswerRecord;
}) {
  const correctChoice = question.choices.find((choice) => choice.isCorrect);
  const isCorrect = answer?.isCorrect;

  return (
    <article
      id={`q${question.no}`}
      className="scroll-mt-28 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900 print:break-inside-avoid"
    >
      <header className={[
        'flex items-center justify-between gap-3 border-b px-4 py-3',
        isCorrect === true
          ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950'
          : isCorrect === false
            ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950'
            : 'border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800',
      ].join(' ')}>
        <div className="flex flex-wrap items-center gap-2">
          <b>No. {question.no}</b>
          <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs text-purple-700 dark:bg-purple-900 dark:text-purple-200">
            {TYPE_LABEL[question.type]}
          </span>
          {answer && (
            <span className="text-sm text-zinc-600 dark:text-zinc-300">
              あなたの解答: <b>{answer.chosen}</b> → 正解: <b className="text-green-700 dark:text-green-300">{correctChoice?.label}</b>
            </span>
          )}
        </div>
        {isCorrect !== undefined && <span className="text-2xl">{isCorrect ? '✓' : '✗'}</span>}
      </header>

      <div className="space-y-4 p-4">
        {question.intentionTarget && (
          <blockquote className="rounded-lg border-l-4 border-cyan-400 bg-cyan-50 px-3 py-2 text-sm dark:bg-cyan-950">
            <b>{question.intentionTarget.sender}:</b> &ldquo;{question.intentionTarget.utteranceEn}&rdquo;
          </blockquote>
        )}
        <div>
          <p className="text-base font-semibold leading-7 text-zinc-900 dark:text-zinc-100">{question.questionEn}</p>
          <p className="mt-1 border-l-2 border-zinc-200 pl-3 text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">{question.questionJa}</p>
        </div>
        <ChoiceExplanation choices={question.choices} userChoice={answer?.chosen} />
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-800 dark:bg-amber-950">
          <p className="mb-1 text-sm font-semibold text-amber-700 dark:text-amber-300">解説</p>
          <p className="text-sm leading-6 text-amber-900 dark:text-amber-100">{question.explanationOverall}</p>
        </div>
        {question.evidence && question.evidence.length > 0 && (
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3 dark:border-yellow-800 dark:bg-yellow-950">
            <p className="mb-2 text-sm font-semibold text-yellow-800 dark:text-yellow-200">正解根拠</p>
            <ul className="space-y-1 text-sm italic text-yellow-900 dark:text-yellow-100">
              {question.evidence.map((item, index) => <li key={index}>&ldquo;{item.snippetEn}&rdquo;</li>)}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}

export function Part7Review({ data, answers, onlyWrong }: Part7ReviewProps) {
  return (
    <section className="space-y-8 px-4 py-4">
      <h2 className="text-base font-semibold text-zinc-800 dark:text-zinc-200">Part 7 読解</h2>
      {data.sets.map((set, setIndex) => {
        const visibleQuestions = onlyWrong
          ? set.questions.filter((question) => !answers[question.no]?.isCorrect)
          : set.questions;
        if (visibleQuestions.length === 0) return null;

        const visibleEvidence = visibleQuestions.flatMap((question) => question.evidence ?? []);
        return (
          <div key={setIndex} className="space-y-5">
            <h3 className="border-l-4 border-purple-500 pl-3 text-sm font-bold text-zinc-700 dark:text-zinc-300">
              Set {setIndex + 1} · {set.setType}
            </h3>
            <div className={set.passages.length > 1 ? 'grid gap-4 lg:grid-cols-2' : ''}>
              {set.passages.map((passage) => (
                <PassageReview
                  key={passage.passageId}
                  passage={passage}
                  evidence={visibleEvidence.filter(
                    (item) => !item.passageId || item.passageId === passage.passageId,
                  )}
                />
              ))}
            </div>
            <div className="space-y-4">
              {visibleQuestions.map((question) => (
                <QuestionReview key={question.no} question={question} answer={answers[question.no]} />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
