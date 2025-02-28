# 代々木駅前美容クリニック ウェブサイト

Next.js、TypeScript、Tailwind CSSを使用した美容クリニックのWebサイトです。

## 技術スタック

- [Next.js](https://nextjs.org/) - Reactフレームワーク
- [TypeScript](https://www.typescriptlang.org/) - 型安全なJavaScript
- [Tailwind CSS](https://tailwindcss.com/) - ユーティリティファーストCSSフレームワーク
- [Strapi](https://strapi.io/) - ヘッドレスCMS

## 開発環境のセットアップ

1. リポジトリをクローンする
```bash
git clone <repository-url>
cd clinicweb
```

2. 依存関係をインストール
```bash
npm install
```

3. 環境変数の設定
`.env.local.example`を`.env.local`にコピーして、適切な値を設定します。
```bash
cp .env.local.example .env.local
```

4. 開発サーバーを起動
```bash
npm run dev
```

## Strapiクラウドのセットアップ

このプロジェクトはStrapiをヘッドレスCMSとして使用しています。以下の手順でセットアップを行います。

### 1. Strapiクラウドアカウントの作成

[Strapi Cloud](https://strapi.io/)で無料アカウントを作成し、新しいプロジェクトを作成します。

### 2. コンテンツモデルの作成

以下のコンテンツタイプを作成します：

#### クリニック基本情報 (clinic-info)
- clinicName (テキスト) - クリニック名
- shortDescription (テキスト) - 短い説明文
- fullDescription (リッチテキスト) - 詳細説明
- address (テキスト) - 住所
- phoneNumber (テキスト) - 電話番号
- logo (メディア) - ロゴ画像
- heroImage (メディア) - ヒーロー画像
- openingHours (リピーターフィールド) - 営業時間
  - day (テキスト) - 曜日
  - hours (テキスト) - 時間

#### 医師情報 (doctor)
- name (テキスト) - 医師名
- title (テキスト) - 肩書き
- specialty (テキスト) - 専門分野
- profile (リッチテキスト) - 経歴・プロフィール
- message (リッチテキスト) - 医師からのメッセージ
- photo (メディア) - 医師の写真
- order (数値) - 表示順

#### 施術メニュー (treatment)
- title (テキスト) - 施術名
- slug (テキスト) - URL用スラッグ
- shortDescription (テキスト) - 短い説明
- description (リッチテキスト) - 詳細説明
- effects (リッチテキスト) - 効果
- risks (リッチテキスト) - リスク・副作用
- thumbnail (メディア) - サムネイル画像
- featuredImage (メディア) - メイン画像
- prices (リピーターフィールド) - 料金情報
  - title (テキスト) - 料金タイトル
  - amount (数値) - 金額
  - unit (テキスト) - 単位
- category (リレーション) - カテゴリーとの関連付け
- isPopular (真偽値) - 人気メニューかどうか
- order (数値) - 表示順

#### 施術カテゴリー (treatment-category)
- name (テキスト) - カテゴリー名
- slug (テキスト) - URL用スラッグ
- description (テキスト) - 説明
- icon (テキスト) - アイコン名
- order (数値) - 表示順

#### 症例・実績 (case-study)
- title (テキスト) - タイトル
- slug (テキスト) - URL用スラッグ
- treatment (リレーション) - 関連施術への参照
- beforeImage (メディア) - 施術前画像
- afterImage (メディア) - 施術後画像
- patientAge (テキスト) - 患者年齢層
- patientGender (テキスト) - 患者性別
- description (リッチテキスト) - 症例説明
- patientComment (テキスト) - 患者コメント
- publishDate (日付) - 公開日

#### よくある質問 (faq)
- question (テキスト) - 質問
- answer (リッチテキスト) - 回答
- category (テキスト) - カテゴリー
- relatedTreatments (リレーション、複数) - 関連施術
- order (数値) - 表示順

#### ブログ記事 (blog-post)
- title (テキスト) - タイトル
- slug (テキスト) - URL用スラッグ
- summary (テキスト) - 要約
- content (リッチテキスト) - 本文
- featuredImage (メディア) - メイン画像
- author (リレーション) - 著者（医師）
- publishDate (日付) - 公開日
- tags (テキスト、複数) - タグ
- relatedPosts (リレーション、複数) - 関連記事
- relatedTreatments (リレーション、複数) - 関連施術

#### キャンペーン情報 (campaign)
- title (テキスト) - タイトル
- description (リッチテキスト) - 説明
- image (メディア) - キャンペーン画像
- startDate (日付) - 開始日
- endDate (日付) - 終了日
- regularPrice (数値) - 通常価格
- campaignPrice (数値) - キャンペーン価格
- relatedTreatments (リレーション、複数) - 関連施術
- isActive (真偽値) - 有効かどうか

#### お知らせ・ニュース (notice)
- title (テキスト) - タイトル
- content (リッチテキスト) - 内容
- publishDate (日付) - 公開日
- category (テキスト) - カテゴリー
- isImportant (真偽値) - 重要なお知らせかどうか

#### 採用情報 (recruitment)
- position (テキスト) - 募集職種
- jobDescription (リッチテキスト) - 職務内容
- requirements (リッチテキスト) - 応募要件
- workingHours (テキスト) - 勤務時間
- salary (テキスト) - 給与
- benefits (リッチテキスト) - 福利厚生
- applicationProcess (リッチテキスト) - 応募方法
- isActive (真偽値) - 募集中かどうか

### 3. APIキーの取得

1. Strapiダッシュボードから「Settings」→「API Tokens」を選択
2. 「Create new API Token」をクリックして新しいキーを作成
3. トークン名（例：CMS Token）を入力し、権限を「Full Access」または必要な権限に設定
4. 表示されたトークンを`.env.local`ファイルに設定

```bash
NEXT_PUBLIC_STRAPI_API_URL=https://your-strapi-cloud-url.api.strapi.io
NEXT_PUBLIC_STRAPI_API_TOKEN=取得したAPIトークン
```

### 4. コンテンツ入力

コンテンツモデル作成後、実際のコンテンツを入力していきます。
最低限必要なのは以下のコンテンツです：

- クリニック基本情報 (1件)
- 施術カテゴリー (数件)
- 施術メニュー (複数件)
- 医師情報 (最低1件)

## ファイル構造

```
clinicweb/
├── components/             # 共通コンポーネント
│   ├── Layout.tsx          # 共通レイアウト
│   └── RichTextRenderer.tsx # StrapiのリッチテキストレンダラーM
├── lib/                    # ユーティリティ関数
│   └── strapi.ts           # Strapi連携用関数
├── pages/                  # ページコンポーネント
│   ├── index.tsx           # トップページ
│   ├── treatments/         # 施術関連ページ
│   └── ...                 # その他ページ
├── public/                 # 静的ファイル
├── styles/                 # スタイル定義
├── .env.local              # 環境変数（非公開）
├── .env.local.example      # 環境変数のサンプル
├── next.config.js          # Next.js設定
├── tailwind.config.js      # Tailwind CSS設定
└── package.json            # 依存関係
```

## デプロイ

このプロジェクトはVercelにデプロイするのが最も簡単です。

1. [Vercel](https://vercel.com/)でアカウントを作成
2. リポジトリを接続してデプロイ
3. 環境変数を設定

## Strapi Cloud と Next.js の連携メリット

- **コンテンツの柔軟な管理**: マーケティングチームや非技術者でもコンテンツを更新可能
- **APIによるマルチプラットフォーム対応**: 同じコンテンツをウェブサイト、モバイルアプリなどで活用可能
- **高いパフォーマンス**: Strapiの高速APIとNext.jsの静的生成機能の組み合わせ
- **スケーラビリティ**: コンテンツが増えても管理しやすい
- **カスタマイズ性**: StrapiとNext.js共に高いカスタマイズ性を提供

## ライセンス

このプロジェクトは[MIT License](LICENSE)のもとで公開されています。 