"use client";

import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { resetAllStores } from "../_store/resetAllStores";

export default function ResetTaskStore() {
  useEffect(() => {
    resetAllStores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
