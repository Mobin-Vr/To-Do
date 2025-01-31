import {
   joinInvitation,
   createInvitation,
   getTasksByInvitation,
   getUsersByInvitation,
   leaveInvitation,
   removeUserFromInvitation,
   setInvitationAccessLimit,
   stopSharingInvitation,
} from './data-services';

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
      console.error('Error accepting invitation:', err.message);
      throw err;
   }
}

export async function getTasksByInvitationAction(invitationId, userId) {
   try {
      return await getTasksByInvitation(invitationId, userId);
   } catch (err) {
      console.error('Error fetching tasks for invitation:', err.message);
      throw err;
   }
}
