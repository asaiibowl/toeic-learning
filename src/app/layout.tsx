import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TOEIC L&R リーディング演習",
  description: "TOEIC Listening & Reading テスト Part5/6/7 リーディング演習アプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 dark:bg-zinc-950">
        {/* ヘッダー */}
        <header className="sticky top-0 z-10 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700 shadow-sm">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
            {/* アプリ名 */}
            <Link
              href="/"
              className="text-lg font-bold text-zinc-900 dark:text-zinc-50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              TOEIC L&amp;R 演習
            </Link>
            {/* ナビゲーション */}
            <nav className="flex items-center gap-4">
              <Link
                href="/history/"
                className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
              >
                学習履歴
              </Link>
            </nav>
          </div>
        </header>

        {/* メインコンテンツ */}
        <main className="flex-1 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        {/* フッター */}
        <footer className="border-t border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 text-center text-xs text-zinc-400 dark:text-zinc-600">
            TOEIC L&amp;R リーディング演習アプリ — オリジナル問題のみ収録
          </div>
        </footer>
      </body>
    </html>
  );
}
