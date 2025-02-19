import { useEffect, useRef } from "react";
import BoxTemplate from "./BoxTemplate";

function AddNote({ updateNote, task, isEditSidebarOpen }) {
  const textareaRef = useRef(null);

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
        value={task.task_note ? task.task_note : ""}
        onChange={(e) => handleNote(e.target.value)}
        placeholder="Add note"
        maxLength={300}
        className="w-full resize-none bg-inherit outline-none placeholder:text-black"
      />
    </BoxTemplate>
  );
}

export default AddNote;
