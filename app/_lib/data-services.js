import { supabase } from './supabase';

export async function getUser(userEmail) {
   const { data } = await supabase
      .from('users')
      .select('*')
      .eq('email', userEmail)
      .single();

   // No error here! We handle the possibility of no user in the sign-in

   return data;
}

// Add one or many tasks
export async function addTask(task) {
   const { data, error } = await supabase.from('tasks').insert(task);

   if (error) {
      console.error(error);
      throw new Error('Error syncing added-task with Supabase');
   }

   return data;
}

// Upadte one task
export async function updateTask(updatedPart, taskId) {
   const { data, error } = await supabase
      .from('tasks')
      .update(updatedPart)
      .eq('id', taskId)
      .select();

   if (error) {
      console.error(error);
      throw new Error('Error syncing updated-task with Supabase');
   }

   return data;
}

// Update many tasks (an array of tasks)
export async function updateManyTask(updatedPartsArr, taskIdsArr) {
   const { data, error } = await supabase
      .from('tasks')
      .update(updatedPartsArr)
      .in('id', taskIdsArr);

   if (error) {
      console.error(error);
      throw new Error('Error syncing updated-tasks with Supabase');
   }

   return data;
}

// Delete one task
export async function deleteTask(taskId) {
   const { data, error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId)
      .select(); // LATER does select work?

   if (error) {
      console.error(error);
      throw new Error('Error syncing deleted-task with Supabase');
   }

   return data;
}

// Delete many task that has the same category id
export async function deleteManyTask(categoryId) {
   const { data, error } = await supabase
      .from('tasks')
      .delete()
      .eq('categoryId', categoryId)
      .select(); // LATER does select work?

   if (error) {
      console.error(error);
      throw new Error('Error syncing deleted-tasks with Supabase');
   }

   return data;
}

export async function getTasks() {
   const { data: tasks, error } = await supabase.from('tasks').select('*');

   if (error) {
      console.error(error);
      throw new Error('Error getting tasks from Supabase');
   }

   return tasks;
}

export async function createUser(newUser) {
   const { data, error } = await supabase
      .from('users')
      .insert([newUser])
      .select();

   if (error) {
      console.error(error);
      throw new Error('User could not be created');
   }

   return data;
}

export async function getCategories() {
   const { data: categories, error } = await supabase
      .from('task_categories')
      .select('*');

   if (error) {
      console.error(error);
      throw new Error('Error getting categories from Supabase');
   }

   return categories;
}

export async function addCategory(newCategory) {
   const { data, error } = await supabase
      .from('task_categories')
      .insert([newCategory])
      .select();

   if (error) {
      console.error(error);
      throw new Error('Category could not be created');
   }

   return data;
}

export async function updateCategory(updatedPart, categoryId) {
   const { data, error } = await supabase
      .from('task_categories')
      .update(updatedPart)
      .eq('id', categoryId)
      .select();

   if (error) {
      console.error(error);
      throw new Error('Category could not be updated');
   }

   return data;
}

export async function deleteCategory(categoryId) {
   const { data, error } = await supabase
      .from('task_categories')
      .delete()
      .eq('id', categoryId)
      .select(); // LATER does select work?

   if (error) {
      console.error(error);
      throw new Error('Category could not be deleted');
   }

   return data;
}

///////////////////
/////// RPC ///////
///////////////////

// Creates a new invitation for a category.
export async function createInvitation(categoryId, ownerId) {
   const { data, error } = await supabase.rpc('create_invitation', {
      category_id: categoryId,
      owner_id: ownerId,
   });

   if (error) {
      console.error(error);
      throw new Error('Failed to create invitation');
   }

   return data;
}

// Accepts an invitation by adding the user to the category.
export async function acceptInvitation(invitationToken, userId) {
   const { error } = await supabase.rpc('accept_invitation', {
      invitation_token: invitationToken,
      user_id: userId,
   });

   if (error) {
      console.error(error);
      throw new Error('Failed to accept the invitation');
   }

   return;
}

// Allows a user to leave an invitation.
export async function leaveInvitation(invitationToken, userId) {
   const { error } = await supabase.rpc('leave_invitation', {
      invitation_token: invitationToken,
      user_id: userId,
   });

   if (error) {
      console.error(error);
      throw new Error('Failed to leave the invitation');
   }

   return;
}

// Removes a specific user from an invitation.
export async function removeUserFromInvitation(
   invitationToken,
   userId,
   ownerId
) {
   const { error } = await supabase.rpc('remove_user_from_invitation', {
      invitation_token: invitationToken,
      user_id: userId,
      owner_id: ownerId,
   });

   if (error) {
      console.error(error);
      throw new Error('Failed to remove user from the invitation');
   }

   return;
}

// Updates the access limit for a specific invitation.
export async function setInvitationAccessLimit(
   invitationToken,
   limitStatus,
   ownerId
) {
   const { error } = await supabase.rpc('set_invitation_access_limit', {
      invitation_token: invitationToken,
      invitation_owner_id: ownerId,
      limit_status: limitStatus,
   });

   if (error) {
      console.error(error);
      throw new Error('Failed to set invitation access limit');
   }

   return;
}

// Fetches all users associated with a specific invitation.
export async function getUsersByInvitation(invitationToken, ownerId) {
   const { data, error } = await supabase.rpc('get_users_by_invitation', {
      invitation_token: invitationToken,
      owner_id: ownerId,
   });

   if (error) {
      console.error(error);
      throw new Error('Failed to fetch users by invitation');
   }

   return data;
}

// Stops sharing a category by deleting the invitation and its users.
export async function stopSharingInvitation(invitationToken, ownerId) {
   const { error } = await supabase.rpc('stop_sharing_invitation', {
      invitation_token: invitationToken,
      invitation_owner_id: ownerId,
   });

   if (error) {
      console.error(error);
      throw new Error('Failed to stop sharing the invitation');
   }

   return;
}
