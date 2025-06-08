import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserRole } from './useUserRole';
import { storage } from '@/utils/localStorage';

export const useInvoiceNavigation = (invoiceId: string, userRole: UserRole) => {
  const router = useRouter();

  // 連続レビュー用の請求書リスト（ローカルストレージから復元）
  const [currentInvoiceIndex, setCurrentInvoiceIndex] = useState(0);
  const [invoiceList, setInvoiceList] = useState(() => {
    // ローカルストレージからリストを復元
    const storageKey = userRole.isUploader ? 'upload_invoices' : 
                      userRole.isSales ? 'sales_invoices' : 
                      userRole.isAccounting ? 'accounting_invoices' : '';
    
    const storedList = storage.getJSON<string[]>(storageKey);
    if (storedList) {
      return storedList;
    }
    
    // 初回のみデフォルトリストを生成
    const defaultList = userRole.isUploader ? ['inv1', 'inv2', 'inv3'] :
                       userRole.isSales ? ['inv4', 'inv5', 'inv6'] :
                       userRole.isAccounting ? ['inv7', 'inv8', 'inv9'] : [];
    
    const filteredList = defaultList.filter(id => id !== invoiceId);
    
    // ローカルストレージに保存
    storage.setJSON(storageKey, filteredList);
    
    return filteredList;
  });

  // ステータス状態（ロールに応じて初期値を設定）
  const [status, setStatus] = useState<'uploading' | 'processing' | 'reviewing' | 'reviewed' | 'applied' | 'approved' | 'rejected'>(() => {
    if (userRole.isSales) return 'reviewed';
    if (userRole.isAccounting) return 'applied';
    return 'reviewing';
  });

  // 次の請求書に移動する共通関数
  const moveToNextInvoice = () => {
    // リストから現在の請求書を削除して更新されたリストを取得
    const updatedList = invoiceList.filter((_, index) => index !== currentInvoiceIndex);
    
    // ローカルストレージにも保存
    const storageKey = userRole.isUploader ? 'upload_invoices' : 
                      userRole.isSales ? 'sales_invoices' : 
                      userRole.isAccounting ? 'accounting_invoices' : '';
    
    storage.setJSON(storageKey, updatedList);
    
    // 状態を更新
    setInvoiceList(updatedList);
    
    if (updatedList.length > 0) {
      // 次の請求書がある場合は移動（削除後のリストの最初の要素）
      const nextInvoiceId = updatedList[0];
      
      // 現在のステージに応じたパスで次の請求書詳細画面に移動
      if (userRole.isUploader) {
        router.push(`/invoice/${nextInvoiceId}`);
      } else if (userRole.isSales) {
        router.push(`/invoice/${nextInvoiceId}?from=sales`);
      } else if (userRole.isAccounting) {
        router.push(`/invoice/${nextInvoiceId}?from=accounting`);
      }
    } else {
      // 全ての請求書処理完了後は各ステージのトップ画面に戻る
      // ローカルストレージをクリア
      storage.removeItem(storageKey);
      
      if (userRole.isUploader) {
        router.push('/'); // アップロード画面
      } else if (userRole.isSales) {
        router.push('/sales'); // 営業画面
      } else if (userRole.isAccounting) {
        router.push('/accounting'); // 経理画面
      }
    }
  };

  // SKIPハンドラー
  const handleSkip = () => {
    moveToNextInvoice();
  };

  // アクションハンドラー
  const handleVisualConfirmation = async () => {
    try {
      // TODO: 目視確認APIの呼び出し
      setStatus('reviewed');
      
      // 次の請求書に移動
      moveToNextInvoice();
    } catch (error) {
      console.error('目視確認処理でエラーが発生しました:', error);
      // エラー処理は上位コンポーネントで処理
      throw error;
    }
  };

  const handleApply = async () => {
    try {
      // TODO: 申請APIの呼び出し
      setStatus('applied');
      
      // 次の請求書に移動
      moveToNextInvoice();
    } catch (error) {
      console.error('申請処理でエラーが発生しました:', error);
      throw error;
    }
  };

  const handleApprove = async () => {
    try {
      // TODO: 承認APIの呼び出し
      setStatus('approved');
      
      // 次の請求書に移動
      moveToNextInvoice();
    } catch (error) {
      console.error('承認処理でエラーが発生しました:', error);
      throw error;
    }
  };

  const handleReject = async (reason?: string) => {
    try {
      // TODO: 差戻しAPIの呼び出し
      setStatus('rejected');
      
      // 次の請求書に移動
      moveToNextInvoice();
    } catch (error) {
      console.error('差戻し処理でエラーが発生しました:', error);
      throw error;
    }
  };

  return {
    status,
    invoiceList,
    currentInvoiceIndex,
    handleVisualConfirmation,
    handleApply,
    handleApprove,
    handleReject,
    handleSkip
  };
};