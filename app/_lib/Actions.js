"use server";

import {
  addManyCategories,
  addManyTasks,
  createInvitation,
  createUser,
  deleteManyCategories,
  deleteManyTasks,
  getCategoryInvId,
  getInvitationTasks,
  getInvitationUsers,
  getJoinedInvitations,
  getOwnerInvitations,
  getReleventCategories,
  getReleventTasks,
  getUserByEmail,
  getUserById,
  joinInvitation,
  leaveInvitation,
  removeUserFromInvitation,
  setInvitationLimit,
  stopSharingInvitation,
  updateManyCategories,
  updateManyTasks,
} from "./data-services";

//////////////////////////////////
///////// User Actions //////////
//////////////////////////////////

// Creates a new user in the database
export async function createUserAction(newUser) {
  return await createUser(newUser);
}

// Retrieves a user by their unique ID
export async function getUserByIdAction(userId) {
  return await getUserById(userId);
}

// Retrieves a user by their email address
export async function getUserByEmailAction(userEmail) {
  return await getUserByEmail(userEmail);
}

//////////////////////////////////
///////// Tasks Actions //////////
//////////////////////////////////

// Adds multiple tasks to the database
export async function addManyTasksAction(tasksArr) {
  return await addManyTasks(tasksArr);
}

// Deletes multiple tasks by their IDs
export async function deleteManyTasksAction(tasksIdsArr) {
  return await deleteManyTasks(tasksIdsArr);
}

// Updates multiple tasks with new data
export async function updateManyTasksAction(tasksArr, tasksIdsArr) {
  return await updateManyTasks(tasksArr, tasksIdsArr);
}

// Retrieves relevant tasks for a user, including owned and shared tasks
export async function getReleventTasksAction(userId) {
  return await getReleventTasks(userId);
}

//////////////////////////////////
//////// Category Actions ////////
//////////////////////////////////

// Adds multiple categories to the database
export async function addManyCategoriesAction(categoriesArr) {
  return await addManyCategories(categoriesArr);
}

// Deletes multiple categories by their IDs
export async function deleteManyCategoriesAction(categoryIdsArr) {
  return await deleteManyCategories(categoryIdsArr);
}

// Updates multiple categories with new data
export async function updateManyCategoriesAction(
  categoriesArr,
  categoriesIdsArr,
) {
  return await updateManyCategories(categoriesArr, categoriesIdsArr);
}

// Retrieves relevant categories owned by a specific user
export async function getReleventCategoriesAction(userId) {
  return await getReleventCategories(userId);
}

// Retrieves the invitation ID associated with a specific category
export async function getCategoryInvIdAction(categoryId) {
  return await getCategoryInvId(categoryId);
}

//////////////////////////////////
////// Invitation Actions ////////
//////////////////////////////////

// Creates a new invitation for a category
export async function createInvitationAction(categoryId, ownerId) {
  return await createInvitation(categoryId, ownerId);
}

// Allows a user to join an existing invitation
export async function joinInvitationAction(invitationId, userId) {
  return await joinInvitation(invitationId, userId);
}

// Allows a user to leave an invitation
// LATER Currently not used
export async function leaveInvitationAction(invitationId, userId) {
  return await leaveInvitation(invitationId, userId);
}

// Stops sharing an invitation, making it inactive
export async function stopSharingInvitationAction(invitationId, ownerId) {
  return await stopSharingInvitation(invitationId, ownerId);
}

// Sets the access limit for an invitation
export async function setInvitationLimitAction(
  invitationId,
  ownerId,
  limitAccess,
) {
  return await setInvitationLimit(invitationId, ownerId, limitAccess);
}

// Removes a user from an invitation by the owner
export async function removeUserFromInvitationAction(
  invitationId,
  userId,
  ownerId,
) {
  return await removeUserFromInvitation(invitationId, userId, ownerId);
}

// Retrieves the list of users in an invitation
export async function getInvitationUsersAction(invitationId, ownerId) {
  return await getInvitationUsers(invitationId, ownerId);
}

// Retrieves invitations created by a specific user
export async function getOwnerInvitationsAction(userId) {
  return await getOwnerInvitations(userId);
}

// Retrieves invitations that a user has joined
export async function getJoinedInvitationsAction(userId) {
  return await getJoinedInvitations(userId);
}
