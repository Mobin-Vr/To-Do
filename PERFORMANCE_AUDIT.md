# Performance & Bug Audit — 2026-07-08

## Summary
The codebase is structurally well-organized with clear separation of concerns (Zustand store, Server Actions, Supabase data layer). However, it has several critical correctness issues — including a missing component file that will crash at runtime, a stale closure in the real-time listener that breaks shared-list functionality, and a logic bug in the category deletion path. Database performance is hampered by N+1 query patterns in critical RPCs and a complete lack of indexes on frequently-filtered columns. The top 3 most urgent issues are: (1) the missing `InvitationLanding.jsx` file, (2) the stale `relevantInvitationIds` closure in `TaskRealTimeListener`, and (3) the N+1 pattern in `get_relevent_tasks` RPC.

---

## 🔴 Critical (bugs, correctness, or major performance impact)

### Bugs

- [ ] **Missing component file crashes invite page** — `app/tasks/invite/page.js:1`
  - Issue: Imports `InvitationLanding` from `@/app/_components/shareListSection/InvationLanding`, but the file does not exist (read attempt returned "File not found").
  - Impact: The `/tasks/invite?token=...` page will crash with a module-not-found error at runtime. Users cannot join shared lists.
  - Suggested fix: Create the missing file or correct the import path.

- [ ] **Stale closure in real-time listener** — `app/_components/TaskRealTimeListener.jsx:47-50`
  - Issue: `relevantInvitationIds` is computed once at render time from `getInvitations()` and `getSharedWithMe()`, but the `useEffect` on line 52 has an empty dependency array `[]`. When the user joins or leaves a shared list, the listener continues filtering against the stale ID set.
  - Impact: After joining a new shared list, the user won't receive real-time updates for that list until page reload. After leaving, they may still receive updates.
  - Suggested fix: Move `relevantInvitationIds` computation inside the `useEffect` or add appropriate dependencies. Alternatively, check relevance inside each handler using fresh calls to `getInvitations()`/`getSharedWithMe()`.

- [ ] **`deleteCategoryFromStore` finds wrong category** — `app/taskStore.js:424`
  - Issue: Line 424 reads `const category = state.categoriesList.find((cat) => cat.category_id !== id)`. This finds a category whose ID does **not** match the one being deleted. It should use `=== id`.
  - Impact: The offline change-log logic uses the wrong category object. The wrong category's tasks may be removed from the local store, and the wrong category ID is recorded in the change log for later sync.
  - Suggested fix: Change `!==` to `===` on line 424.

- [ ] **`invitation_leave` RPC references nonexistent column** — `db_schema_backup.sql:233-257`
  - Issue: The function parameter is named `invitation_token` (a UUID), and the SELECT query uses `WHERE token = invitation_token`. The `invitations` table has no `token` column — the primary key is `invitation_id`.
  - Impact: This RPC will always fail with a column-not-found error. Users cannot leave shared lists via the database function.
  - Suggested fix: Rename the parameter to `invitation_id` and change the WHERE clause to `WHERE invitation_id = invitation_id`.

### Performance (Database)

- [ ] **N+1 query pattern in `get_relevent_tasks` RPC** — `db_schema_backup.sql:261-303`
  - Issue: Uses a `FOR` loop over collaborators (line 277-293), executing a separate `SELECT * FROM tasks` for each invitation the user belongs to. This is an N+1 pattern where N = number of shared invitations.
  - Impact: For users with many shared lists, this generates N+1 queries instead of 1-2. Performance degrades linearly with shared list count.
  - Suggested fix: Replace the loop with a single JOIN query: `SELECT t.* FROM tasks t JOIN invitations i ON t.task_category_id = i.invitation_category_id JOIN collaborators c ON i.invitation_id = c.invitation_id WHERE c.user_id = param_user_id UNION SELECT * FROM tasks WHERE task_owner_id = param_user_id`.

