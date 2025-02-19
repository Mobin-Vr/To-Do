"use client";

import { CircleIcon, PlusIcon } from "@/public/icons";
import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { checkIfToday, generateNewUuid, getDateNowIso } from "../../_lib/utils";
import useTaskStore from "../../taskStore";
import InputAddDue from "./InputAddDue";
import InputAddReminder from "./InputAddReminder";
import InputAddRepeat from "./InputAddRepeat";
import { defaultCategoryId } from "@/app/_lib/configs";

export default function TaskInput({
  bgColor,
  className,
  categoryId,
  listName,
}) {
  const { addTaskToStore, getUserInfo } = useTaskStore(
    useShallow((state) => ({
      addTaskToStore: state.addTaskToStore,
      getUserInfo: state.getUserInfo,
    })),
  );

  const [taskInput, setTaskInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [taskReminder, setTaskReminder] = useState(null);
  const [taskDueDate, setTaskDueDate] = useState(null);
  const [taskRepeat, setTaskRepeat] = useState(null);

  const handleFocus = () => setIsTyping(true);
  const handleBlur = () => setIsTyping(false);

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
      task_owner_id: getUserInfo().user_id,
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

  return (
    <div
      className={`relative ${className}`}
      style={{ backgroundColor: bgColor.mainBackground }}
    >
      <button
        className="absolute left-[4.5rem] top-3.5 cursor-pointer opacity-60"
        onClick={handleSubmit}
      >
        {isTyping || taskInput.length > 0 ? <CircleIcon /> : <PlusIcon />}
      </button>

      <form
        className="z-10 flex h-[2.9rem] w-full items-center overflow-hidden rounded-md"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={taskInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(e) => setTaskInput(e.target.value)}
          style={{ backgroundColor: bgColor.toggleBackground }}
          className={`custom-placeholder h-full w-full rounded-md pl-12 pr-28 text-sm font-light outline-none ${
            isTyping ? "placeholder-gray-500" : "placeholder-gray-800"
          }`}
          placeholder={
            isTyping
              ? `Try typing 'Pay utilities bill by Friday 6pm'`
              : "Add a task"
          }
        />
      </form>

      {taskInput.length > 0 && (
        <div className="absolute right-[4.5rem] top-3.5 flex gap-3">
          <InputAddReminder
            setTaskReminder={setTaskReminder}
            className="opacity-60"
          />

          <InputAddDue setTaskDueDate={setTaskDueDate} className="opacity-60" />

          <InputAddRepeat
            setTaskRepeat={setTaskRepeat}
            setTaskDueDate={setTaskDueDate}
            taskDueDate={taskDueDate}
            taskRepeat={taskRepeat}
            className="opacity-60"
          />
        </div>
      )}
    </div>
  );
}
