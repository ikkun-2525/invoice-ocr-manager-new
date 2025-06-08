import { OCRData } from '@/hooks/useOCRData';
import { PAYMENT_METHOD_OPTIONS, ELECTRONIC_BOOKKEEPING_OPTIONS, ACCOUNT_TYPE_OPTIONS } from '@/constants/accountMaps';

interface OCRDataFormProps {
  ocrData: OCRData;
  onOCRDataChange: (field: keyof OCRData, value: string | number) => void;
}

export const OCRDataForm = ({ ocrData, onOCRDataChange }: OCRDataFormProps) => {
  return (
    <div className="bg-white shadow sm:rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">OCR抽出データ</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">請求書番号</label>
          <input
            type="text"
            value={ocrData.invoiceNumber}
            onChange={(e) => onOCRDataChange('invoiceNumber', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">発行日</label>
          <input
            type="date"
            value={ocrData.issueDate}
            onChange={(e) => onOCRDataChange('issueDate', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">支払期日</label>
          <input
            type="date"
            value={ocrData.dueDate}
            onChange={(e) => onOCRDataChange('dueDate', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">インボイス登録番号</label>
          <input
            type="text"
            value={ocrData.invoiceRegistrationNumber}
            onChange={(e) => onOCRDataChange('invoiceRegistrationNumber', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">取引先名</label>
          <input
            type="text"
            value={ocrData.supplierName}
            onChange={(e) => onOCRDataChange('supplierName', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">取引先住所</label>
          <textarea
            value={ocrData.supplierAddress}
            onChange={(e) => onOCRDataChange('supplierAddress', e.target.value)}
            rows={2}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">支払方法</label>
          <select
            value={ocrData.paymentMethod}
            onChange={(e) => onOCRDataChange('paymentMethod', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">選択してください</option>
            <option value="bank_transfer">銀行振込</option>
            <option value="credit_card">クレジットカード</option>
            <option value="cash">現金</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">小計</label>
          <input
            type="number"
            value={ocrData.subtotal}
            onChange={(e) => onOCRDataChange('subtotal', Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">消費税額</label>
          <input
            type="number"
            value={ocrData.taxAmount}
            onChange={(e) => onOCRDataChange('taxAmount', Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">合計金額（税込）</label>
          <input
            type="number"
            value={ocrData.totalAmount}
            onChange={(e) => onOCRDataChange('totalAmount', Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">源泉徴収税額</label>
          <input
            type="number"
            value={ocrData.withholdingTaxAmount}
            onChange={(e) => onOCRDataChange('withholdingTaxAmount', Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">電子帳簿保存法対応ステータス</label>
          <select
            value={ocrData.electronicBookkeepingStatus}
            onChange={(e) => onOCRDataChange('electronicBookkeepingStatus', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            {ELECTRONIC_BOOKKEEPING_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        
        {/* 振込先情報セクション */}
        <div className="col-span-2 mt-4">
          <h3 className="text-lg font-medium text-gray-900 mb-2">振込先情報</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">銀行名</label>
              <input
                type="text"
                value={ocrData.bankName}
                onChange={(e) => onOCRDataChange('bankName', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">支店名</label>
              <input
                type="text"
                value={ocrData.branchName}
                onChange={(e) => onOCRDataChange('branchName', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">口座種別</label>
              <select
                value={ocrData.accountType}
                onChange={(e) => onOCRDataChange('accountType', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                {ACCOUNT_TYPE_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">口座番号</label>
              <input
                type="text"
                value={ocrData.accountNumber}
                onChange={(e) => onOCRDataChange('accountNumber', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">口座名義</label>
              <input
                type="text"
                value={ocrData.accountName}
                onChange={(e) => onOCRDataChange('accountName', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
        
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">メモ欄</label>
          <textarea
            value={ocrData.notes}
            onChange={(e) => onOCRDataChange('notes', e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
}; 