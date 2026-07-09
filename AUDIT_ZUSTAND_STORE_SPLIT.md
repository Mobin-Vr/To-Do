# Zustand Store Split — Full Execution Plan for Coding Agent

## 0. Read This First — Non-Negotiable Rules

You are refactoring a single large Zustand store (`app/taskStore.js`, ~900 lines) into
multiple smaller, domain-scoped stores. This is a **mechanical refactor**, not a
rewrite. Follow these rules strictly, in every phase:

1. **Do not guess.** A complete field-by-field and action-by-action mapping is
   provided below (Section 2). Use it exactly. If you encounter a usage of the
   store (a property, an action, a selector) that is **not** covered by this
   mapping, **stop and ask** before proceeding. Do not silently decide where it
   belongs.
2. **Do not change behavior.** Every action must keep its exact name, exact
   parameters, and exact logic. The only thing that changes is _which file it
   lives in_ and _how it reads/writes state that now lives in a different store_.
3. **Do not skip files.** Before touching any component, you must produce a
   complete inventory (Phase 0 deliverable) of every file that imports or uses
   `useTaskStore`. The hint list in Section 5 is a starting point, not a
   complete list — the source of truth is a project-wide search, not this list.
4. **Do not delete the original file early.** Keep `app/taskStore.js` untouched
   (or renamed to `app/taskStore.old.js` as a reference) until Phase 6's
   verification checklist fully passes.
5. **Minimize the diff at call sites.** In components, you should only be
   changing import statements and which store hook is called — not rewriting
   component logic, JSX, or unrelated code.
6. **When in doubt, stop and ask** rather than making an assumption. This
   applies especially to Section 3 (cross-store dependencies), which is the
   highest-risk part of this refactor — getting it wrong silently breaks
   offline sync and realtime updates.

---

## 1. Target File Structure

Create a new folder `app/_store/` (matches the project's existing convention of
`_components`, `_lib` for non-route folders in the App Router).

```
app/_store/
  useUserStore.js
  useUiStore.js
  useTaskStore.js
  useCategoryStore.js
  useInvitationStore.js
  useSyncStore.js
  useDeleteModalStore.js
  resetAllStores.js        (small helper, see Section 3.1)
```

Do **not** create a barrel `index.js` that re-exports all stores as one object —
each store must remain an independently importable hook, exactly like the
original `useTaskStore` default export, so components only pull in what they
actually subscribe to.

---

## 2. Exact State & Action Mapping

This is the authoritative mapping. Do not deviate from it.

### 2.1 `useUserStore.js`

**State:** `userState`
**Actions:** `setUserState`, `getUserState`, `resetStore` (local reset of just this slice)
**Persisted:** yes — `{ userState }` to `sessionStorage`, key `"user-store"`.

