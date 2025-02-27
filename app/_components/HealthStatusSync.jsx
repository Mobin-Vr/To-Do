"use client";

import { useCallback, useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import {
  addManyCategoriesAction,
  addManyTasksAction,
  deleteManyCategoriesAction,
  deleteManyTasksAction,
  updateManyCategoriesAction,
  updateManyTasksAction,
} from "../_lib/Actions";
import { checkDatabaseHealth } from "../_lib/healthCheck";
import useCustomToast from "../_lib/useCustomeToast";
import { getDateNowIso } from "../_lib/utils";
import useTaskStore from "../taskStore";

export default function HealthStatusSync() {
  const showToast = useCustomToast();

  const [isConnected, setIsConnected] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [lastOnline, setLastOnline] = useState(null);

  const {
    updateConnectionStatus,
    toggleOfflineLogMode,
    changeLog,
    clearLog,
    isSyncing,
    toggleIsSyncing,

    getConectionStatus,
  } = useTaskStore(
    useShallow((state) => ({
      updateConnectionStatus: state.updateConnectionStatus,
      toggleOfflineLogMode: state.toggleOfflineLogMode,
      changeLog: state.changeLog,
      clearLog: state.clearLog,
      isSyncing: state.isSyncing,
      toggleIsSyncing: state.toggleIsSyncing,
      getConectionStatus: state.getConectionStatus,
    })),
  );

  useEffect(() => {
    if (typeof window !== "undefined") setIsConnected(navigator.onLine);
  }, []);

  // Sync local changes (changeLog) with the database
  const syncData = useCallback(async () => {
    if (isSyncing) return; // Exit if already syncing
    if (!changeLog.length) return; // Exit if there is no log

    toggleIsSyncing(true); // Mark syncing as in progress

    // Separate change logs by their types
    const addTasks = changeLog
      .filter((log) => log.type === "add-task")
      .map((log) => log.task);

    const deleteTasks = changeLog
      .filter((log) => log.type === "delete-task")
      .map((log) => log.task);

    const updateTasks = changeLog
      .filter((log) => log.type === "update-task")
      .map((log) => log.task);

    const addCategories = changeLog
      .filter((log) => log.type === "add-category")
      .map((log) => log.category);

    const deleteCategories = changeLog
      .filter((log) => log.type === "delete-category")
      .map((log) => log.category);

    const updateCategories = changeLog
      .filter((log) => log.type === "update-category")
      .map((log) => log.category);

    // Perform database operations
    try {
      // Manage tasks
      if (addTasks.length) await addManyTasksAction(addTasks);

      if (updateTasks.length)
        await updateManyTasksAction(
          updateTasks,
          updateTasks.map((task) => task.id),
        );

      if (deleteTasks.length) await deleteManyTasksAction(deleteTasks);

      // Manage categories
      if (addCategories.length) await addManyCategoriesAction(addCategories);

      if (updateTasks.length)
        await updateManyCategoriesAction(
          updateCategories,
          updateCategories.map((cat) => cat.id),
        );

      if (deleteCategories.length)
        await deleteManyCategoriesAction(deleteCategories);

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
