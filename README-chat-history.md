 請求書OCRマネージャー 要件定義書

  1. システム概要

  1.1 システム名

  請求書OCRマネージャー for ZENSIN

  1.2 システム目的

  請求書のデジタル化から承認までの業務フローを自動化・効率化し、アップロー      
  ド担当者、営業担当者、経理担当者の三段階承認プロセスを実現する。

  1.3 システム構成

  - フロントエンド: Next.js 15.3.3 + TypeScript + Tailwind CSS
  - 状態管理: React Hooks + ローカルストレージ
  - ルーティング: Next.js App Router
  - スタイリング: Tailwind CSS + カスタムグラデーション

  2. ユーザーロール定義

  2.1 アップロード担当者

  - 権限: 請求書のアップロード、OCR実行、目視確認
  - アクセス範囲: アップロード画面、請求書詳細画面（reviewing状態）

  2.2 営業担当者

  - 権限: 請求書の確認、承認申請
  - アクセス範囲: 営業画面、請求書詳細画面（reviewed状態）

  2.3 経理担当者

  - 権限: 請求書の承認、差戻し、一括操作、CSV出力
  - アクセス範囲: 経理画面、請求書詳細画面（applied状態）

  3. 画面仕様

  3.1 共通レイアウト

  3.1.1 ヘッダー

  - 背景: ダークグラデーション（slate-900 to slate-800）
  - タイトル: "請求書OCRシステム" + オレンジグラデーションテキスト
  - サブタイトル: "for ZENSIN" バッジ（オレンジ背景）
  - 高さ: 64px（h-16）

  3.1.2 サイドバー

  - 背景: ダークグラデーション（画面下端まで）
  - 幅: 288px（w-72）
  - ナビゲーション項目:
    - アップロード（/）: 請求書をアップロード
    - 営業画面（/sales）: 請求書の確認・申請
    - 経理画面（/accounting）: 承認・差戻し処理
  - アイコン: SVGアイコン + 説明文
  - ホバー効果: オレンジアクセント

  3.2 アップロード画面（/）

  3.2.1 機能要件

  - 請求書ファイルのアップロード機能
  - OCR処理の自動実行
  - アップロード履歴の表示

  3.2.2 UI要件

  - ドラッグ&ドロップ対応のファイルアップローダー
  - 進捗表示
  - アップロード済みファイル一覧

  3.3 営業画面（/sales）

  3.3.1 機能要件

  - 目視確認済み請求書の一覧表示
  - ステータス別フィルタリング
  - 検索機能（会社名、ファイル名）
  - 並び順変更（発行日、金額、支払期日）

  3.3.2 表示項目

  - ファイル名（詳細画面へのリンク）
  - 会社名
  - 金額（¥形式、3桁区切り）
  - 発行日
  - 支払期日
  - ステータス（バッジ表示）
  - 担当営業

  3.3.3 ステータス定義

  - 目視確認済: 青バッジ（bg-blue-100 text-blue-800）
  - 申請済: 黄バッジ（bg-yellow-100 text-yellow-800）
  - 承認済: 緑バッジ（bg-green-100 text-green-800）
  - 差戻し: 赤バッジ（bg-red-100 text-red-800）

  3.4 経理画面（/accounting）

  3.4.1 機能要件

  - 申請済み請求書の一覧表示
  - 一括承認機能（チェックボックス選択）
  - CSV出力機能
  - 個別承認・差戻し機能

  3.4.2 表示項目

  - チェックボックス（申請済みのみ）
  - ファイル名（詳細画面へのリンク）
  - 会社名
  - 金額
  - 支払期日
  - 申請日
  - ステータス
  - 担当営業
  - 操作ボタン（差戻し、承認）

  3.4.3 一括操作機能

  - 選択件数表示
  - 一括承認ボタン
  - 全選択/全解除チェックボックス

  3.5 請求書詳細画面（/invoice/[id]）

  3.5.1 URL パラメータ対応

  - /invoice/[id]: アップロード担当者向け
  - /invoice/[id]?from=sales: 営業担当者向け
  - /invoice/[id]?from=accounting: 経理担当者向け

  3.5.2 画面構成

  左側パネル:
  - OCRデータフォーム
  - 案件別内訳フォーム
  - アクションボタン（固定フッター）

  右側パネル:
  - 請求書プレビュー画面

  3.5.3 進捗表示

  - ステージ別タイトル表示
  - 残り件数表示
  - プログレスバー（処理済み割合）

  3.5.4 OCRデータフォーム項目

  - 請求書番号
  - 発行日
  - 支払期日
  - 適格請求書発行事業者登録番号
  - 支払先名
  - 支払先住所
  - 支払方法
  - 小計金額
  - 消費税額
  - 合計金額
  - 源泉徴収税額
  - 電子帳簿保存法対応状況
  - 備考
  - 振込先情報（銀行名、支店名、口座種別、口座番号、口座名義）

  3.5.5 案件別内訳フォーム項目

  - 内訳No
  - 部門
  - 営業担当者
  - 案件番号
  - 金額
  - 勘定科目
  - 補助科目（用途などの補足）
  - 原価カテゴリ
  - 税区分
  - 検収月

  4. ワークフロー仕様

  4.1 承認フロー

  アップロード → OCR実行 → 目視確認 → 承認申請 → 経理承認 → 完了
      ↓           ↓         ↓         ↓         ↓
   uploading  processing  reviewing  reviewed  applied → approved
                                               ↓
                                            rejected

  4.2 ステータス遷移

  4.2.1 アップロード担当者操作

  - SKIP: 次の請求書へ移動（ステータス維持）
  - 目視確認を完了: reviewing → reviewed

  4.2.2 営業担当者操作

  - SKIP: 次の請求書へ移動（ステータス維持）
  - 経理へ承認申請: reviewed → applied

  4.2.3 経理担当者操作

  - SKIP: 次の請求書へ移動（ステータス維持）
  - 承認: applied → approved
  - 差戻し: applied → rejected（理由入力モーダル）

  4.3 連続処理機能

  4.3.1 ステージ別リスト管理

  - アップロード: upload_invoices （ローカルストレージ）
  - 営業: sales_invoices （ローカルストレージ）
  - 経理: accounting_invoices （ローカルストレージ）

  4.3.2 連続処理ロジック

  1. アクション実行後、処理済み請求書をリストから削除
  2. 残り請求書がある場合、次の請求書詳細画面へ遷移
  3. 残り請求書がない場合、該当ステージの一覧画面へ戻る
  4. ローカルストレージで状態を永続化

  5. UI/UX仕様

  5.1 カラーパレット

  - メインカラー: オレンジ系グラデーション
  - 背景: ダーク系（slate-900, slate-800）
  - アクセント: オレンジ（orange-500, orange-300）
  - テキスト: 白、グレー系

  5.2 アクションボタン仕様

  5.2.1 アップロード担当者ボタン

  - SKIP: グレー背景、ボーダー付き
  - 目視確認を完了: 青グラデーション、👁️アイコン、ホバー効果

  5.2.2 営業担当者ボタン

  - SKIP: グレー背景、ボーダー付き
  - 経理へ承認申請: 緑グラデーション、📤アイコン、ホバー効果

  5.2.3 経理担当者ボタン

  - SKIP: グレー背景、ボーダー付き
  - 差戻し: グレー背景、ボーダー付き
  - 承認: 青背景、シンプルデザイン

  5.3 モーダル仕様

  5.3.1 差戻し理由入力モーダル

  - 背景: 半透明オーバーレイ
  - サイズ: 幅384px（w-96）
  - 要素: テキストエリア、キャンセルボタン、差戻しボタン
  - バリデーション: 理由入力は任意

  6. データ構造

  6.1 請求書データ型（Invoice）

  interface Invoice {
    id: string;
    fileName: string;
    companyName: string;
    amount: number;
    issueDate: string;
    dueDate: string;
    status: 'uploading' | 'processing' | 'reviewing' | 'reviewed' |
  'applied' | 'approved' | 'rejected';
    reviewedAt?: Date;
    appliedAt?: Date;
    approvedAt?: Date;
    rejectedAt?: Date;
    assignedSales: string;
    accountingNotes?: string;
  }

  6.2 OCRデータ型

  interface OCRData {
    invoiceNumber: string;
    issueDate: string;
    dueDate: string;
    invoiceRegistrationNumber: string;
    supplierName: string;
    supplierAddress: string;
    paymentMethod: string;
    subtotal: number;
    taxAmount: number;
    totalAmount: number;
    withholdingTaxAmount: number;
    electronicBookkeepingStatus: string;
    notes: string;
    bankName: string;
    branchName: string;
    accountType: string;
    accountNumber: string;
    accountName: string;
  }

  6.3 案件別内訳データ型

  interface ProjectBreakdown {
    id: string;
    breakdownNo: string;
    department: string;
    salesPerson: string;
    projectNumber: string;
    amount: number;
    accountTitle: string;
    subAccount: string;
    costCategory: string;
    taxCategory: string;
    acceptanceMonth: string;
  }

  7. 技術仕様

  7.1 フロントエンド技術スタック

  - フレームワーク: Next.js 15.3.3
  - 言語: TypeScript
  - スタイリング: Tailwind CSS
  - 状態管理: React Hooks (useState, useEffect)
  - ルーティング: Next.js App Router
  - データ永続化: ローカルストレージ

  7.2 コンポーネント構成

  src/
  ├── app/
  │   ├── layout.tsx (共通レイアウト)
  │   ├── page.tsx (アップロード画面)
  │   ├── sales/page.tsx (営業画面)
  │   ├── accounting/page.tsx (経理画面)
  │   └── invoice/[id]/page.tsx (請求書詳細)
  ├── components/
  │   ├── Header.tsx
  │   ├── Sidebar.tsx
  │   └── invoice/
  │       ├── ActionButtons.tsx
  │       ├── InvoicePreview.tsx
  │       ├── OCRDataForm.tsx
  │       └── ProjectBreakdownForm.tsx
  └── hooks/
      └── useInvoiceDetail.ts

  7.3 ルーティング仕様

  - /: アップロード画面
  - /sales: 営業担当者一覧画面
  - /accounting: 経理担当者一覧画面
  - /invoice/[id]: 請求書詳細画面（ロール判定はクエリパラメータ）
  - /invoice/[id]?from=sales: 営業担当者向け詳細画面
  - /invoice/[id]?from=accounting: 経理担当者向け詳細画面

  8. 運用要件

  8.1 ブラウザサポート

  - Chrome（推奨）
  - Firefox
  - Safari
  - Edge

  8.2 レスポンシブ対応

  - デスクトップ優先設計
  - タブレット対応（一部制限あり）
  - モバイル表示は将来対応予定

  8.3 パフォーマンス要件

  - 初期表示: 3秒以内
  - 画面遷移: 1秒以内
  - ファイルアップロード: 10MB以下を想定

  9. セキュリティ要件

  9.1 データ保護

  - ローカルストレージによるクライアントサイド状態管理
  - 機密情報のサーバーサイド保存（将来実装）

  9.2 アクセス制御

  - ロールベースアクセス制御（URL + クエリパラメータ）
  - 画面レベルでの権限制御

  10. 今後の拡張予定

  10.1 API統合

  - バックエンドAPI連携
  - 実際のOCR処理
  - データベース連携

  10.2 機能拡張

  - ファイルアップロード機能の実装
  - 実際のワークフロー管理
  - 通知機能
  - 監査ログ機能

  10.3 UI/UX改善

  - モバイル対応強化
  - アクセシビリティ対応
  - 多言語対応

  11. 実装履歴

  11.1 2023年11月初期実装
  
  - 基本的なUIレイアウトの実装
  - 請求書データの表示と編集機能
  - ステータス管理の実装
  - 一覧画面と詳細画面の連携

  11.2 2023年12月機能拡張
  
  - OCRデータインターフェースに振込先情報欄を追加（銀行名、支店名、口座種別、口座番号、口座名義）
  - OCRDataFormに振込先情報入力欄を追加
  - InvoicePreviewコンポーネントを2列レイアウトに修正（請求書画像を左側、データと内訳を右側に表示）
  - 内訳サマリーに部門、担当、原価区分の列を追加

  11.3 2024年1月UI改善
  
  - InvoicePreviewを元の1列レイアウトに戻す
  - 内訳サマリーの勘定科目と原価区分を日本語表示に対応
  - 内訳サマリーの項目を調整（勘定科目列を削除、金額列を担当と原価区分の間に移動）
  - エラーハンドリングとナビゲーション機能の強化