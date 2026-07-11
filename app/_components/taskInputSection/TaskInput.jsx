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
  // Cancels the in-flight AI request when a newer one starts, or on unmount
  const abortControllerRef = useRef(null);
  // Tracks which fields the user changed by hand, so an AI result can never overwrite them
  const manualEditsRef = useRef({
    dueDate: false,
    reminder: false,
    repeat: false,
  });
  // Guards against setState firing after the component has unmounted
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

  // Runs synchronously as a direct response to the keystroke, not inside an effect.
  // Clearing the input is a discrete user action, not "external state to sync with",
  // so it belongs in the event handler - this also drops any pending AI work with
  // zero delay, rather than waiting for the debounce effect to notice on next render.
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

  // Wrapped setters passed to the manual date/reminder/repeat pickers. Any manual
  // change "locks" that field so a later AI result can't override it. These are
  // harmless no-ops in normal mode, since aiResult is never set there.
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

  // Debounced AI analysis. Cancels any request still in flight before starting a new
  // one, so a slow older response can never land after a newer one.
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
        // Server already logged the details - fail quietly so typing isn't interrupted
        console.error("AI parse request failed:", res.status);
      }
    } catch (error) {
      // AbortError fires whenever a newer keystroke (or a clear/unmount) cancels
      // this request - it's expected control flow, not a real error.
      if (error.name !== "AbortError") {
        console.error("AI analysis failed", error);
      }
    } finally {
      // Only clear the spinner if this request is still the latest one AND the
      // component is still mounted. Otherwise an old, superseded request could
      // turn off a newer request's spinner, or set state after unmount.
      if (abortControllerRef.current === controller && isMountedRef.current) {
        setIsAnalyzing(false);
      }
    }
  }, []);

  // Schedule debounced analysis whenever there's non-empty input to analyze (AI mode
  // only). The empty-input case is handled synchronously in handleInputChange above,
  // so this effect only ever subscribes a timer - it never calls setState itself.
  useEffect(() => {
    if (!AI_ENABLED) return;
    if (taskInput.trim().length === 0) return;

    const timeoutId = setTimeout(() => {
      analyzeText(taskInput);
    }, AI_DEBOUNCE_MS);
    debounceRef.current = timeoutId;

    return () => clearTimeout(timeoutId);
  }, [taskInput, analyzeText]);

  // Track mount state and cancel any in-flight request if the component unmounts
  // mid-analysis (e.g. the user navigates away while a fetch is pending).
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, []);

  // When an AI result arrives, fill only the fields the user hasn't touched by hand.
  // This never overwrites the visible taskInput text - only the structured fields.
  // In normal mode aiResult is never set, so this effect simply never fires.
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

    const myDayCond =
      checkIfToday(taskDueDate) ||
      checkIfToday(taskReminder) ||
      listName === "My Day" ||
      (listName === "Planned" && !taskDueDate && !taskReminder);

    // Only these six AI fields are ever allowed to shape the saved task. The raw
    // text the user typed is always the fallback for the title - the AI's polished
    // task_title is only used when it's actually available.
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

  // Auto-focus the input when mustFocus is set to true,
  // then reset the flag to prevent repeated focusing.
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

      {/* This wrapper is what the glow renders around. It has NO overflow-hidden,
          so the ::before ring and ::after halo can extend past the box edges
          instead of being clipped like they were when the glow lived on <form>. */}
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

        /* Thin rotating ring hugging the box edge, Siri-style color sweep */
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

        /* Soft blurred halo hugging the box edge, thin and subtle */
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
