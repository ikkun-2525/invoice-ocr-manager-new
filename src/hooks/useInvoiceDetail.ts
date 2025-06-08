import { useState } from 'react';
import { useRouter } from 'next/navigation';

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

interface UserRole {
  isUploader: boolean;
  isSales: boolean;
  isAccounting: boolean;
}

export const useInvoiceDetail = (invoiceId: string) => {
  const router = useRouter();
  
  // ユーザーロール状態（URLパラメータとパスに基づいて動的に設定）
  const [userRole] = useState<UserRole>(() => {
    // 簡易的にパスとクエリパラメータから判断（実際はユーザー認証情報から取得）
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const fromParam = urlParams.get('from');
      const path = window.location.pathname;
      
      // クエリパラメータから判断
      if (fromParam === 'sales') {
        return { isUploader: false, isSales: true, isAccounting: false };
      } else if (fromParam === 'accounting') {
        return { isUploader: false, isSales: false, isAccounting: true };
      }
      
      // パスから判断（従来の方法）
      if (path.includes('sales')) {
        return { isUploader: false, isSales: true, isAccounting: false };
      } else if (path.includes('accounting')) {
        return { isUploader: false, isSales: false, isAccounting: true };
      }
    }
    return { isUploader: true, isSales: false, isAccounting: false };
  });

  // ステータス状態（ロールに応じて初期値を設定）
  const [status, setStatus] = useState<'uploading' | 'processing' | 'reviewing' | 'reviewed' | 'applied' | 'approved' | 'rejected'>(() => {
    if (userRole.isSales) return 'reviewed';
    if (userRole.isAccounting) return 'applied';
    return 'reviewing';
  });

  // 連続レビュー用の請求書リスト（ローカルストレージから復元）
  const [currentInvoiceIndex, setCurrentInvoiceIndex] = useState(0);
  const [invoiceList, setInvoiceList] = useState(() => {
    // ローカルストレージからリストを復元
    if (typeof window !== 'undefined') {
      const storageKey = userRole.isUploader ? 'upload_invoices' : 
                        userRole.isSales ? 'sales_invoices' : 
                        userRole.isAccounting ? 'accounting_invoices' : '';
      
      const storedList = localStorage.getItem(storageKey);
      if (storedList) {
        return JSON.parse(storedList);
      }
    }
    
    // 初回のみデフォルトリストを生成
    const defaultList = userRole.isUploader ? ['inv1', 'inv2', 'inv3'] :
                       userRole.isSales ? ['inv4', 'inv5', 'inv6'] :
                       userRole.isAccounting ? ['inv7', 'inv8', 'inv9'] : [];
    
    const filteredList = defaultList.filter(id => id !== invoiceId);
    
    // ローカルストレージに保存
    if (typeof window !== 'undefined') {
      const storageKey = userRole.isUploader ? 'upload_invoices' : 
                        userRole.isSales ? 'sales_invoices' : 
                        userRole.isAccounting ? 'accounting_invoices' : '';
      localStorage.setItem(storageKey, JSON.stringify(filteredList));
    }
    
    return filteredList;
  });

  // OCRデータ状態
  const [ocrData, setOcrData] = useState<OCRData>({
    invoiceNumber: "INV-12345",
    issueDate: "2023-06-15",
    dueDate: "2023-07-15",
    invoiceRegistrationNumber: "T1234567890123",
    supplierName: "株式会社サンプル",
    supplierAddress: "東京都渋谷区サンプル町1-2-3",
    paymentMethod: "bank_transfer",
    subtotal: 350000,
    taxAmount: 35000,
    totalAmount: 385000,
    withholdingTaxAmount: 0,
    electronicBookkeepingStatus: "compliant",
    notes: "サンプルの請求書データです。",
    bankName: "",
    branchName: "",
    accountType: "",
    accountNumber: "",
    accountName: ""
  });

  // 案件別内訳状態
  const [breakdowns, setBreakdowns] = useState<ProjectBreakdown[]>([
    {
      id: "1",
      breakdownNo: "001",
      department: "営業部",
      salesPerson: "山田太郎",
      projectNumber: "PRJ-001",
      amount: 100000,
      accountTitle: "outsourcing",
      subAccount: "コンサルティング",
      costCategory: "sga_var_ads",
      taxCategory: "taxable_10",
      acceptanceMonth: "2023-06"
    },
    {
      id: "2",
      breakdownNo: "002",
      department: "開発部",
      salesPerson: "鈴木一郎",
      projectNumber: "PRJ-002",
      amount: 200000,
      accountTitle: "commission",
      subAccount: "システム開発",
      costCategory: "dept_sga_salary",
      taxCategory: "taxable_10",
      acceptanceMonth: "2023-06"
    },
    {
      id: "3",
      breakdownNo: "003",
      department: "サポート部",
      salesPerson: "佐藤花子",
      projectNumber: "PRJ-003",
      amount: 50000,
      accountTitle: "utilities",
      subAccount: "保守サポート",
      costCategory: "common_sga_saas",
      taxCategory: "taxable_10",
      acceptanceMonth: "2023-06"
    }
  ]);

  // OCRデータ更新ハンドラー
  const handleOCRDataChange = (field: keyof OCRData, value: string | number) => {
    setOcrData(prev => ({ ...prev, [field]: value }));
  };

  // 内訳更新ハンドラー
  const handleBreakdownChange = (index: number, field: keyof ProjectBreakdown, value: string | number) => {
    setBreakdowns(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  // 内訳追加ハンドラー
  const addBreakdown = () => {
    setBreakdowns(prev => [...prev, {
      id: Math.random().toString(36).substr(2, 9),
      breakdownNo: "",
      department: "",
      salesPerson: "",
      projectNumber: "",
      amount: 0,
      accountTitle: "",
      subAccount: "",
      costCategory: "",
      taxCategory: "",
      acceptanceMonth: ""
    }]);
  };

  // 次の請求書に移動する共通関数
  const moveToNextInvoice = () => {
    console.log('moveToNextInvoice called');
    console.log('Current invoiceList:', invoiceList);
    console.log('Current currentInvoiceIndex:', currentInvoiceIndex);
    console.log('User role:', userRole);
    
    // リストから現在の請求書を削除して更新されたリストを取得
    const updatedList = invoiceList.filter((_, index) => index !== currentInvoiceIndex);
    console.log('Updated list after filter:', updatedList);
    
    // ローカルストレージにも保存
    const storageKey = userRole.isUploader ? 'upload_invoices' : 
                      userRole.isSales ? 'sales_invoices' : 
                      userRole.isAccounting ? 'accounting_invoices' : '';
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, JSON.stringify(updatedList));
    }
    
    // 状態を更新
    setInvoiceList(updatedList);
    
    if (updatedList.length > 0) {
      // 次の請求書がある場合は移動（削除後のリストの最初の要素）
      const nextInvoiceId = updatedList[0];
      console.log('Moving to next invoice:', nextInvoiceId);
      
      // 現在のステージに応じたパスで次の請求書詳細画面に移動
      if (userRole.isUploader) {
        router.push(`/invoice/${nextInvoiceId}`);
      } else if (userRole.isSales) {
        router.push(`/invoice/${nextInvoiceId}?from=sales`);
      } else if (userRole.isAccounting) {
        router.push(`/invoice/${nextInvoiceId}?from=accounting`);
      }
    } else {
      // 全ての請求書処理完了後は各ステージのトップ画面に戻る
      console.log('No more invoices, returning to stage home');
      
      // ローカルストレージをクリア
      if (typeof window !== 'undefined') {
        localStorage.removeItem(storageKey);
      }
      
      if (userRole.isUploader) {
        console.log('Navigating to upload home');
        router.push('/'); // アップロード画面
      } else if (userRole.isSales) {
        console.log('Navigating to sales home');
        router.push('/sales'); // 営業画面
      } else if (userRole.isAccounting) {
        console.log('Navigating to accounting home');
        router.push('/accounting'); // 経理画面
      }
    }
  };

  // SKIPハンドラー
  const handleSkip = () => {
    moveToNextInvoice();
  };

  // アクションハンドラー
  const handleVisualConfirmation = async () => {
    // TODO: 目視確認APIの呼び出し
    console.log("目視確認完了");
    setStatus('reviewed');
    
    // 次の請求書に移動
    moveToNextInvoice();
  };

  const handleApply = async () => {
    // TODO: 申請APIの呼び出し
    console.log("申請完了");
    setStatus('applied');
    
    // 次の請求書に移動
    moveToNextInvoice();
  };

  const handleApprove = async () => {
    // TODO: 承認APIの呼び出し
    console.log("承認完了");
    setStatus('approved');
    
    // 次の請求書に移動
    moveToNextInvoice();
  };

  const handleReject = async (reason?: string) => {
    // TODO: 差戻しAPIの呼び出し
    console.log("差戻し完了", reason);
    setStatus('rejected');
    
    // 次の請求書に移動
    moveToNextInvoice();
  };

  return {
    userRole,
    status,
    ocrData,
    breakdowns,
    invoiceList,
    currentInvoiceIndex,
    handleOCRDataChange,
    handleBreakdownChange,
    addBreakdown,
    handleVisualConfirmation,
    handleApply,
    handleApprove,
    handleReject,
    handleSkip
  };
};

export type { OCRData, ProjectBreakdown, UserRole }; 