"use client";

import { useEffect } from "react";
import useTaskStore from "../taskStore";
import { useShallow } from "zustand/react/shallow";

const UnsavedChangesWarning = () => {
  const { changeLog } = useTaskStore(
    useShallow((state) => ({
      changeLog: state.changeLog,
    })),
  );

  useEffect(() => {
    function handleBeforeUnload(e) {
      if (changeLog.length) e.preventDefault();
    }

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [changeLog.length]);

  return null;
};

export default UnsavedChangesWarning;
