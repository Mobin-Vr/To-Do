"use server";

import {
  addManyCategories,
  addManyTasks,
  createInvitation,
  createUser,
  deleteManyCategories,
  deleteManyTasks,
  getCategories,
  getCategoryInvId,
  getRelevantTasks,
  getTasksByInvitation,
  getUser,
  getUserById,
  getUsersByInvitation,
  joinInvitation,
  leaveInvitation,
  removeUserFromInvitation,
  setInvitationAccessLimit,
  stopSharingInvitation,
  updateManyCategories,
  updateManyTasks,
} from "./data-services";

//////////////////////////////////
///////// User Actions //////////
//////////////////////////////////

export async function createUserAction(newUser) {
  return await createUser(newUser);
}

export async function getUserByIdAction(userId) {
  return await getUserById(userId);
}

export async function getUserAction(userEmail) {
  return await getUser(userEmail);
}

//////////////////////////////////
///////// Tasks Actions //////////
//////////////////////////////////

export async function addManyTasksAction(tasksArr) {
  return await addManyTasks(tasksArr);
}

export async function deleteManyTasksAction(tasksIdsArr) {
  return await deleteManyTasks(tasksIdsArr);
}

export async function updateManyTasksAction(tasksArr, tasksIdsArr) {
  return await updateManyTasks(tasksArr, tasksIdsArr);
}

export async function getRelevantTasksAction(userId) {
  return await getRelevantTasks(userId);
}

//////////////////////////////////
//////// Category Actions ////////
//////////////////////////////////

export async function addManyCategoriesAction(categoriesArr) {
  return await addManyCategories(categoriesArr);
}

export async function deleteManyCategoriesAction(categoryIdsArr) {
  return await deleteManyCategories(categoryIdsArr);
}

export async function updateManyCategoriesAction(
  categoriesArr,
  categoriesIdsArr,
) {
  return await updateManyCategories(categoriesArr, categoriesIdsArr);
}

export async function getCategoriesAction(userId) {
  return await getCategories(userId);
}

export async function getCategoryInvIdAction(categoryId) {
  return await getCategoryInvId(categoryId);
}

//////////////////////////////////
////// Invitation Actions ////////
//////////////////////////////////

export async function createInvitationAction(categoryId, ownerId) {
  return await createInvitation(categoryId, ownerId);
}

export async function leaveInvitationAction(invitationId, userId) {
  return await leaveInvitation(invitationId, userId);
}

export async function removeUserFromInvitationAction(
  invitationId,
  userId,
  ownerId,
) {
  return await removeUserFromInvitation(invitationId, userId, ownerId);
}

export async function setInvitationAccessLimitAction(
  invitationId,
  limitAccess,
  ownerId,
) {
  return await setInvitationAccessLimit(invitationId, ownerId, limitAccess);
}

export async function getUsersByInvitationAction(invitationId, ownerId) {
  return await getUsersByInvitation(invitationId, ownerId);
}

export async function stopSharingInvitationAction(invitationId, ownerId) {
  return await stopSharingInvitation(invitationId, ownerId);
}

export async function joinInvitationAction(invitationId, userId) {
  return await joinInvitation(invitationId, userId);
}

export async function getTasksByInvitationAction(invitationId, userId) {
  return await getTasksByInvitation(invitationId, userId);
}
