"use client";

import dynamic from "next/dynamic";
import { ReactNode, useEffect, useState } from "react";

interface ClientWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function ClientWrapper({
  children,
  fallback = <>...Loading</>,
}: ClientWrapperProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? children : fallback;
}
