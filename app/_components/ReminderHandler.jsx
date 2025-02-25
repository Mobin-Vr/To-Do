"use client";

import {
  ALARM_STOP_TIMEOUT,
  CHECK_REMINDERS_INTERVAL,
  TOAST_SHOWN_DURATION,
} from "@/app/_lib/configs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useShallow } from "zustand/react/shallow";
import useTaskStore from "../taskStore";
import AlarmToast from "./AlarmToast";
import {
  calculateNextDate,
  checkIfToday,
  isDateBeforeToday,
} from "../_lib/utils";

export default function ReminderHandler() {
  const { getTaskList, updateTaskInStore } = useTaskStore(
    useShallow((state) => ({
      getTaskList: state.getTaskList,
      updateTaskInStore: state.updateTaskInStore,
    })),
  );

  const [alarmSound, setAlarmSound] = useState(null);
  const [isUserInteracted, setIsUserInteracted] = useState(false);

  useEffect(() => {
    Notification.requestPermission();

    // Detect user interaction
    const handleUserInteraction = () => {
      setAlarmSound(new Audio("/sounds/alarm.mp3"));
      setIsUserInteracted(true);
      document.removeEventListener("click", handleUserInteraction);
    };

    document.addEventListener("click", handleUserInteraction);

    function checkReminders() {
      if (!isUserInteracted || getTaskList() === null) return;

      getTaskList().forEach((task) => {
        // In each interval, we need to check if the task's due date or reminder is today. If either is today, we should set `is_task_in_myday` to `true`.
        if (!task.is_task_in_myday && checkIfToday(task.task_reminder))
          updateTaskInStore(task.task_id, {
            is_task_in_myday: !task.is_task_in_myday,
          });

        if (!task.is_task_in_myday && checkIfToday(task.task_due_date))
          updateTaskInStore(task.task_id, {
            is_task_in_myday: !task.is_task_in_myday,
          });

        // Check if the task's due date is before today (yesterday or earlier), then apply the repeat!
        if (task.task_repeat && isDateBeforeToday(task.task_due_date)) {
          const nextRepeatDate = calculateNextDate(
            task.task_due_date,
            task.task_repeat,
          );

          updateTaskInStore(task.task_id, { task_due_date: nextRepeatDate });
        }

        if (
          task.task_reminder !== null &&
          !task.is_task_completed &&
          new Date(task.task_reminder) <= Date.now()
        ) {
          triggerReminder(task);
          updateTaskInStore(task.task_id, { task_reminder: null });
        }
      });
    }

    const interval = setInterval(checkReminders, CHECK_REMINDERS_INTERVAL);
    return () => {
      clearInterval(interval);
      document.removeEventListener("click", handleUserInteraction);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUserInteracted]);

  function triggerReminder(task) {
    if (!alarmSound) return;

    alarmSound.loop = true;
    alarmSound
      .play()
      .catch((error) => console.error("Audio play failed:", error));

    // Set a timeout to stop the alarm after 5 minutes
    const autoStopTimeout = setTimeout(() => {
      alarmSound.loop = false;
      alarmSound.pause();
      alarmSound.currentTime = 0;
    }, ALARM_STOP_TIMEOUT);

    toast.custom(
      (t) => (
        <AlarmToast
          t={t}
          toast={toast}
          task={task}
          alarmSound={alarmSound}
          autoStopTimeout={autoStopTimeout}
          updateTaskInStore={updateTaskInStore}
        />
      ),
      { duration: TOAST_SHOWN_DURATION },
    );

    if (Notification.permission === "granted") {
      new Notification(`Reminder!`, {
        body: task.task_title,
        icon: "@/app/icon.png",
      });
    }
  }

  return null;
}
