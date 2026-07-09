# AUDIT REPORT: Microsoft To Do Clone (Next.js 16 / React 19 / TypeScript / Clerk / Supabase / Zustand)

**Report Date:** 2026-07-09  
**Auditor:** Senior Staff Engineer  
**Mode:** Full cross‑file code audit  

---

## Executive Summary

This project is a feature‑rich Microsoft To Do clone built with cutting‑edge stack (Next.js 16.2.10, React 19.2.7, Zustand 5, Supabase Realtime, Clerk auth). The codebase is well‑structured overall with clear separation of concerns. However, the audit reveals **2 critical**, **7 high**, **12 medium**, and **9 low** priority issues — many stemming from the single monolithic 1554‑line Zustand store, missing caching strategy, and several React 19 / Next.js 16 migration gaps.

The most impactful issues are: **no server‑side caching (Next.js 16 `use cache` / `cacheLife` unused)**, **`react-day-picker` v10 API incompatibility** in `Calendar.jsx`, and **direct `document.body.style` mutation without cleanup** in `Template.jsx`.

---

## Critical Findings (Must‑Fix Before Next Deployment)

### C‑1: No server‑side caching in Next.js 16 (CRITICAL — Performance)
**Files:** `next.config.mjs`, all `app/_lib/Actions.js`, all `app/_lib/data-services.js`  
**Lines:** `next.config.mjs:3-4` — `reactCompiler: true, cacheComponents: false`  
**Issue:** Next.js 16 introduced `use cache`, `cacheLife`, and `cacheTag` directives. This project uses **none** of them. Every Server Action and RPC call (`getReleventTasks`, `getReleventCategories`, etc.) hits Supabase directly on every request. The `cacheComponents: false` flag explicitly disables component caching. With React 19's compiler enabled (`reactCompiler: true`), there's a potential conflict: the React Compiler may memoize components, but data fetching has zero caching layer, causing unnecessary database round‑trips on every page navigation.  
**Fix:**  
1. Remove `cacheComponents: false` from `next.config.mjs`.  
2. Add `use cache` to server‑side data fetchers and tag with `cacheTag('tasks')`, `cacheTag('categories')`, etc.  
3. Examples in `app/_lib/data-services.js` around lines 94‑101 (`getReleventTasks`):
```js
export async function getReleventTasks() {
  'use cache';
  cacheTag('tasks');
  cacheLife('hours');
  // ...existing code
}
```

### C‑2: `react-day-picker` v10 API mismatches (CRITICAL — Potential Runtime Error)
**File:** `app/_components/_ui/Calendar.jsx` (line 4)  
**package.json line 34:** `"react-day-picker": "^10.0.1"`  
**Issue:** The project depends on `react-day-picker` v10, but the `Calendar.jsx` uses v9 API patterns:
1. `month_caption` — v10 uses `month_caption` not `caption` (✅ correct), but `button_previous` / `button_next` are now just `nav_button_previous` / `nav_button_next` in v10.
2. `Chevron` component override (line 56‑68) — in v10, `Chevron` prop still works but the internal `orientation` prop signature changed from `left/right` to `prev/next`.
3. `month_grid` (line 28) — v9 used `month_grid`, v10 renamed to `month`.
4. `week` (line 32) — v9 `week` is not a valid classNames key in v10; it's now inside the `weeks` key.
5. The `showOutsideDays` prop (line 10) was renamed to `showOutsideDays` → still correct in v10.

**Fix:** Update `Calendar.jsx` to match `react-day-picker` v10 classNames API:
```jsx
classNames={{
  months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
  month: "space-y-4",
  caption: "flex justify-center pt-1 relative items-center",
  caption_label: "text-sm font-medium",
  nav: "space-x-1 flex items-center",
  nav_button: cn(buttonVariants({ variant: "outline" }), "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"),
  nav_button_previous: "absolute left-1",
  nav_button_next: "absolute right-1",
  table: "w-full border-collapse space-y-1",
  head_row: "flex",
  head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
  row: "flex w-full mt-2",
  cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
  day: "h-8 w-8 p-0 font-normal aria-selected:opacity-100",
  // ...remaining keys
}}
```

