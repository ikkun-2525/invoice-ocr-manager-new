"use client";

import { useInvoiceDetail } from '@/hooks/useInvoiceDetail';
import { OCRDataForm } from '@/components/invoice/OCRDataForm';
import { ProjectBreakdownForm } from '@/components/invoice/ProjectBreakdownForm';
import { InvoicePreview } from '@/components/invoice/InvoicePreview';
import { ActionButtons } from '@/components/invoice/ActionButtons';

export default function InvoiceDetailView() {
  const {
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
  } = useInvoiceDetail('dummy-id'); // TODO: 実際のIDを使用

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 進捗表示 */}
        <div className="mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">
                {userRole.isUploader && '請求書詳細確認（アップロード担当者確認分）'}
                {userRole.isSales && '請求書詳細確認（営業担当者確認分）'}
                {userRole.isAccounting && '請求書詳細確認（経理担当者確認分）'}
              </h2>
              <div className="text-sm text-gray-600">
                {invoiceList.length > 0 && (
                  <span>
                    残り {invoiceList.length} 件
                  </span>
                )}
              </div>
            </div>
            {invoiceList.length > 0 && (
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${invoiceList.length > 0 ? ((currentInvoiceIndex) / (invoiceList.length + currentInvoiceIndex)) * 100 : 100}%` 
                    }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>

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
              status={status}
              invoiceList={invoiceList}
              currentInvoiceIndex={currentInvoiceIndex}
              onVisualConfirmation={handleVisualConfirmation}
              onApply={handleApply}
              onApprove={handleApprove}
              onReject={handleReject}
              onSkip={handleSkip}
            />
          </div>
          <div>
            <InvoicePreview 
              imageUrl="/sample-invoice.svg" 
              ocrData={ocrData} 
              breakdowns={breakdowns} 
            />
          </div>
        </div>
      </div>
    </div>
  );
} 