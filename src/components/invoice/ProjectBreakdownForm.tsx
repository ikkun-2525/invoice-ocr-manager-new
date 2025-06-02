import { ProjectBreakdown } from '@/hooks/useInvoiceDetail';

interface ProjectBreakdownFormProps {
  breakdowns: ProjectBreakdown[];
  onBreakdownChange: (index: number, field: keyof ProjectBreakdown, value: string | number) => void;
  onAddBreakdown: () => void;
}

export const ProjectBreakdownForm = ({ 
  breakdowns, 
  onBreakdownChange, 
  onAddBreakdown 
}: ProjectBreakdownFormProps) => {
  return (
    <div className="bg-white shadow sm:rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">案件別内訳</h2>
        <button
          type="button"
          onClick={onAddBreakdown}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          内訳を追加
        </button>
      </div>
      {breakdowns.map((breakdown, index) => (
        <div key={breakdown.id} className="border-t border-gray-200 pt-4 mt-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">内訳No</label>
              <input
                type="text"
                value={breakdown.breakdownNo}
                onChange={(e) => onBreakdownChange(index, 'breakdownNo', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">部門</label>
              <input
                type="text"
                value={breakdown.department}
                onChange={(e) => onBreakdownChange(index, 'department', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">営業担当者</label>
              <input
                type="text"
                value={breakdown.salesPerson}
                onChange={(e) => onBreakdownChange(index, 'salesPerson', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">案件番号</label>
              <input
                type="text"
                value={breakdown.projectNumber}
                onChange={(e) => onBreakdownChange(index, 'projectNumber', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">内訳金額</label>
              <input
                type="number"
                value={breakdown.amount}
                onChange={(e) => onBreakdownChange(index, 'amount', Number(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">勘定科目</label>
              <select
                value={breakdown.accountTitle}
                onChange={(e) => onBreakdownChange(index, 'accountTitle', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">選択してください</option>
                <option value="outsourcing">外注費</option>
                <option value="commission">支払手数料</option>
                <option value="advertising">広告宣伝費</option>
                <option value="travel">旅費交通費</option>
                <option value="communication">通信費</option>
                <option value="utilities">水道光熱費</option>
                <option value="supplies">消耗品費</option>
                <option value="rent">地代家賃</option>
                <option value="taxes">租税公課</option>
                <option value="insurance">保険料</option>
                <option value="meeting">会議費</option>
                <option value="entertainment">接待交際費</option>
                <option value="repair">修繕費</option>
                <option value="miscellaneous">雑費</option>
                <option value="newspaper_books">新聞図書費</option>
                <option value="personnel_outsourcing">人件費（業務委託）</option>
                <option value="purchase">仕入高（原材料・商品）</option>
                <option value="shipping">運賃（配送費）</option>
                <option value="lease">リース料</option>
                <option value="equipment">備品購入費（資産計上対象外）</option>
                <option value="honorarium">支払報酬</option>
                <option value="interest">支払利息</option>
                <option value="depreciation">減価償却費</option>
                <option value="social_insurance">法定福利費</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">補助科目(用途などの補足)</label>
              <input
                type="text"
                value={breakdown.subAccount}
                onChange={(e) => onBreakdownChange(index, 'subAccount', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">原価区分（管理会計用）</label>
              <select
                value={breakdown.costCategory}
                onChange={(e) => onBreakdownChange(index, 'costCategory', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">選択してください</option>
                <option value="cogs_china">売上原価：製造原価（中国仕入）</option>
                <option value="cogs_materials">売上原価：材料仕入原価</option>
                <option value="cogs_design">売上原価：デザイン外注費</option>
                <option value="cogs_construction">売上原価：施工外注費</option>
                <option value="sga_var_ads">販管費(変動)：広告費</option>
                <option value="sga_var_travel_transport">販管費(変動)：旅費交通費（移動）</option>
                <option value="sga_var_travel_lodging">販管費(変動)：旅費交通費（宿泊）</option>
                <option value="sga_var_sales_outsourcing">販管費(変動)：営業代行における業務委託費</option>
                <option value="sga_var_shipping">販管費(変動)：送料</option>
                <option value="sga_var_rd">販管費(変動)：研究開発費</option>
                <option value="dept_sga_salary">部門販管費：直接部門給与</option>
                <option value="dept_sga_insurance">部門販管費：直接部門社会保険料</option>
                <option value="common_sga_salary">共通販管費：バックオフィス給与</option>
                <option value="common_sga_insurance">共通販管費：バックオフィス社会保険料</option>
                <option value="common_sga_outsourcing">共通販管費：顧問など業務委託費</option>
                <option value="common_sga_rent">共通販管費：家賃</option>
                <option value="common_sga_utilities">共通販管費：水道光熱費</option>
                <option value="common_sga_communication">共通販管費：通信回線費</option>
                <option value="common_sga_saas">共通販管費：SaaS/WEBシステム利用料（リース含む）</option>
                <option value="common_sga_insurance">共通販管費：保険料</option>
                <option value="common_sga_other">共通販管費：その他（健康診断/加盟料/ネットバンク利用料）</option>
                <option value="finance_interest">財務支出：支払利息</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">税区分</label>
              <select
                value={breakdown.taxCategory}
                onChange={(e) => onBreakdownChange(index, 'taxCategory', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">選択してください</option>
                <option value="taxable_10">課税仕入（10%）</option>
                <option value="taxable_8">課税仕入（軽減8%）</option>
                <option value="non_taxable">非課税仕入</option>
                <option value="not_subject">不課税取引</option>
                <option value="tax_exempt">免税取引</option>
                <option value="excluded">対象外（仕訳不要）</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">検収月</label>
              <input
                type="month"
                value={breakdown.acceptanceMonth}
                onChange={(e) => onBreakdownChange(index, 'acceptanceMonth', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}; 