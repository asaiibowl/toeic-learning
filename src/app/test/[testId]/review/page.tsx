/**
 * 解答・解説ページ（サーバーコンポーネント）
 *
 * 静的エクスポート用の generateStaticParams を持つ。
 * クライアント処理（IndexedDB アクセス・問題表示）は ReviewClient に委譲する。
 */

import { listTestIds } from '@/lib/data/server';
import { ReviewClient } from './ReviewClient';
import { Suspense } from 'react';

/** 静的エクスポート用: テスト ID の一覧から静的パスを生成する */
export function generateStaticParams() {
  const testIds = listTestIds();
  return testIds.map((testId) => ({ testId }));
}

interface Props {
  params: Promise<{ testId: string }>;
}

export default async function ReviewPage({ params }: Props) {
  const { testId } = await params;
  return (
    <Suspense fallback={<div className="py-24 text-center text-zinc-500">読み込み中...</div>}>
      <ReviewClient testId={testId} />
    </Suspense>
  );
}
