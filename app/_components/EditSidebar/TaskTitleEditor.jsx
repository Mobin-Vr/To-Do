import { MAX_INPUT_LENGTH } from "@/app/_lib/configs";
import useTaskStore from "@/app/taskStore";
import { useState, useEffect, useRef, useCallback } from "react";

export default function TaskTitleEditor({ task, className }) {
  const updateTitle = useTaskStore((state) => state.updateTitle);

  const textareaRef = useRef(null);

  const [isTyping, setIsTyping] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(task.task_title);
  const [previousTitle, setPreviousTitle] = useState(task.task_title);
  const [hasTrimed, setHasTrimed] = useState(false); // This state manages title trimming. It ensures the component reflects the trimmed title, as trimming alone doesn’t trigger a re-render. Updating this state forces a manual re-render.

  const adjustHeight = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);

  useEffect(() => {
    setCurrentTitle(task.task_title);
    adjustHeight();
  }, [task.task_title, hasTrimed, adjustHeight]);

  // 1. Save the current value when input is focused (onFocus)
  function handleFocus() {
    setPreviousTitle(currentTitle);
    setIsTyping(true);
  }

  // 2. Update the current title while typing (onChange)
  function handleUpdateTitle(e) {
    setCurrentTitle(e.target.value);
    adjustHeight();
  }

  // 3. Store the title if it's not empty, otherwise restore the previous one (onBlur)
  function handleBlur() {
    setIsTyping(false);
    if (currentTitle.trim() === "") setCurrentTitle(previousTitle);
    if (currentTitle.trim() !== "") {
      updateTitle(task.task_id, currentTitle.trim());
      setCurrentTitle(currentTitle.trim());
      setHasTrimed(true);
    }
  }

  return (
    <textarea
      ref={textareaRef}
      onFocus={handleFocus}
      onBlur={handleBlur}
      value={currentTitle}
      onChange={handleUpdateTitle}
      maxLength={MAX_INPUT_LENGTH}
      className={`min-h-[2rem] w-full resize-none overflow-hidden whitespace-pre-wrap break-words bg-inherit p-2 outline-none ${className} ${
        task.is_task_completed && !isTyping ? "text-gray-800 line-through" : ""
      }`}
      rows={1}
    />
  );
}
