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
              <input
                type="text"
                value={breakdown.accountTitle}
                onChange={(e) => onBreakdownChange(index, 'accountTitle', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">補助科目</label>
              <input
                type="text"
                value={breakdown.subAccount}
                onChange={(e) => onBreakdownChange(index, 'subAccount', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">原価区分</label>
              <select
                value={breakdown.costCategory}
                onChange={(e) => onBreakdownChange(index, 'costCategory', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">選択してください</option>
                <option value="direct">直接原価</option>
                <option value="indirect">間接原価</option>
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
                <option value="taxable">課税</option>
                <option value="tax_free">非課税</option>
                <option value="exempt">免税</option>
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