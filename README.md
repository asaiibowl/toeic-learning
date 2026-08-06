# TOEIC L&R リーディング演習アプリ

TOEIC Listening & Reading テスト Part5/6/7 のリーディング問題を練習するための Next.js 製静的 Web アプリです。

## 主な機能

- 通し75分・パート別・即時解説付き練習の3モード
- Part 5/6/7対応（複数文書・チャット・文挿入・意図・同義語問題を含む）
- 公式構成に準拠（Part 5: 30問、Part 6: 4文書×4問、Part 7: 単一文書29問＋複数文書25問）
- 途中解答とタイマーの自動保存、ブラウザ再起動後の再開
- 全体・Part別・設問タイプ別の採点と推定Readingスコア
- 英日対訳、根拠ハイライト、A〜D全選択肢の解説、誤答のみ表示、印刷
- IndexedDBによる学習履歴・弱点分析と履歴JSONの入出力
- GitHub Pages向け完全静的エクスポート

出題数と形式は、[IIBC公式「テストの形式と構成」](https://www.iibc-global.org/toeic/test/lr/about/format.html) に基づいています。収録問題はすべて独自作成で、公式問題の転載はありません。

## セットアップ手順

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# データ検証
npm run validate-data

# ユニットテスト
npm test

# ESLint・型検査
npm run lint
npx tsc --noEmit --incremental false

# 本番ビルド
npm run build
```

## 問題データの追加手順

### 1. テンプレートをコピーする

```bash
# テストセット用ディレクトリを作成
mkdir public/data/tests/YOUR_TEST_ID

# テンプレートをコピー
copy scripts\templates\meta-template.json public\data\tests\YOUR_TEST_ID\meta.json
copy scripts\templates\part5-template.json public\data\tests\YOUR_TEST_ID\part5.json
copy scripts\templates\part6-template.json public\data\tests\YOUR_TEST_ID\part6.json
copy scripts\templates\part7-template.json public\data\tests\YOUR_TEST_ID\part7.json
```

### 2. JSON を記入する

各 JSON ファイルを開き、`TODO` の部分を実際の問題データに置き換えます。

- `meta.json`: テストセットのメタデータ（タイトル、問数など）
- `part5.json`: 短文穴埋め問題（No.101–130）
- `part6.json`: 長文穴埋め問題（No.131–146）
- `part7.json`: 読解問題（No.147–200）

#### データ形式のポイント

**Part5**
- `sentence`: 空所は `______`（アンダースコア6個）で表記
- `tag`: `grammar` / `vocab` / `preposition` / `conjunction` / `verb_form` / `pronoun` / `other` のいずれか

**Part6**
- 本文の空所: `______[131]` のように問番号を埋め込む
- 各文書の4問目は `"type": "insertion"` にする
- `insertion` 問題の選択肢: 挿入する文の候補4つ

**Part7**
- `setType`: `single` / `double` / `triple` のいずれか
- `evidence.snippetEn`: 本文に含まれる文字列を正確にコピーすること（検証で照合されます）
- `explanation`: 全選択肢（正解・不正解を問わず）に必ず記入

### 3. index.json に登録する

`public/data/index.json` を開き、`tests` 配列に新しいテストセットのメタデータを追加します。

```json
{
  "version": 1,
  "tests": [
    {
      "testId": "YOUR_TEST_ID",
      "title": "テストセットのタイトル",
      "description": "説明文",
      "createdAt": "2024-01-01T00:00:00",
      "tags": ["practice"],
      "completeness": {
        "part5": 30,
        "part6": 16,
        "part7": 54
      }
    }
  ]
}
```

### 4. データを検証する

```bash
npm run validate-data
```

エラーが表示された場合は、指示に従って修正してください。
`0件のエラー` と表示されれば OK です。

## GitHub Pages 公開手順

### 1. リポジトリを作成する

GitHub で新しいリポジトリを作成します。

### 2. ベースパスを設定する

リポジトリ名がサブパスになる場合（例: `https://yourname.github.io/toeic-learning/`）は、`.github/workflows/deploy.yml` の以下の行を変更します。

```yaml
NEXT_PUBLIC_BASE_PATH: "/toeic-learning"  # リポジトリ名に合わせて変更
```

GitHub Pages のカスタムドメインを使用する場合や、Organization の `<name>.github.io` リポジトリの場合は空文字列のままで構いません。

### 3. GitHub Pages を有効化する

リポジトリの **Settings** → **Pages** で:
- Source: **GitHub Actions** を選択

### 4. プッシュする

```bash
git init
git add .
git commit -m "初回コミット"
git remote add origin https://github.com/YOUR_NAME/YOUR_REPO.git
git push -u origin main
```

`main` ブランチにプッシュすると自動でビルド・デプロイが実行されます。

## スキーマ設計

問題データの型定義は `src/schemas/question.schema.ts` に Zod スキーマとして集約されています。
TypeScript 型は `z.infer<>` で導出しており、`src/types/question.ts` は re-export のみです。

## ライセンス

収録されている問題はすべてオリジナルです。TOEIC 公式問題の転載は含まれていません。
