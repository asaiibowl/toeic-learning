import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages 向け静的エクスポート設定
  output: 'export',
  // リポジトリ名に合わせて NEXT_PUBLIC_BASE_PATH 環境変数で制御
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? '',
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
