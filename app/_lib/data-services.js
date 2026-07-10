import { createSupabaseServerClient } from "./supabase-server";

// ========== User Reads ==========
// export async function getUserById(userId) {
//   const supabase = await createSupabaseServerClient();
//   const { data, error } = await supabase
//     .from("users")
//     .select("*")
//     .eq("user_id", userId)
//     .single();
//   if (error) throw new Error(error.message || JSON.stringify(error));
//   return data;
// }

export async function getUserByEmail(userEmail) {
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
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.rpc("get_relevent_tasks");
  if (error) throw new Error(error.message || JSON.stringify(error));
  return data;
}

// ========== Categories Reads ==========
export async function getReleventCategories() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.rpc("get_relevent_categories");
  if (error) throw new Error(error.message || JSON.stringify(error));
  return data;
}

// export async function getCategoryInvId(categoryId) {
//   const supabase = await createSupabaseServerClient();
//   const { data, error } = await supabase
//     .from("invitations")
//     .select("invitation_id")
//     .eq("invitation_category_id", categoryId)
//     .single();
//   if (error) throw new Error(error.message || JSON.stringify(error));
//   return data;
// }

// ========== Invitation Reads ==========
export async function getOwnerInvitations() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.rpc("get_owner_invitations");
  if (error) throw new Error(error.message || JSON.stringify(error));
  return data;
}

export async function getJoinedInvitations() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.rpc("get_joined_invitations");
  if (error) throw new Error(error.message || JSON.stringify(error));
  return data;
}

// ========== Health Check ==========
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
