"use client";

import { useEffect } from "react";
import useTaskStore from "../taskStore";

function UnsavedChangesWarning() {
  useEffect(() => {
    function handleBeforeUnload(e) {
      const { changeLog } = useTaskStore.getState();
      if (changeLog.length) e.preventDefault();
    }

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []); // Only attach once – read length directly from store inside handler

  return null;
}

export default UnsavedChangesWarning;
