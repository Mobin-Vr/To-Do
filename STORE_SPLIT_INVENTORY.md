# STORE SPLIT INVENTORY — Phase 0 Deliverable

**Generated:** 2026-07-09
**Source:** Project-wide search for `useTaskStore` (import path patterns like `"../../taskStore"`, `"../taskStore"`, `"@/app/taskStore"`)
**Total consumer files found:** 45

## Legend

- **A** = Action (function from the store)
- **S** = State field
- Target store mapping follows Section 2 of `AUDIT_ZUSTAND_STORE_SPLIT.md`

---

## 1. Task page files

### `app/tasks/page.js`
| Field/Action Used      | Type | Target Store     |
|------------------------|------|------------------|
| `tasksList`            | S    | `useTaskStore`   |
| `getCategoriesList`    | A    | `useCategoryStore` |

### `app/tasks/all/page.js`
| Field/Action Used      | Type | Target Store     |
|------------------------|------|------------------|
| `tasksList`            | S    | `useTaskStore`   |
| `getCategoriesList`    | A    | `useCategoryStore` |

### `app/tasks/completed/page.js`
| Field/Action Used      | Type | Target Store     |
|------------------------|------|------------------|
| `tasksList`            | S    | `useTaskStore`   |
| `getCategoriesList`    | A    | `useCategoryStore` |

### `app/tasks/important/page.js`
| Field/Action Used      | Type | Target Store     |
|------------------------|------|------------------|
| `tasksList`            | S    | `useTaskStore`   |
| `getCategoriesList`    | A    | `useCategoryStore` |

### `app/tasks/my-day/page.js`
| Field/Action Used      | Type | Target Store     |
|------------------------|------|------------------|
| `tasksList`            | S    | `useTaskStore`   |
| `getCategoriesList`    | A    | `useCategoryStore` |
| `showSpinner`          | S    | `useUiStore`     |

### `app/tasks/planned/page.js`
| Field/Action Used      | Type | Target Store     |
|------------------------|------|------------------|
| `tasksList`            | S    | `useTaskStore`   |
| `getCategoriesList`    | A    | `useCategoryStore` |

### `app/tasks/search/page.js`
| Field/Action Used      | Type | Target Store     |
|------------------------|------|------------------|
| `tasksList`            | S    | `useTaskStore`   |

### `app/tasks/[slug]/page.js`
| Field/Action Used           | Type | Target Store          |
|-----------------------------|------|-----------------------|
| `deleteCategoryFromStore`   | A    | `useCategoryStore`     |
| `leaveInvitationFromStore`  | A    | `useInvitationStore`   |
| `tasksList`                 | S    | `useTaskStore`        |
| `categoriesList`            | S    | `useCategoryStore`     |
| `showDeleteModal`           | A    | `useDeleteModalStore` |

---

## 2. Top-level components

### `app/_components/TaskItem.jsx`
| Field/Action Used            | Type | Target Store     |
|------------------------------|------|------------------|
| `handleActiveTaskSidebar`    | A    | `useTaskStore`   |

### `app/_components/TasksList.jsx`
| Field/Action Used      | Type | Target Store     |
|------------------------|------|------------------|
| `sortMethod`           | S    | `useUiStore`     |
| `sortMethodForShared`  | S    | `useUiStore`     |
| `getCategoriesList`    | A    | `useCategoryStore` |

### `app/_components/CategoryTitleEditor.jsx`
| Field/Action Used           | Type | Target Store       |
|-----------------------------|------|--------------------|
| `updateCategoryInStore`     | A    | `useCategoryStore` |
| `editTitleWhileCreating`    | S    | `useUiStore`       |
| `toggleTitleFocus`          | A    | `useUiStore`       |

### `app/_components/ListHeader.jsx`
| Field/Action Used  | Type | Target Store     |
|--------------------|------|------------------|
| `getUserState`     | A    | `useUserStore`   |

