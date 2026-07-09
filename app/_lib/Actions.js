"use server";

import {
  addManyCategories,
  addManyErrorLog,
  addManyTasks,
  checkDatabaseHealth,
  createInvitation,
  createUser,
  debugAuth,
  deleteManyCategories,
  deleteManyTasks,
  getCategoryInvId,
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
export async function getReleventTasksAction() {
  return await getReleventTasks();
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
export async function getReleventCategoriesAction() {
  return await getReleventCategories();
}

// Retrieves the invitation ID associated with a specific category
export async function getCategoryInvIdAction(categoryId) {
  return await getCategoryInvId(categoryId);
}

//////////////////////////////////
////// Invitation Actions ////////
//////////////////////////////////

// Creates a new invitation for a category
export async function createInvitationAction(categoryId) {
  return await createInvitation(categoryId);
}

// Allows a user to join an existing invitation
export async function joinInvitationAction(invitationId) {
  return await joinInvitation(invitationId);
}

// Allows a user to leave an invitation
// LATER Currently not used
export async function leaveInvitationAction(invitationId) {
  return await leaveInvitation(invitationId);
}

// Stops sharing an invitation, making it inactive
export async function stopSharingInvitationAction(invitationId) {
  return await stopSharingInvitation(invitationId);
}

// Sets the access limit for an invitation
export async function setInvitationLimitAction(invitationId, limitAccess) {
  return await setInvitationLimit(invitationId, limitAccess);
}

// Removes a user from an invitation by the owner
export async function removeUserFromInvitationAction(invitationId, userId) {
  return await removeUserFromInvitation(invitationId, userId);
}

// Retrieves invitations created by a specific user
export async function getOwnerInvitationsAction() {
  return await getOwnerInvitations();
}

// Retrieves invitations that a user has joined
export async function getJoinedInvitationsAction() {
  return await getJoinedInvitations();
}

//////////////////////////////////
//// Errors //////////////////////
//////////////////////////////////

// Adds a new error log entry to the "errors_log" table
export async function addManyErrorLogAction(errorLogArr) {
  return await addManyErrorLog(errorLogArr);
}

//////////////////////////////////
//// Conection health ////////////
//////////////////////////////////

// Checks the health status of the database
export async function checkDatabaseHealthAction() {
  return await checkDatabaseHealth();
}
export async function debugAuthAction() {
  return await debugAuth();
}
