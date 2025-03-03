import { supabase } from "./supabase";

//////////////////////////////////
//// User ////////////////////////
//////////////////////////////////

// Creates a new user in the "users" table
export async function createUser(newUser) {
  const { data, error } = await supabase
    .from("users")
    .insert([newUser])
    .select();

  if (error) throw new Error(error.message || JSON.stringify(error));

  return data;
}

// Retrieves a user by their unique ID
export async function getUserById(userId) {
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
  const { error } = await supabase.from("tasks").insert(tasksArr);

  if (error) throw new Error(error.message || JSON.stringify(error));
}

// Deletes multiple tasks by their IDs
export async function deleteManyTasks(tasksIdsArr) {
  const { error } = await supabase
    .from("tasks")
    .delete()
    .in("task_id", tasksIdsArr);

  if (error) throw new Error(error.message || JSON.stringify(error));
}

// Updates multiple tasks based on their IDs
export async function updateManyTasks(tasksArr, tasksIdsArr) {
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
export async function getReleventTasks(userId) {
  const { data, error } = await supabase.rpc("get_relevent_tasks", {
    param_user_id: userId,
  });

  if (error) throw new Error(error.message || JSON.stringify(error));

  return data;
}

//////////////////////////////////
//// Categories //////////////////
//////////////////////////////////

// Adds multiple categories to the "categories" table
export async function addManyCategories(categoriesArr) {
  const { error } = await supabase.from("categories").insert(categoriesArr);

  if (error) throw new Error(error.message || JSON.stringify(error));
}

// Deletes multiple categories by their IDs
export async function deleteManyCategories(categoryIdsArr) {
  const { error } = await supabase
    .from("categories")
    .delete()
    .in("category_id", categoryIdsArr);

  if (error) throw new Error(error.message || JSON.stringify(error));
}

// Updates multiple categories based on their IDs
export async function updateManyCategories(categoriesArr, categoriesIdsArr) {
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
export async function getReleventCategories(userId) {
  const { data, error } = await supabase.rpc("get_relevent_categories", {
    param_user_id: userId,
  });

  if (error) throw new Error(error.message || JSON.stringify(error));

  return data;
}

// Retrieves the invitation ID for a given category
export async function getCategoryInvId(categoryId) {
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
  const { data, error } = await supabase.rpc("invitation_create", {
    param_category_id: categoryId,
    param_owner_id: ownerId,
  });

  if (error) throw new Error(error.message || JSON.stringify(error));

  return data;
}

// Allows a user to join an invitation
export async function joinInvitation(invitationId, userId) {
  const { data, error } = await supabase.rpc("invitation_join", {
    param_invitation_id: invitationId,
    param_user_id: userId,
  });

  if (error) throw new Error(error.message || JSON.stringify(error));

  return data;
}

// Allows a user to leave an invitation
export async function leaveInvitation(invitationId, userId) {
  const { error } = await supabase.rpc("invitation_leave", {
    param_invitation_id: invitationId,
    param_user_id: userId,
  });

  if (error) throw new Error(error.message || JSON.stringify(error));
}

// Sets the access limit for an invitation
export async function setInvitationLimit(invitationId, ownerId, limitAccess) {
  const { error } = await supabase.rpc("invitation_set_limit", {
    param_invitation_id: invitationId,
    param_invitation_owner_id: ownerId,
    param_limit_access: limitAccess,
  });
  if (error) throw new Error(error.message || JSON.stringify(error));
}

// Stops sharing an invitation
export async function stopSharingInvitation(invitationId, ownerId) {
  const { error } = await supabase.rpc("invitation_stop_sharing", {
    param_invitation_id: invitationId,
    param_invitation_owner_id: ownerId,
  });

  if (error) throw new Error(error.message || JSON.stringify(error));
}

// Removes a specific user from an invitation
export async function removeUserFromInvitation(invitationId, userId, ownerId) {
  const { error } = await supabase.rpc("invitation_remove_user", {
    param_invitation_id: invitationId,
    param_user_id: userId,
    param_owner_id: ownerId,
  });

  if (error) throw new Error(error.message || JSON.stringify(error));
}

// Retrieves all invitations owned by a user
export async function getOwnerInvitations(userId) {
  const { data, error } = await supabase.rpc("get_owner_invitations", {
    param_user_id: userId,
  });

  if (error) throw new Error(error.message || JSON.stringify(error));

  return data;
}

// Retrieves all invitations a user has joined
export async function getJoinedInvitations(userId) {
  const { data, error } = await supabase.rpc("get_joined_invitations", {
    param_user_id: userId,
  });

  if (error) throw new Error(error.message || JSON.stringify(error));

  return data;
}

//////////////////////////////////
//// Errors //////////////////////
//////////////////////////////////

// Adds a new error log entry to the "errors_log" table
export async function addManyErrorLog(errorLogArr) {
  const { data, error } = await supabase
    .from("errors_log")
    .insert(errorLogArr)
    .select();

  if (error) throw new Error(error.message || JSON.stringify(error));

  return data;
}

//////////////////////////////////
//// Conection health ////////////
//////////////////////////////////

// Checks the health status of the database
export async function checkDatabaseHealth() {
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
