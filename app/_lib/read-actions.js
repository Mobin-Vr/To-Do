"use server";

/**
 * READ-ACTIONS
 * ------------
 * This file re‑exports pure fetch functions from "data-services.js" as Server Actions
 * so that Client Components can call them directly (e.g. for initial data loading).
 *
 * Why it exists:
 *   - data-services.js contains plain async functions (no "use server" directive).
 *   - Client Components cannot import plain server modules – they need a Server Action
 *     (a function marked with "use server") to invoke code on the server.
 *   - By re‑exporting through this file, we keep data‑fetching logic centralized in
 *     data-services.js while still making it available to the client.
 *
 * When it can be removed:
 *   - Once we move all initial data fetching to React Server Components (RSC) – i.e. we
 *     perform the fetch inside async page/layout components on the server and pass the
 *     data down as props – there will be no more Client Components that need to call
 *     these functions directly.
 *   - At that point this file becomes unnecessary and can be safely deleted.
 */

"use server";

import {
  getUserByEmail as _getUserByEmail,
  getReleventTasks as _getReleventTasks,
  getReleventCategories as _getReleventCategories,
  getOwnerInvitations as _getOwnerInvitations,
  getJoinedInvitations as _getJoinedInvitations,
  checkDatabaseHealth as _checkDatabaseHealth,
} from "./data-services";

export async function getUserByEmail(userEmail) {
  return _getUserByEmail(userEmail);
}

export async function getReleventTasks() {
  return _getReleventTasks();
}

export async function getReleventCategories() {
  return _getReleventCategories();
}

export async function getOwnerInvitations() {
  return _getOwnerInvitations();
}

export async function getJoinedInvitations() {
  return _getJoinedInvitations();
}

export async function checkDatabaseHealth() {
  return _checkDatabaseHealth();
}
