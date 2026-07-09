"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { checkDatabaseHealthAction } from "../_lib/Actions";
import useCustomToast from "../_lib/useCustomeToast";
import { getDateNowIso } from "../_lib/utils";
import useTaskStore from "../taskStore";
import {
  HEALTH_STATUS_SYNC_DB_CHECK_COOLDOWN_MS,
  HEALTH_STATUS_SYNC_ONLINE_DEBOUNCE_MS,
} from "../_lib/configs";

export default function HealthStatusSync() {
  const showToast = useCustomToast();

  const [isConnected, setIsConnected] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [lastOnline, setLastOnline] = useState(null);

  const {
    updateConnectionStatus,
    toggleOfflineLogMode,
    changeLog,
    isSyncing,
    getConectionStatus,
    syncChangeLog,
  } = useTaskStore(
    useShallow((state) => ({
      updateConnectionStatus: state.updateConnectionStatus,
      toggleOfflineLogMode: state.toggleOfflineLogMode,
      changeLog: state.changeLog,
      isSyncing: state.isSyncing,
      getConectionStatus: state.getConectionStatus,
      syncChangeLog: state.syncChangeLog,
    })),
  );

  // Ref for online event debounce timeout
  const onlineDebounceRef = useRef(null);
  // Timestamp of the last successful database health check (cooldown mechanism)
  const lastHealthCheckRef = useRef(0);

  // Initialize isConnected state on the client
  useEffect(() => {
    if (typeof window !== "undefined") setIsConnected(navigator.onLine);
  }, []);

  // Sync local change log with the database
  const syncData = useCallback(async () => {
    if (isSyncing || !changeLog.length) return;
    syncChangeLog();
  }, [changeLog, isSyncing, syncChangeLog]);

  // Core logic to handle online/offline status and database health
  const handleConnectionStatus = useCallback(async () => {
    // Offline path
    if (!navigator.onLine) {
      setIsConnected(false);
      setIsOnline(false);
      showToast("You're offline! Changes will be saved locally.");
      return;
    }

    // Online path
    setIsConnected(true);

    // Cooldown: skip health check if the last successful check was < HEALTH_CHECK_COOLDOWN_MS ago
    const now = Date.now();
    if (
      now - lastHealthCheckRef.current <
      HEALTH_STATUS_SYNC_DB_CHECK_COOLDOWN_MS
    ) {
      return; // Keep previous isOnline state; no redundant DB call
    }

    const result = await checkDatabaseHealthAction();
    setIsOnline(result.online);

    if (result.online) {
      lastHealthCheckRef.current = Date.now(); // Update cooldown timestamp
      setLastOnline(getDateNowIso());

      // Show "back online" toast only if we were previously offline
      if (getConectionStatus().lastOnline) {
        showToast("You're back online! Syncing data...");
      }
      await syncData(); // Sync any pending offline changes
    }
  }, [syncData, getConectionStatus, showToast]);

  // Keep the global store in sync with local connection state
  useEffect(() => {
    updateConnectionStatus({ isConnected, isOnline, lastOnline });
  }, [isConnected, isOnline, lastOnline, updateConnectionStatus]);

  // Toggle offline logging mode when online status changes
  useEffect(() => {
    toggleOfflineLogMode(!isOnline);
  }, [isOnline, toggleOfflineLogMode]);

  // Register browser online/offline event listeners
  useEffect(() => {
    // Debounced version for the 'online' event to avoid spamming DB health checks during rapid network fluctuations.
    const debouncedOnlineHandler = () => {
      if (onlineDebounceRef.current) clearTimeout(onlineDebounceRef.current);
      onlineDebounceRef.current = setTimeout(() => {
        handleConnectionStatus();
      }, HEALTH_STATUS_SYNC_ONLINE_DEBOUNCE_MS);
    };

    window.addEventListener("online", debouncedOnlineHandler);
    // Offline event is immediate – no debounce needed
    window.addEventListener("offline", handleConnectionStatus);

    return () => {
      window.removeEventListener("online", debouncedOnlineHandler);
      window.removeEventListener("offline", handleConnectionStatus);
      if (onlineDebounceRef.current) clearTimeout(onlineDebounceRef.current);
    };
  }, [handleConnectionStatus]);

  // Initial health check on mount (without debounce)
  useEffect(() => {
    handleConnectionStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
