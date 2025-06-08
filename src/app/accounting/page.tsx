"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Invoice {
  id: string;
  fileName: string;
  companyName: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: 'applied' | 'approved' | 'rejected';
  reviewedAt?: Date;
  appliedAt: Date;
  approvedAt?: Date;
  rejectedAt?: Date;
  assignedSales: string;
  accountingNotes?: string;
}

export default function InvoiceAccountingView() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('applied');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'appliedAt' | 'amount' | 'dueDate'>('appliedAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);

  useEffect(() => {
    // TODO: API呼び出しに置き換える
    const mockInvoices: Invoice[] = [
      {
        id: '2',
        fileName: 'invoice_002.pdf',
        companyName: 'テスト商事',
        amount: 250000,
        issueDate: '2024-01-20',
        dueDate: '2024-02-19',
        status: 'applied',
        appliedAt: new Date('2024-01-22'),
        assignedSales: '佐藤花子'
      },
      {
        id: '3',
        fileName: 'invoice_003.pdf',
        companyName: 'サンプル株式会社',
        amount: 180000,
        issueDate: '2024-01-25',
        dueDate: '2024-02-24',
        status: 'applied',
        appliedAt: new Date('2024-01-26'),
        assignedSales: '田中太郎'
      },
      {
        id: '4',
        fileName: 'invoice_004.pdf',
        companyName: 'デモ企業',
        amount: 320000,
        issueDate: '2024-01-28',
        dueDate: '2024-02-27',
        status: 'approved',
        appliedAt: new Date('2024-01-29'),
        approvedAt: new Date('2024-01-30'),
        assignedSales: '佐藤花子'
      }
    ];
    setInvoices(mockInvoices);
  }, []);

  const handleApprove = async (invoiceId: string, notes?: string) => {
    try {
      // TODO: API呼び出しを実装
      setInvoices(prev => 
        prev.map(invoice => 
          invoice.id === invoiceId 
            ? { 
                ...invoice, 
                status: 'approved', 
                approvedAt: new Date(),
                accountingNotes: notes
              }
            : invoice
        )
      );
      alert('承認が完了しました');
    } catch (error) {
      alert('承認に失敗しました');
    }
  };

  const handleReject = async (invoiceId: string, notes: string) => {
    try {
      // TODO: API呼び出しを実装
      setInvoices(prev => 
        prev.map(invoice => 
          invoice.id === invoiceId 
            ? { 
                ...invoice, 
                status: 'rejected', 
                rejectedAt: new Date(),
                accountingNotes: notes
              }
            : invoice
        )
      );
      alert('差戻しが完了しました');
    } catch (error) {
      alert('差戻しに失敗しました');
    }
  };

  const handleBulkApprove = async () => {
    if (selectedInvoices.length === 0) {
      alert('承認する請求書を選択してください');
      return;
    }

    if (!confirm(`選択した${selectedInvoices.length}件の請求書を一括承認しますか？`)) {
      return;
    }

    try {
      // TODO: API呼び出しを実装
      setInvoices(prev => 
        prev.map(invoice => 
          selectedInvoices.includes(invoice.id)
            ? { ...invoice, status: 'approved', approvedAt: new Date() }
            : invoice
        )
      );
      setSelectedInvoices([]);
      alert('一括承認が完了しました');
    } catch (error) {
      alert('一括承認に失敗しました');
    }
  };

  const handleExportCSV = () => {
    const csvData = filteredInvoices.map(invoice => ({
      ID: invoice.id,
      ファイル名: invoice.fileName,
      会社名: invoice.companyName,
      金額: invoice.amount,
      発行日: invoice.issueDate,
      支払期日: invoice.dueDate,
      ステータス: getStatusLabel(invoice.status),
      申請日: invoice.appliedAt.toLocaleDateString(),
      承認日: invoice.approvedAt?.toLocaleDateString() || '',
      担当営業: invoice.assignedSales,
      経理メモ: invoice.accountingNotes || ''
    }));

    const csvHeaders = Object.keys(csvData[0]).join(',');
    const csvRows = csvData.map(row => Object.values(row).join(','));
    const csvContent = [csvHeaders, ...csvRows].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `invoices_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredInvoices = invoices
    .filter(invoice => {
      if (filterStatus === 'all') return true;
      return invoice.status === filterStatus;
    })
    .filter(invoice => 
      invoice.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.fileName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'amount') {
        return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
      } else if (sortBy === 'appliedAt') {
        const aTime = a.appliedAt.getTime();
        const bTime = b.appliedAt.getTime();
        return sortOrder === 'asc' ? aTime - bTime : bTime - aTime;
      } else {
        const comparison = a.dueDate.localeCompare(b.dueDate);
        return sortOrder === 'asc' ? comparison : -comparison;
      }
    });

  const getStatusLabel = (status: Invoice['status']) => {
    const labels = {
      applied: '申請済',
      approved: '承認済',
      rejected: '差戻し'
    };
    return labels[status];
  };

  const getStatusBadge = (status: Invoice['status']) => {
    const statusConfig = {
      applied: { label: '申請済', color: 'bg-yellow-100 text-yellow-800' },
      approved: { label: '承認済', color: 'bg-green-100 text-green-800' },
      rejected: { label: '差戻し', color: 'bg-red-100 text-red-800' }
    };
    
    const config = statusConfig[status];
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const toggleSelectInvoice = (invoiceId: string) => {
    setSelectedInvoices(prev => 
      prev.includes(invoiceId)
        ? prev.filter(id => id !== invoiceId)
        : [...prev, invoiceId]
    );
  };

  const toggleSelectAll = () => {
    const appliedInvoices = filteredInvoices.filter(inv => inv.status === 'applied');
    if (selectedInvoices.length === appliedInvoices.length) {
      setSelectedInvoices([]);
    } else {
      setSelectedInvoices(appliedInvoices.map(inv => inv.id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white shadow sm:rounded-lg p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              経理担当者 - 請求書一覧
            </h1>
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              CSV出力
            </button>
          </div>

          {/* フィルタリング・検索・一括操作 */}
          <div className="mb-6 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
              <div>
                <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-2">
                  ステータス
                </label>
                <select
                  id="status-filter"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="applied">申請済</option>
                  <option value="approved">承認済</option>
                  <option value="rejected">差戻し</option>
                  <option value="all">すべて</option>
                </select>
              </div>

              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                  検索
                </label>
                <input
                  type="text"
                  id="search"
                  placeholder="会社名またはファイル名"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 mb-2">
                  並び順
                </label>
                <select
                  id="sort-by"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'appliedAt' | 'amount' | 'dueDate')}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="appliedAt">申請日</option>
                  <option value="amount">金額</option>
                  <option value="dueDate">支払期日</option>
                </select>
              </div>

              <div>
                <label htmlFor="sort-order" className="block text-sm font-medium text-gray-700 mb-2">
                  順序
                </label>
                <select
                  id="sort-order"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="desc">降順</option>
                  <option value="asc">昇順</option>
                </select>
              </div>
            </div>

            {/* 一括操作 */}
            {filterStatus === 'applied' && (
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-md">
                <span className="text-sm font-medium text-gray-700">
                  選択中: {selectedInvoices.length}件
                </span>
                <button
                  onClick={handleBulkApprove}
                  disabled={selectedInvoices.length === 0}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  一括承認
                </button>
              </div>
            )}
          </div>

          {/* 請求書一覧テーブル */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {filterStatus === 'applied' && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <input
                        type="checkbox"
                        checked={selectedInvoices.length === filteredInvoices.filter(inv => inv.status === 'applied').length && filteredInvoices.filter(inv => inv.status === 'applied').length > 0}
                        onChange={toggleSelectAll}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </th>
                  )}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ファイル名
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    会社名
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    金額
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    支払期日
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    申請日
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ステータス
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    担当営業
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    {filterStatus === 'applied' && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        {invoice.status === 'applied' && (
                          <input
                            type="checkbox"
                            checked={selectedInvoices.includes(invoice.id)}
                            onChange={() => toggleSelectInvoice(invoice.id)}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        )}
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <Link 
                        href={`/invoice/${invoice.id}?from=accounting`}
                        className="text-indigo-600 hover:text-indigo-900 hover:underline"
                      >
                        {invoice.fileName}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {invoice.companyName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ¥{invoice.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {invoice.dueDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {invoice.appliedAt.toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(invoice.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {invoice.assignedSales}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {invoice.status === 'applied' && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              const notes = prompt('差戻し理由を入力してください:');
                              if (notes !== null) handleReject(invoice.id, notes);
                            }}
                            className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 shadow-sm"
                          >
                            差戻し
                          </button>
                          <button
                            onClick={() => handleApprove(invoice.id)}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm"
                          >
                            承認
                          </button>
                        </div>
                      )}
                      {invoice.status !== 'applied' && (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredInvoices.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">該当する請求書がありません</p>
            </div>
          )}
      </div>
    </div>
  );
}