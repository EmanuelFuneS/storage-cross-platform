"use client";

import { useEffect, useState } from "react";
import { create } from "zustand";
import { cn } from "../lib";
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from "../lib";

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
  duration?: number;
}

interface ToastState {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (toast) => {
    const id = Math.random().toString(36).substring(2, 11);
    set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }));
  },
  removeToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
  },
}));

export function useToast() {
  const addToast = useToastStore((s) => s.addToast);
  const removeToast = useToastStore((s) => s.removeToast);
  return {
    toast: (props: Omit<Toast, "id">) => addToast(props),
    dismiss: (id: string) => removeToast(id),
  };
}

const iconMap: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle size={18} />,
  error: <AlertCircle size={18} />,
  warning: <AlertTriangle size={18} />,
  info: <Info size={18} />,
};

const borderMap: Record<ToastType, string> = {
  success: "border-green-500",
  error: "border-red-500",
  warning: "border-yellow-500",
  info: "border-blue-500",
};

const iconColorMap: Record<ToastType, string> = {
  success: "text-green-500",
  error: "text-red-500",
  warning: "text-yellow-500",
  info: "text-blue-500",
};

function ToastItem({ toast }: { toast: Toast }) {
  const removeToast = useToastStore((s) => s.removeToast);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => removeToast(toast.id), 300);
    }, toast.duration ?? 5000);
    return () => clearTimeout(timer);
  }, [toast, removeToast]);

  return (
    <div
      role="alert"
      className={cn(
        "flex items-start gap-3 p-4 rounded-lg border shadow-lg",
        "transition-all duration-300 ease-in-out bg-popover",
        exiting ? "opacity-0 translate-x-full" : "opacity-100 translate-x-0",
        borderMap[toast.type],
      )}
    >
      <span className={cn("mt-0.5 shrink-0", iconColorMap[toast.type])}>
        {iconMap[toast.type]}
      </span>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm text-foreground">{toast.title}</p>
        {toast.description && (
          <p className="text-xs text-secondary mt-1 break-words">
            {toast.description}
          </p>
        )}
      </div>
      <button
        onClick={() => {
          setExiting(true);
          setTimeout(() => removeToast(toast.id), 300);
        }}
        className="shrink-0 rounded-md p-1 hover:bg-accent transition-colors text-secondary hover:text-foreground"
        aria-label="Close"
      >
        <X size={14} />
      </button>
    </div>
  );
}

const ToastContainer = ({ className }: { className?: string }) => {
  const toasts = useToastStore((s) => s.toasts);

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className={cn(
        "fixed top-4 right-4 z-[100] flex flex-col gap-2 w-80 max-w-[calc(100vw-2rem)]",
        className,
      )}
    >
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} />
      ))}
    </div>
  );
};

export default ToastContainer;
