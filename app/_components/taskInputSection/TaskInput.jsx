"use client";

import {
  AI_DEBOUNCE_MS,
  AI_ENABLED,
  defaultCategoryId,
  MAX_INPUT_TASK_TITLE,
  MIN_TEXT_LENGTH_FOR_AI,
} from "@/app/_lib/configs";
import { checkIfToday, generateNewUuid, getDateNowIso } from "@/app/_lib/utils";
import useTaskStore from "@/app/_store/useTaskStore";
import useUserStore from "@/app/_store/useUserStore";
import { CircleIcon, PlusIcon } from "@/public/icons/icons";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import InputAddDue from "./InputAddDue";
import InputAddReminder from "./InputAddReminder";
import InputAddRepeat from "./InputAddRepeat";

export default function TaskInput({
  bgColor,
  className,
  categoryId,
  listName,
  mustFocus,
  setMustFocus,
}) {
  const { addTaskToStore } = useTaskStore(
    useShallow((state) => ({
      addTaskToStore: state.addTaskToStore,
    })),
  );
  const { getUserState } = useUserStore(
    useShallow((state) => ({
      getUserState: state.getUserState,
    })),
  );

  const inputRef = useRef(null);
  const debounceRef = useRef(null);
  // Abort in-flight AI request when new one starts or on unmount
  const abortControllerRef = useRef(null);
  // Track manual edits so AI results don't overwrite user changes
  const manualEditsRef = useRef({
    dueDate: false,
    reminder: false,
    repeat: false,
  });
  // Prevent setState after unmount during async AI calls
  const isMountedRef = useRef(true);

  const [taskInput, setTaskInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  const [taskReminder, setTaskReminder] = useState(null);
  const [taskDueDate, setTaskDueDate] = useState(null);
  const [taskRepeat, setTaskRepeat] = useState(null);

  const handleFocus = () => setIsTyping(true);
  const handleBlur = () => {
    setIsTyping(false);
    setMustFocus(false);
  };

  // Clear input is a direct user action — cancel AI immediately here,
  // don't wait for the debounce effect to pick it up on next render
  const handleInputChange = (e) => {
    const value = e.target.value;
    setTaskInput(value);

    if (AI_ENABLED && value.trim().length === 0) {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (abortControllerRef.current) abortControllerRef.current.abort();
      setAiResult(null);
      setIsAnalyzing(false);
    }
  };

  // Any manual field change locks that field against future AI overwrites
  const handleManualDueDateChange = useCallback((value) => {
    manualEditsRef.current.dueDate = true;
    setTaskDueDate(value);
  }, []);

  const handleManualReminderChange = useCallback((value) => {
    manualEditsRef.current.reminder = true;
    setTaskReminder(value);
  }, []);

  const handleManualRepeatChange = useCallback((value) => {
    manualEditsRef.current.repeat = true;
    setTaskRepeat(value);
  }, []);

  // Debounced AI analysis — cancels previous request before firing new one
  const analyzeText = useCallback(async (text) => {
    if (!AI_ENABLED) return;
    if (!text || text.trim().length < MIN_TEXT_LENGTH_FOR_AI) return;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsAnalyzing(true);
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const res = await fetch("/api/parse-task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, timezone }),
        signal: controller.signal,
      });

      if (res.ok) {
        const data = await res.json();
        if (isMountedRef.current) setAiResult(data);
      } else {
        console.error("AI parse request failed:", res.status);
      }
    } catch (error) {
      // AbortError is expected when a newer request cancels this one
      if (error.name !== "AbortError") {
        console.error("AI analysis failed", error);
      }
    } finally {
      // Only clear spinner if this is still the latest request and component is mounted
      if (abortControllerRef.current === controller && isMountedRef.current) {
        setIsAnalyzing(false);
      }
    }
  }, []);

  // Schedule debounced analysis on input change
  useEffect(() => {
    if (!AI_ENABLED) return;
    if (taskInput.trim().length === 0) return;

    const timeoutId = setTimeout(() => {
      analyzeText(taskInput);
    }, AI_DEBOUNCE_MS);
    debounceRef.current = timeoutId;

    return () => clearTimeout(timeoutId);
  }, [taskInput, analyzeText]);

  // Cleanup on unmount
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, []);

  // Apply AI result only to fields the user hasn't manually edited
  useEffect(() => {
    if (!aiResult) return;
    queueMicrotask(() => {
      const edits = manualEditsRef.current;
      if (aiResult.task_due_date && !edits.dueDate)
        setTaskDueDate(aiResult.task_due_date);
      if (aiResult.task_reminder && !edits.reminder)
        setTaskReminder(aiResult.task_reminder);
      if (aiResult.task_repeat && !edits.repeat)
        setTaskRepeat(aiResult.task_repeat);
    });
  }, [aiResult]);

  function resetInputState() {
    setTaskInput("");
    setAiResult(null);
    setTaskReminder(null);
    setTaskDueDate(null);
    setTaskRepeat(null);
    manualEditsRef.current = { dueDate: false, reminder: false, repeat: false };
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (taskInput.trim() === "") return;

    const catTitleCond = categoryId === defaultCategoryId ? "Tasks" : listName;

    // Task goes into My Day if due/reminder is today or we're in My Day list
    const myDayCond =
      checkIfToday(taskDueDate) ||
      checkIfToday(taskReminder) ||
      listName === "My Day" ||
      (listName === "Planned" && !taskDueDate && !taskReminder);

    // AI's task_title is preferred, but fall back to raw user input
    const newItem = {
      task_id: generateNewUuid(),
      task_owner_id: getUserState().user_id,
      task_title: aiResult?.task_title || taskInput,
      task_category_id: categoryId,
      task_category_title: catTitleCond,
      task_due_date: taskDueDate,
      task_reminder: taskReminder,
      task_repeat: taskRepeat,
      task_steps: aiResult?.task_steps || [],
      task_created_at: getDateNowIso(),
      task_completed_at: null,
      task_updated_at: null,
      is_task_completed: false,
      is_task_starred: aiResult?.is_task_starred || listName === "Important",
      is_task_in_myday: myDayCond,
    };

    addTaskToStore(newItem);
    resetInputState();
  }

  // Auto-focus when triggered externally, then reset flag
  useEffect(() => {
    if (mustFocus && inputRef.current) {
      inputRef.current.focus();
      setMustFocus?.(false);
    }
  }, [mustFocus, setMustFocus]);

  const showAiGlow = AI_ENABLED && isAnalyzing;

  return (
    <div
      className={`relative ${className}`}
      style={{ backgroundColor: bgColor.mainBackground }}
    >
      <button
        className={`absolute left-[3rem] top-3.5 z-20 cursor-pointer opacity-60 sm:left-[3.5rem] ${
          isAnalyzing ? "animate-pulse" : ""
        }`}
        onClick={handleSubmit}
      >
        {isTyping || taskInput.length > 0 ? <CircleIcon /> : <PlusIcon />}
      </button>

      {/* Glow wrapper — no overflow-hidden so the ring/halo extend past the box */}
      <div
        className={`ai-input-glow relative z-10 h-[2.9rem] w-full rounded-md ${
          showAiGlow ? "ai-input-glow-active" : ""
        }`}
      >
        <form
          className="h-full w-full overflow-hidden rounded-md"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            ref={inputRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
            maxLength={MAX_INPUT_TASK_TITLE}
            spellCheck={false}
            value={taskInput}
            onChange={handleInputChange}
            style={{
              backgroundColor: bgColor.toggleBackground,
              paddingRight: taskInput.length > 0 ? "7rem" : "0",
            }}
            className={`custom-placeholder h-full w-full rounded-md pl-12 text-sm font-light outline-none ${
              isTyping ? "placeholder-gray-500" : "placeholder-gray-800"
            }`}
            placeholder={
              isTyping
                ? `Try typing 'Pay utilities bill by Friday 6pm'`
                : "Add a task"
            }
          />
        </form>
      </div>

      <AnimatePresence>
        {taskInput.length > 0 && (
          <motion.div
            className="absolute right-[3rem] top-3.5 z-20 flex gap-3 sm:right-[3.5rem]"
            initial={{ opacity: 0, scale: 1, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1, y: -5 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <InputAddReminder
              setTaskReminder={handleManualReminderChange}
              InputSelectedDate={taskReminder}
              className="opacity-60"
            />
            <InputAddDue
              setTaskDueDate={handleManualDueDateChange}
              InputSelectedDate={taskDueDate}
              className="opacity-60"
            />
            <InputAddRepeat
              setTaskRepeat={handleManualRepeatChange}
              selectedRepeat={taskRepeat}
              setTaskDueDate={handleManualDueDateChange}
              taskDueDate={taskDueDate}
              taskRepeat={taskRepeat}
              className="opacity-60"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @property --ai-angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }

        .ai-input-glow {
          isolation: isolate;
        }

        /* Rotating gradient ring */
        .ai-input-glow::before {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: 0.6rem;
          padding: 2px;
          background: conic-gradient(
            from var(--ai-angle),
            #5b8def,
            #7c6ff0,
            #a86ee8,
            #c96ed9,
            #d76fc4,
            #8f7cf0,
            #5b8def
          );
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
          z-index: 1;
        }

        /* Blurred glow behind the ring */
        .ai-input-glow::after {
          content: "";
          position: absolute;
          inset: 0px;
          border-radius: 1rem;
          background: conic-gradient(
            from var(--ai-angle),
            #5b8def,
            #7c6ff0,
            #a86ee8,
            #c96ed9,
            #d76fc4,
            #8f7cf0,
            #5b8def
          );
          filter: blur(5px);
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
          z-index: -1;
        }

        .ai-input-glow-active::before,
        .ai-input-glow-active::after {
          opacity: 1;
          animation: ai-rotate 3.2s linear infinite;
        }

        .ai-input-glow-active::after {
          opacity: 0.55;
        }

        @keyframes ai-rotate {
          to {
            --ai-angle: 360deg;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ai-input-glow-active::before,
          .ai-input-glow-active::after {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
