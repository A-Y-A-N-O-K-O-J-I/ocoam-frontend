import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

export default function Notification({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const getNotificationConfig = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-gradient-to-r from-green-500 to-emerald-600',
          icon: '✅'
        };
      case 'error':
        return {
          bg: 'bg-gradient-to-r from-red-500 to-red-600',
          icon: '❌'
        };
      default:
        return {
          bg: 'bg-gradient-to-r from-blue-500 to-blue-600',
          icon: 'ℹ️'
        };
    }
  };

  const config = getNotificationConfig();

  return (
    <div className={`fixed top-4 sm:top-6 right-4 sm:right-6 ${config.bg} text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl shadow-2xl z-50 flex items-center gap-2 sm:gap-3 transform animate-slide-in max-w-xs sm:max-w-sm`}>
      <span className="text-base sm:text-lg flex-shrink-0">{config.icon}</span>
      <span className="font-medium text-sm sm:text-base flex-1 min-w-0 break-words">{message}</span>
      <button 
        onClick={onClose} 
        className="text-white/80 hover:text-white ml-1 sm:ml-2 flex-shrink-0"
      >
        <FaTimes size={12} className="sm:hidden" />
        <FaTimes size={14} className="hidden sm:block" />
      </button>
    </div>
  );
}