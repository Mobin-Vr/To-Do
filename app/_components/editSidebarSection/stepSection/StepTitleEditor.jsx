"use client";

import useTaskStore from "@/app/_store/useTaskStore";
import autosize from "autosize";
import { useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/react/shallow";

export default function StepTitleEditor({ step, task, className }) {
  const textareaRef = useRef(null);

  const { updateTaskInStore } = useTaskStore(
    useShallow((state) => ({
      updateTaskInStore: state.updateTaskInStore,
    })),
  );
  const [isTyping, setIsTyping] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(step.step_title);
  const [previousTitle, setPreviousTitle] = useState(step.title);

  useEffect(() => {
    if (textareaRef.current) {
      autosize(textareaRef.current);
    }
  }, []);

  function handleFocus() {
    setPreviousTitle(currentTitle);
    setIsTyping(true);
  }

  function handleUpdateTitle(e) {
    setCurrentTitle(e.target.value);
  }

  function handleBlur() {
    setIsTyping(false);
    if (currentTitle.trim()) {
      const updatedFields = { step_title: currentTitle };

      updateTaskInStore(task.task_id, {
        task_steps: task.task_steps.map((theStep) =>
          theStep.step_id === step.step_id
            ? { ...theStep, ...updatedFields }
            : theStep,
        ),
      });
    }

    if (currentTitle.trim() === "") setCurrentTitle(previousTitle);
  }

  return (
    <textarea
      ref={textareaRef}
      onFocus={handleFocus}
      onBlur={handleBlur}
      value={currentTitle}
      onChange={handleUpdateTitle}
      spellCheck={false}
      maxLength={150}
      className={`mx-2 w-full resize-none content-center overflow-hidden whitespace-pre-wrap break-words bg-inherit py-2 text-sm font-light outline-none ${className} ${
        step.is_step_completed && !isTyping ? "text-gray-800 line-through" : ""
      }`}
      rows={1}
    />
  );
}
