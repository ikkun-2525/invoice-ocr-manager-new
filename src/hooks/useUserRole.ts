import { useState, useEffect } from 'react';

export interface UserRole {
  isUploader: boolean;
  isSales: boolean;
  isAccounting: boolean;
}

export const useUserRole = () => {
  // SSR対応: 初期値は安全なデフォルト値を設定
  const [userRole, setUserRole] = useState<UserRole>({
    isUploader: true,
    isSales: false,
    isAccounting: false
  });

  useEffect(() => {
    // クライアントサイドでのみ実行
    const urlParams = new URLSearchParams(window.location.search);
    const fromParam = urlParams.get('from');
    const path = window.location.pathname;
    
    let newRole: UserRole;
    
    // クエリパラメータから判断
    if (fromParam === 'sales') {
      newRole = { isUploader: false, isSales: true, isAccounting: false };
    } else if (fromParam === 'accounting') {
      newRole = { isUploader: false, isSales: false, isAccounting: true };
    }
    // パスから判断（従来の方法）
    else if (path.includes('sales')) {
      newRole = { isUploader: false, isSales: true, isAccounting: false };
    } else if (path.includes('accounting')) {
      newRole = { isUploader: false, isSales: false, isAccounting: true };
    } else {
      newRole = { isUploader: true, isSales: false, isAccounting: false };
    }
    
    setUserRole(newRole);
  }, []);

  return { userRole };
};