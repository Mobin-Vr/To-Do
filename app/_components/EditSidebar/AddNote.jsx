import { useEffect, useRef, useState } from "react";
import BoxTemplate from "./BoxTemplate";
import { MAX_TEXT_ARIA_LENGTH } from "@/app/_lib/configs";

function AddNote({ updateNote, task, isEditSidebarOpen }) {
  const textareaRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto"; // Reset height
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [isEditSidebarOpen, task.task_note]);

  function handleNote(value) {
    updateNote(task.task_id, value);
  }

  return (
    <BoxTemplate className="min-h-20 p-3">
      <textarea
        ref={textareaRef}
        value={task.task_note || ""}
        onFocus={() => setIsTyping(true)}
        onBlur={() => setIsTyping(false)}
        onChange={(e) => handleNote(e.target.value)}
        placeholder={isTyping ? "" : "Add note"}
        maxLength={MAX_TEXT_ARIA_LENGTH}
        className="custom-placeholder w-full resize-none bg-inherit outline-none placeholder:font-light placeholder:text-black placeholder:opacity-80"
      />
    </BoxTemplate>
  );
}

export default AddNote;
