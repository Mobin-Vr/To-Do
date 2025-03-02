"use client";

import { defaultCategoryId, MAX_INPUT_TASK_TITLE } from "@/app/_lib/configs";
import { CircleIcon, PlusIcon } from "@/public/icons/icons";
import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { checkIfToday, generateNewUuid, getDateNowIso } from "../../_lib/utils";
import useTaskStore from "../../taskStore";
import InputAddDue from "./InputAddDue";
import InputAddReminder from "./InputAddReminder";
import InputAddRepeat from "./InputAddRepeat";
import { useRef } from "react";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TaskInput({
  bgColor,
  className,
  categoryId,
  listName,
  mustFocus,
  setMustFocus,
}) {
  const { addTaskToStore, getUserState } = useTaskStore(
    useShallow((state) => ({
      addTaskToStore: state.addTaskToStore,
      getUserState: state.getUserState,
    })),
  );

  const inputRef = useRef(null);

  const [taskInput, setTaskInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [taskReminder, setTaskReminder] = useState(null);
  const [taskDueDate, setTaskDueDate] = useState(null);
  const [taskRepeat, setTaskRepeat] = useState(null);

  const handleFocus = () => setIsTyping(true);
  const handleBlur = () => {
    setIsTyping(false);
    setMustFocus(false);
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (taskInput.trim() === "") return;

    const catTitleCond = categoryId === defaultCategoryId ? "Tasks" : listName;

    const myDayCond =
      checkIfToday(taskDueDate) ||
      checkIfToday(taskReminder) ||
      listName === "My Day" ||
      (listName === "Planned" && !taskDueDate && !taskReminder);

    const newItem = {
      task_id: generateNewUuid(),
      task_owner_id: getUserState().user_id,
      task_title: taskInput,
      task_category_id: categoryId,
      task_category_title: catTitleCond,
      task_note: "",
      task_due_date: taskDueDate,
      task_reminder: taskReminder,
      task_repeat: taskRepeat,
      task_steps: [],
      task_created_at: getDateNowIso(),
      task_completed_at: null,
      task_updated_at: null,
      is_task_completed: false,
      is_task_starred: listName === "Important",
      is_task_in_myday: myDayCond,
    };

    addTaskToStore(newItem);
    setTaskInput("");
  }

  useEffect(() => {
    if (mustFocus && inputRef.current) {
      inputRef.current.focus(); // Auto-focus the input if mustFocus is true
    }
  }, [mustFocus]); // Runs every time mustFocus changes

  return (
    <div
      className={`relative ${className}`}
      style={{ backgroundColor: bgColor.mainBackground }}
    >
      <button
        className="absolute left-[3rem] top-3.5 cursor-pointer opacity-60 sm:left-[3.5rem]"
        onClick={handleSubmit}
      >
        {isTyping || taskInput.length > 0 ? <CircleIcon /> : <PlusIcon />}
      </button>
      <form
        className="z-10 h-[2.9rem] w-full overflow-hidden rounded-md"
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
          onChange={(e) => setTaskInput(e.target.value)}
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

      <AnimatePresence>
        {taskInput.length > 0 && (
          <motion.div
            className="absolute right-[3rem] top-3.5 flex gap-3 sm:right-[3.5rem]"
            initial={{ opacity: 0, scale: 1, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1, y: -5 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <InputAddReminder
              setTaskReminder={setTaskReminder}
              InputSelectedDate={taskReminder}
              className="opacity-60"
            />
            <InputAddDue
              setTaskDueDate={setTaskDueDate}
              InputSelectedDate={taskDueDate}
              className="opacity-60"
            />
            <InputAddRepeat
              setTaskRepeat={setTaskRepeat}
              selectedRepeat={taskRepeat}
              setTaskDueDate={setTaskDueDate}
              taskDueDate={taskDueDate}
              taskRepeat={taskRepeat}
              className="opacity-60"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