### `app/_components/HealthStatusSync.jsx`
| Field/Action Used          | Type | Target Store     |
|----------------------------|------|------------------|
| `updateConnectionStatus`   | A    | `useSyncStore`   |
| `toggleOfflineLogMode`     | A    | `useSyncStore`   |
| `changeLog`                | S    | `useSyncStore`   |
| `isSyncing`                | S    | `useSyncStore`   |
| `getConectionStatus`       | A    | `useSyncStore`   |
| `syncChangeLog`            | A    | `useSyncStore`   |

### `app/_components/ReloadStoreInitializer.jsx`
| Field/Action Used  | Type | Target Store          |
|--------------------|------|-----------------------|
| `resetOnReload`    | A    | Split: `resetSidebar()` → `useUiStore` + `resetActiveTask()` → `useTaskStore` |

### `app/_components/ReminderHandler.jsx`
| Field/Action Used      | Type | Target Store     |
|------------------------|------|------------------|
| `getTaskList`          | A    | `useTaskStore`   |
| `updateTaskInStore`    | A    | `useTaskStore`   |

### `app/_components/ResetTaskStore.jsx`
| Field/Action Used  | Type | Target Store                        |
|--------------------|------|-------------------------------------|
| `resetStore`       | A    | `resetAllStores.js` (global reset)   |

### `app/_components/UnsavedChangesWarning.jsx`
| Field/Action Used  | Type | Target Store     |
|--------------------|------|------------------|
| `changeLog`        | S    | `useSyncStore`   |

### `app/_components/TaskRealTimeListener.jsx`
| Field/Action Used              | Type | Target Store          |
|--------------------------------|------|-----------------------|
| `addTaskFromRealtime`          | A    | `useTaskStore`        |
| `addUserFromRealtime`          | A    | `useInvitationStore`  |
| `updateTaskFromRealtime`       | A    | `useTaskStore`        |
| `updateCategoryNameFromRealTime`| A   | `useCategoryStore`    |
| `deleteTaskFromRealtime`       | A    | `useTaskStore`        |
| `removeUserWhenNotOwner`       | A    | `useInvitationStore`  |
| `getUserState`                 | A    | `useUserStore`        |

---

## 3. Sidebar section

### `app/_components/sidebarSection/Sidebar.jsx`
| Field/Action Used      | Type | Target Store        |
|------------------------|------|---------------------|
| `isSidebarOpen`        | S    | `useUiStore`        |
| `toggleSidebar`        | A    | `useUiStore`        |
| `tasksList`            | S    | `useTaskStore`      |
| `categoriesList`       | S    | `useCategoryStore`  |
| `getUserState`         | A    | `useUserStore`      |
| `addCategoryToStore`   | A    | `useCategoryStore`  |

### `app/_components/sidebarSection/SidebarLink.jsx`
| Field/Action Used  | Type | Target Store     |
|--------------------|------|------------------|
| `tasksList`        | S    | `useTaskStore`   |

### `app/_components/sidebarSection/UserSignupHandler.jsx`
| Field/Action Used  | Type | Target Store     |
|--------------------|------|------------------|
| `setUserState`     | A    | `useUserStore`   |

### `app/_components/sidebarSection/UserStatus.jsx`
| Field/Action Used  | Type | Target Store     |
|--------------------|------|------------------|
| `conectionStatus`  | S    | `useSyncStore`   |

### `app/_components/sidebarSection/ProfileModal.jsx`
| Field/Action Used  | Type | Target Store     |
|--------------------|------|------------------|
| `toggleSidebar`    | A    | `useUiStore`     |

---

## 4. Share list section

### `app/_components/shareListSection/ShareListModal.jsx`
| Field/Action Used              | Type | Target Store          |
|--------------------------------|------|-----------------------|
| `createInvitationInStore`      | A    | `useInvitationStore`  |
| `invitations`                  | S    | `useInvitationStore`  |

### `app/_components/shareListSection/InvitationLandingContent.jsx`
| Field/Action Used          | Type | Target Store          |
|----------------------------|------|-----------------------|
| `joinInvitationInStore`    | A    | `useInvitationStore`  |

### `app/_components/shareListSection/ManageMembers.jsx`
| Field/Action Used                  | Type | Target Store          |
|------------------------------------|------|-----------------------|
| `removeUserFromInvitationStore`    | A    | `useInvitationStore`  |

