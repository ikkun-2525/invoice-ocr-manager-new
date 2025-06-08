import { UserRole } from '@/hooks/useUserRole';
import { useRejectModal } from '@/hooks/useRejectModal';

interface ActionButtonsProps {
  userRole: UserRole;
  status: 'uploading' | 'processing' | 'reviewing' | 'reviewed' | 'applied' | 'approved' | 'rejected';
  invoiceList: string[];
  currentInvoiceIndex: number;
  onVisualConfirmation: () => void;
  onApply: () => void;
  onApprove: () => void;
  onReject: (reason?: string) => void;
  onSkip: () => void;
}

export const ActionButtons = ({
  userRole,
  status,
  invoiceList,
  currentInvoiceIndex,
  onVisualConfirmation,
  onApply,
  onApprove,
  onReject,
  onSkip
}: ActionButtonsProps) => {
  const {
    showRejectModal,
    rejectReason,
    openModal,
    closeModal,
    handleReasonChange,
    submitReject
  } = useRejectModal();

  return (
    <>
      {/* 固定フッター風ボタンエリア */}
      <div className="fixed bottom-0 right-0 left-72 bg-white border-t border-gray-200 shadow-lg z-10">
        <div className="flex justify-end items-center space-x-4 p-6">
          {/* ステータスバッジ */}
          <div className="flex-1">
            {status === 'reviewed' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                ✅ 目視確認済
              </span>
            )}
            {status === 'applied' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                📤 申請済
              </span>
            )}
            {status === 'approved' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                ✅ 承認済
              </span>
            )}
            {status === 'rejected' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                ↩ 差戻し済
              </span>
            )}
          </div>

          {/* アクションボタン */}
          {userRole.isUploader && status === 'reviewing' && (
            <>
              <button
                type="button"
                onClick={onSkip}
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 shadow-sm"
              >
                SKIP
              </button>
              <button
                type="button"
                onClick={onVisualConfirmation}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:scale-105 transition-all duration-200"
              >
                <span className="mr-2">👁️</span>
                目視確認を完了
              </button>
            </>
          )}

          {userRole.isSales && status === 'reviewed' && (
            <>
              <button
                type="button"
                onClick={onSkip}
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 shadow-sm"
              >
                SKIP
              </button>
              <button
                type="button"
                onClick={onApply}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-lg text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transform hover:scale-105 transition-all duration-200"
              >
                <span className="mr-2">📤</span>
                経理へ承認申請
              </button>
            </>
          )}

          {userRole.isAccounting && status === 'applied' && (
            <>
              <button
                type="button"
                onClick={onSkip}
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 shadow-sm"
              >
                SKIP
              </button>
              <button
                type="button"
                onClick={openModal}
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 shadow-sm"
              >
                差戻し
              </button>
              <button
                type="button"
                onClick={onApprove}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm"
              >
                承認
              </button>
            </>
          )}
        </div>
      </div>

      {/* 差戻し理由入力モーダル */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">差戻し理由</h3>
              <textarea
                value={rejectReason}
                onChange={(e) => handleReasonChange(e.target.value)}
                placeholder="差戻し理由を入力してください（任意）"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                rows={4}
              />
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  キャンセル
                </button>
                <button
                  onClick={() => submitReject(onReject)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  差戻しする
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}; 