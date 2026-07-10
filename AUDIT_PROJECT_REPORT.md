# AUDIT REPORT – UNRESOLVED ISSUES

**Microsoft To Do Clone** (Next.js 16 / React 19 / Clerk / Supabase / Zustand)

---

## High Priority (Skipped)

### H‑4: Race condition in offline sync — partial failure can cause duplicates

**File:** `app/taskStore.js`, lines 1287‑1382 (`syncChangeLog`)  
**Issue:** Sync processes ADD → UPDATE → DELETE sequentially. If ADD succeeds but UPDATE fails, the entire `changeLog` remains, and on retry the already-added tasks will be inserted again, potentially causing duplicates.  
**Fix:** Either use upsert semantics or mark individual entries as synced instead of clearing the entire log.

---

## Medium Priority (Skipped)

### M‑1: `sessionStorage` quota may be exceeded

**File:** `app/taskStore.js`, lines 1542‑1548  
**Issue:** The `partialize` function persists the whole `changeLog` array to `sessionStorage`. A large log can exceed the 5‑10 MB limit. Also, `sessionStorage` is lost when the tab closes.  
**Fix:** Cap the number of stored entries (e.g., `slice(-500)`) and consider `localStorage` for cross-session persistence.

### M‑4: Realtime subscriptions are unfiltered

**File:** `app/_components/TaskRealTimeListener.jsx`, lines 31‑33  
**Issue:** The channel for `tasks` has no explicit filter (`filter: undefined`). Even though RLS protects rows, all INSERT events are sent to the client, wasting bandwidth.  
**Fix:** Add a filter for the current user, e.g., `filter: task_owner_id=eq.${userId}` (must account for collaboration).

### M‑6: `autosize` library used on a single‑line `<input>`

**File:** `app/_components/CategoryTitleEditor.jsx`, lines 29‑32, 80  
**Issue:** The component renders `<input type="text">` but imports and applies `autosize`, which is designed for `<textarea>` elements. The library is useless here and may cause console errors.  
**Fix:** Remove the `autosize` import; if multiline editing is needed, switch to `<textarea>`.

---

## Low Priority (Skipped)

### L‑4: Misnamed middleware file

**File:** `proxy.js` (project root)  
**Issue:** The file is named `proxy.js` but exports `clerkMiddleware`. The Next.js convention is `middleware.js` (or `.ts`).  
**Fix:** Rename the file to `middleware.js`.

---

## Structural Recommendations (Not Implemented)

### R‑3: Rollback for optimistic updates

**Issue:** Mutations optimistically update the Zustand store, but on server failure the store is not rolled back; only an error toast is shown.  
**Recommendation:** Save a snapshot before mutation and restore it in the catch block.

### R‑4: Use upsert for offline sync deduplication

**Issue:** The sync logic uses `INSERT` for new tasks, which can cause duplicates on retry.  
**Recommendation:** Use Supabase’s `.upsert()` with `onConflict: 'task_id'`.

### R‑5: Production error logging

**Issue:** `logger.js` suppresses errors in production.  
**Recommendation:** Integrate a service like Sentry for production error tracking.

### R‑7: Error/loading boundaries for all route groups

**Issue:** Only the root `error.js` exists; nested routes (e.g., `tasks/[slug]`) lack their own `error.js` and `loading.js`.  
**Recommendation:** Add `error.js` and `loading.js` to all route folders.

---

## Needs Verification

| #   | Item                                                                              | Location                         |
| --- | --------------------------------------------------------------------------------- | -------------------------------- |
| V‑1 | Clerk JWT template “supabase” configured correctly                                | `app/_lib/supabase-server.js:13` |
| V‑2 | RLS policies on `tasks` allow `INSERT` by any authenticated user                  | Database schema                  |
| V‑3 | `changeLog` in `sessionStorage` survives tab crash?                               | `taskStore.js:1542-1548`         |
| V‑4 | Invitation token generation is secure                                             | `shareListSection/`              |
| V‑5 | `collaborators` table RLS prevents unauthorized access                            | Database schema                  |
| V‑6 | React Compiler (`reactCompiler: true`) is compatible with Zustand Immer `produce` | `next.config.mjs:3`              |

---

## Remaining Files to Audit (Not Reviewed)

1. `app/tasks/page.js` and `app/tasks/[slug]/page.js` – main dynamic routes
2. `app/tasks/invite/page.js` – invitation handling (security)
3. `TaskInput.jsx` and `taskInputSection/` – task creation flow
4. `editSidebarSection/` files – task editing
5. `app/log-in/page.js` – authentication
6. Minimizing components
