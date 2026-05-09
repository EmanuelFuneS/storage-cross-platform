import { useTypeStore } from "@/lib/stores";
import React, { useEffect } from "react";

const StoreInitializer = () => {
  const { initializeTypes } = useTypeStore();
  useEffect(() => {
    initializeTypes();
  }, [initializeTypes]);
  return null;
};

export default StoreInitializer;
