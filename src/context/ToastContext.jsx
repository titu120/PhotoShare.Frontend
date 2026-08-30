import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  // message দেখানোর function — যেকোনো Component থেকে call করা যাবে
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);   // ২.৫ সেকেন্ড পর automatic মুছে যাবে
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <div className="toast">{toast}</div>}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}