> ⚠️ Important: in the original code, `setUserState` calls `get().fetchDataOnMount()`
> internally. `fetchDataOnMount` is being moved to `useSyncStore`. Importing
> `useSyncStore` inside `useUserStore` while `useSyncStore` also needs to read
> `useUserStore` (for `user_id`) creates a circular import. **Resolution:**
> remove the internal call to `fetchDataOnMount` from `setUserState`. Instead,
> find the call site(s) of `setUserState` in the codebase (search the whole
> project — do not assume it's only in one file) and update each call site to
> call both, in sequence:
>
> ```js
> useUserStore.getState().setUserState(user);
> useSyncStore.getState().fetchDataOnMount();
> ```

### 2.2 `useUiStore.js`

**State:** `sortMethod`, `sortMethodForShared`, `showSpinner`, `isSidebarOpen`, `editTitleWhileCreating`
**Actions:** `setSortMethod`, `setShowpinner`, `toggleSidebar`, `toggleTitleFocus`, `resetStore`
**Persisted:** no.

### 2.3 `useTaskStore.js`

**State:** `tasksList`, `activeTask`, `isEditSidebarOpen`

> Note: `activeTask` and `isEditSidebarOpen` are grouped here (not in `useUiStore`)
> because they are always mutated together with task selection logic — they are
> conceptually part of the "task editing" domain, not generic app UI.

**Actions (ported as-is):** `addTaskToStore`, `deleteTaskFromStore`,
`updateTaskInStore`, `addTaskFromRealtime`, `updateTaskFromRealtime`,
`deleteTaskFromRealtime`, `getTaskList`, `setActiveTask`,
`handleActiveTaskSidebar`, `toggleEditSidebar`, `resetStore`

**New small actions (must be added, see Section 3.2):**
`removeTasksByCategoryId(categoryId)`, `removeTasksByOwnerId(ownerId)`,
`addTasksBulk(tasks)`, `resetActiveTask()` (for `resetOnReload`, see 2.7)

**Persisted:** no.

### 2.4 `useCategoryStore.js`

**State:** `categoriesList`
**Actions (ported as-is):** `addCategoryToStore`, `deleteCategoryFromStore`,
`updateCategoryInStore`, `updateCategoryNameFromRealTime`, `getCategoriesList`,
`resetStore`

**New small actions (must be added, see Section 3.2):**
`setCategoryInvitationFlag(categoryId, bool)`, `addCategoryToList(category)`,
`removeCategoryById(categoryId)`

**Persisted:** no.

### 2.5 `useInvitationStore.js`

**State:** `invitations`, `sharedWithMe`
**Actions (ported as-is):** `createInvitationInStore`,
`removeUserFromInvitationStore`, `setInvitationAccessLimitInStore`,
`stopSharingInvitationInStore`, `joinInvitationInStore`,
`leaveInvitationFromStore`, `getSharedWithMe`, `getInvitations`,
`addUserFromRealtime`, `removeUserWhenOwner`, `removeUserWhenNotOwner`,
`resetStore`

**Persisted:** no.

### 2.6 `useSyncStore.js`

**State:** `isSyncing`, `offlineLogMode`, `conectionStatus`, `changeLog`, `errorLog`
**Actions (ported as-is):** `fetchDataOnMount`, `syncChangeLog`,
`updateConnectionStatus`, `toggleOfflineLogMode`, `toggleIsSyncing`, `clearLog`,
`getConectionStatus`, `resetStore`

**New small actions (must be added, see Section 3.2):**
`logTaskChange(type, id, task)`, `logCategoryChange(type, id, category)`,
`pushErrorLog(method, message)`

**Persisted:** yes — `{ changeLog }` to `sessionStorage`, key `"sync-store"`.

### 2.7 `useDeleteModalStore.js`

**State:** `isDeleteModalOpen`, `deletingType`, `deletingItemName`, `deleteCallback`
**Actions (ported as-is):** `showDeleteModal`, `hideDeleteModal`,
`handleConfirmDelete`, `resetStore`

**Persisted:** no.

### 2.8 `resetOnReload` (special case)

The original action touches three fields across two domains:
`isSidebarOpen` (Ui), `isEditSidebarOpen` and `activeTask` (Task). Split it:

- Add `resetSidebar()` to `useUiStore` (sets `isSidebarOpen: false`)
- Add `resetActiveTask()` to `useTaskStore` (sets `isEditSidebarOpen: false, activeTask: null`)

Then find every call site of `resetOnReload` (search the whole project — likely
`ReloadStoreInitializer.jsx` and/or `ResetTaskStore.jsx` based on the file
tree, but confirm by searching) and replace with both calls in sequence.

### 2.9 `resetStore` (global reset, special case)

Each store above gets its own local `resetStore()` that resets only its own
slice. Additionally create `app/_store/resetAllStores.js`:

```js
import useUserStore from "./useUserStore";
import useUiStore from "./useUiStore";
import useTaskStore from "./useTaskStore";
import useCategoryStore from "./useCategoryStore";
import useInvitationStore from "./useInvitationStore";
import useSyncStore from "./useSyncStore";
import useDeleteModalStore from "./useDeleteModalStore";

export const resetAllStores = () => {
  useUserStore.getState().resetStore();
  useUiStore.getState().resetStore();
  useTaskStore.getState().resetStore();
  useCategoryStore.getState().resetStore();
  useInvitationStore.getState().resetStore();
  useSyncStore.getState().resetStore();
  useDeleteModalStore.getState().resetStore();
};
```

Find every call site of the old `resetStore()` (search the whole project —
`ResetTaskStore.jsx` is a likely candidate based on the file tree) and replace
it with `resetAllStores()`.

---

## 3. Cross-Store Dependencies — Read This Carefully

This is the highest-risk part of the refactor. In the original single store,
these interactions were "free" (same `set`/`get`). After the split, they
require explicit cross-store calls via `useOtherStore.getState()` (this is the
correct, standard Zustand pattern for one store reading/writing another
outside of React render — it does **not** trigger a re-render subscription,
it's just direct JS object access).

### 3.1 Every task/category mutation needs sync-store data

`addTaskToStore`, `deleteTaskFromStore`, `updateTaskInStore`,
`addCategoryToStore`, `deleteCategoryFromStore`, `updateCategoryInStore` (and
all invitation actions) all read `conectionStatus.isOnline` and, when offline,
push an entry to `changeLog` with coalescing logic (see original file for the
exact coalescing rules — do not simplify or "improve" this logic, port it
exactly).

**Required implementation:** instead of duplicating the coalescing logic in
every task/category action, move it into two dedicated `useSyncStore` actions
so each call site becomes a single line:

- `useSyncStore.getState().logTaskChange(type, id, task)` — internally
  implements the exact same "check if an `add-task` entry already exists for
  this id, replace vs. push" logic currently inline in
  `addTaskToStore` / `deleteTaskFromStore` / `updateTaskInStore`.
- `useSyncStore.getState().logCategoryChange(type, id, category)` — same for
  categories.

Every task/category action must:

1. Read `const isOnline = useSyncStore.getState().conectionStatus.isOnline;`
2. Read `const offlineLogMode = useSyncStore.getState().offlineLogMode;`
3. Call `useSyncStore.getState().logTaskChange(...)` (or the category
   equivalent) only if `offlineLogMode` is true, exactly where the original
   code did.

### 3.2 Error logging is duplicated ~14 times — centralize it

Every action in the original file has an identical `catch` block: build a
`newError` object, check for duplicates in `errorLog`, push if not duplicate,
and call `addManyErrorLogAction` if online. Move this into one action:

```js
// inside useSyncStore.js
pushErrorLog: async (method, message) => {
  const newError = { method, message };
  set(produce((state) => {
    const isDuplicate = state.errorLog.some(
      (err) => err.method === newError.method && err.message === newError.message,
    );
    if (!isDuplicate) state.errorLog.push(newError);
  }));
  if (get().conectionStatus.isOnline) {
    await addManyErrorLogAction([newError]);
  }
},
```

Then every `catch` block across all stores becomes:

```js
catch (error) {
  logger.error("...", error);
  toast.error(TASK_SYNC_FAIL_TOAST_MSG);
  await useSyncStore.getState().pushErrorLog("methodName", error.message);
}
```

This is not optional — do it, because it turns 14 duplicated ~15-line blocks
into 14 one-line calls, which directly serves the "minimum code change /
maximum readability" goal. Do not alter the duplicate-check or online-check
logic itself.

### 3.3 `deleteCategoryFromStore` also removes tasks

Original code removes tasks belonging to the deleted category directly from
`tasksList` inside the same `produce` block. After the split, `categoriesList`
and `tasksList` are in different stores. `useCategoryStore`'s
`deleteCategoryFromStore` must call:

```js
useTaskStore.getState().removeTasksByCategoryId(categoryId);
```

as a new exported action on `useTaskStore` that does exactly what the old
inline filter did.

### 3.4 Invitation actions touch categories and tasks

Port these cross-calls exactly:

- `createInvitationInStore` sets `has_category_invitation = true` on a
  category → call `useCategoryStore.getState().setCategoryInvitationFlag(categoryId, true)`.
- `stopSharingInvitationInStore` sets it back to `false` → same helper with `false`.
- `joinInvitationInStore` pushes new tasks and a new category into local state
  → call `useTaskStore.getState().addTasksBulk(tasks)` and
  `useCategoryStore.getState().addCategoryToList(category)`.
- `leaveInvitationFromStore` removes a category and its tasks → call
  `useCategoryStore.getState().removeCategoryById(categoryId)` and
  `useTaskStore.getState().removeTasksByCategoryId(categoryId)`.
- `removeUserWhenOwner` removes tasks by owner id → call
  `useTaskStore.getState().removeTasksByOwnerId(userId)`.
- `removeUserWhenNotOwner` removes a category and its tasks → call both
  category and task removal helpers above.

### 3.5 `fetchDataOnMount` is the biggest cross-store writer

This action reads `userState.user_id` (from `useUserStore`), and reads/writes
`tasksList` (`useTaskStore`), `categoriesList` (`useCategoryStore`),
`invitations` + `sharedWithMe` (`useInvitationStore`), and calls
`setShowpinner` (`useUiStore`), plus uses `pushErrorLog` (3.2) on failure.

Move this action to `useSyncStore`, and inside it, replace every
`get().tasksList` / `set(produce(...))` on tasks/categories/invitations with
the corresponding `useTaskStore.getState()`, `useCategoryStore.getState()`,
`useInvitationStore.getState()` calls. You will likely need to add small
bulk-setter actions (e.g. `setTasksList(list)`, `setCategoriesList(list)`,
`setInvitations(list)`, `setSharedWithMe(list)`) to those stores if a
suitable action doesn't already exist from Section 2 — if you find you need
one, add it, keep it minimal, and note it in your final report (Section 6).

### 3.6 Realtime listener component

`TaskRealTimeListener.jsx` currently calls task-realtime actions,
invitation-realtime actions, and category-name-realtime actions from one
store. After the split it must import from three stores
(`useTaskStore`, `useCategoryStore`, `useInvitationStore`) instead of one.
Locate every action it calls and route each to its new home per Section 2.

---

## 4. Persistence & DevTools Notes

- Each store keeps its own `persist` middleware only where Section 2 says
  "Persisted: yes" (`useUserStore`, `useSyncStore`). All others: no persist
  middleware at all.
- Give each store its own `devtools` name (e.g. `{ name: "User Store" }`,
  `{ name: "Task Store" }`, etc.) so Redux DevTools shows them as separate
  entries.
- Changing the `sessionStorage` key names (from the single `"Todo Store"` key
  to `"user-store"` / `"sync-store"`) means old persisted data under the old
  key becomes orphaned. This is expected and fine — `sessionStorage` is
  cleared when the browser tab/session ends, so there is no migration
  concern. Do not write migration code for this; just note it in your report.

---

## 5. Consumer Files — Starting Checklist (not exhaustive)

Before editing anything, run a project-wide search for `useTaskStore` and
`taskStore` (import paths) and build a complete table of:
`file path → every property/action it destructures → target store`.

Based on the project's file tree, these are very likely to need updates —
treat this as a _starting point only_, not the full list:

- `app/_components/TaskRealTimeListener.jsx`
- `app/_components/HealthStatusSync.jsx`
- `app/_components/ReloadStoreInitializer.jsx`
- `app/_components/ResetTaskStore.jsx`
- `app/_components/UnsavedChangesWarning.jsx`
- `app/_components/sidebarSection/UserSignupHandler.jsx`
- `app/_components/sidebarSection/*` (Sidebar, CategoriesList, CategoryItem, UserStatus, UserMenu, TaskSearch)
- `app/_components/shareListSection/*` (ShareListModal, ManageMembers, InvitationUsersList, InvationLanding, InvitationLandingContent, LinkCreatedView, MoreOptionsView, InitialView, ShareBtn)
- `app/_components/editSidebarSection/**/*` (EditSidebar and all its children)
- `app/_components/TaskItem.jsx`, `TaskGroup.jsx`, `TasksList.jsx`, `TaskTitle.jsx`, `TaskDetails.jsx`
- `app/_components/taskInputSection/*`
- `app/_components/CategoryTitleEditor.jsx`, `ListHeader.jsx`, `ListToggler.jsx`
- `app/_components/minimizerSection/*`
- `app/_components/_ui/DeleteWarningModal.jsx`
- every `app/tasks/**/page.js`
- `app/layout.js`, `app/error.js`, `app/not-found.js` (check even if unlikely)

For any file where a component currently pulls fields from multiple domains
in a single `useTaskStore(useShallow(selector))` call, split it into multiple
hook calls — one per store — each with its own `useShallow` selector. Do not
merge results from different hooks into one object unless the component
already did that for unrelated reasons.

---

## 6. Execution Phases

**Phase 0 — Inventory (read-only, no edits yet)**
Search the entire project for every usage of `useTaskStore`/`taskStore`.
Produce `STORE_SPLIT_INVENTORY.md` listing, per file, every state field and
action used, and its target store per Section 2. Do not proceed to Phase 1
until this file is complete for every file found by the search — not just
the hint list in Section 5.

**Phase 1 — Confirm the boundary map**
Use the mapping in Section 2 exactly. Do not redesign it.

**Phase 2 — Scaffold new store files**
Create all seven files in `app/_store/` with state + simple get/set actions
only (direct 1:1 ports, no cross-store logic yet). The old `app/taskStore.js`
stays active and untouched; nothing imports the new stores yet. The app must
still build and run unchanged after this phase.

**Phase 3 — Port actions, store by store**
Order matters — do them in this sequence, since later stores depend on
helper actions added to earlier ones:

1. `useUiStore`
2. `useUserStore`
3. `useDeleteModalStore`
4. `useTaskStore` (including the new helpers from 3.2/3.3/3.4)
5. `useCategoryStore` (including the new helpers from 3.2/3.3/3.4)
6. `useInvitationStore` (including the new helpers from 3.4)
7. `useSyncStore` (including `logTaskChange`, `logCategoryChange`,
   `pushErrorLog`, and `fetchDataOnMount` last, since it depends on all
   other stores existing)

**Phase 4 — Implement all cross-store helper actions**
Everything listed in Section 3. Do not leave any TODO or stub — every
cross-store call must be fully implemented and match original behavior.

**Phase 5 — Update every consumer file**
Go through `STORE_SPLIT_INVENTORY.md` row by row. For each file, replace the
old import/usage with the correct new store hook(s). After each batch of
~10 files, re-run a project-wide search for the old import path to confirm
progress and catch anything missed.

**Phase 6 — Remove the old store**
Only after `STORE_SPLIT_INVENTORY.md` shows zero remaining references to
`app/taskStore.js` anywhere in the project, and the project builds/lints
cleanly, delete (or archive) the old file.

**Phase 7 — Verification checklist**
Manually retrace these flows against the new code (do not just assume it
works because it compiles):

- Add / edit / delete a task while online
- Add / edit / delete a task while offline, then reconnect and confirm
  `syncChangeLog` sends the right batched actions and clears the log
- Create a category, rename it, delete it (confirm its tasks are removed too)
- Create an invitation / share a category, confirm `has_category_invitation`
  flips correctly
- Join an invitation via link, confirm tasks + category appear
- Leave / stop-sharing an invitation, confirm cleanup on both sides
- Two-tab realtime test: task update in tab A appears in tab B; a removed
  collaborator gets redirected to `/tasks`
- Delete confirmation modal flow end-to-end
- Sidebar + edit-sidebar open/close/reset behavior on page reload
- Sign-in flow: `setUserState` followed by `fetchDataOnMount` still populates
  all lists correctly

**Final deliverable:** a short report listing every file changed, every new
helper action added beyond what Section 2/3 specify (if any — and why it was
necessary), and confirmation that Phase 7's checklist was walked through.

---

## 7. Reminder

If, at any point, something in the actual codebase doesn't match what's
described here (an action this plan didn't account for, a component using
the store in an unexpected way, a field not covered above) — **stop and ask
for clarification instead of guessing or improvising a solution.**
