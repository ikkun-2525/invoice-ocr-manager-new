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
  status: 'reviewed' | 'applied' | 'approved' | 'rejected';
  reviewedAt?: Date;
  appliedAt?: Date;
  assignedSales: string;
}

export default function InvoiceSalesView() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'issueDate' | 'amount' | 'dueDate'>('issueDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    // TODO: API呼び出しに置き換える
    const mockInvoices: Invoice[] = [
      {
        id: '1',
        fileName: 'invoice_001.pdf',
        companyName: '株式会社サンプル',
        amount: 100000,
        issueDate: '2024-01-15',
        dueDate: '2024-02-14',
        status: 'reviewed',
        reviewedAt: new Date('2024-01-16'),
        assignedSales: '田中太郎'
      },
      {
        id: '2',
        fileName: 'invoice_002.pdf',
        companyName: 'テスト商事',
        amount: 250000,
        issueDate: '2024-01-20',
        dueDate: '2024-02-19',
        status: 'applied',
        reviewedAt: new Date('2024-01-21'),
        appliedAt: new Date('2024-01-22'),
        assignedSales: '佐藤花子'
      }
    ];
    setInvoices(mockInvoices);
  }, []);

  const handleApply = async (invoiceId: string) => {
    try {
      // TODO: API呼び出しを実装
      setInvoices(prev => 
        prev.map(invoice => 
          invoice.id === invoiceId 
            ? { ...invoice, status: 'applied', appliedAt: new Date() }
            : invoice
        )
      );
      alert('承認申請が完了しました');
    } catch (error) {
      alert('申請に失敗しました');
    }
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
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      
      if (sortBy === 'amount') {
        const aNum = Number(aValue);
        const bNum = Number(bValue);
        return sortOrder === 'asc' ? aNum - bNum : bNum - aNum;
      } else {
        const comparison = String(aValue).localeCompare(String(bValue));
        return sortOrder === 'asc' ? comparison : -comparison;
      }
    });

  const getStatusBadge = (status: Invoice['status']) => {
    const statusConfig = {
      reviewed: { label: '目視確認済', color: 'bg-blue-100 text-blue-800' },
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

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white shadow sm:rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            営業担当者 - 請求書一覧
          </h1>

          {/* フィルタリング・検索 */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-4">
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
                <option value="all">すべて</option>
                <option value="reviewed">目視確認済</option>
                <option value="applied">申請済</option>
                <option value="approved">承認済</option>
                <option value="rejected">差戻し</option>
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
                onChange={(e) => setSortBy(e.target.value as 'issueDate' | 'amount' | 'dueDate')}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="issueDate">発行日</option>
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

          {/* 請求書一覧テーブル */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
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
                    発行日
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    支払期日
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ステータス
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    担当営業
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <Link 
                        href={`/invoice/${invoice.id}?from=sales`}
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
                      {invoice.issueDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {invoice.dueDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(invoice.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {invoice.assignedSales}
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