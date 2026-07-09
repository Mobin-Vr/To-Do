import { createSupabaseServerClient } from "./supabase-server";

//////////////////////////////////
//// User ////////////////////////
//////////////////////////////////

// Creates a new user in the "users" table
export async function createUser(newUser) {
  const supabase = await createSupabaseServerClient(newUser);

  const { data, error } = await supabase
    .from("users")
    .insert([newUser])
    .select();
  if (error) throw new Error(error.message || JSON.stringify(error));

  return data; // returns user_id
}

// Retrieves a user by their unique ID
export async function getUserById(userId) {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) throw new Error(error.message || JSON.stringify(error));

  return data;
}

// Retrieves a user by their email address
export async function getUserByEmail(userEmail) {
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("user_email", userEmail)
    .single();

  return data;
}

//////////////////////////////////
//// Tasks ///////////////////////
//////////////////////////////////

// Adds multiple tasks to the "tasks" table
export async function addManyTasks(tasksArr) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.from("tasks").insert(tasksArr);

  if (error) throw new Error(error.message || JSON.stringify(error));
}

// Deletes multiple tasks by their IDs
export async function deleteManyTasks(tasksIdsArr) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase
    .from("tasks")
    .delete()
    .in("task_id", tasksIdsArr);

  if (error) throw new Error(error.message || JSON.stringify(error));
}

// Updates multiple tasks based on their IDs
export async function updateManyTasks(tasksArr, tasksIdsArr) {
  const supabase = await createSupabaseServerClient();

  // Remove task_id from each task object before updating
  // Reason: task_id is the primary key and should not be updated. Supabase requires the update payload to only contain columns that need changes.
  const cleanedTasksArr = tasksArr.map((task) => {
    // eslint-disable-next-line no-unused-vars
    const { task_id, ...rest } = task;
    return rest;
  });

  const { error } = await supabase
    .from("tasks")
    .update(cleanedTasksArr)
    .in("task_id", tasksIdsArr);

  if (error) throw new Error(error.message || JSON.stringify(error));
}

// Retrieves all relevant tasks for a user (owned + shared)
export async function getReleventTasks() {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.rpc("get_relevent_tasks");

  if (error) throw new Error(error.message || JSON.stringify(error));

  return data;
}

//////////////////////////////////
//// Categories //////////////////
//////////////////////////////////

// Adds multiple categories to the "categories" table
export async function addManyCategories(categoriesArr) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.from("categories").insert(categoriesArr);

  if (error) throw new Error(error.message || JSON.stringify(error));
}

// Deletes multiple categories by their IDs
export async function deleteManyCategories(categoryIdsArr) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase
    .from("categories")
    .delete()
    .in("category_id", categoryIdsArr);

  if (error) throw new Error(error.message || JSON.stringify(error));
}

// Updates multiple categories based on their IDs
export async function updateManyCategories(categoriesArr, categoriesIdsArr) {
  const supabase = await createSupabaseServerClient();

  // Remove category_id from each task object before updating
  // Reason: category_id is the primary key and should not be updated. Supabase requires the update payload to only contain columns that need changes.
  const cleanedCategoriesArr = categoriesArr.map((cat) => {
    // eslint-disable-next-line no-unused-vars
    const { category_id, ...rest } = cat;
    return rest;
  });

  const { error } = await supabase
    .from("categories")
    .update(cleanedCategoriesArr)
    .in("category_id", categoriesIdsArr);

  if (error) throw new Error(error.message || JSON.stringify(error));
}

// Retrieves all categories owned by a specific user + shred with
export async function getReleventCategories() {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.rpc("get_relevent_categories");

  if (error) throw new Error(error.message || JSON.stringify(error));

  return data;
}

// Retrieves the invitation ID for a given category
export async function getCategoryInvId(categoryId) {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("invitations")
    .select("invitation_id")
    .eq("invitation_category_id", categoryId)
    .single();

  if (error) throw new Error(error.message || JSON.stringify(error));

  return data;
}

//////////////////////////////////
//// Invitation (RPC) ////////////
//////////////////////////////////

// Creates a new invitation for a category
export async function createInvitation(categoryId, ownerId) {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.rpc("invitation_create", {
    param_category_id: categoryId,
  });

  if (error) throw new Error(error.message || JSON.stringify(error));

  return data;
}

// Allows a user to join an invitation
export async function joinInvitation(invitationId) {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.rpc("invitation_join", {
    param_invitation_id: invitationId,
  });

  if (error) throw new Error(error.message || JSON.stringify(error));

  return data;
}

// Allows a user to leave an invitation
export async function leaveInvitation(invitationId) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.rpc("invitation_leave", {
    p_invitation_id: invitationId,
  });

  if (error) throw new Error(error.message || JSON.stringify(error));
}

// Sets the access limit for an invitation
export async function setInvitationLimit(invitationId, limitAccess) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.rpc("invitation_set_limit", {
    param_invitation_id: invitationId,
    param_limit_access: limitAccess,
  });
  if (error) throw new Error(error.message || JSON.stringify(error));
}

// Stops sharing an invitation
export async function stopSharingInvitation(invitationId) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.rpc("invitation_stop_sharing", {
    param_invitation_id: invitationId,
  });

  if (error) throw new Error(error.message || JSON.stringify(error));
}

// Removes a specific user from an invitation
export async function removeUserFromInvitation(invitationId, userId) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.rpc("invitation_remove_user", {
    param_invitation_id: invitationId,
    param_user_id: userId,
  });

  if (error) throw new Error(error.message || JSON.stringify(error));
}

// Retrieves all invitations owned by a user
export async function getOwnerInvitations() {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.rpc("get_owner_invitations");

  if (error) throw new Error(error.message || JSON.stringify(error));

  return data;
}

// Retrieves all invitations a user has joined
export async function getJoinedInvitations() {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.rpc("get_joined_invitations");

  if (error) throw new Error(error.message || JSON.stringify(error));

  return data;
}

//////////////////////////////////
//// Errors //////////////////////
//////////////////////////////////

// Adds a new error log entry to the "errors_log" table
export async function addManyErrorLog(errorLogArr) {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.from("errors_log").insert(errorLogArr);

  if (error) throw new Error(error.message || JSON.stringify(error));

  return data;
}

//////////////////////////////////
//// Conection health ////////////
//////////////////////////////////

// Checks the health status of the database
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
