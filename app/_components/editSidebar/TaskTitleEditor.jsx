import { MAX_INPUT_TASK_TITLE } from "@/app/_lib/configs";
import useTaskStore from "@/app/taskStore";
import { useState, useEffect, useRef } from "react";

export default function TaskTitleEditor({ task, className }) {
  const updateTitle = useTaskStore((state) => state.updateTitle);
  const textareaRef = useRef(null);

  const [isTyping, setIsTyping] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(task.task_title);
  const [previousTitle, setPreviousTitle] = useState(task.task_title);

  // Adjusts the height of the textarea dynamically based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currentTitle]);

  // Syncs `currentTitle` with `task.task_title` when the task updates
  useEffect(() => {
    setCurrentTitle(task.task_title);
  }, [task.task_title]);

  function handleFocus() {
    setPreviousTitle(currentTitle);
    setIsTyping(true);
  }

  function handleUpdateTitle(e) {
    setCurrentTitle(e.target.value);
  }

  function handleBlur() {
    setIsTyping(false);
    const trimmedTitle = currentTitle.trim();

    if (trimmedTitle === "") {
      setCurrentTitle(previousTitle); // Restore previous title if empty
    } else {
      updateTitle(task.task_id, trimmedTitle); // Save trimmed title
      setCurrentTitle(trimmedTitle);
    }
  }

  return (
    <textarea
      ref={textareaRef}
      onFocus={handleFocus}
      onBlur={handleBlur}
      value={currentTitle}
      onChange={handleUpdateTitle}
      rows={1}
      maxLength={MAX_INPUT_TASK_TITLE}
      className={`min-h-[2rem] w-full resize-none overflow-hidden whitespace-pre-wrap break-words bg-inherit p-2 outline-none ${className} ${
        task.is_task_completed && !isTyping ? "text-gray-800 line-through" : ""
      }`}
    />
  );
}
