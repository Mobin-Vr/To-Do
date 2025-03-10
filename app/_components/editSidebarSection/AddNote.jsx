import { useEffect, useRef, useState } from "react";
import BoxTemplate from "./BoxTemplate";
import { MAX_INPUT_TEXTAREA } from "@/app/_lib/configs";
import autosize from "autosize";

function AddNote({ updateTaskInStore, task }) {
  const textareaRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  const [note, setNote] = useState(task.task_note || ""); // Local state to store the note

  useEffect(() => {
    setNote(task.task_note || "");
  }, [task.task_note]);

  // Using the autosize library to automatically adjust the height of the textarea
  autosize(textareaRef.current);

  // Handle blur event (when the textarea loses focus)
  function handleBlur() {
    setIsTyping(false);

    // Only send to the database if the note has changed
    if (note.trim() !== task.task_note.trim()) {
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