- [ ] **Missing database indexes on frequently-queried columns** — `db_schema_backup.sql`
  - Issue: No indexes exist on any of the following columns that are used in WHERE, JOIN, or ORDER BY clauses:
    - `tasks.task_category_id` (JOIN with categories, filtered in UI)
    - `tasks.task_owner_id` (primary filter in `get_relevent_tasks`)
    - `tasks.task_due_date` (sorted/filtered in Planned view)
    - `tasks.is_task_completed` (filtered in all views)
    - `tasks.is_task_starred` (filtered in Important view)
    - `tasks.is_task_in_myday` (filtered in My Day view)
    - `invitations.invitation_category_id` (JOIN with categories)
    - `invitations.invitation_owner_id` (filtered in `get_owner_invitations`)
    - `collaborators.user_id` (primary filter in `get_joined_invitations`, `get_relevent_tasks`)
    - `collaborators.invitation_id` (JOIN with invitations)
  - Impact: All queries perform sequential scans. As data grows, query times will increase linearly. The `get_relevent_tasks` RPC with its temp table will be especially slow.
  - Suggested fix: Add indexes on all foreign key and frequently-filtered columns. At minimum: `CREATE INDEX idx_tasks_owner ON tasks(task_owner_id); CREATE INDEX idx_tasks_category ON tasks(task_category_id); CREATE INDEX idx_collaborators_user ON collaborators(user_id); CREATE INDEX idx_invitations_owner ON invitations(invitation_owner_id);`

---

## 🟠 High (noticeable performance cost or risk of bugs)

### Performance

