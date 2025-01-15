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

let x = 0;
// Add one or many tasks
export async function addTask(task) {
   x += 1;
   console.log('>>> api task', 'x=', x, task);
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

// Delete many task
export async function deleteManyTask(taskIdsArr) {
   const { data, error } = await supabase
      .from('tasks')
      .delete()
      .in('id', taskIdsArr)
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
