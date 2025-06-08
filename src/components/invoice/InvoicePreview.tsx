import { OCRData, ProjectBreakdown } from '@/hooks/useInvoiceDetail';

interface InvoicePreviewProps {
  imageUrl?: string;
  ocrData: OCRData;
  breakdowns: ProjectBreakdown[];
}

// 勘定科目の変換マップ
const accountTitleMap: {[key: string]: string} = {
  "outsourcing": "外注費",
  "commission": "支払手数料",
  "advertising": "広告宣伝費",
  "travel": "旅費交通費",
  "communication": "通信費",
  "utilities": "水道光熱費",
  "supplies": "消耗品費",
  "rent": "地代家賃",
  "taxes": "租税公課",
  "insurance": "保険料",
  "meeting": "会議費",
  "entertainment": "接待交際費",
  "repair": "修繕費",
  "miscellaneous": "雑費",
  "newspaper_books": "新聞図書費",
  "personnel_outsourcing": "人件費（業務委託）",
  "purchase": "仕入高（原材料・商品）",
  "shipping": "運賃（配送費）",
  "lease": "リース料",
  "equipment": "備品購入費（資産計上対象外）",
  "honorarium": "支払報酬",
  "interest": "支払利息",
  "depreciation": "減価償却費",
  "social_insurance": "法定福利費"
};

// 原価区分の変換マップ
const costCategoryMap: {[key: string]: string} = {
  "cogs_china": "売上原価：製造原価（中国仕入）",
  "cogs_materials": "売上原価：材料仕入原価",
  "cogs_design": "売上原価：デザイン外注費",
  "cogs_construction": "売上原価：施工外注費",
  "sga_var_ads": "販管費(変動)：広告費",
  "sga_var_travel_transport": "販管費(変動)：旅費交通費（移動）",
  "sga_var_travel_lodging": "販管費(変動)：旅費交通費（宿泊）",
  "sga_var_sales_outsourcing": "販管費(変動)：営業代行における業務委託費",
  "sga_var_shipping": "販管費(変動)：送料",
  "sga_var_rd": "販管費(変動)：研究開発費",
  "dept_sga_salary": "部門販管費：直接部門給与",
  "dept_sga_insurance": "部門販管費：直接部門社会保険料",
  "common_sga_salary": "共通販管費：バックオフィス給与",
  "common_sga_insurance": "共通販管費：バックオフィス社会保険料",
  "common_sga_outsourcing": "共通販管費：顧問など業務委託費",
  "common_sga_rent": "共通販管費：家賃",
  "common_sga_utilities": "共通販管費：水道光熱費",
  "common_sga_communication": "共通販管費：通信回線費",
  "common_sga_saas": "共通販管費：SaaS/WEBシステム利用料（リース含む）",
  "common_sga_insurance2": "共通販管費：保険料",
  "common_sga_other": "共通販管費：その他（健康診断/加盟料/ネットバンク利用料）",
  "finance_interest": "財務支出：支払利息"
};

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
                      {costCategoryMap[breakdown.costCategory] || breakdown.costCategory || '-'}
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