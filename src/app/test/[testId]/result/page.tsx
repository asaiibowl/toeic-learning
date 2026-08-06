/**
 * 採点結果ページ（サーバーコンポーネント）
 *
 * 静的エクスポート用の generateStaticParams を持つ。
 * クライアント処理（IndexedDB アクセス・採点）は ResultClient に委譲する。
 */

import { listTestIds } from '@/lib/data/server';
import { ResultClient } from './ResultClient';

/** 静的エクスポート用: テスト ID の一覧から静的パスを生成する */
export function generateStaticParams() {
  const testIds = listTestIds();
  return testIds.map((testId) => ({ testId }));
}

interface Props {
  params: Promise<{ testId: string }>;
}

export default async function ResultPage({ params }: Props) {
  const { testId } = await params;
  return <ResultClient testId={testId} />;
}
