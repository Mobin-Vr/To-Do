import { supabase } from "./supabase";

// export function addTaskFromRealtime(newTask) {
//    const addTask = useTaskStore.getState().addTaskFromRealtime;
//    addTask(newTask);
// } LATER is it needed?

// LATER remove all error senetence and just pass the error just like joinInvattaion

// Fetch user by user_id
export async function getUserById(userId) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error("Error fetching user:", error);
    return null;
  }

  return data;
}

// Fetch the category's inv id by categoryId
export async function getCategoryInvId(categoryId) {
  const { data, error } = await supabase
    .from("invitations")
    .select("invitation_id")
    .eq("invitation_category_id", categoryId)
    .single();

  if (error) {
    console.error("Error fetching invitaton id:", error);
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

// Add one or many tasks
export async function addTask(task) {
  const { data, error } = await supabase.from("tasks").insert(task);

  if (error) {
    console.error(error);
    throw new Error("Error syncing added-task with Supabase");
  }

  return data;
}

// Upadte one task
export async function updateTask(updatedPart, taskId) {
  const { data, error } = await supabase
    .from("tasks")
    .update(updatedPart)
    .eq("task_id", taskId)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Error syncing updated-task with Supabase");
  }

  return data;
}

// Update many tasks (an array of tasks)
export async function updateManyTask(updatedPartsArr, taskIdsArr) {
  const { data, error } = await supabase
    .from("tasks")
    .update(updatedPartsArr)
    .in("task_id", taskIdsArr);

  if (error) {
    console.error(error);
    throw new Error("Error syncing updated-tasks with Supabase");
  }

  return data;
}

// Delete one task
export async function deleteTask(taskId) {
  const { data, error } = await supabase
    .from("tasks")
    .delete()
    .eq("task_id", taskId)
    .select(); // LATER does select work?

  if (error) {
    console.error(error);
    throw new Error("Error syncing deleted-task with Supabase");
  }

  return data;
}

// Delete many task that has the same category id
export async function deleteManyTask(categoryId) {
  const { data, error } = await supabase
    .from("tasks")
    .delete()
    .eq("task_category_id", categoryId)
    .select(); // LATER does select work?

  if (error) {
    console.error(error);
    throw new Error("Error syncing deleted-tasks with Supabase");
  }

  return data;
}

// LATER unused
export async function getTasks(userId) {
  const { data: tasks, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("task_owner_id", userId);

  if (error) {
    console.error(error);
    throw new Error("Error getting tasks from Supabase");
  }

  return tasks;
}

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

export async function getCategories(userId) {
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .eq("category_owner_id", userId);

  if (error) {
    console.error(error);
    throw new Error("Error getting categories from Supabase");
  }

  return categories;
}

export async function addCategory(newCategory) {
  const { data, error } = await supabase
    .from("categories")
    .insert([newCategory])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Category could not be created");
  }

  return data;
}

export async function updateCategory(updatedPart, categoryId) {
  const { data, error } = await supabase
    .from("categories")
    .update(updatedPart)
    .eq("category_id", categoryId)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Category could not be updated");
  }

  return data;
}

export async function deleteCategory(categoryId) {
  const { data, error } = await supabase
    .from("categories")
    .delete()
    .eq("category_id", categoryId)
    .select(); // LATER does select work?

  if (error) {
    console.error(error);
    throw new Error("Category could not be deleted");
  }

  return data;
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
