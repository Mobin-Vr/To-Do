import {
  createSupabaseClientWithToken,
  createSupabaseServerClient,
} from "./supabase-server";
import { cacheLife, cacheTag } from "next/cache";

// Retry wrapper for transient network errors (e.g., fetch failed).
// Attempts the function up to `retries` times with a short delay.
async function withRetry(fn, retries = 2, delayMs = 500) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === retries) throw error; // all attempts exhausted
      if (error.name === "TypeError" && error.message === "fetch failed") {
        console.warn(`Retrying fetch (attempt ${attempt + 1}/${retries})...`);
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        delayMs *= 2; // exponential backoff
      } else {
        throw error; // non-network error, don't retry
      }
    }
  }
}

// ========== User Reads ==========
export async function getUserByEmail(userEmail, supabaseToken) {
  "use cache";
  cacheLife("hours");
  cacheTag("user", `email-${userEmail}`);

  return withRetry(async () => {
    const supabase = createSupabaseClientWithToken(supabaseToken);
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("user_email", userEmail)
      .single();
    if (error) throw new Error(error.message || JSON.stringify(error));
    return data;
  });
}

// ========== Tasks Reads ==========
export async function getReleventTasks(supabaseToken) {
  "use cache";
  cacheLife("minutes");
  cacheTag("tasks");

  return withRetry(async () => {
    const supabase = createSupabaseClientWithToken(supabaseToken);
    const { data, error } = await supabase.rpc("get_relevent_tasks");
    if (error) throw new Error(error.message || JSON.stringify(error));
    return data;
  });
}

// ========== Categories Reads ==========
export async function getReleventCategories(supabaseToken) {
  "use cache";
  cacheLife("minutes");
  cacheTag("categories");

  return withRetry(async () => {
    const supabase = createSupabaseClientWithToken(supabaseToken);
    const { data, error } = await supabase.rpc("get_relevent_categories");
    if (error) throw new Error(error.message || JSON.stringify(error));
    return data;
  });
}

// // ========== Single Category Read ==========
// export async function getCategoryById(categoryId, supabaseToken) {
//   return withRetry(async () => {
//     const supabase = createSupabaseClientWithToken(supabaseToken);
//     const { data, error } = await supabase
//       .from("categories")
//       .select("*")
//       .eq("category_id", categoryId)
//       .single();
//     if (error) return null;
//     return data;
//   });
// }

// ========== Invitation Reads ==========
export async function getOwnerInvitations(supabaseToken) {
  "use cache";
  cacheLife("minutes");
  cacheTag("invitations", "owner");

  return withRetry(async () => {
    const supabase = createSupabaseClientWithToken(supabaseToken);
    const { data, error } = await supabase.rpc("get_owner_invitations");
    if (error) throw new Error(error.message || JSON.stringify(error));
    return data;
  });
}

export async function getJoinedInvitations(supabaseToken) {
  "use cache";
  cacheLife("minutes");
  cacheTag("invitations", "joined");

  return withRetry(async () => {
    const supabase = createSupabaseClientWithToken(supabaseToken);
    const { data, error } = await supabase.rpc("get_joined_invitations");
    if (error) throw new Error(error.message || JSON.stringify(error));
    return data;
  });
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
