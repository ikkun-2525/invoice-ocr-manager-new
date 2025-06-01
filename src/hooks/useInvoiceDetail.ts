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
    invoiceNumber: "",
    issueDate: "",
    dueDate: "",
    invoiceRegistrationNumber: "",
    supplierName: "",
    supplierAddress: "",
    paymentMethod: "",
    subtotal: 0,
    taxAmount: 0,
    totalAmount: 0,
    withholdingTaxAmount: 0,
    electronicBookkeepingStatus: "",
    notes: ""
  });

  // 案件別内訳状態
  const [breakdowns, setBreakdowns] = useState<ProjectBreakdown[]>([{
    id: "1",
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