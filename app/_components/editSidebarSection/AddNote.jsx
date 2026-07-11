"use client";

import { MAX_INPUT_TEXTAREA } from "@/app/_lib/configs";
import autosize from "autosize";
import { useEffect, useRef, useState } from "react";
import BoxTemplate from "./BoxTemplate";

function AddNote({ updateTaskInStore, task }) {
  const textareaRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const [note, setNote] = useState(task.task_note || "");

  // Apply autosize after the textarea is mounted (no longer called during render)
  useEffect(() => {
    if (textareaRef.current) {
      autosize(textareaRef.current);
    }
  }, []);

  // Sync local state when the task note changes externally, without synchronous setState
  useEffect(() => {
    queueMicrotask(() => setNote(task.task_note || ""));
  }, [task.task_note]);

  function handleBlur() {
    setIsTyping(false);

    // Safe comparison – task.task_note may be null
    const currentNote = note.trim();
    const originalNote = (task.task_note || "").trim();

    if (currentNote !== originalNote) {
      updateTaskInStore(task.task_id, { task_note: note });
    }
  }

  return (
    <BoxTemplate className="min-h-20 p-3">
      <textarea
        ref={textareaRef}
        value={note}
        onFocus={() => setIsTyping(true)}
        onBlur={handleBlur}
        onChange={(e) => setNote(e.target.value)}
        placeholder={isTyping ? "" : "Add note"}
        maxLength={MAX_INPUT_TEXTAREA}
        className="custom-placeholder w-full resize-none bg-inherit outline-none placeholder:font-light placeholder:text-black placeholder:opacity-80"
      />
    </BoxTemplate>
  );
}

export default AddNote;
