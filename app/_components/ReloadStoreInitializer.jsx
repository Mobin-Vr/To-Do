"use client";

import useTaskStore from "@/app/taskStore";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

export default function ReloadStoreInitializer() {
  const { resetOnReload } = useTaskStore(
    useShallow((state) => ({
      resetOnReload: state.resetOnReload,
    })),
  );

  useEffect(() => {
    resetOnReload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
