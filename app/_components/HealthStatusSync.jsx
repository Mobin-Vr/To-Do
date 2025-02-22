"use client";

import { useCallback, useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { addTask, deleteTask, updateManyTask } from "../_lib/data-services";
import { checkDatabaseHealth } from "../_lib/healthCheck";
import { getDateNowIso } from "../_lib/utils";
import useTaskStore from "../taskStore";
import useCustomToast from "../_lib/useCustomeToast";

export default function HealthStatusSync() {
  const [isConnected, setIsConnected] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [lastOnline, setLastOnline] = useState(null);

  const showToast = useCustomToast();

  const {
    updateConnectionStatus,
    toggleOfflineLogMode,
    changeLog,
    clearLog,
    isSyncing,
    toggleIsSyncing,
    syncLcWithDb,
    getConectionStatus,
  } = useTaskStore(
    useShallow((state) => ({
      updateConnectionStatus: state.updateConnectionStatus,
      toggleOfflineLogMode: state.toggleOfflineLogMode,
      changeLog: state.changeLog,
      clearLog: state.clearLog,
      isSyncing: state.isSyncing,
      toggleIsSyncing: state.toggleIsSyncing,
      syncLcWithDb: state.syncLcWithDb,
      getConectionStatus: state.getConectionStatus,
    })),
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsConnected(navigator.onLine);
    }
  }, []);

  // Sync local changes (changeLog) with the database
  const syncData = useCallback(async () => {
    // Exit if already syncing
    if (isSyncing) return;

    // If there is no log first get the data from cloud and replace that data in lc and then EXIT
    if (!changeLog.length) {
      await syncLcWithDb();
      return;
    }

    toggleIsSyncing(true); // Mark syncing as in progress

    // Separate change logs by their types for sending them to database
    const addTasks = changeLog
      .filter((log) => log.type === "add")
      .map((log) => log.task);

    const deleteTasks = changeLog
      .filter((log) => log.type === "delete")
      .map((log) => log.task);

    const completedUpdates = changeLog
      .filter((log) => log.type === "update-isCompleted")
      .map((log) => ({
        task: {
          isCompleted: log.task.is_task_completed,
          updatedAt: log.task.task_updated_at,
          completedAt: log.task.task_completed_at,
        },
        id: log.task.task_id,
      }));

    const starredUpdates = changeLog
      .filter((log) => log.type === "update-isStarred")
      .map((log) => ({
        task: {
          isStarred: log.task.is_task_starred,
          updatedAt: log.task.task_updated_at,
        },
        id: log.task.task_id,
      }));

    // LATER add update Reminder - note - due - reapet - category - steps

    // Perform database operations
    try {
      if (addTasks.length) await addTask(addTasks);
      if (completedUpdates.length)
        await updateManyTask(
          completedUpdates.map((c) => c.task),
          completedUpdates.map((c) => c.id),
        );
      if (starredUpdates.length)
        await updateManyTask(
          starredUpdates.map((s) => s.task),
          starredUpdates.map((s) => s.id),
        );
      if (deleteTasks.length) await deleteTask(deleteTasks);

      clearLog(); // Clear the change log after successful sync
    } catch (error) {
      console.error("Error syncing with the database:", error);
    } finally {
      toggleIsSyncing(false); // Mark syncing as complete
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearLog, changeLog, isSyncing, toggleIsSyncing]);

  // Handle connection and online status checks
  const handleConnectionStatus = useCallback(async () => {
    // If offline, update states
    if (!navigator.onLine) {
      setIsConnected(false);
      setIsOnline(false);

      showToast(`You're offline! Changes will be saved locally.`);
      return;
    }

    // If online, check database health
    setIsConnected(true);
    const result = await checkDatabaseHealth();
    setIsOnline(result.online);

    if (result.online) {
      setLastOnline(getDateNowIso()); // Update last online time

      // show the taost when it becames online but not in app mount!
      if (getConectionStatus().lastOnline) {
        showToast("You're back online! Syncing data...");
      }
      await syncData(); // Start syncing log with the database
    }
  }, [syncData]);

  // Update connection status in the store when local states change
  useEffect(() => {
    updateConnectionStatus({ isConnected, isOnline, lastOnline });
  }, [isConnected, isOnline, lastOnline, updateConnectionStatus]);

  /* Toggle offline logging based on online status. Refer to the comment "1" */
  useEffect(() => {
    toggleOfflineLogMode(!isOnline);
  }, [isOnline, toggleOfflineLogMode]);

  // Add event listeners for browser's online/offline events
  useEffect(() => {
    window.addEventListener("online", handleConnectionStatus);
    window.addEventListener("offline", handleConnectionStatus);

    return () => {
      window.removeEventListener("online", handleConnectionStatus);
      window.removeEventListener("offline", handleConnectionStatus);
    };
  }, [handleConnectionStatus]);

  //Check connection status on mount
  useEffect(() => {
    handleConnectionStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

/*
 * 1. When offlineLogMode is on, tasks are logged for later syncing after being recorded in the store.
 */

/**
 * HealthStatusSync used to manage the synchronization of tasks with the database based on the connection status.
 
 * It tracks the online/offline state of the app and checks the database health periodically.

 * When the app is online, it syncs changes (from the change log) with the database.

 * If the app is offline, it toggles the offline logging mode and logs tasks for later syncing.

 * It updates the connection status in the global state (using Zustand) whenever the connection or online status changes.

 * Key features:
  - Syncs tasks (add, update, delete) with the database when online.
  - Handles toggling of offline logging mode based on online status.
  - Periodically checks the database health and updates the status.
  - Uses event listeners to track the browser's online/offline status.

 * This component does not render any UI but manages syncing and connection logic.
 */
