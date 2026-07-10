"use server";

import { auth } from "@clerk/nextjs/server";
import {
  getUserByEmail as _getUserByEmail,
  getReleventTasks as _getReleventTasks,
  getReleventCategories as _getReleventCategories,
  getOwnerInvitations as _getOwnerInvitations,
  getJoinedInvitations as _getJoinedInvitations,
  checkDatabaseHealth as _checkDatabaseHealth,
} from "./data-services";

// Each wrapper obtains the Supabase token via Clerk’s auth(),
// then passes it to the underlying cached function.
// This keeps the cached functions free of dynamic APIs like headers().

export async function getUserByEmail(userEmail) {
  const { getToken } = await auth();
  const token = await getToken({ template: "supabase" });
  return _getUserByEmail(userEmail, token);
}

export async function getReleventTasks() {
  const { getToken } = await auth();
  const token = await getToken({ template: "supabase" });
  return _getReleventTasks(token);
}

export async function getReleventCategories() {
  const { getToken } = await auth();
  const token = await getToken({ template: "supabase" });
  return _getReleventCategories(token);
}

export async function getOwnerInvitations() {
  const { getToken } = await auth();
  const token = await getToken({ template: "supabase" });
  return _getOwnerInvitations(token);
}

export async function getJoinedInvitations() {
  const { getToken } = await auth();
  const token = await getToken({ template: "supabase" });
  return _getJoinedInvitations(token);
}

export async function checkDatabaseHealth() {
  return _checkDatabaseHealth();
}