### `app/_components/shareListSection/MoreOptionsView.jsx`
| Field/Action Used                       | Type | Target Store          |
|-----------------------------------------|------|-----------------------|
| `invitations`                           | S    | `useInvitationStore`  |
| `setInvitationAccessLimitInStore`       | A    | `useInvitationStore`  |
| `stopSharingInvitationInStore`          | A    | `useInvitationStore`  |

---

## 5. Edit sidebar section

### `app/_components/editSidebarSection/EditSidebar.jsx`
| Field/Action Used          | Type | Target Store           |
|----------------------------|------|------------------------|
| `isEditSidebarOpen`        | S    | `useTaskStore`         |
| `toggleEditSidebar`        | A    | `useTaskStore`         |
| `deleteTaskFromStore`      | A    | `useTaskStore`         |
| `updateTaskInStore`        | A    | `useTaskStore`         |
| `activeTask`               | S    | `useTaskStore`         |
| `setActiveTask`            | A    | `useTaskStore`         |
| `tasksList`                | S    | `useTaskStore`         |
| `showDeleteModal`          | A    | `useDeleteModalStore`  |
| `deletingType`             | S    | `useDeleteModalStore`  |

### `app/_components/editSidebarSection/AddToMyDay.jsx`
| Field/Action Used      | Type | Target Store     |
|------------------------|------|------------------|
| `updateTaskInStore`    | A    | `useTaskStore`   |

### `app/_components/editSidebarSection/TaskTitleEditor.jsx`
| Field/Action Used      | Type | Target Store     |
|------------------------|------|------------------|
| `updateTaskInStore`    | A    | `useTaskStore`   |

### `app/_components/editSidebarSection/reminderBoxSection/AddDue.jsx`
| Field/Action Used      | Type | Target Store     |
|------------------------|------|------------------|
| `updateTaskInStore`    | A    | `useTaskStore`   |

### `app/_components/editSidebarSection/reminderBoxSection/AddReminder.jsx`
| Field/Action Used      | Type | Target Store     |
|------------------------|------|------------------|
| `updateTaskInStore`    | A    | `useTaskStore`   |

### `app/_components/editSidebarSection/reminderBoxSection/AddRepeat.jsx`
| Field/Action Used      | Type | Target Store     |
|------------------------|------|------------------|
| `updateTaskInStore`    | A    | `useTaskStore`   |

### `app/_components/editSidebarSection/stepSection/AddStep.jsx`
| Field/Action Used      | Type | Target Store     |
|------------------------|------|------------------|
| `updateTaskInStore`    | A    | `useTaskStore`   |

### `app/_components/editSidebarSection/stepSection/StepActionModal.jsx`
| Field/Action Used      | Type | Target Store          |
|------------------------|------|-----------------------|
| `updateTaskInStore`    | A    | `useTaskStore`        |
| `addTaskToStore`       | A    | `useTaskStore`        |
| `getUserState`         | A    | `useUserStore`        |
| `showDeleteModal`      | A    | `useDeleteModalStore` |

### `app/_components/editSidebarSection/stepSection/StepCompleteBtn.jsx`
| Field/Action Used      | Type | Target Store     |
|------------------------|------|------------------|
| `updateTaskInStore`    | A    | `useTaskStore`   |

### `app/_components/editSidebarSection/stepSection/StepTitleEditor.jsx`
| Field/Action Used      | Type | Target Store     |
|------------------------|------|------------------|
| `updateTaskInStore`    | A    | `useTaskStore`   |

---

## 6. Task input section

### `app/_components/taskInputSection/TaskInput.jsx`
| Field/Action Used      | Type | Target Store     |
|------------------------|------|------------------|
| `addTaskToStore`       | A    | `useTaskStore`   |
| `getUserState`         | A    | `useUserStore`   |

---

## 7. UI components (`_ui/`)

### `app/_components/_ui/CompleteBtn.jsx`
| Field/Action Used      | Type | Target Store     |
|------------------------|------|------------------|
| `updateTaskInStore`    | A    | `useTaskStore`   |

