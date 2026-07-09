"use client";

import { useEffect } from "react";
import useSyncStore from "../_store/useSyncStore";

function UnsavedChangesWarning() {
  useEffect(() => {
    function handleBeforeUnload(e) {
      const { changeLog } = useSyncStore.getState();
      if (changeLog.length) e.preventDefault();
    }

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []); // Only attach once – read length directly from store inside handler

  return null;
}

export default UnsavedChangesWarning;
