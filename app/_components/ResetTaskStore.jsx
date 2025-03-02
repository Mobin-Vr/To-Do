"use client";

import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import useTaskStore from "../taskStore";

export default function ResetTaskStore() {
  const { resetStore } = useTaskStore(
    useShallow((state) => ({
      resetStore: state.resetStore,
    })),
  );

  useEffect(() => {
    resetStore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
