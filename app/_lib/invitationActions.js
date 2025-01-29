import {
   acceptInvitation,
   createInvitation,
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

export async function acceptInvitationAction(invitationToken, userId) {
   try {
      return await acceptInvitation(invitationToken, userId);
   } catch (err) {
      console.error(err.message);
      throw err;
   }
}

export async function leaveInvitationAction(invitationToken, userId) {
   try {
      return await leaveInvitation(invitationToken, userId);
   } catch (err) {
      console.error(err.message);
      throw err;
   }
}

export async function removeUserFromInvitationAction(
   invitationToken,
   userId,
   ownerId
) {
   try {
      return await removeUserFromInvitation(invitationToken, userId, ownerId);
   } catch (err) {
      console.error(err.message);
      throw err;
   }
}

export async function setInvitationAccessLimitAction(
   invitationToken,
   limitStatus,
   ownerId
) {
   try {
      return await setInvitationAccessLimit(
         invitationToken,
         ownerId,
         limitStatus
      );
   } catch (err) {
      console.error(err.message);
      throw err;
   }
}

export async function getUsersByInvitationAction(invitationToken, ownerId) {
   try {
      return await getUsersByInvitation(invitationToken, ownerId);
   } catch (err) {
      console.error(err.message);
      throw err;
   }
}

export async function stopSharingInvitationAction(invitationToken, ownerId) {
   try {
      return await stopSharingInvitation(invitationToken, ownerId);
   } catch (err) {
      console.error(err.message);
      throw err;
   }
}
