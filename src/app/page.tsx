"use client";

import { useState } from 'react';
import Link from 'next/link';

interface ProcessingInvoice {
  id: string;
  fileName: string;
  status: 'uploading' | 'processing' | 'reviewing' | 'completed';
  progress: number;
  uploadedAt: Date;
  isConfirmed: boolean;
}

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const [processingInvoices, setProcessingInvoices] = useState<ProcessingInvoice[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (uploadedFiles) {
      const newFiles = Array.from(uploadedFiles);
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
      processFiles(newFiles);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles(prevFiles => [...prevFiles, ...droppedFiles]);
    processFiles(droppedFiles);
  };

  const processFiles = async (newFiles: File[]) => {
    const newProcessingInvoices: ProcessingInvoice[] = newFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      fileName: file.name,
      status: 'uploading',
      progress: 0,
      uploadedAt: new Date(),
      isConfirmed: false
    }));

    setProcessingInvoices(prev => [...prev, ...newProcessingInvoices]);

    // TODO: Implement actual file processing logic here
    // This is just a simulation of processing
    newProcessingInvoices.forEach(async (invoice) => {
      // Simulate upload progress
      await simulateProgress(invoice.id);
      // Simulate OCR processing
      await simulateOCRProcessing(invoice.id);
    });
  };

  const simulateProgress = async (invoiceId: string) => {
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setProcessingInvoices(prev => 
        prev.map(inv => 
          inv.id === invoiceId 
            ? { ...inv, progress, status: progress === 100 ? 'processing' : 'uploading' }
            : inv
        )
      );
    }
  };

  const simulateOCRProcessing = async (invoiceId: string) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    setProcessingInvoices(prev =>
      prev.map(inv =>
        inv.id === invoiceId
          ? { ...inv, status: 'reviewing' }
          : inv
      )
    );
  };

  const handleReviewComplete = (invoiceId: string) => {
    setProcessingInvoices(prev =>
      prev.map(inv =>
        inv.id === invoiceId
          ? { ...inv, status: 'completed', isConfirmed: true }
          : inv
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow sm:rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            請求書アップロード
          </h1>
          
          {/* アップロードフォーム */}
          <div className="mb-8">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${
                isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'
              } border-dashed rounded-md transition-colors duration-200`}
            >
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                    <span>ファイルを選択</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      accept="image/*,.pdf"
                      multiple
                      onChange={handleFileUpload}
                    />
                  </label>
                  <p className="pl-1">またはドラッグ＆ドロップ</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, PDF (最大10MB)
                </p>
              </div>
            </div>
          </div>

          {/* 処理中の請求書一覧 */}
          {processingInvoices.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">処理中の請求書</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ファイル名
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ステータス
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        進捗
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        アップロード日時
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        確認状態
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {processingInvoices.map((invoice) => (
                      <tr key={invoice.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <Link 
                            href={`/invoice/${invoice.id}`}
                            className="text-indigo-600 hover:text-indigo-900 hover:underline"
                          >
                            {invoice.fileName}
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {invoice.status === 'uploading' && '⬆️ アップロード中'}
                          {invoice.status === 'processing' && '🔄 OCR処理中'}
                          {invoice.status === 'reviewing' && '👀 確認待ち'}
                          {invoice.status === 'completed' && '✅ 完了'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {invoice.status === 'uploading' && (
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div
                                className="bg-indigo-600 h-2.5 rounded-full"
                                style={{ width: `${invoice.progress}%` }}
                              ></div>
                            </div>
                          )}
                          {invoice.status !== 'uploading' && '100%'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {invoice.uploadedAt.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            invoice.status === 'completed' 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {invoice.status === 'completed' ? '確認済み' : '未確認'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
