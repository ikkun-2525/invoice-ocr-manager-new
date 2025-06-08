"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const navigation = [
    { 
      name: 'アップロード', 
      href: '/', 
      description: '請求書をアップロード',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      )
    },
    { 
      name: '営業画面', 
      href: '/sales', 
      description: '請求書の確認・申請',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
        </svg>
      )
    },
    { 
      name: '経理画面', 
      href: '/accounting', 
      description: '承認・差戻し処理',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="w-72 h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col shadow-2xl">
      {/* サイドバーヘッダー */}
      <div className="p-6 border-b border-slate-700/50">
      </div>

      {/* ナビゲーション */}
      <nav className="flex-1 p-6">
        <ul className="space-y-3">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`group relative flex items-center space-x-4 px-4 py-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive(item.href)
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-xl scale-105'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50 hover:scale-105'
                }`}
              >
                <div className={`p-2 rounded-lg transition-all duration-300 ${
                  isActive(item.href)
                    ? 'bg-white/20 shadow-lg'
                    : 'bg-slate-700/50 group-hover:bg-orange-500/20'
                }`}>
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{item.name}</div>
                  <div className={`text-xs mt-1 ${
                    isActive(item.href)
                      ? 'text-orange-100'
                      : 'text-slate-400 group-hover:text-slate-300'
                  }`}>
                    {item.description}
                  </div>
                </div>
                {isActive(item.href) && (
                  <div className="w-1 h-8 bg-white rounded-full shadow-lg"></div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* サイドバーフッター */}
      <div className="p-6 border-t border-slate-700/50">
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-semibold text-white">ZENSIN</div>
              <div className="text-xs text-slate-400">OCR システム</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}