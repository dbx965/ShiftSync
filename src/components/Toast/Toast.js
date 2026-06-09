import React, { useEffect, useState, useCallback } from 'react';
import { useAppContext } from '../../context/AppContext';
import './Toast.css';

const Toast = () => {
  const { toast, hideToast } = useAppContext();
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      hideToast();
    }, 300);
  }, [hideToast]);

  useEffect(() => {
    if (toast.show) {
      setIsVisible(true);
      setIsExiting(false);
      
      // Auto-hide after 3 seconds
      const timer = setTimeout(() => {
        handleClose();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [toast.show, handleClose]);

  if (!isVisible) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'info':
        return 'ℹ';
      case 'warning':
        return '⚠';
      default:
        return '✓';
    }
  };

  return (
    <div className={`toast-container ${isExiting ? 'exiting' : ''}`}>
      <div className={`toast toast-${toast.type}`}>
        <span className="toast-icon">{getIcon()}</span>
        <span className="toast-message">{toast.message}</span>
        <button className="toast-close" onClick={handleClose}>×</button>
      </div>
    </div>
  );
};

export default Toast;
