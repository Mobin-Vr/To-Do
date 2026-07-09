"use client";

import useUiStore from "@/app/_store/useUiStore";
import useTaskStore from "@/app/_store/useTaskStore";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

export default function ReloadStoreInitializer() {
  const { resetSidebar } = useUiStore(
    useShallow((state) => ({
      resetSidebar: state.resetSidebar,
    })),
  );
  const { resetActiveTask } = useTaskStore(
    useShallow((state) => ({
      resetActiveTask: state.resetActiveTask,
    })),
  );

  useEffect(() => {
    resetSidebar();
    resetActiveTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetSidebar, resetActiveTask]);

  return null;
}