- [ ] **`sortTasks` runs on every render without memoization** — `app/_lib/utils.js:103-130` (called from `app/_components/minimizerSection/DefaultMinimizer.jsx:16-17`)
  - Issue: `sortTasks` creates a sorted copy of the tasks array on every render. It's called twice (for completed and uncompleted tasks). No `useMemo` wrapper.
  - Impact: For lists with hundreds of tasks, this creates and sorts large arrays on every state change (e.g., toggling a task's star). Causes unnecessary GC pressure and layout delay.
  - Suggested fix: Wrap the sorted arrays in `useMemo` with `[tasks, sortMethod]` dependencies.

- [ ] **`categorizePlannedTasks` runs on every render** — `app/_lib/utils.js:199-226` (called from `app/_components/minimizerSection/PlannedMinimizer.jsx:10`)
  - Issue: Iterates all tasks and categorizes them into past/today/future on every render. No memoization.
  - Impact: Same as above — unnecessary work on every state change.
  - Suggested fix: Wrap in `useMemo` with `[tasks]` dependency.

- [ ] **`AllMinimizer` filters tasks multiple times in render body** — `app/_components/minimizerSection/AllMinimizer.jsx:11-17, 36-48`
  - Issue: Filters `tasks` to get `defaultTasks` and `customTasks`, then inside `.map()` filters again for each category. No memoization.
  - Impact: For users with many categories, tasks are filtered O(n*m) times on every render.
  - Suggested fix: Pre-compute a Map of `categoryId -> tasks` using `useMemo`.

- [ ] **`TaskItem` not wrapped in `React.memo`** — `app/_components/TaskItem.jsx`
  - Issue: Every `TaskItem` re-renders whenever the parent `TaskGroup` re-renders, even if the individual task's data hasn't changed.
  - Impact: In a list of 100 tasks, toggling one task's star causes all 100 `TaskItem` components to re-render.
  - Suggested fix: Wrap `TaskItem` in `React.memo` with a custom comparator that checks `task.task_id`, `task.is_task_completed`, `task.is_task_starred`, and `task.task_title`.

- [ ] **`TaskDetails` re-renders with every `TaskItem` re-render** — `app/_components/TaskDetails.jsx`
  - Issue: No `React.memo`. Computes text, step counts, and date formatting on every render.
  - Impact: Unnecessary computation on every parent re-render.
  - Suggested fix: Wrap in `React.memo`.

- [ ] **`CategoryTitleEditor` calls `autosize` in render body** — `app/_components/CategoryTitleEditor.jsx:27`
  - Issue: `autosize(textareaRef.current)` is called directly in the component body (not in a `useEffect`). This runs on every render, including initial mount before the ref is attached.
  - Impact: On initial render, `textareaRef.current` is `null`, so `autosize(null)` is called. On every subsequent render, autosize re-processes the textarea unnecessarily.
  - Suggested fix: Move to a `useEffect` with `[]` dependency, and call `autosize.update()` in a separate `useEffect` when `currentTitle` changes.

- [ ] **`HealthStatusSync` calls `syncChangeLog()` without awaiting** — `app/_components/HealthStatusSync.jsx:45`
  - Issue: `syncChangeLog()` is an async function but is called without `await` inside `syncData`. The `syncData` callback is `useCallback`-memoized, but the actual sync operation may not complete before the next interval or event trigger.
  - Impact: If the user comes online and immediately goes offline, the sync may be interrupted mid-operation. The `isSyncing` flag may not be properly managed.
  - Suggested fix: Add `await` before `syncChangeLog()`.

### Bugs

- [ ] **Race condition in `handleActiveTaskSidebar`** — `app/taskStore.js:1440-1474`
  - Issue: When clicking a different task while the edit sidebar is open, the function: (1) sets `isEditSidebarOpen = false` and `activeTask = null`, (2) awaits `delay(200)`, (3) sets `activeTask` and `isEditSidebarOpen = true` again. During the 200ms delay, other code or re-renders may read the intermediate state where `activeTask` is `null`.
  - Impact: Components that depend on `activeTask` (like `EditSidebar`) may briefly render with `null`, potentially causing errors or flash-of-empty state.
  - Suggested fix: Instead of toggling off and on with a delay, directly update `activeTask` to the new task. The animation can be handled via CSS transitions on the sidebar itself.

- [ ] **Hardcoded production URL in invitation links** — `app/_lib/utils.js:243`
  - Issue: `getInvitationLink` uses `https://ms-todo100.vercel.app` as the base URL in production. If the app is deployed to a different domain, invitation links will point to the wrong site.
  - Impact: Broken invitation links on any non-Vercel deployment.
  - Suggested fix: Use `process.env.NEXT_PUBLIC_BASE_URL` for both development and production, and set the env var appropriately in each deployment.

- [ ] **Notification icon path is not browser-accessible** — `app/_components/ReminderHandler.jsx:118`
  - Issue: `icon: "@/app/icon.png"` uses a Next.js module path alias, which is not resolved by the browser's Notification API. The browser will try to fetch `@/app/icon.png` as a literal URL path.
  - Impact: Desktop notifications will show no icon or a broken image.
  - Suggested fix: Use a public URL path like `/icon.png` (the file is at `app/icon.png` which Next.js serves at `/icon.png`).

### Database

- [ ] **`getUserByEmail` silently swallows errors** — `app/_lib/data-services.js:33-41`
  - Issue: Uses `const { data } = await supabase...` without destructuring or checking `error`. If the query fails, `data` is `null` and the function returns `undefined` silently.
  - Impact: Downstream code (`UserSignupHandler.jsx:35`) checks `if (!existingUser)` — a database error is indistinguishable from "user not found". A new user record would be created even if the DB is having issues, potentially causing duplicate-key errors later.
  - Suggested fix: Destructure `error` and throw if present, consistent with all other data-service functions.

---

## 🟡 Medium (worth fixing, not urgent)

### Performance

- [ ] **`Sidebar` subscribes to full `tasksList` and `categoriesList` arrays** — `app/_components/sidebarSection/Sidebar.jsx:32-33`
  - Issue: The sidebar selects the entire `tasksList` and `categoriesList` arrays. Any change to any task or category (e.g., toggling a star, updating a title) causes the entire sidebar to re-render.
  - Impact: Unnecessary re-renders of the sidebar (including nav, categories list, user menu) on every task/category mutation.
  - Suggested fix: Select only the specific data the sidebar needs (e.g., category count, category names/IDs) rather than the full arrays.

- [ ] **`EditSidebar` subscribes to full `tasksList`** — `app/_components/editSidebarSection/EditSidebar.jsx:30`
  - Issue: The entire `tasksList` is selected just to find the updated version of `activeTask` (line 51-55).
  - Impact: The edit sidebar re-renders on every task change, even unrelated ones.
  - Suggested fix: Instead of subscribing to the full list, update `activeTask` directly in the store's mutation functions (e.g., `updateTaskInStore` could also update `activeTask` if it matches).

- [ ] **`framer-motion` `AnimatePresence` for simple fade animation** — `app/_components/taskInputSection/TaskInput.jsx:126-155`
  - Issue: `AnimatePresence` + `motion.div` is used to animate the appearance of 3 small icon buttons. This is a simple opacity/translateY animation.
  - Impact: `framer-motion` adds ~30KB to the client bundle. Using it for trivial animations is disproportionate.
  - Suggested fix: Replace with CSS transitions (`transition-opacity`, `transition-transform`) and conditional rendering.

- [ ] **`react-icons` dependency adds bundle weight** — `package.json:37`
  - Issue: `react-icons` is listed as a dependency alongside `lucide-react`. Both are icon libraries. `react-icons` is known for poor tree-shaking and large bundle impact.
  - Impact: Unnecessary duplicate icon library. Increases initial JS bundle size.
  - Suggested fix: Consolidate on `lucide-react` (already a dependency) and remove `react-icons`.

### Architecture

- [ ] **Duplicated error-logging pattern across ~15 store methods** — `app/taskStore.js` (multiple locations)
  - Issue: The same 15-line error-handling block (check duplicate, push to `errorLog`, sync to DB if online) is repeated in virtually every store method. This is a DRY violation.
  - Impact: Maintenance burden — any change to error handling must be replicated 15 times. Inconsistencies are likely.
  - Suggested fix: Extract into a helper function like `logError(method, message)` that handles deduplication and DB sync.

- [ ] **Inconsistent state access pattern: getter functions vs direct selectors** — `app/taskStore.js:951-962, 1532-1547`
  - Issue: Some state is accessed via getter functions (`getCategoriesList()`, `getInvitations()`, `getTaskList()`) while most is accessed via direct selectors. The getters return `null` for empty arrays, which callers must handle.
  - Impact: Inconsistent patterns across components. Some components use getters, others use direct selectors. The `null`-vs-empty-array distinction adds cognitive load.
  - Suggested fix: Remove getter functions and use direct selectors consistently. Components that need to check for emptiness can use `.length`.

- [ ] **`getUserState` called in render of multiple components** — `app/_components/sidebarSection/Sidebar.jsx:35`, `app/_components/ListHeader.jsx:30`
  - Issue: `getUserState()` returns the full user object. Components that only need `user_id` re-render on any user state change (e.g., name, email).
  - Impact: Unnecessary re-renders.
  - Suggested fix: Select only the needed field: `useTaskStore((state) => state.userState.user_id)`.

### Bugs

- [ ] **`Weekdays` repeat type incorrectly adds 7 days** — `app/_lib/utils.js:173-175`
  - Issue: `case "Weekdays": newDate.setDate(newDate.getDate() + 7)` — This adds 7 days, which is identical to `Weekly`. For a "Weekdays" repeat, the intent is likely to advance to the next weekday (add 1 day, skipping weekends).
  - Impact: Tasks with "Weekdays" repeat behave identically to "Weekly" repeat.
  - Suggested fix: Implement proper weekday logic: add 1 day, and if the result falls on a weekend, advance to Monday.

- [ ] **Leftover `console.log` in production code** — `app/_lib/utils.js:143`, `app/_lib/data-services.js:277`
  - Issue: `replaceTimeInIsoDate` logs `console.log(inputDate)` on every call. `checkDatabaseHealth` logs `console.log(data)` on every health check.
  - Impact: Console noise in production. Minor information disclosure (dates, DB status).
  - Suggested fix: Remove `console.log` statements or gate them behind `process.env.NODE_ENV === "development"`.

---

## 🟢 Low / Nice-to-have

### Performance

- [ ] **`NoResults.jsx` uses inline event handlers for hover styling** — `app/_components/NoResults.jsx:48-53`
  - Issue: `onMouseEnter`/`onMouseLeave` with `useState`-like inline style changes (actually direct DOM mutation via `e.target.style`). Causes re-render on hover.
  - Impact: Minor — one button, infrequent interaction.
  - Suggested fix: Use CSS `:hover` pseudo-class with Tailwind's `hover:` prefix.

- [ ] **`ListToggler.jsx` uses `useState` for hover background** — `app/_components/ListToggler.jsx:11`
  - Issue: Manages hover state with `useState` and `onMouseEnter`/`onMouseLeave` instead of CSS `:hover`.
  - Impact: Each `ListToggler` re-renders on hover. Minor for a single toggler, but there can be many in the "All" and "Planned" views.
  - Suggested fix: Replace with Tailwind `hover:` classes.

### Architecture / Maintainability

- [ ] **`logger.js` suppresses all logging in production** — `app/_lib/logger.js`
  - Issue: All log levels (including `error`) are gated behind `process.env.NODE_ENV === "development"`. In production, errors are silently swallowed (unless they reach the store's error-logging path).
  - Impact: Debugging production issues is harder. The `logger.error()` calls throughout the codebase are no-ops in production.
  - Suggested fix: Allow `logger.error()` to always log. Consider using a proper logging service for production.

- [ ] **`babel-plugin-react-compiler` in `dependencies` instead of `devDependencies`** — `package.json:21`
  - Issue: This is a Babel plugin (build-time tool) listed in runtime dependencies.
  - Impact: Increases production bundle size unnecessarily (though likely tree-shaken). Misleading dependency categorization.
  - Suggested fix: Move to `devDependencies`.

- [ ] **`gzip-cli` in `dependencies` instead of `devDependencies`** — `package.json:26`
  - Issue: CLI tool for compression, not a runtime dependency.
  - Impact: Same as above.
  - Suggested fix: Move to `devDependencies`.

- [ ] **`raw-loader` in `devDependencies` — likely unused** — `package.json:51`
  - Issue: `raw-loader` is a webpack loader. Next.js 16 uses Turbopack (as configured in `package.json` scripts), which does not use webpack loaders. This loader is likely dead code.
  - Impact: Unnecessary dev dependency. May cause confusion.
  - Suggested fix: Remove if not explicitly used in a custom webpack config (there is none in `next.config.mjs`).

- [ ] **`UnsavedChangesWarning` may not trigger browser warning** — `app/_components/UnsavedChangesWarning.jsx:16`
  - Issue: `e.preventDefault()` is called but no `returnValue` string is set on the event. Some browsers require `e.returnValue = ''` (deprecated but still used) or may not show the warning at all.
  - Impact: Users may not be warned about unsaved changes when closing the tab.
  - Suggested fix: Set `e.returnValue = ''` in addition to `e.preventDefault()`.

- [ ] **`proxy.js` at project root — undocumented** — `proxy.js`
  - Issue: A `proxy.js` file exists at the project root. Its purpose is unclear (likely a development proxy for Supabase or Clerk).
  - Impact: Unclear purpose, may be dead code.
  - Suggested fix: Document its purpose or remove if unused.

---

## Needs Verification

- [ ] **`react-day-picker` v10 migration completeness** — The project uses `react-day-picker@^10.0.1` (package.json:34). The v8→v10 migration involves significant API changes (new component API, CSS modules, locale handling). I did not find any direct imports of `react-day-picker` in the files reviewed, which suggests it may be used in the `reminderBoxSection` or `InputAddDue`/`InputAddReminder` components that I did not fully read. Verify that all date-picker usages are updated to the v10 API and that no v8 patterns remain.

- [ ] **`next.config.mjs` has `cacheComponents: false`** — `next.config.mjs:4`
  - Issue: This flag disables React component caching. This may have been set during the Next.js 16 migration as a workaround. If so, it should be removed once the migration is stable, as it disables a key performance feature.
  - Impact: Disables React Server Component caching, potentially increasing server response times.
  - Suggested fix: Verify if this is still needed. If not, remove it.

- [ ] **`reactCompiler: true` in `next.config.mjs`** — `next.config.mjs:3`
  - Issue: The React Compiler (formerly "React Forget") is enabled. This is an experimental feature that auto-memoizes components. It may conflict with or mask the manual memoization issues listed above.
  - Impact: The compiler may not catch all cases, and may have bugs in Next.js 16. Manual memoization issues may be partially mitigated but not fully.
  - Suggested fix: Verify that the React Compiler is working correctly with this codebase. Test that it doesn't introduce regressions.

- [ ] **`p-queue` dependency usage** — `package.json:32`
  - Issue: `p-queue` is listed as a dependency but I did not find any imports of it in the files reviewed. It may be used in unread files (e.g., `shareListSection`, `reminderBoxSection`).
  - Impact: If unused, it's dead weight in the bundle.
  - Suggested fix: Verify usage and remove if unused.

- [ ] **`jsonwebtoken` and `jwks-rsa` dependencies** — `package.json:28-29`
  - Issue: These JWT libraries are listed but I did not find imports in the reviewed files. They may be used in the `shareListSection` for invitation token verification, or may be leftover from a previous auth implementation.
  - Impact: If unused, they add unnecessary dependencies and potential security surface.
  - Suggested fix: Verify usage and remove if unused (Clerk handles JWT verification natively).

- [ ] **`immer` usage with Zustand** — `app/taskStore.js` (throughout)
  - Issue: The store uses `produce` from `immer` for all state updates. Zustand 5 supports both immer and direct mutation patterns. Using immer adds overhead for every state update.
  - Impact: Each state update goes through immer's proxy-based immutability system, which has non-trivial overhead for large arrays like `tasksList`.
  - Suggested fix: Consider using Zustand's built-in immutability (spread operators) for simple updates, reserving immer for deeply nested updates.