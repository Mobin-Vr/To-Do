import { supabase } from "./supabase";

// LATER remove all error senetence and just pass the error just like joinInvattaion

export async function createUser(newUser) {
  const { data, error } = await supabase
    .from("users")
    .insert([newUser])
    .select();

  if (error) {
    console.error(error);
    throw new Error("User could not be created");
  }

  return data;
}

// Fetch user by user_id
export async function getUserById(userId) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error("Error fetching user", error);
    return null;
  }

  return data;
}

export async function getUser(userEmail) {
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("user_email", userEmail)
    .single();

  // No error here! We handle the possibility of no user in the sign-in
  return data;
}

export async function getCategories(userId) {
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .eq("category_owner_id", userId);

  if (error) {
    console.error(error);
    throw new Error("Error getting categories", error);
  }

  return categories;
}

// Fetch the category's inv id by categoryId
export async function getCategoryInvId(categoryId) {
  const { data, error } = await supabase
    .from("invitations")
    .select("invitation_id")
    .eq("invitation_category_id", categoryId)
    .single();

  if (error) {
    console.error("Error fetching invitaton id", error);
    return null;
  }

  return data;
}

////////////////////////////////////
////////////////////////////////////
////////////////////////////////////

// Add one or many tasks
export async function addManyTasks(tasksArr) {
  const { error } = await supabase.from("tasks").insert(tasksArr); // Insert the array of tasks

  if (error) {
    console.error(error);
    throw new Error("Failed to add the task:", error);
  }
}

// Delete one or many tasks
export async function deleteManyTasks(tasksIdsArr) {
  const { error } = await supabase
    .from("tasks")
    .delete()
    .in("task_id", tasksIdsArr);

  if (error) {
    console.error(error);
    throw new Error("Failed to delete the task:", error);
  }
}

// Update one or many tasks
export async function updateManyTasks(tasksArr, tasksIdsArr) {
  const { error } = await supabase
    .from("tasks")
    .update(tasksArr)
    .in("task_id", tasksIdsArr);

  if (error) {
    console.error(error);
    throw new Error("Failed to update the task:", error);
  }
}

// Add one or many categories
export async function addManyCategories(categoriesArr) {
  const { error } = await supabase.from("categories").insert(categoriesArr); // Insert the array of new categories

  if (error) {
    console.error(error);
    throw new Error("Failed to add the category:", error);
  }
}

// Delete one or many categories
export async function deleteManyCategories(categoryIdsArr) {
  const { error } = await supabase
    .from("categories")
    .delete()
    .in("category_id", categoryIdsArr);

  if (error) {
    console.error(error);
    throw new Error("Failed to delete the category:", error);
  }
}

// Update one or many categories
export async function updateManyCategories(categoriesArr, categoriesIdsArr) {
  const { error } = await supabase
    .from("categories")
    .update(categoriesArr) // Use the updated parts for the update
    .in("category_id", categoriesIdsArr);

  if (error) {
    console.error(error);
    throw new Error("Failed to update the category:", error);
  }
}

///////////////////
/////// RPC ///////
///////////////////

// Creates a new invitation for a category.
export async function createInvitation(categoryId, ownerId) {
  const { data, error } = await supabase.rpc("create_invitation", {
    param_category_id: categoryId,
    param_owner_id: ownerId,
  });

  if (error) {
    console.error(error);
    throw new Error("Failed to create invitation");
  }

  return data;
}

// Allows a user to leave an invitation.
export async function leaveInvitation(invitationId, userId) {
  const { error } = await supabase.rpc("leave_invitation", {
    param_invitation_id: invitationId,
    param_user_id: userId,
  });

  if (error) {
    console.error(error);
    throw new Error("Failed to leave the invitation");
  }

  return;
}

// Removes a specific user from an invitation.
export async function removeUserFromInvitation(invitationId, userId, ownerId) {
  const { error } = await supabase.rpc("remove_user_from_invitation", {
    param_invitation_id: invitationId,
    param_user_id: userId,
    param_owner_id: ownerId,
  });

  if (error) {
    console.error(error);
    throw new Error("Failed to remove user from the invitation");
  }

  return;
}

// Updates the access limit for a specific invitation.
export async function setInvitationAccessLimit(
  invitationId,
  limitAccess,
  ownerId,
) {
  const { error } = await supabase.rpc("set_invitation_access_limit", {
    param_invitation_id: invitationId,
    param_invitation_owner_id: ownerId,
    param_limit_access: limitAccess,
  });

  if (error) {
    console.error(error);
    throw new Error("Failed to set invitation access limit");
  }

  return;
}

// Fetches all users associated with a specific invitation.
export async function getUsersByInvitation(invitationId, ownerId) {
  const { data, error } = await supabase.rpc("get_users_by_invitation", {
    param_invitation_id: invitationId,
    param_owner_id: ownerId,
  });

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch users by invitation");
  }

  return data;
}

// Stops sharing a category by deleting the invitation and its users.
export async function stopSharingInvitation(invitationId, ownerId) {
  const { error } = await supabase.rpc("stop_sharing_invitation", {
    param_invitation_id: invitationId,
    param_invitation_owner_id: ownerId,
  });

  if (error) {
    console.error(error);
    throw new Error("Failed to stop sharing the invitation");
  }

  return;
}

export async function joinInvitation(invitationId, userId) {
  const { data, error } = await supabase.rpc("join_invitation", {
    param_invitation_id: invitationId,
    param_user_id: userId,
  });

  if (error) {
    console.error("Error:", error.message);
    throw new Error(error);
  }

  return data;
}

// Fetches tasks by invitation token for a specific user.
export async function getTasksByInvitation(invitationId, userId) {
  const { data, error } = await supabase.rpc("retrieve_tasks_by_invitation", {
    param_invitation_id: invitationId,
    param_user_id: userId,
  });

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch tasks for the given invitation");
  }

  return data; // Data will include an array of the tasks related to the invitation.
}

// This function retrieves all tasks owned by the user and additionally returns tasks related to categories from invitations the user has received. It first returns the user's own tasks, then loops through invitations to fetch shared tasks.
export async function getRelevantTasks(userId) {
  const { data, error } = await supabase.rpc("get_shared_tasks_by_user_id", {
    param_user_id: userId,
  });

  if (error) {
    console.error("Error:", error.message);
    throw new Error(error.message);
  }

  return data; // Data will include an array of the tasks
}
