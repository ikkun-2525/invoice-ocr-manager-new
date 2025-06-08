import { useState } from 'react';

export interface OCRData {
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

export const useOCRData = () => {
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

  const handleOCRDataChange = (field: keyof OCRData, value: string | number) => {
    setOcrData(prev => ({ ...prev, [field]: value }));
  };

  return {
    ocrData,
    handleOCRDataChange
  };
};