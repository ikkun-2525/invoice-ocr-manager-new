import { UserRole } from '@/hooks/useInvoiceDetail';

interface ActionButtonsProps {
  userRole: UserRole;
  onVisualConfirmation: () => void;
  onApply: () => void;
  onApprove: () => void;
  onReject: () => void;
}

export const ActionButtons = ({
  userRole,
  onVisualConfirmation,
  onApply,
  onApprove,
  onReject
}: ActionButtonsProps) => {
  return (
    <div className="mt-6 flex justify-end space-x-4">
      {userRole.isUploader && (
        <button
          type="button"
          onClick={onVisualConfirmation}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          目視確認
        </button>
      )}
      {userRole.isSales && (
        <button
          type="button"
          onClick={onApply}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          申請
        </button>
      )}
      {userRole.isAccounting && (
        <>
          <button
            type="button"
            onClick={onReject}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            差戻し
          </button>
          <button
            type="button"
            onClick={onApprove}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            承認
          </button>
        </>
      )}
    </div>
  );
}; 