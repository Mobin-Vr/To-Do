'use server';

import {
   joinInvitation,
   createInvitation,
   getTasksByInvitation,
   getUsersByInvitation,
   leaveInvitation,
   removeUserFromInvitation,
   setInvitationAccessLimit,
   stopSharingInvitation,
   getRelevantTasks,
} from './data-services';

//////////////////////////////////
////// Invitation Actions ////////
//////////////////////////////////

export async function createInvitationAction(categoryId, ownerId) {
   try {
      return await createInvitation(categoryId, ownerId);
   } catch (err) {
      console.error(err.message);
      throw err;
   }
}

export async function leaveInvitationAction(invitationId, userId) {
   try {
      return await leaveInvitation(invitationId, userId);
   } catch (err) {
      console.error(err.message);
      throw err;
   }
}

export async function removeUserFromInvitationAction(
   invitationId,
   userId,
   ownerId
) {
   try {
      return await removeUserFromInvitation(invitationId, userId, ownerId);
   } catch (err) {
      console.error(err.message);
      throw err;
   }
}

export async function setInvitationAccessLimitAction(
   invitationId,
   limitAccess,
   ownerId
) {
   try {
      return await setInvitationAccessLimit(invitationId, ownerId, limitAccess);
   } catch (err) {
      console.error(err.message);
      throw err;
   }
}

export async function getUsersByInvitationAction(invitationId, ownerId) {
   try {
      return await getUsersByInvitation(invitationId, ownerId);
   } catch (err) {
      console.error(err.message);
      throw err;
   }
}

export async function stopSharingInvitationAction(invitationId, ownerId) {
   try {
      return await stopSharingInvitation(invitationId, ownerId);
   } catch (err) {
      console.error(err.message);
      throw err;
   }
}

export async function joinInvitationAction(invitationId, userId) {
   try {
      return await joinInvitation(invitationId, userId);
   } catch (err) {
      console.error(err.message);
      throw err;
   }
}

export async function getTasksByInvitationAction(invitationId, userId) {
   try {
      return await getTasksByInvitation(invitationId, userId);
   } catch (err) {
      console.error(err.message);
      throw err;
   }
}

//////////////////////////////////
///////// Other Actions //////////
//////////////////////////////////

// This function retrieves all tasks owned by the user and additionally returns tasks related to categories from invitations the user has received. It first returns the user's own tasks, then loops through invitations to fetch shared tasks.
export async function getRelevantTasksAction(userId) {
   try {
      return await getRelevantTasks(userId);
   } catch (err) {
      console.error(err.message);
      throw err;
   }
}
