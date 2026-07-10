import { createSupabaseServerClient } from "./supabase-server";
import { cacheLife, cacheTag } from "next/cache";

// ========== User Reads ==========
export async function getUserByEmail(userEmail) {
  "use cache";
  cacheLife("hours");
  cacheTag("user", `email-${userEmail}`);

  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("user_email", userEmail)
    .single();
  return data;
}

// ========== Tasks Reads ==========
export async function getReleventTasks() {
  "use cache";
  cacheLife("minutes");
  cacheTag("tasks");

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.rpc("get_relevent_tasks");
  if (error) throw new Error(error.message || JSON.stringify(error));
  return data;
}

// ========== Categories Reads ==========
export async function getReleventCategories() {
  "use cache";
  cacheLife("minutes");
  cacheTag("categories");

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.rpc("get_relevent_categories");
  if (error) throw new Error(error.message || JSON.stringify(error));
  return data;
}

// ========== Invitation Reads ==========
export async function getOwnerInvitations() {
  "use cache";
  cacheLife("minutes");
  cacheTag("invitations", "owner");

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.rpc("get_owner_invitations");
  if (error) throw new Error(error.message || JSON.stringify(error));
  return data;
}

export async function getJoinedInvitations() {
  "use cache";
  cacheLife("minutes");
  cacheTag("invitations", "joined");

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.rpc("get_joined_invitations");
  if (error) throw new Error(error.message || JSON.stringify(error));
  return data;
}

// ========== Health Check ==========
// NOTE: No cache! This must always be real‑time.
export async function checkDatabaseHealth() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("health_check")
    .select("status")
    .limit(1)
    .single();
  if (error) {
    console.error("Database error:", error.message);
    return { online: false, error: error.message };
  }
  return { online: true, status: data.status };
}
