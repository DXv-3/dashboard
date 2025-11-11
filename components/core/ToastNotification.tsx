import React from 'react';
import { useUiStore } from '../../stores/uiStore';

const ToastNotification: React.FC = () => {
  const { toasts, removeToast } = useUiStore();

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'info': return 'ℹ️';
      default: return '';
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-600';
      case 'error': return 'bg-red-600';
      case 'info': return 'bg-blue-600';
      default: return 'bg-gray-600';
    }
  };


  return (
    <div className="fixed bottom-5 right-5 z-50 space-y-3">
      {toasts.map(toast => (
        <div 
          key={toast.id} 
          className={`flex items-center justify-between p-4 rounded-lg shadow-lg text-white animate-fade-in-up ${getBgColor(toast.type)}`}
        >
          <span className="mr-3">{getIcon(toast.type)}</span>
          <p>{toast.message}</p>
          <button onClick={() => removeToast(toast.id)} className="ml-4 font-bold">X</button>
        </div>
      ))}
    </div>
  );
};

export default ToastNotification;
