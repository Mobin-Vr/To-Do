"use client";

import { useEffect } from "react";
import { resetAllStores } from "../_store/resetAllStores";

export default function ResetTaskStore() {
  useEffect(() => {
    resetAllStores();
  }, []);

  return null;
}
