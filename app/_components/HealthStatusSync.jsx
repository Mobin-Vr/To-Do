'use client';

/**
 * HealthStatusSync is a custom hook used to manage the synchronization of tasks with the database based on the connection status.
 * It tracks the online/offline state of the app and checks the database health periodically.
 * - When the app is online, it syncs changes (from the change log) with the database.
 * - If the app is offline, it toggles the offline logging mode and logs tasks for later syncing.
 * - It updates the connection status in the global state (using Zustand) whenever the connection or online status changes.
 *
 * Key features:
 * - Syncs tasks (add, update, delete) with the database when online.
 * - Handles toggling of offline logging mode based on online status.
 * - Periodically checks the database health and updates the status.
 * - Uses event listeners to track the browser's online/offline status.
 *
 * This component does not render any UI but manages syncing and connection logic.
 */

import { useCallback, useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { addTask, deleteTask, updateManyTask } from '../_lib/data-services';
import { checkDatabaseHealth } from '../_lib/healthCheck';
import { getDateNowIso, HEALTH_CHECK_TIMER } from '../_lib/utils';
import useTaskStore from '../store';

export default function HealthStatusSync() {
   // Track connection and online status locally
   const [isConnected, setIsConnected] = useState(navigator.onLine);
   const [isOnline, setIsOnline] = useState(true);
   const [lastOnline, setLastOnline] = useState(null);

   const {
      updateConnectionStatus,
      toggleOfflineLogMode,
      changeLog,
      clearLog,
      isSyncing,
      toggleIsSyncing,
      syncLcWithDb,
   } = useTaskStore(
      useShallow((state) => ({
         updateConnectionStatus: state.updateConnectionStatus,
         toggleOfflineLogMode: state.toggleOfflineLogMode,
         changeLog: state.changeLog,
         clearLog: state.clearLog,
         isSyncing: state.isSyncing,
         toggleIsSyncing: state.toggleIsSyncing,
         syncLcWithDb: state.syncLcWithDb,
      }))
   );

   // Sync local changes (changeLog) with the database
   const syncData = useCallback(async () => {
      // Exit if already syncing
      if (isSyncing) return;

      // If ther is no log first get the data from cloud and replace that data in lc and then EXIT
      if (!changeLog.length) {
         await syncLcWithDb();
         return;
      }

      toggleIsSyncing(true); // Mark syncing as in progress

      // Separate change logs by their types for sending them to database
      const addTasks = changeLog
         .filter((log) => log.type === 'add')
         .map((log) => log.task);

      const deleteTasks = changeLog
         .filter((log) => log.type === 'delete')
         .map((log) => log.task);

      const completedUpdates = changeLog
         .filter((log) => log.type === 'update-isCompleted')
         .map((log) => ({
            task: {
               isCompleted: log.task.isCompleted,
               updatedAt: log.task.updatedAt,
               completedAt: log.task.completedAt,
            },
            id: log.task.id,
         }));

      const starredUpdates = changeLog
         .filter((log) => log.type === 'update-isStarred')
         .map((log) => ({
            task: {
               isStarred: log.task.isStarred,
               updatedAt: log.task.updatedAt,
            },
            id: log.task.id,
         }));

      // LATER add update Reminder - note - due - reapet - category - steps

      // Perform database operations
      try {
         if (addTasks.length) await addTask(addTasks);
         if (completedUpdates.length)
            await updateManyTask(
               completedUpdates.map((c) => c.task),
               completedUpdates.map((c) => c.id)
            );
         if (starredUpdates.length)
            await updateManyTask(
               starredUpdates.map((s) => s.task),
               starredUpdates.map((s) => s.id)
            );
         if (deleteTasks.length) await deleteTask(deleteTasks);

         clearLog(); // Clear the change log after successful sync
      } catch (error) {
         console.error('Error syncing with the database:', error);
      } finally {
         toggleIsSyncing(false); // Mark syncing as complete
      }
   }, [clearLog, changeLog, isSyncing, toggleIsSyncing]);

   // Handle connection and online status checks
   const handleConnectionStatus = useCallback(async () => {
      // If offline, update states
      if (!navigator.onLine) {
         setIsConnected(false);
         setIsOnline(false);
         return;
      }

      // If online, check database health
      setIsConnected(true);
      const result = await checkDatabaseHealth();
      setIsOnline(result.online);

      if (result.online) {
         setLastOnline(getDateNowIso()); // Update last online time
         await syncData(); // Start syncing log with the database
      }
   }, [syncData]);

   // Update connection status in the store when local states change
   useEffect(() => {
      updateConnectionStatus({ isConnected, isOnline, lastOnline });
   }, [isConnected, isOnline, lastOnline, updateConnectionStatus]);

   /* Toggle offline logging based on online status.
     When offlineLogMode is on, tasks are logged for later syncing after being recorded in the store. */
   useEffect(() => {
      toggleOfflineLogMode(!isOnline);
   }, [isOnline, toggleOfflineLogMode]);

   // Add event listeners for browser's online/offline events
   useEffect(() => {
      window.addEventListener('online', handleConnectionStatus);
      window.addEventListener('offline', handleConnectionStatus);

      return () => {
         window.removeEventListener('online', handleConnectionStatus);
         window.removeEventListener('offline', handleConnectionStatus);
      };
   }, [handleConnectionStatus]);

   // Periodically check connection status
   useEffect(() => {
      const interval = setInterval(
         handleConnectionStatus,
         HEALTH_CHECK_TIMER * 1000
      );
      return () => clearInterval(interval);
   }, [handleConnectionStatus]);

   return null; // This component does not render any UI
}
