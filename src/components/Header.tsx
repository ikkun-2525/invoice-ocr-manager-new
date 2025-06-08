"use client";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-slate-900 to-slate-800 shadow-lg h-16">
      <div className="h-full px-6 flex justify-between items-center">
        {/* サービス名 */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-800 animate-pulse"></div>
          </div>
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-200 to-orange-300 tracking-wide drop-shadow-lg">
              請求書OCR<span className="text-orange-300">システム</span>
            </h1>
            <div className="text-sm font-semibold text-orange-200 tracking-widest opacity-90">
              <span className="inline-block bg-orange-500 bg-opacity-20 px-3 py-1 rounded-md border border-orange-400 border-opacity-30">
                for ZENSIN
              </span>
            </div>
          </div>
        </div>

        {/* ログインユーザー名 */}
        <div className="flex items-center">
          <div className="flex items-center space-x-3 bg-white bg-opacity-90 rounded-xl px-4 py-2 backdrop-blur-sm shadow-lg">
            <div className="w-9 h-9 bg-gradient-to-br from-orange-300 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-orange-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="text-slate-800">
              <div className="text-sm font-semibold">田中 太郎</div>
              <div className="text-xs text-slate-600">管理者</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}