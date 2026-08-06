/**
 * テスト開始・再開ページ（サーバーコンポーネント）
 *
 * generateStaticParams で全テスト ID の静的パスを生成。
 * クライアント処理は TestStartClient に委譲。
 */

import { listTestIds } from '@/lib/data/server';
import { TestStartClient } from './TestStartClient';

/** 静的エクスポート用: テスト ID の一覧から静的パスを生成する */
export function generateStaticParams() {
  const testIds = listTestIds();
  return testIds.map((testId) => ({ testId }));
}

interface Props {
  params: Promise<{ testId: string }>;
}

export default async function TestPage({ params }: Props) {
  const { testId } = await params;
  return <TestStartClient testId={testId} />;
}
