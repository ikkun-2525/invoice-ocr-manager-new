import { useState, useCallback } from 'react';

export interface AppError {
  message: string;
  type: 'error' | 'warning' | 'info';
  timestamp: Date;
  id: string;
}

const ERROR_AUTO_DISMISS_TIME = 5000; // 5秒

export const useErrorHandler = () => {
  const [errors, setErrors] = useState<AppError[]>([]);

  const addError = useCallback((message: string, type: AppError['type'] = 'error') => {
    const error: AppError = {
      message,
      type,
      timestamp: new Date(),
      id: Math.random().toString(36).slice(2, 11)
    };
    
    setErrors(prev => [...prev, error]);
    
    // 自動削除
    setTimeout(() => {
      setErrors(prev => prev.filter(e => e.id !== error.id));
    }, ERROR_AUTO_DISMISS_TIME);
  }, []);

  const removeError = useCallback((id: string) => {
    setErrors(prev => prev.filter(e => e.id !== id));
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors([]);
  }, []);

  const handleAsyncError = useCallback(async <T>(
    asyncFn: () => Promise<T>,
    errorMessage?: string
  ): Promise<T | null> => {
    try {
      return await asyncFn();
    } catch (error) {
      const message = errorMessage || 
        (error instanceof Error ? error.message : '予期しないエラーが発生しました');
      addError(message);
      return null;
    }
  }, [addError]);

  return {
    errors,
    addError,
    removeError,
    clearAllErrors,
    handleAsyncError
  };
};