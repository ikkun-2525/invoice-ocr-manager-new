import { useState } from 'react';

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
  // ユーザーロール状態
  const [userRole] = useState<UserRole>({
    isUploader: true,
    isSales: false,
    isAccounting: false
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

  // アクションハンドラー
  const handleVisualConfirmation = async () => {
    // TODO: 目視確認APIの呼び出し
    console.log("目視確認完了");
  };

  const handleApply = async () => {
    // TODO: 申請APIの呼び出し
    console.log("申請完了");
  };

  const handleApprove = async () => {
    // TODO: 承認APIの呼び出し
    console.log("承認完了");
  };

  const handleReject = async () => {
    // TODO: 差戻しAPIの呼び出し
    console.log("差戻し完了");
  };

  return {
    userRole,
    ocrData,
    breakdowns,
    handleOCRDataChange,
    handleBreakdownChange,
    addBreakdown,
    handleVisualConfirmation,
    handleApply,
    handleApprove,
    handleReject
  };
};

export type { OCRData, ProjectBreakdown, UserRole }; 