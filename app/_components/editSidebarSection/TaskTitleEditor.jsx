import { MAX_INPUT_TASK_TITLE } from "@/app/_lib/configs";
import useTaskStore from "@/app/taskStore";
import autosize from "autosize";
import { useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/react/shallow";

export default function TaskTitleEditor({ task, className }) {
  const { updateTaskInStore } = useTaskStore(
    useShallow((state) => ({
      updateTaskInStore: state.updateTaskInStore,
    })),
  );
  const textareaRef = useRef(null);

  const [isTyping, setIsTyping] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(task.task_title);
  const [previousTitle, setPreviousTitle] = useState(task.task_title);

  autosize(textareaRef.current);

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
      updateTaskInStore(task.task_id, { task_title: trimmedTitle }); // Save trimmed title
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
      spellCheck={false}
      maxLength={MAX_INPUT_TASK_TITLE}
      className={`min-h-[2rem] w-full resize-none overflow-hidden whitespace-pre-wrap break-words bg-inherit p-2 outline-none ${className} ${
        task.is_task_completed && !isTyping ? "text-gray-800 line-through" : ""
      }`}
    />
  );
}
