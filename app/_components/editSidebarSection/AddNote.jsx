import { useEffect, useRef, useState } from "react";
import BoxTemplate from "./BoxTemplate";
import { MAX_INPUT_TEXTAREA } from "@/app/_lib/configs";

function AddNote({ updateTaskInStore, task, isEditSidebarOpen }) {
  const textareaRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  const [note, setNote] = useState(task.task_note || ""); // Local state to store the note

  useEffect(() => {
    setNote(task.task_note || "");
  }, [task.task_note]);

  console.log("task note:", task.task_note, "note:", note);

  useEffect(() => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto"; // Reset height
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [isEditSidebarOpen, task.task_note]);

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