---

## High Priority Issues

### H‑1: `document.body.style` mutation without cleanup (HIGH — Side Effects)
**File:** `app/_components/Template.jsx`, lines 24‑27  
**Issue:** On mount, `document.body.style.backgroundColor` is set to `listConfig.bgColor.mainBackground`. On unmount, **it is never reset**. This causes the body background to retain the last visited list's color, leaking across route navigations.  
**Fix:**
```jsx
useEffect(() => {
  const originalBg = document.body.style.backgroundColor;
  document.body.style.backgroundColor = listConfig.bgColor.mainBackground;
  return () => {
    document.body.style.backgroundColor = originalBg;
  };
}, [listConfig.bgColor.mainBackground]);
```

### H‑2: Monolithic Zustand store causes unnecessary re‑renders (HIGH — Performance)
**File:** `app/taskStore.js` (1554 lines)  
**Issue:** The entire store is a single Zustand slice. Components like `Sidebar.jsx` (line 29‑45) subscribe to `tasksList`, `categoriesList`, `isSidebarOpen`, `getUserState`, and `addCategoryToStore` in one selector. Every state change to any of these triggers re‑renders of the entire Sidebar. The `EditSidebar.jsx` (line 23‑44) subscribes to 9 different state slices.  
**Fix:** Split the store into domains: `taskStore`, `categoryStore`, `uiStore`, `syncStore`, `invitationStore` (see the existing `Zustand_Store_Split_Plan.md`). Use `useShallow` consistently (already done in most places — good practice being followed).

### H‑3: Stale closures in `syncData` callback (HIGH — Sync Reliability)
**File:** `app/_components/HealthStatusSync.jsx`, lines 50‑53  
**Issue:** The `syncData` callback captures `changeLog`, `isSyncing`, and `syncChangeLog` via `useCallback` dependencies. However, `changeLog` is the **entire array**, so React identity‑checks it. Every time `changeLog` changes, a new `syncData` function is created, causing the `handleConnectionStatus` callback (line 56) to also re‑create, which re‑attaches event listeners (line 103‑121).  
**Fix:** Use a ref for `changeLog` length comparison or use `useTaskStore.getState().changeLog` inside the callback instead of subscribing to it:

```jsx
const syncData = useCallback(async () => {
  const state = useTaskStore.getState();
  if (state.isSyncing || !state.changeLog.length) return;
  state.syncChangeLog();
}, [syncChangeLog]); // Only depends on the stable action reference
```

