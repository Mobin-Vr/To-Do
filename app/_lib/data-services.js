import {
  createSupabaseClientWithToken,
  createSupabaseServerClient,
} from "./supabase-server";
import { cacheLife, cacheTag } from "next/cache";

// ========== User Reads ==========
export async function getUserByEmail(userEmail, supabaseToken) {
  // "use cache";
  // cacheLife("hours");
  // cacheTag("user", `email-${userEmail}`);

  const supabase = createSupabaseClientWithToken(supabaseToken);
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("user_email", userEmail)
    .single();
  return data;
}

// ========== Tasks Reads ==========
export async function getReleventTasks(supabaseToken) {
  // "use cache";
  // cacheLife("minutes");
  // cacheTag("tasks");

  const supabase = createSupabaseClientWithToken(supabaseToken);
  const { data, error } = await supabase.rpc("get_relevent_tasks");
  if (error) throw new Error(error.message || JSON.stringify(error));
  return data;
}

// ========== Categories Reads ==========
export async function getReleventCategories(supabaseToken) {
  // "use cache";
  // cacheLife("minutes");
  // cacheTag("categories");

  const supabase = createSupabaseClientWithToken(supabaseToken);
  const { data, error } = await supabase.rpc("get_relevent_categories");
  if (error) throw new Error(error.message || JSON.stringify(error));
  return data;
}

// ========== Single Category Read ==========
export async function getCategoryById(categoryId, supabaseToken) {
  const supabase = createSupabaseClientWithToken(supabaseToken);
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("category_id", categoryId)
    .single();

  if (error) return null;
  return data;
}

// ========== Invitation Reads ==========
export async function getOwnerInvitations(supabaseToken) {
  // "use cache";
  // cacheLife("minutes");
  // cacheTag("invitations", "owner");

  const supabase = createSupabaseClientWithToken(supabaseToken);
  const { data, error } = await supabase.rpc("get_owner_invitations");
  if (error) throw new Error(error.message || JSON.stringify(error));
  return data;
}

export async function getJoinedInvitations(supabaseToken) {
  // "use cache";
  // cacheLife("minutes");
  // cacheTag("invitations", "joined");

  const supabase = createSupabaseClientWithToken(supabaseToken);
  const { data, error } = await supabase.rpc("get_joined_invitations");
  if (error) throw new Error(error.message || JSON.stringify(error));
  return data;
}

// ========== Health Check ==========
// NOTE: intentionally not cached – must always be real‑time.
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
