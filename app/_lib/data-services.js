import { supabase } from "./supabase";

//////////////////////////////////
//// User Actions ////////////////
//////////////////////////////////

export async function createUser(newUser) {
  const { data, error } = await supabase
    .from("users")
    .insert([newUser])
    .select();

  if (error) {
    console.error("Database Error: ", error);
    throw error;
  }

  return data;
}

export async function getUserById(userId) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error("Database Error", error);
    throw error;
  }

  return data;
}

export async function getUser(userEmail) {
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("user_email", userEmail)
    .single();

  return data;
}

//////////////////////////////////
//// Categories Actions //////////
//////////////////////////////////

export async function getCategories(userId) {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("category_owner_id", userId);

  if (error) {
    console.error("Database Error: ", error);
    throw error;
  }

  return data;
}

export async function getCategoryInvId(categoryId) {
  const { data, error } = await supabase
    .from("invitations")
    .select("invitation_id")
    .eq("invitation_category_id", categoryId)
    .single();

  if (error) {
    console.error("Database Error", error);
    throw error;
  }

  return data;
}

//////////////////////////////////
//// Tasks Actions ///////////////
//////////////////////////////////

export async function addManyTasks(tasksArr) {
  const { error } = await supabase.from("tasks").insert(tasksArr);

  if (error) {
    console.error("Database Error: ", error);
    throw error;
  }

  return true;
}

export async function deleteManyTasks(tasksIdsArr) {
  const { error } = await supabase
    .from("tasks")
    .delete()
    .in("task_id", tasksIdsArr);

  if (error) {
    console.error("Database Error: ", error);
    throw error;
  }

  return true;
}

export async function updateManyTasks(tasksArr, tasksIdsArr) {
  const { error } = await supabase
    .from("tasks")
    .update(tasksArr)
    .in("task_id", tasksIdsArr);

  if (error) {
    console.error("Database Error: ", error);
    throw error;
  }

  return true;
}

//////////////////////////////////
//// Categories Actions //////////
//////////////////////////////////

export async function addManyCategories(categoriesArr) {
  const { error } = await supabase.from("categories").insert(categoriesArr);

  if (error) {
    console.error("Database Error: ", error);
    throw error;
  }

  return true;
}

export async function deleteManyCategories(categoryIdsArr) {
  const { error } = await supabase
    .from("categories")
    .delete()
    .in("category_id", categoryIdsArr);

  if (error) {
    console.error("Database Error: ", error);
    throw error;
  }

  return true;
}

export async function updateManyCategories(categoriesArr, categoriesIdsArr) {
  const { error } = await supabase
    .from("categories")
    .update(categoriesArr)
    .in("category_id", categoriesIdsArr);

  if (error) {
    console.error("Database Error: ", error);
    throw error;
  }

  return true;
}

//////////////////////////////////
//// Invitation Actions (RPC) ////
//////////////////////////////////

export async function createInvitation(categoryId, ownerId) {
  const { error } = await supabase.rpc("create_invitation", {
    param_category_id: categoryId,
    param_owner_id: ownerId,
  });

  if (error) {
    console.error("Database Error: ", error);
    throw error;
  }

  return true;
}

export async function leaveInvitation(invitationId, userId) {
  const { error } = await supabase.rpc("leave_invitation", {
    param_invitation_id: invitationId,
    param_user_id: userId,
  });

  if (error) {
    console.error("Database Error: ", error);
    throw error;
  }

  return true;
}

export async function removeUserFromInvitation(invitationId, userId, ownerId) {
  const { error } = await supabase.rpc("remove_user_from_invitation", {
    param_invitation_id: invitationId,
    param_user_id: userId,
    param_owner_id: ownerId,
  });

  if (error) {
    console.error("Database Error: ", error);
    throw error;
  }

  return true;
}

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
    console.error("Database Error: ", error);
    throw error;
  }

  return true;
}

export async function getUsersByInvitation(invitationId, ownerId) {
  const { data, error } = await supabase.rpc("get_users_by_invitation", {
    param_invitation_id: invitationId,
    param_owner_id: ownerId,
  });

  if (error) {
    console.error("Database Error: ", error);
    throw error;
  }

  return data;
}

export async function stopSharingInvitation(invitationId, ownerId) {
  const { error } = await supabase.rpc("stop_sharing_invitation", {
    param_invitation_id: invitationId,
    param_invitation_owner_id: ownerId,
  });

  if (error) {
    console.error("Database Error: ", error);
    throw error;
  }

  return true;
}

export async function joinInvitation(invitationId, userId) {
  const { data, error } = await supabase.rpc("join_invitation", {
    param_invitation_id: invitationId,
    param_user_id: userId,
  });

  if (error) {
    console.error("Error:", error.message);
    throw error;
  }

  return data;
}

export async function getTasksByInvitation(invitationId, userId) {
  const { data, error } = await supabase.rpc("retrieve_tasks_by_invitation", {
    param_invitation_id: invitationId,
    param_user_id: userId,
  });

  if (error) {
    console.error("Database Error: ", error);
    throw error;
  }

  return data;
}

export async function getRelevantTasks(userId) {
  const { data, error } = await supabase.rpc("get_shared_tasks_by_user_id", {
    param_user_id: userId,
  });

  if (error) {
    console.error("Error:", error.message);
    throw error;
  }

  return data;
}
