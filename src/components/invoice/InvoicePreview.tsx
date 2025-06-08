import { OCRData } from '@/hooks/useOCRData';
import { ProjectBreakdown } from '@/hooks/useProjectBreakdown';
import { ACCOUNT_TITLE_MAP, COST_CATEGORY_MAP } from '@/constants/accountMaps';

interface InvoicePreviewProps {
  imageUrl?: string;
  ocrData: OCRData;
  breakdowns: ProjectBreakdown[];
}

export const InvoicePreview = ({ imageUrl, ocrData, breakdowns }: InvoicePreviewProps) => {
  // Calculate totals
  const totalBreakdownAmount = breakdowns.reduce((sum, breakdown) => sum + breakdown.amount, 0);
  const differenceAmount = ocrData.totalAmount - totalBreakdownAmount;

  return (
    <div className="bg-white shadow sm:rounded-lg p-6 sticky top-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">リアルタイムプレビュー</h2>
      
      <div className="space-y-6">
        {/* Invoice Image Preview */}
        <div className="aspect-[3/4] bg-gray-100 rounded-lg flex items-center justify-center mb-6">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="請求書"
              className="w-full h-full object-contain rounded-lg"
            />
          ) : (
            <p className="text-gray-500">請求書画像プレビュー</p>
          )}
        </div>
        
        {/* Invoice Data Preview */}
        <div className="border rounded-lg p-4 bg-gray-50">
          <h3 className="font-medium text-lg mb-3">請求書データ</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="font-medium">請求書番号:</div>
            <div>{ocrData.invoiceNumber || '-'}</div>
            
            <div className="font-medium">発行日:</div>
            <div>{ocrData.issueDate || '-'}</div>
            
            <div className="font-medium">支払期日:</div>
            <div>{ocrData.dueDate || '-'}</div>
            
            <div className="font-medium">取引先:</div>
            <div>{ocrData.supplierName || '-'}</div>
            
            <div className="font-medium">合計金額:</div>
            <div className="font-semibold">{ocrData.totalAmount.toLocaleString()}円</div>
            
            <div className="font-medium">消費税:</div>
            <div>{ocrData.taxAmount.toLocaleString()}円</div>
            
            {/* 振込先情報 */}
            <div className="col-span-2 mt-2 font-medium text-gray-700">振込先情報:</div>
            
            <div className="font-medium">銀行名:</div>
            <div>{ocrData.bankName || '-'}</div>
            
            <div className="font-medium">支店名:</div>
            <div>{ocrData.branchName || '-'}</div>
            
            <div className="font-medium">口座種別:</div>
            <div>{ocrData.accountType === 'ordinary' ? '普通' : 
                  ocrData.accountType === 'current' ? '当座' : 
                  ocrData.accountType === 'savings' ? '貯蓄' : '-'}</div>
            
            <div className="font-medium">口座番号:</div>
            <div>{ocrData.accountNumber || '-'}</div>
            
            <div className="font-medium">口座名義:</div>
            <div>{ocrData.accountName || '-'}</div>
          </div>
        </div>
        
        {/* Breakdown Summary */}
        <div className="border rounded-lg p-4 bg-gray-50">
          <h3 className="font-medium text-lg mb-3">内訳サマリー</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">内訳No</th>
                  <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">部門</th>
                  <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">担当</th>
                  <th className="px-2 py-1 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">金額</th>
                  <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">原価区分</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {breakdowns.map((breakdown) => (
                  <tr key={breakdown.id}>
                    <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-900">{breakdown.breakdownNo || '-'}</td>
                    <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-900">{breakdown.department || '-'}</td>
                    <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-900">{breakdown.salesPerson || '-'}</td>
                    <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-900 text-right">{breakdown.amount.toLocaleString()}円</td>
                    <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-900">
                      {COST_CATEGORY_MAP[breakdown.costCategory] || breakdown.costCategory || '-'}
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-100">
                  <td className="px-2 py-1 whitespace-nowrap text-xs font-medium text-gray-900" colSpan={3}>合計</td>
                  <td className="px-2 py-1 whitespace-nowrap text-xs font-medium text-gray-900 text-right">{totalBreakdownAmount.toLocaleString()}円</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* Show difference if there is any */}
          {differenceAmount !== 0 && (
            <div className={`mt-2 p-2 rounded ${differenceAmount === 0 ? 'bg-green-100' : 'bg-red-100'}`}>
              <p className={`text-sm ${differenceAmount === 0 ? 'text-green-800' : 'text-red-800'}`}>
                請求書合計と内訳合計の差額: {differenceAmount.toLocaleString()}円
              </p>
            </div>
          )}
        </div>
        
        {/* Validation Alerts */}
        <div className="space-y-2">
          {!ocrData.invoiceNumber && (
            <div className="bg-yellow-100 p-2 rounded text-sm text-yellow-800">
              請求書番号が入力されていません
            </div>
          )}
          {!ocrData.supplierName && (
            <div className="bg-yellow-100 p-2 rounded text-sm text-yellow-800">
              取引先名が入力されていません
            </div>
          )}
          {breakdowns.some(b => !b.accountTitle) && (
            <div className="bg-yellow-100 p-2 rounded text-sm text-yellow-800">
              勘定科目が選択されていない内訳があります
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 