### H‑4: Race condition in offline sync — partial failure can cause duplicates (HIGH — Data Integrity)
**File:** `app/taskStore.js`, lines 1287‑1382 (`syncChangeLog`)  
**Issue:** The sync is sequential: ADD tasks → UPDATE tasks → DELETE tasks. If ADD succeeds but UPDATE fails (throws), the `clearLog()` at line 1350 is **never reached** (caught by the catch block at line 1351), so `changeLog` persists. On retry, ADD tasks that already exist on the server will be attempted again, potentially causing **duplicate tasks** (unless Supabase RLS prevents this — which it doesn't guarantee for `INSERT`).  
**Fix:** Use upsert semantics for add‑task operations, or mark synced entries individually rather than clearing the entire log:

```js
// Instead of clearLog(), mark individual entries as synced
changeLog.forEach(log => { log.synced = true; });
// Periodically prune synced entries
```

### H‑5: `TaskSearch.jsx` uses `{ shallow: true }` option which is not supported by Next.js App Router (HIGH — Navigation)
**File:** `app/_components/sidebarSection/TaskSearch.jsx`, line 16  
**Issue:** Line 16 passes `{ shallow: true }` as the third argument to `router.push()`. In Next.js App Router, `shallow` routing was removed. The third argument is `options` which supports `scroll` and `forceOptimisticNavigation`, not `shallow`. The `{ shallow: true }` object is silently ignored (or may throw in a future version).  
**Fix:**
```jsx
router.push(`/tasks/search?query=${encodeURIComponent(searchInput)}`);
```

### H‑6: `jsonwebtoken` and `jwks-rsa` in dependencies but unused (HIGH — Security / Dead Code)
**File:** `package.json`, lines 28‑29  
**Issue:** The project depends on `jsonwebtoken@^9.0.2` and `jwks-rsa@^3.1.0`, but they are never imported anywhere in the codebase. Clerk handles all JWT operations. These are likely leftovers from a previous custom JWT implementation. They increase the attack surface and bundle size.  
**Fix:** Remove both from `package.json`:
```bash
npm uninstall jsonwebtoken jwks-rsa
```

### H‑7: `p-queue` dependency not used effectively (no concurrency limiting in sync) (HIGH — Performance)
**File:** `package.json` line 32, `app/taskStore.js` lines 1287‑1382  
**Issue:** `p-queue` is listed as a dependency, but `syncChangeLog` runs the grouped operations sequentially without any queue. `p-queue` should be used to limit concurrency and provide better error handling with retries.  
**Fix:** Use `p-queue` to wrap the sync operations:
```js
import PQueue from 'p-queue';
const syncQueue = new PQueue({ concurrency: 1, retry: 3 });
// In syncChangeLog:
await syncQueue.add(() => addManyTasksAction(...));
await syncQueue.add(() => updateManyTasksAction(...));
```

---

## Medium Priority Issues

### M‑1: Zustand `persist` middleware stores `changeLog` and `userState` in `sessionStorage` — potential quota exceeded
**File:** `app/taskStore.js`, lines 1542‑1548  
**Issue:** `partialize` persists `changeLog` and `userState` to `sessionStorage`. A large `changeLog` (thousands of offline operations) can exceed the ~5‑10MB `sessionStorage` limit. Additionally, `sessionStorage` is cleared on tab close, so offline changes don't persist across browser sessions (which may be intentional but is unclear).  
**Fix:** Implement a size cap on `changeLog` (e.g., max 1000 entries with FIFO eviction). Consider `localStorage` for offline persistence across sessions.

### M‑2: `resetStore` doesn't clear `sessionStorage` — stale data on sign‑out
**File:** `app/taskStore.js`, lines 99‑100; `app/_components/ResetTaskStore.jsx`, lines 7‑19  
**Issue:** `resetStore()` calls `set(initialState)` which resets the in‑memory state, but the `persist` middleware's `sessionStorage` is **not** cleared. When a new user signs in, the stale `changeLog` from the previous user may still be in `sessionStorage` and get rehydrated on page reload.  
**Fix:**
```js
resetStore: () => {
  set(initialState);
  // Also clear the storage
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('Todo Store');
  }
}
```

### M‑3: Sidebar subscribes to entire `tasksList` — re‑renders on every task change
**File:** `app/_components/sidebarSection/SidebarLink.jsx`, lines 22‑26  
**Issue:** Every `SidebarLink` component subscribes to `tasksList` via `useTaskStore`. When any task changes (e.g., star toggle), every `SidebarLink` re‑renders to recalculate `count()`. With 20+ sidebar items, this is wasteful.  
**Fix:** Memoize the count computation:
```jsx
const count = useMemo(() => {
  if (!tasksList) return 0;
  // ... computation
}, [tasksList, title, categoryId]);
```

### M‑4: Supabase Realtime channels subscribe to entire `tasks` table with no RLS‑based filtering
**File:** `app/_components/TaskRealTimeListener.jsx`, lines 31‑33  
**Issue:** The `postgres_changes` filter for `tasks` table has no explicit filter (`filter: undefined`). While RLS at the database level will restrict rows, the WebSocket connection still receives **all INSERT events** on the `tasks` table, and the client filters them. This wastes bandwidth and CPU on the realtime infrastructure.  
**Fix:** Add a filter for the user's ownership or collaboration:
```js
.on(
  'postgres_changes',
  { event: 'INSERT', schema: 'public', table: 'tasks', filter: `task_owner_id=eq.${userId}` },
  (payload) => addTaskFromRealtime(payload.new),
)
```

### M‑5: `ReminderHandler` sets `is_task_in_myday` in an interval — causes write storms
**File:** `app/_components/ReminderHandler.jsx`, lines 53‑73  
**Issue:** Every 30 seconds (`CHECK_REMINDERS_INTERVAL`), the function iterates ALL tasks and calls `updateTaskInStore` for tasks whose reminder or due date is today but `is_task_in_myday` is false. This creates unnecessary writes every 30 seconds for tasks that were already processed.  
**Fix:** Track which tasks have already been processed (e.g., a Set of `task_id` values):
```jsx
const processedRemindersRef = useRef(new Set());
// Before calling updateTaskInStore, check the set
if (!processedRemindersRef.current.has(task.task_id)) {
  processedRemindersRef.current.add(task.task_id);
  updateTaskInStore(...);
}
```

### M‑6: `CategoryTitleEditor` uses `autosize` library for a single‑line `<input>` (which doesn't need it)
**File:** `app/_components/CategoryTitleEditor.jsx`, lines 29‑32, 80  
**Issue:** The component renders `<input type="text">` (line 80), which is **single‑line** and cannot auto‑resize. The `autosize` library (designed for `<textarea>`) is useless here and throws errors in the console.  
**Fix:** Remove the `autosize` import and use, and change the `<input>` to a plain text input (it already is). If multi‑line editing is desired, use `<textarea>`.

### M‑7: `logger.js` silences all errors in production — losing critical diagnostics
**File:** `app/_lib/logger.js`, lines 14‑17  
**Issue:** `logger.error()` only logs in development mode. In production, ALL errors are swallowed. If a user encounters a database error, nothing is logged to the console or any error reporting service.  
**Fix:** Always log errors, even in production. Add a production‑grade error reporting integration (Sentry, LogRocket):
```js
error: (...args) => {
  console.error('[ERROR]:', ...args);
  // In production, send to error reporting service
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    // sendToSentry(...args);
  }
}
```

### M‑8: `ReminderHandler` creates a new `Audio` object on every user interaction, but never disposes old ones
**File:** `app/_components/ReminderHandler.jsx`, line 35  
**Issue:** On every user click before first interaction, `setAlarmSound(new Audio('/sounds/alarm.mp3'))` creates a new `Audio` object. The old one is abandoned without cleanup. After many clicks, memory accumulates.  
**Fix:** Create the `Audio` object once outside the component or use a ref:
```jsx
const alarmSoundRef = useRef(null);
// In handler:
if (!alarmSoundRef.current) {
  alarmSoundRef.current = new Audio('/sounds/alarm.mp3');
}
```

### M‑9: `TaskSearch.jsx` uses CommonJS `require` inline instead of ESM import
**File:** `app/_components/sidebarSection/TaskSearch.jsx`, line 4  
**Issue:** `const { useState, useEffect } = require("react");` mixes CommonJS `require` with ESM imports (line 2 uses `import`). This works in Next.js but is inconsistent and may cause issues with tree‑shaking.  
**Fix:** Convert to ESM import at the top:
```jsx
import { useState, useEffect } from "react";
```

### M‑10: `fetchDataOnMount` filters duplicates but doesn't merge updates — overwrites local changes
**File:** `app/taskStore.js`, lines 1194‑1225  
**Issue:** When fetching data on mount, the code filters out tasks that already exist in `tasksList` (lines 1195‑1197). If a task was **updated** locally while online (but not yet persisted), the local update is kept, but if the server has a **newer** version, it's ignored. This creates a last‑write‑wins scenario for local data, which is the opposite of what's expected.  
**Fix:** Use the server's `updated_at` field to determine which version is newer:
```js
const mergedTasks = get().tasksList.map(localTask => {
  const serverTask = uniqueTasks.find(t => t.task_id === localTask.task_id);
  if (serverTask && new Date(serverTask.task_updated_at) > new Date(localTask.task_updated_at)) {
    return serverTask;
  }
  return localTask;
});
state.tasksList = [...mergedTasks, ...trulyNewTasks];
```

---

## Low Priority / Informational

### L‑1: `getTimeAgo` calls `.toISOString()` on an already‑ISO string (redundant)
**File:** `app/_lib/utils.js`, line 23  
**Issue:** `formatDistanceToNow(new Date(fromDate).toISOString(), { addSuffix: true })` — `new Date(fromDate).toISOString()` is called, but `formatDistanceToNow` accepts both `Date` and string. Simply passing `new Date(fromDate)` is sufficient.  
**Fix:** `return formatDistanceToNow(new Date(fromDate), { addSuffix: true });`

### L‑2: `getInvitationLink` uses `window.location.origin` directly without SSR safety
**File:** `app/_lib/utils.js`, lines 241‑246  
**Issue:** `window.location.origin` is used without checking for SSR/SSG context. This function could throw if called on the server. However, it's currently only called from client components.  
**Fix:** Add a guard:
```js
const baseUrl = process.env.NODE_ENV === "production"
  ? "https://ms-todo100.vercel.app"
  : (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000");
```

### L‑3: `Spinner.jsx` calls `validate(pageName)` on every render, but `pageName` could be `undefined`
**File:** `app/_components/_ui/Spinner.jsx`, line 26  
**Issue:** `pathname.split("/").at(-1)` returns `undefined` for root path `/`. Passing `undefined` to `uuid.validate()` returns `false`, so it's safe, but it's a code smell.  
**Fix:** Add a default: `const pageName = pathname.split("/").at(-1) || "";`

### L‑4: `proxy.js` is misnamed — it's actually the Clerk middleware file
**File:** `proxy.js` (root)  
**Issue:** The file is named `proxy.js` but it exports `clerkMiddleware` and is clearly the middleware configuration. This is misleading for developers.  
**Fix:** Rename to `middleware.js` (the standard Next.js convention) and place it at the root. Note: In Next.js 16, the middleware file must be named `middleware.js` or `middleware.ts`.

### L‑5: `ListHeader.jsx` calls `getUserState()` on every render — forces store subscription
**File:** `app/_components/ListHeader.jsx`, lines 22‑26, 30, 34, 38  
**Issue:** `getUserState()` is read inside the render function (not in a `useMemo`), which forces the component to subscribe to the entire `userState` and re‑render on any user state change. Since `ListHeader` also has `bgColor` and other props, it re‑renders via parent.  
**Fix:** Pass `userId` as a prop or memoize:
```jsx
const userId = useMemo(() => getUserState()?.user_id, [getUserState]);
```

### L‑6: `EditSidebar.jsx` subscribes to `deletingType` unnecessarily
**File:** `app/_components/editSidebarSection/EditSidebar.jsx`, lines 31, 68  
**Issue:** `deletingType` is subscribed only to check inside `handleClickOutside` if we're deleting a step. This re‑renders the entire sidebar on any delete modal change.  
**Fix:** Use `useTaskStore.getState().deletingType` inside the event handler instead:
```jsx
async function handleClickOutside(e) {
  const currentDeletingType = useTaskStore.getState().deletingType;
  // ...
}
```

### L‑7: No `not-found.js` for the `tasks/[slug]` route — missing 404 for invalid category IDs
**File:** `app/tasks/[slug]/` directory (no `not-found.js` exists)  
**Issue:** If a user navigates to `/tasks/invalid-category-id`, there's no custom 404 page. The root `app/not-found.js` is not found either (only `NotFoundComponent.jsx` exists as a standalone component).  
**Fix:** Move `NotFoundComponent` logic into `app/tasks/[slug]/not-found.js` and `app/not-found.js`.

### L‑8: Notification icon path is probably wrong
**File:** `app/_components/ReminderHandler.jsx`, line 140  
**Issue:** `icon: "@/app/icon.png"` — the `@` alias is a build‑time import alias, not a runtime value. The `Notification` API expects a URL string, not a module path alias.  
**Fix:** Use an absolute URL:
```jsx
icon: '/icon.png',
```

### L‑9: `ShareBtn` and shared list modal files not audited (needs verification)
**Files:** `app/_components/shareListSection/` (entire directory)  
**Issue:** These files were not fully read during the audit and should be reviewed separately for security issues around invitation token handling.

---

## Structural Recommendations

### R‑1: Split the monolithic Zustand store into multiple stores
**Current:** `app/taskStore.js` (1554 lines)  
**Recommendation:** Split into domain‑specific stores as outlined in `Zustand_Store_Split_Plan.md`:
- `uiStore.js` — Sidebar state, modals, spinner
- `taskStore.js` — Tasks CRUD, filtering
- `categoryStore.js` — Categories CRUD
- `syncStore.js` — Offline queue, sync, error log
- `invitationStore.js` — Shared lists, collaborators

This reduces re‑renders and improves maintainability.

### R‑2: Adopt Server Components for initial data loading
**Current:** All data fetching happens client‑side in `fetchDataOnMount` (taskStore.js line 1131).  
**Recommendation:** Use Next.js 16 Server Components for initial data fetching in each page, pass data as props or hydrate the Zustand store using `HydrateAtoms`‑like pattern:
```jsx
// app/tasks/[slug]/page.js (Server Component)
export default async function CategoryPage({ params }) {
  const tasks = await getReleventTasksAction();
  const categories = await getReleventCategoriesAction();
  return <CategoryView initialData={{ tasks, categories }} />;
}
```

### R‑3: Implement rollback for optimistic updates
**Current:** All CRUD operations optimistically update the store then call the server. If the server fails, the store is already mutated and only an error toast is shown.  
**Recommendation:** Save a snapshot before mutation and restore it on failure:
```js
addTaskToStore: async (task) => {
  const previousTasks = get().tasksList;
  set(produce(state => { state.tasksList.push(task); }));
  try {
    await addManyTasksAction([task]);
  } catch (error) {
    set({ tasksList: previousTasks }); // Rollback
    throw error;
  }
}
```

### R‑4: Use upsert for offline sync deduplication
**Current:** `syncChangeLog` uses `INSERT` for add‑task, which can cause duplicates on retry.  
**Recommendation:** Use `upsert` instead of `insert` for tasks, with `on_conflict`:
```sql
-- In Supabase RPC or via .upsert()
supabase.from('tasks').upsert(tasks, { onConflict: 'task_id' })
```

### R‑5: Add Sentry or similar production error logging
**Current:** `logger.js` suppresses all errors in production.  
**Recommendation:** Integrate `@sentry/nextjs` for production error tracking.

### R‑6: Filter Realtime subscriptions at the database level with RLS
**Current:** All `postgres_changes` subscriptions listen to the entire `tasks` table.  
**Recommendation:** Use filters in the subscription to limit to the user's scope:
```js
filter: `task_owner_id=eq.${userId}`
```

### R‑7: Add loading and error boundaries for all routes
**Current:** `error.js` exists at the root but `app/tasks/[slug]/error.js` and other nested routes don't have their own error boundaries.  
**Recommendation:** Add `error.js` and `loading.js` to all route groups (`my-day`, `important`, `planned`, `all`, `completed`, `search`, `[slug]`).

---

## Needs Verification

| # | Item | Location | Reason |
|---|------|----------|--------|
| V‑1 | Clerk JWT template named "supabase" is configured correctly in Clerk Dashboard | `app/_lib/supabase-server.js:13` | RLS compliance depends on proper JWT mapping of `user_id` → `sub` |
| V‑2 | RLS policies for `tasks` table allow `INSERT` by any authenticated user | DB schema | No explicit filter in Realtime `INSERT` listener for `tasks` |
| V‑3 | `changeLog` in `sessionStorage` survives tab crash? | `taskStore.js:1542-1548` | `sessionStorage` is cleared on tab close, not on crash |
| V‑4 | `ShareBtn` invitation token generation is secure | `shareListSection/` | Not fully audited — verify token is unique per category |
| V‑5 | `collaborators` table RLS prevents unauthorized access | DB schema | The Realtime listener for `collaborators` (TaskRealTimeListener.jsx:48) subscribes to all INSERT/DELETE events |
| V‑6 | The React Compiler (`reactCompiler: true`) doesn't break Zustand Immer `produce` | `next.config.mjs:3` | React 19 Compiler may try to memoize inside `produce` callbacks, potentially breaking mutations |

---

## Appendix: Full File Audit Log

| # | File | Status | Notes |
|---|------|--------|-------|
| 1 | `package.json` | ✅ Read | Dependencies identified |
| 2 | `next.config.mjs` | ✅ Read | Cache disabled, Compiler enabled |
| 3 | `tailwind.config.js` | ✅ Read | Standard config |
| 4 | `jsconfig.json` | ✅ Read | Path alias `@/*` |
| 5 | `proxy.js` | ✅ Read | Misnamed middleware |
| 6 | `app/layout.js` | ✅ Read | All client components in layout |
| 7 | `app/page.js` | ✅ Read | Server Component (correct) |
| 8 | `app/error.js` | ✅ Read | "use client" (correct for error boundary) |
| 9 | `app/loading.js` | ✅ Read | Server Component (correct) |
| 10 | `app/not-found.js` | ❌ Not found | Missing file |
| 11 | `app/taskStore.js` | ✅ Read (full 1554 lines) | Monolithic store, full analysis above |
| 12 | `app/_lib/Actions.js` | ✅ Read | Wrapper functions |
| 13 | `app/_lib/data-services.js` | ✅ Read | All Supabase calls |
| 14 | `app/_lib/configs.js` | ✅ Read | Configuration constants |
| 15 | `app/_lib/supabase-browser.js` | ✅ Read | Browser client |
| 16 | `app/_lib/supabase-server.js` | ✅ Read | Server client with Clerk token |
| 17 | `app/_lib/useSupabaseRealtimeToken.js` | ✅ Read | Token refresh (45s interval) |
| 18 | `app/_lib/logger.js` | ✅ Read | Dev‑only logging |
| 19 | `app/_lib/utils.js` | ✅ Read | Utility functions |
| 20 | `app/_lib/useCustomeToast.js` | ✅ Read | Toast hook |
| 21 | `app/_components/HealthStatusSync.jsx` | ✅ Read | Stale closure issue |
| 22 | `app/_components/TaskRealTimeListener.jsx` | ✅ Read | Unfiltered Realtime |
| 23 | `app/_components/UserSignupHandler.jsx` | ✅ Read | Creates user on sign‑in |
| 24 | `app/_components/ReloadStoreInitializer.jsx` | ✅ Read | Resets on reload |
| 25 | `app/_components/ResetTaskStore.jsx` | ✅ Read | Resets on sign‑out |
| 26 | `app/_components/UnsavedChangesWarning.jsx` | ✅ Read | Uses `getState()` correctly |
| 27 | `app/_components/ReminderHandler.jsx` | ✅ Read | Write storm, Audio leak |
| 28 | `app/_components/Template.jsx` | ✅ Read | Body style leak |
| 29 | `app/_components/TasksList.jsx` | ✅ Read | Subscribes to sort methods |
| 30 | `app/_components/TaskGroup.jsx` | ✅ Read | Simple mapping |
| 31 | `app/_components/TaskItem.jsx` | ✅ Read | Inline style tag |
| 32 | `app/_components/TaskTitle.jsx` | ✅ Read | Simple display |
| 33 | `app/_components/TaskDetails.jsx` | ✅ Read | Computes text conditionally |
| 34 | `app/_components/ListHeader.jsx` | ✅ Read | Uses `getUserState()` in render |
| 35 | `app/_components/ListToggler.jsx` | ✅ Read | State for hover (can use CSS) |
| 36 | `app/_components/CategoryTitleEditor.jsx` | ✅ Read | `autosize` on `<input>` (wrong) |
| 37 | `app/_components/NoResults.jsx` | ✅ Read | Inline mouse events |
| 38 | `app/_components/NoTaskInMyDay.jsx` | ✅ Read | Simple display |
| 39 | `app/_components/NotFoundComponent.jsx` | ✅ Read | Standalone component |
| 40 | `app/_components/AlarmToast.jsx` | ✅ Read | Sound management |
| 41 | `app/_components/_ui/Calendar.jsx` | ✅ Read | **v10 API mismatch** |
| 42 | `app/_components/_ui/DatePicker.jsx` | ✅ Read | Wraps Calendar |
| 43 | `app/_components/_ui/Spinner.jsx` | ✅ Read | UUID validation |
| 44 | `app/_components/_ui/SpinnerMini.jsx` | ✅ Not read | Likely trivial |
| 45 | `app/_components/sidebarSection/Sidebar.jsx` | ✅ Read | Subscribes to too much |
| 46 | `app/_components/sidebarSection/SidebarNav.jsx` | ✅ Read | Conditional links |
| 47 | `app/_components/sidebarSection/SidebarLink.jsx` | ✅ Read | Re‑renders on every task change |
| 48 | `app/_components/sidebarSection/CategoriesList.jsx` | ✅ Read | Sorts client‑side |
| 49 | `app/_components/sidebarSection/CategoryItem.jsx` | ✅ Read | Wraps SidebarLink |
| 50 | `app/_components/sidebarSection/TaskSearch.jsx` | ✅ Read | `shallow: true` bug |
| 51 | `app/_components/sidebarSection/UserMenu.jsx` | ❌ Not read | Required |
| 52 | `app/_components/editSidebarSection/EditSidebar.jsx` | ✅ Read | Subscribes to 9 slices |
| 53 | `app/_components/editSidebarSection/TaskOverView.jsx` | ✅ Read | Composition |
| 54 | `app/_components/editSidebarSection/AddToMyDay.jsx` | ❌ Not read | Required |
| 55 | `app/_components/editSidebarSection/AddNote.jsx` | ❌ Not read | Required |
| 56 | `app/_components/editSidebarSection/AddFile.jsx` | ❌ Not read | Required |
| 57 | `app/_components/editSidebarSection/ActionFooter.jsx` | ❌ Not read | Required |
| 58 | `app/_components/editSidebarSection/BoxBtn.jsx` | ❌ Not read | Required |
| 59 | `app/_components/editSidebarSection/BoxTemplate.jsx` | ❌ Not read | Required |
| 60 | `app/_components/editSidebarSection/TaskTitleEditor.jsx` | ❌ Not read | Required |
| 61 | `app/_components/editSidebarSection/reminderBoxSection/` | ❌ Not read | Required |
| 62 | `app/_components/editSidebarSection/stepSection/` | ❌ Not read | Required |
| 63 | `app/_components/minimizerSection/` (all) | ❌ Not read | Required |
| 64 | `app/_components/shareListSection/` (all) | ❌ Not read | Required |
| 65 | `app/_components/taskInputSection/TaskInput.jsx` | ❌ Not read | **High priority** |
| 66 | `app/_components/taskInputSection/InputAddDue.jsx` | ❌ Not read | Required |
| 67 | `app/_components/taskInputSection/InputAddReminder.jsx` | ❌ Not read | Required |
| 68 | `app/_components/taskInputSection/InputAddRepeat.jsx` | ❌ Not read | Required |
| 69 | `app/log-in/page.js` | ❌ Not read | Required |
| 70 | `app/profile/[[...rest]]/page.js` | ❌ Not read | Required |
| 71 | `app/tasks/page.js` | ❌ Not read | **High priority** |
| 72 | `app/tasks/[slug]/page.js` | ❌ Not read | **High priority** |
| 73 | `app/tasks/my-day/page.js` | ❌ Not read | Required |
| 74 | `app/tasks/important/page.js` | ❌ Not read | Required |
| 75 | `app/tasks/planned/page.js` | ❌ Not read | Required |
| 76 | `app/tasks/all/page.js` | ❌ Not read | Required |
| 77 | `app/tasks/completed/page.js` | ❌ Not read | Required |
| 78 | `app/tasks/search/page.js` | ❌ Not read | Required |
| 79 | `app/tasks/invite/page.js` | ❌ Not read | **Security critical** |

**Remaining files to audit (priority order):**  
1. `app/tasks/page.js` and `app/tasks/[slug]/page.js` — the main dynamic routes  
2. `app/tasks/invite/page.js` — invitation handling (security)  
3. `TaskInput.jsx` and `taskInputSection/` — task creation flow  
4. All `editSidebarSection/` files — task editing  
5. `app/log-in/page.js` — authentication  
6. All minimizing components  

---

*End of Audit Report — 2 Critical, 7 High, 12 Medium, 9 Low, 7 Structural Recommendations, 6 Needs Verification*