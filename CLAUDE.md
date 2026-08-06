@AGENTS.md

# TOEIC L&R リーディング演習アプリ

TOEIC Reading セクション（Part 5/6/7）を本番形式で演習する Web アプリ。
Next.js App Router + TypeScript + Tailwind、`output: 'export'` による完全静的エクスポートで GitHub Pages に配信する。

## 最重要の設計原則

### 1. 問題パートと解答パートを厳格に隔離する
**演習画面（`/test/[testId]/part/[part]`）では、日本語訳・解説・正解を一切描画しない。**

- 本文・設問文・選択肢は**英語のみ**。`sentenceJa` / `questionJa` / `ja` / `bodyJa` / `explanation` / `explanationOverall` を演習 UI に出さない
- 正誤を示す色・アイコンも出さない。進捗ドットは「回答済み / 未回答」のみを区別し、正誤で色分けしない
- **唯一の例外**が `practice` モード。ユーザーが明示的に選んだ時だけ、回答直後にその設問の正誤と解説を展開してよい。`full` / `part` モードでは絶対に出さない
- 訳・解説・正解の提示は**解説ページ（`/test/[testId]/review`）の専任責務**

新しい演習 UI を足す時は、この原則に反していないか必ず自己チェックすること。

### 2. Zod スキーマが唯一の真実
`src/schemas/question.schema.ts` にスキーマを定義し、TypeScript 型は `z.infer` で導出する。
`src/types/question.ts` は re-export のみ。型を手書きで二重管理しない。

### 3. 全選択肢に解説を書く
`Choice.explanation` は正解・不正解を問わず必須（空文字はスキーマエラー）。
解説ページでは A〜D の**全選択肢**の解説を省略せず表示する。

### 4. 静的エクスポートの制約
- サーバは存在しない。データは `public/data/` の静的 JSON、学習履歴は IndexedDB（端末ローカル）
- 動的ルートには必ず `generateStaticParams` を実装する
- `useSearchParams` は `<Suspense>` で包む
- IndexedDB / localStorage / `Date.now()` は `useEffect` 内でのみ触る（hydration ミスマッチ防止）
- fetch のパスは `src/lib/data/loader.ts` 経由。`basePath` をハードコードしない

### 5. 著作権
実際の TOEIC 過去問は ETS/IIBC の著作物。転載は禁止。
収録するのは公式フォーマットに準拠した**オリジナル問題**のみ。

## TOEIC 公式フォーマット（厳守）

| Part | 内容 | 問数 | 問番号 | 目安時間 |
|---|---|---|---|---|
| 5 | 短文穴埋め | 30 | 101–130 | 10分 |
| 6 | 長文穴埋め（4文書 × 4問、各文書1問は文挿入） | 16 | 131–146 | 8分 |
| 7 | 読解 | 54 | 147–200 | 57分 |

Part 7 の内訳: single 10セット（各2〜4問・計29問）/ double 2セット（各5問）/ triple 3セット（各5問）
Reading セクション全体で 75分・100問。

## コマンド

```
npm run dev            # 開発サーバー
npm run build          # 静的エクスポート（out/ に生成）
npm run lint
npm run validate-data  # 問題データの Zod 検証（CI でビルド前に実行）
npx tsc --noEmit
```

## 問題データの追加

1. `scripts/templates/` のテンプレートを `public/data/tests/<testId>/` にコピー
2. 中身を記入（英日対訳・全選択肢の解説・evidence をすべて埋める）
3. `public/data/index.json` に登録し、`meta.json` の `completeness` を実収録問数に合わせる
4. `npm run validate-data` で 0 エラーを確認

問数が満数（30/16/54）に達していないセットも「ドリルモード」として動作する。

## コメント・UI 文言

コード内コメントおよび UI 文言はすべて日本語。

## Claude Code 引き継ぎ（2026-08-07）

### Git / GitHub

- 公開リポジトリ: `https://github.com/asaiibowl/toeic-learning`
- ローカルブランチ: `main`
- リモート: `origin/main`
- アプリ本体の完成コミット: `aac69be`
- 現在の公開ワークフロー: `.github/workflows/deploy.yml`
- Pages用ブランチ: `gh-pages`
- 予定URL: `https://asaiibowl.github.io/toeic-learning/`

この引き継ぎ追記は、不要なPages再実行を避けるためローカルコミットのみとし、GitHubにはpushしていない。
次にpushすると `main` のPagesワークフローが起動する。

### Pagesの現在地

- Pages設定は `build_type=legacy`、配信元は `gh-pages` の `/`、HTTPS有効
- `main` の検証・ビルド・`gh-pages`への配置は成功している
  - 成功run: `https://github.com/asaiibowl/toeic-learning/actions/runs/31110270085`
- GitHub管理の最終Pages deployだけが10分間進まず、タイムアウトしている
  - 直近の失敗run: `https://github.com/asaiibowl/toeic-learning/actions/runs/31110329077`
  - ログでは `deployment_in_progress` が続いた後に `Timeout reached, aborting!`
- 2026-08-07の最終確認時点で公開URLは404、Pages APIは `status=errored`
- artifact方式、`gh-pages`方式、Pages設定の削除・再作成、古いdeploymentの明示キャンセルを試したが、いずれもGitHub管理の最終deployで停止した
- 他リポジトリのPages利用とは競合しない。本サイトはユーザーサイトではなくproject site

### 再試行手順

```powershell
# 1. 現在状態を確認
gh api repos/asaiibowl/toeic-learning/pages
gh run list --repo asaiibowl/toeic-learning --limit 5

# 2. mainの公開ワークフローを手動実行
gh workflow run "Deploy to GitHub Pages" --repo asaiibowl/toeic-learning --ref main

# 3. 表示されたrun IDを監視
gh run watch <run-id> --repo asaiibowl/toeic-learning --exit-status

# 4. 続いて発生するGitHub管理の pages build and deployment を監視
gh run list --repo asaiibowl/toeic-learning --limit 5

# 5. 公開確認
Invoke-WebRequest -Uri 'https://asaiibowl.github.io/toeic-learning/' -UseBasicParsing
```

再び最終deployだけが10分でタイムアウトする場合、アプリ修正やPages再設定を繰り返さず、
最小Pagesリポジトリでアカウント全体か当該リポジトリ固有かを切り分けるか、run URLを添えてGitHub Supportへ問い合わせる。
