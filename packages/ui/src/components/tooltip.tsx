"use client";

import { useEffect, useState } from "react";
import { cn } from "../lib";
import Card from "./card";

interface TooltipProps {
  children: React.ReactNode;
  show: boolean;
  onClose: () => void;
  className?: string;
}

const Tooltip = ({ children, show, onClose, className }: TooltipProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => setVisible(true), 100);
      return () => clearTimeout(timer);
    }
    setVisible(false);
  }, [show]);

  if (!show && !visible) return null;

  return (
    <div
      className={cn(
        "absolute top-full right-0 z-50 p-4 transition-opacity duration-200",
        visible ? "opacity-100" : "opacity-0",
        className,
      )}
    >
      <Card scale={false} className="bg-popover text-foreground text-xs rounded-lg border border-slate-300 dark:border-muted shadow-lg p-3 whitespace-nowrap relative">
        {children}
        <button
          onClick={onClose}
          className="absolute -top-1.5 -right-1.5 rounded-full bg-primary text-white w-4 h-4 flex items-center justify-center text-[10px] leading-none hover:opacity-90 transition-opacity"
        >
          x
        </button>
      </Card>
    </div>
  );
};

export default Tooltip;
