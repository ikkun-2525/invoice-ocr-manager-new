# Invoice OCR Manager

請求書のOCR処理と管理を行うWebアプリケーション

## 機能

- 請求書画像のアップロード（ドラッグ＆ドロップ対応）
- OCRによる請求書データの自動抽出
- 請求書データの編集
- 案件別内訳の登録
- ユーザーロールに応じた承認フロー
  - アップロード担当者：目視確認
  - 営業担当者：申請
  - 経理担当者：承認/差戻し

## 技術スタック

- Next.js 15.3.3
- TypeScript
- Tailwind CSS

## 開発環境のセットアップ

```bash
# リポジトリのクローン
git clone [your-repository-url]
cd invoice-ocr-manager

# 依存パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev
```

## プロジェクト構造

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # アップロード画面
│   └── invoice/
│       └── [id]/
│           └── page.tsx   # 請求書詳細画面
├── components/            # UIコンポーネント
│   └── invoice/
│       ├── OCRDataForm.tsx
│       ├── ProjectBreakdownForm.tsx
│       ├── InvoicePreview.tsx
│       └── ActionButtons.tsx
└── hooks/                # カスタムフック
    └── useInvoiceDetail.ts
```

## 今後の実装予定

- OCR処理の実装
- APIとの連携
- バックエンド機能の実装
- ユーザー認証と権限管理
- テストの追加
- CI/CDの設定
