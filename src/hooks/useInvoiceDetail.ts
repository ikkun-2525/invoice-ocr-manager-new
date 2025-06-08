import { useUserRole } from './useUserRole';
import { useOCRData } from './useOCRData';
import { useProjectBreakdown } from './useProjectBreakdown';
import { useInvoiceNavigation } from './useInvoiceNavigation';

export const useInvoiceDetail = (invoiceId: string) => {
  const { userRole } = useUserRole();
  const { ocrData, handleOCRDataChange } = useOCRData();
  const { breakdowns, handleBreakdownChange, addBreakdown } = useProjectBreakdown();
  const {
    status,
    invoiceList,
    currentInvoiceIndex,
    handleVisualConfirmation,
    handleApply,
    handleApprove,
    handleReject,
    handleSkip
  } = useInvoiceNavigation(invoiceId, userRole);

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

// 型のエクスポート
export type { UserRole } from './useUserRole';
export type { OCRData } from './useOCRData';
export type { ProjectBreakdown } from './useProjectBreakdown'; 