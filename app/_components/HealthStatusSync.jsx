"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import useCustomToast from "@/app/_lib/useCustomeToast";
import { getDateNowIso } from "@/app/_lib/utils";
import useSyncStore from "@/app/_store/useSyncStore";
import {
  HEALTH_STATUS_SYNC_DB_CHECK_COOLDOWN_MS,
  HEALTH_STATUS_SYNC_ONLINE_DEBOUNCE_MS,
} from "@/app/_lib/configs";

export default function HealthStatusSync() {
  const showToast = useCustomToast();

  const [isConnected, setIsConnected] = useState(
    () => typeof window !== "undefined" && navigator.onLine,
  );
  const [isOnline, setIsOnline] = useState(true);
  const [lastOnline, setLastOnline] = useState(null);

  const { updateConnectionStatus, toggleOfflineLogMode, getConectionStatus } =
    useSyncStore(
      useShallow((state) => ({
        updateConnectionStatus: state.updateConnectionStatus,
        toggleOfflineLogMode: state.toggleOfflineLogMode,
        getConectionStatus: state.getConectionStatus,
      })),
    );

  const onlineDebounceRef = useRef(null);
  const lastHealthCheckRef = useRef(0);

  const syncData = useCallback(async () => {
    const { isSyncing, changeLog, syncChangeLog } = useSyncStore.getState();
    if (isSyncing || !changeLog.length) return;
    syncChangeLog();
  }, []);

  const handleConnectionStatus = useCallback(async () => {
    if (!navigator.onLine) {
      setIsConnected(false);
      setIsOnline(false);
      showToast("You're offline! Changes will be saved locally.");
      return;
    }

    setIsConnected(true);

    const now = Date.now();
    if (
      now - lastHealthCheckRef.current <
      HEALTH_STATUS_SYNC_DB_CHECK_COOLDOWN_MS
    ) {
      return;
    }

    const res = await fetch("/api/health");
    const result = await res.json();
    setIsOnline(result.online);

    if (result.online) {
      lastHealthCheckRef.current = Date.now();
      setLastOnline(getDateNowIso());

      if (getConectionStatus().lastOnline) {
        showToast("You're back online! Syncing data...");
      }
      await syncData();
    }
  }, [syncData, getConectionStatus, showToast]);

  useEffect(() => {
    updateConnectionStatus({ isConnected, isOnline, lastOnline });
  }, [isConnected, isOnline, lastOnline, updateConnectionStatus]);

  useEffect(() => {
    toggleOfflineLogMode(!isOnline);
  }, [isOnline, toggleOfflineLogMode]);

  useEffect(() => {
    const debouncedOnlineHandler = () => {
      if (onlineDebounceRef.current) clearTimeout(onlineDebounceRef.current);
      onlineDebounceRef.current = setTimeout(() => {
        handleConnectionStatus();
      }, HEALTH_STATUS_SYNC_ONLINE_DEBOUNCE_MS);
    };

    window.addEventListener("online", debouncedOnlineHandler);
    window.addEventListener("offline", handleConnectionStatus);

    return () => {
      window.removeEventListener("online", debouncedOnlineHandler);
      window.removeEventListener("offline", handleConnectionStatus);
      if (onlineDebounceRef.current) clearTimeout(onlineDebounceRef.current);
    };
  }, [handleConnectionStatus]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleConnectionStatus();
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  return null;
}
