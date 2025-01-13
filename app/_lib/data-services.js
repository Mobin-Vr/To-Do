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

export async function addTask(task) {
   const { data, error } = await supabase.from('tasks').insert(task);

   if (error) {
      console.error(error);
      throw new Error('Error syncing task with Supabase');
   }

   return data;
}

export async function deleteTask(taskId) {
   const { data, error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId);

   if (error) {
      console.error(error);
      throw new Error('Error syncing delete with Supabase');
   }

   return data;
}

export async function toggleCompleted(task) {
   const { data, error } = await supabase
      .from('tasks')
      .update({ isCompleted: task.isCompleted })
      .eq('id', task.id);

   if (error) {
      console.error(error);
      throw new Error('Error syncing toggle task completation with Supabase');
   }

   return data;
}

export async function toggleStarred(task) {
   const { data, error } = await supabase
      .from('tasks')
      .update({ isStarred: task.isStarred })
      .eq('id', task.id);

   if (error) {
      console.error(error);
      throw new Error('Error syncing toggle task starred with Supabase');
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
   const { data, error } = await supabase.from('users').insert([newUser]);

   if (error) {
      console.error(error);
      throw new Error('User could not be created');
   }

   return data;
}