### `app/_components/_ui/DeleteWarningModal.jsx`
| Field/Action Used       | Type | Target Store           |
|-------------------------|------|------------------------|
| `isDeleteModalOpen`     | S    | `useDeleteModalStore`  |
| `deletingType`          | S    | `useDeleteModalStore`  |
| `deletingItemName`      | S    | `useDeleteModalStore`  |
| `hideDeleteModal`       | A    | `useDeleteModalStore`  |
| `handleConfirmDelete`   | A    | `useDeleteModalStore`  |

### `app/_components/_ui/MenuBtn.jsx`
| Field/Action Used  | Type | Target Store     |
|--------------------|------|------------------|
| `toggleSidebar`    | A    | `useUiStore`     |
| `isSidebarOpen`    | S    | `useUiStore`     |

### `app/_components/_ui/NewListBtn.jsx`
| Field/Action Used      | Type | Target Store       |
|------------------------|------|--------------------|
| `toggleSidebar`        | A    | `useUiStore`       |
| `toggleTitleFocus`     | A    | `useUiStore`       |

*Note: `getUserState` and `addCategoryToStore` are received as props, not destructured from the store directly in this component.*

### `app/_components/_ui/SortMethodBtn.jsx`
| Field/Action Used  | Type | Target Store     |
|--------------------|------|------------------|
| `setSortMethod`    | A    | `useUiStore`     |

### `app/_components/_ui/StarBtn.jsx`
| Field/Action Used      | Type | Target Store     |
|------------------------|------|------------------|
| `updateTaskInStore`    | A    | `useTaskStore`   |

### `app/_components/_ui/Spinner.jsx`
| Field/Action Used  | Type | Target Store     |
|--------------------|------|------------------|
| `showSpinner`      | S    | `useUiStore`     |

---

## Summary — Target Store Usage Count

| Target Store            | Files Using It | Key States/Actions Used |
|-------------------------|----------------|------------------------|
| **useTaskStore**        | 22             | `tasksList`, `activeTask`, `isEditSidebarOpen`, `toggleEditSidebar`, `setActiveTask`, `handleActiveTaskSidebar`, `updateTaskInStore`, `deleteTaskFromStore`, `addTaskToStore`, `getTaskList`, `addTaskFromRealtime`, `updateTaskFromRealtime`, `deleteTaskFromRealtime` |
| **useUiStore**          | 9              | `sortMethod`, `sortMethodForShared`, `showSpinner`, `isSidebarOpen`, `editTitleWhileCreating`, `setSortMethod`, `toggleSidebar`, `toggleTitleFocus`, `resetSidebar` (new) |
| **useCategoryStore**    | 9              | `categoriesList`, `getCategoriesList`, `addCategoryToStore`, `deleteCategoryFromStore`, `updateCategoryInStore`, `updateCategoryNameFromRealTime` |
| **useUserStore**        | 5              | `userState`, `setUserState`, `getUserState` |
| **useInvitationStore**  | 6              | `invitations`, `createInvitationInStore`, `removeUserFromInvitationStore`, `setInvitationAccessLimitInStore`, `stopSharingInvitationInStore`, `joinInvitationInStore`, `leaveInvitationFromStore`, `addUserFromRealtime`, `removeUserWhenNotOwner`, `removeUserWhenOwner` |
| **useSyncStore**        | 4              | `changeLog`, `conectionStatus`, `isSyncing`, `updateConnectionStatus`, `toggleOfflineLogMode`, `getConectionStatus`, `syncChangeLog` |
| **useDeleteModalStore** | 3              | `isDeleteModalOpen`, `deletingType`, `deletingItemName`, `deleteCallback`, `showDeleteModal`, `hideDeleteModal`, `handleConfirmDelete` |
| **resetAllStores** (global) | 1          | `resetStore` → global reset |

## Note on `getCategoriesList`
This is a **getter action** that reads the `categoriesList` state. It is classified as belonging to `useCategoryStore` since it reads from the category domain. In the new split, components that need to get the current categories list will call `useCategoryStore.getState().getCategoriesList()` or read `categoriesList` directly as a state field.