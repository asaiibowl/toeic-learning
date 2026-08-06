/**
 * パート演習ページ（サーバーコンポーネント）
 *
 * generateStaticParams で testId × ['5','6','7'] の全組み合わせを生成。
 * クライアント処理は PartExamClient に委譲。
 */

import { listTestIds } from '@/lib/data/server';
import { PartExamClient } from './PartExamClient';

/** 静的エクスポート用: testId × part の全組み合わせ */
export async function generateStaticParams() {
  const testIds = listTestIds();
  return testIds.flatMap((testId) =>
    ['5', '6', '7'].map((part) => ({ testId, part })),
  );
}

interface Props {
  params: Promise<{ testId: string; part: string }>;
}

export default async function PartPage({ params }: Props) {
  const { testId, part } = await params;
  return <PartExamClient testId={testId} part={part} />;
}
