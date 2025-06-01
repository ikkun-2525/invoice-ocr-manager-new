"use client";

import { useInvoiceDetail } from '@/hooks/useInvoiceDetail';
import { OCRDataForm } from '@/components/invoice/OCRDataForm';
import { ProjectBreakdownForm } from '@/components/invoice/ProjectBreakdownForm';
import { InvoicePreview } from '@/components/invoice/InvoicePreview';
import { ActionButtons } from '@/components/invoice/ActionButtons';

export default function InvoiceDetailView() {
  const {
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
  } = useInvoiceDetail('dummy-id'); // TODO: 実際のIDを使用

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <OCRDataForm
              ocrData={ocrData}
              onOCRDataChange={handleOCRDataChange}
            />
            <ProjectBreakdownForm
              breakdowns={breakdowns}
              onBreakdownChange={handleBreakdownChange}
              onAddBreakdown={addBreakdown}
            />
            <ActionButtons
              userRole={userRole}
              onVisualConfirmation={handleVisualConfirmation}
              onApply={handleApply}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          </div>
          <div>
            <InvoicePreview />
          </div>
        </div>
      </div>
    </div>
  );
} 