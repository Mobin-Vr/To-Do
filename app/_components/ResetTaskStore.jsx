"use client";

import { useEffect } from "react";
import { resetAllStores } from "@/app/_store/resetAllStores";

export default function ResetTaskStore() {
  useEffect(() => {
    resetAllStores();
  }, []);

  return null;
}
