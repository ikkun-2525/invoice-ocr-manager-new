import { AppError } from '@/hooks/useErrorHandler';

interface ErrorNotificationProps {
  errors: AppError[];
  onRemove: (id: string) => void;
}

export const ErrorNotification = ({ errors, onRemove }: ErrorNotificationProps) => {
  if (errors.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {errors.map((error) => (
        <div
          key={error.id}
          className={`max-w-sm w-full shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden ${
            error.type === 'error' 
              ? 'bg-red-50 border border-red-200' 
              : error.type === 'warning'
              ? 'bg-yellow-50 border border-yellow-200'
              : 'bg-blue-50 border border-blue-200'
          }`}
        >
          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {error.type === 'error' && (
                  <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                {error.type === 'warning' && (
                  <svg className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                )}
                {error.type === 'info' && (
                  <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
              <div className="ml-3 w-0 flex-1 pt-0.5">
                <p className={`text-sm font-medium ${
                  error.type === 'error' 
                    ? 'text-red-900' 
                    : error.type === 'warning'
                    ? 'text-yellow-900'
                    : 'text-blue-900'
                }`}>
                  {error.message}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {error.timestamp.toLocaleTimeString()}
                </p>
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <button
                  className={`inline-flex ${
                    error.type === 'error' 
                      ? 'text-red-400 hover:text-red-500' 
                      : error.type === 'warning'
                      ? 'text-yellow-400 hover:text-yellow-500'
                      : 'text-blue-400 hover:text-blue-500'
                  }`}
                  onClick={() => onRemove(error.id)}
                >
                  <span className="sr-only">閉じる</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};