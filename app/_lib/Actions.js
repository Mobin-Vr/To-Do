"use server";

import { createSupabaseServerClient } from "./supabase-server";
import { revalidateTag } from "next/cache";

export async function createUserAction(newUser) {
  const supabase = await createSupabaseServerClient(newUser);
  const { data, error } = await supabase
    .from("users")
    .insert([newUser])
    .select();
  if (error) throw new Error(error.message || JSON.stringify(error));
  // Optional: revalidate user cache for the new user's email
  // revalidateTag('user');
  return data;
}

export async function addManyTasksAction(tasksArr) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("tasks").insert(tasksArr);
  if (error) throw new Error(error.message || JSON.stringify(error));
  revalidateTag("tasks");
}

export async function deleteManyTasksAction(tasksIdsArr) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("tasks")
    .delete()
    .in("task_id", tasksIdsArr);
  if (error) throw new Error(error.message || JSON.stringify(error));
  revalidateTag("tasks");
}

export async function updateManyTasksAction(tasksArr, tasksIdsArr) {
  const supabase = await createSupabaseServerClient();
  const cleanedTasksArr = tasksArr.map(({ task_id, ...rest }) => rest);
  const { error } = await supabase
    .from("tasks")
    .update(cleanedTasksArr)
    .in("task_id", tasksIdsArr);
  if (error) throw new Error(error.message || JSON.stringify(error));
  revalidateTag("tasks");
}

export async function addManyCategoriesAction(categoriesArr) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("categories").insert(categoriesArr);
  if (error) throw new Error(error.message || JSON.stringify(error));
  revalidateTag("categories");
}

export async function deleteManyCategoriesAction(categoryIdsArr) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("categories")
    .delete()
    .in("category_id", categoryIdsArr);
  if (error) throw new Error(error.message || JSON.stringify(error));
  revalidateTag("categories");
}

export async function updateManyCategoriesAction(
  categoriesArr,
  categoriesIdsArr,
) {
  const supabase = await createSupabaseServerClient();
  const cleanedCategoriesArr = categoriesArr.map(
    ({ category_id, ...rest }) => rest,
  );
  const { error } = await supabase
    .from("categories")
    .update(cleanedCategoriesArr)
    .in("category_id", categoriesIdsArr);
  if (error) throw new Error(error.message || JSON.stringify(error));
  revalidateTag("categories");
}

export async function createInvitationAction(categoryId) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.rpc("invitation_create", {
    param_category_id: categoryId,
  });
  if (error) throw new Error(error.message || JSON.stringify(error));
  revalidateTag("invitations");
  return data;
}

export async function joinInvitationAction(invitationId) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.rpc("invitation_join", {
    param_invitation_id: invitationId,
  });
  if (error) throw new Error(error.message || JSON.stringify(error));
  revalidateTag("invitations");
  return data;
}

export async function leaveInvitationAction(invitationId) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.rpc("invitation_leave", {
    p_invitation_id: invitationId,
  });
  if (error) throw new Error(error.message || JSON.stringify(error));
  revalidateTag("invitations");
}

export async function stopSharingInvitationAction(invitationId) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.rpc("invitation_stop_sharing", {
    param_invitation_id: invitationId,
  });
  if (error) throw new Error(error.message || JSON.stringify(error));
  revalidateTag("invitations");
}

export async function setInvitationLimitAction(invitationId, limitAccess) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.rpc("invitation_set_limit", {
    param_invitation_id: invitationId,
    param_limit_access: limitAccess,
  });
  if (error) throw new Error(error.message || JSON.stringify(error));
  revalidateTag("invitations");
}

export async function removeUserFromInvitationAction(invitationId, userId) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.rpc("invitation_remove_user", {
    param_invitation_id: invitationId,
    param_user_id: userId,
  });
  if (error) throw new Error(error.message || JSON.stringify(error));
  revalidateTag("invitations");
}

export async function addManyErrorLogAction(errorLogArr) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("errors_log").insert(errorLogArr);
  if (error) throw new Error(error.message || JSON.stringify(error));
  return data;
}
