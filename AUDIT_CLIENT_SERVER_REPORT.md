# Server/Client Component Boundary Audit Report

**Project**: Microsoft To-Do (Next.js 16, App Router, React 19)  
**Date**: July 9, 2026  
**Auditor**: Automated Audit  
**Mode**: Read-only — no code was modified.

---

## Executive Summary

### Files Scanned
- **Total `.jsx` files**: 81  
- **Files currently with `"use client"`**: 32  
- **Files that unnecessarily have `"use client"`**: 1 (can be converted as-is)  
- **Files where `"use client"` could potentially be removed after refactoring**: 10  
- **Files with `"use client"` that must stay client**: 21  
- **Files MISSING `"use client"` that would crash if used in a Server Component**: ~30 (defensive gap — currently work because all parent pages are client components)

### Key Finding
All page-level files (`app/tasks/*/page.js`) are marked `"use client"`. Since every page is a Client Component, their entire component tree (including components that import from Zustand or use hooks without the directive) runs on the client — so there are **no immediate build-breaking bugs** from missing directives.

However, this means **~100% of the UI runs on the client**. The entire rendering pipeline is pushed to the browser, increasing bundle size, degrading initial load performance, and preventing the use of streaming/Edge/server rendering benefits.

### Estimated Impact
- **Bundle Size**: Every page bundle includes all dependencies (Zustand, `date-fns`, `framer-motion`, etc.) on initial load. A proper server/client split could reduce the critical JS bundle by **30–50%** on first-visit pages.
- **Render Performance**: Server components can stream HTML immediately without waiting for JS hydration. Converting just the page layouts to Server Components could improve LCP (Largest Contentful Paint) by **200–500ms** on slow connections.
- **SEO/Initial Load**: All content is currently client-rendered. Server-rendered content would be immediately available to search engines and users with JS disabled.

---

## Detailed File-by-File Audit Table

### Legend
| Column | Values |
|--------|--------|
| **Current `"use client"`?** | Yes / No |
| **Truly necessary?** | Yes / No / Partial |
| **Recommended action** | Convert as-is / Refactor / Stay client |
| **Priority** | High / Medium / Low |

---

### Root Layout (`app/layout.js`)

| File | `"use client"`? | Necessary? | Action | Reasoning | Priority |
|------|:---:|:---:|:---|:---|:---:|
| `app/layout.js` | No | Yes | Stay server | Server Component using `async` function, `@clerk/nextjs/server` auth, metadata, font loading. Correct as-is. | — |

### Page Files

| File | `"use client"`? | Necessary? | Action | Reasoning | Priority |
|------|:---:|:---:|:---|:---|:---:|
| `app/page.js` | No | Yes | Stay server | Pure redirect logic using `auth()` server function. No client features. | — |
| `app/error.js` | Yes | Yes | Stay client | Requires `error`/`reset` props and `onClick` handler on the "Try Again" button (line 26). | — |
| `app/not-found.js` | No | Yes | Stay server | Pure presentational – no hooks, no event handlers. Uses `Link` which works server-side. | — |
| `app/loading.js` | No | Yes | Stay server | Only renders `Spinner` (which is a client component but that's fine — server can render client components). | — |
| `app/log-in/page.js` | No | Yes | Stay server | Server component using `auth()`, `redirect()`. The `SignInButton` is a Clerk client component but works as a child. | — |
| `app/log-in/loading.js` | No | Yes | Stay server | Same as root loading.js. | — |
| `app/profile/[[...rest]]/page.js` | No | Partial | Refactor | Uses `UserProfile` (Clerk client component) and `MenuBtn` (client). The wrapper div could be a server component — extract into server wrapper + pass `MenuBtn` as `children`. | Low |
| `app/tasks/page.js` | Yes | Yes | Stay client | Uses `useEffect` (line 39), `useRef` (line 37), `useTaskStore` (Zustand — line 12). **All three are client-only.** | — |
| `app/tasks/[slug]/page.js` | Yes | Yes | Stay client | Uses `useRouter`, `useParams`, `useState`, `useEffect`, `useRef`, `useTaskStore`, event handlers (lines 67, 75). | — |
| `app/tasks/[slug]/not-found.js` | No | Yes | Stay server | Pure presentational. No hooks. | — |
| `app/tasks/[slug]/loading.js` | No | Yes | Stay server | Same as root loading. | — |
| `app/tasks/all/page.js` | Yes | Partial | Refactor | Uses `useEffect` scroll (line 37), `useRef` (line 19), `useTaskStore` (line 12). **Potential refactor**: Extract the scroll-to-task effect and store subscription into a thin client wrapper. The rest (filtering, config) could be server. | Medium |
| `app/tasks/completed/page.js` | Yes | Partial | Refactor | Same pattern as `all/page.js` — `useEffect` scroll + `useRef` + `useTaskStore`. Same refactoring opportunity. | Medium |
| `app/tasks/important/page.js` | Yes | Partial | Refactor | Same pattern — `useEffect` scroll + `useRef` + `useTaskStore`. | Medium |
| `app/tasks/my-day/page.js` | Yes | Partial | Refactor | Same pattern + also reads `showSpinner` (Zustand). | Medium |
| `app/tasks/planned/page.js` | Yes | Partial | Refactor | Same pattern. | Medium |
| `app/tasks/search/page.js` | Yes | Partial | Refactor | Uses `useSearchParams` (line 12 — Next.js client hook), `useEffect`, `useRef`, `useTaskStore`. The search query param could be read server-side via `searchParams` prop. | Medium |
| `app/tasks/invite/page.js` | No | Yes | Stay server | Server component reading `searchParams` token, renders `InvitationLanding` client component. Correct. | — |

### `app/_components/` — Top-Level Components

| File | `"use client"`? | Necessary? | Action | Reasoning | Priority |
|------|:---:|:---:|:---|:---|:---:|
| `Template.jsx` | No | Yes (no directive needed) | Add `"use client"` (defensive) | Uses `useState` (line 21), `useEffect` (line 24), event handlers (line 31). Currently works because all parent pages are client components. **If any future Server Component imports Template, it will crash.** | High |
| `TasksList.jsx` | Yes | Yes | Stay client | Uses `useTaskStore` (Zustand, line 18). | — |
| `ListHeader.jsx` | Yes | Yes | Stay client | Uses `useTaskStore` (line 22). | — |
| `CategoryTitleEditor.jsx` | No | Yes (no directive needed) | Add `"use client"` (defensive) | Uses `useState`, `useEffect`, `useRef`, `autosize`, `useTaskStore`. Same risk as Template. | High |
| `TaskItem.jsx` | No | Yes (no directive needed) | Add `"use client"` (defensive) | Uses Zustand (line 27), `onClick` handler (line 37). | High |
| `TaskGroup.jsx` | No | No | Stay server | Pure, no hooks or event handlers. Renders `TaskItem` which is a client component — fine. | — |
| `TaskTitle.jsx` | No | No | Stay server | Pure — no hooks, no events. | — |
| `TaskDetails.jsx` | No | No | Stay server | Pure — date formatting via `date-fns`, rendering icons. Works on server. | — |
| `ListToggler.jsx` | No | Yes (no directive needed) | Add `"use client"` (defensive) | Uses `useState` (line 11), event handlers (lines 15-17). | High |
| `NoResults.jsx` | Yes | Partial | Refactor | Uses `window.history.back()` (line 42) — only client feature. Could be extracted into a small client wrapper, parent becomes server. | Low |
| `NoTaskInMyDay.jsx` | Yes | **No** | **Convert as-is** | **Pure presentational.** No hooks, no event handlers, no browser APIs. Only renders `Image` and text. **Remove `"use client"`** — this component will still work because `Image` from `next/image` works server-side. | **High** |
| `NotFoundComponent.jsx` | No | No | Stay server | Pure presentational. | — |
| `AlarmToast.jsx` | No | No | Stay server (or add defensive) | Pure — receives callbacks as props. No hooks. Works fine as-is since parent `ReminderHandler` is client. | Low |
| `HealthStatusSync.jsx` | Yes | Yes | Stay client | Uses `useState`, `useEffect`, `useCallback`, `useRef`, `navigator.onLine`, `window` events (lines 46, 58, 112). | — |
| `ReloadStoreInitializer.jsx` | Yes | Yes | Stay client | Uses `useEffect` (line 14), Zustand (line 8). | — |
| `ReminderHandler.jsx` | Yes | Yes | Stay client | Uses `useState`, `useEffect`, `Notification` API, `Audio` (lines 31, 111, 137). | — |
| `ResetTaskStore.jsx` | Yes | Yes | Stay client | Uses `useEffect` (line 14), Zustand (line 8). | — |
| `TaskRealTimeListener.jsx` | Yes | Yes | Stay client | Uses `useEffect`, `useRef`, `useRouter`, Supabase realtime subscription (lines 13, 78). | — |
| `UnsavedChangesWarning.jsx` | Yes | Yes | Stay client | Uses `useEffect`, `window.addEventListener('beforeunload')` (lines 7-14). | — |

### `app/_components/_ui/` — UI Primitives

| File | `"use client"`? | Necessary? | Action | Reasoning | Priority |
|------|:---:|:---:|:---|:---|:---:|
| `Border.jsx` | No | No | Stay server | Pure. | — |
| `Button.jsx` | No | No | Stay server | Uses `forwardRef` but that works in server components (it's just the ref that's ignored). Style-only utility. | — |
| `Calendar.jsx` | Yes | Yes | Stay client | Uses `react-day-picker` interactive calendar component (line 9). | — |
| `CancelSaveBtn.jsx` | No | No | Stay server | Pure — receives `onClick` callbacks as props. | — |
| `CloseBtn.jsx` | No | Yes (no directive needed) | Add `"use client"` (defensive) | Uses `useRef` (line 5). | Medium |
| `CompleteBtn.jsx` | No | Yes (no directive needed) | Add `"use client"` (defensive) | Uses Zustand (line 11), `Audio` constructor (line 19), event handler (line 33). | High |
| `DatePicker.jsx` | No | Yes (no directive needed) | Add `"use client"` (defensive) | Wraps `Calendar` (client component) and passes `onSelect`. Should be defensive. | Medium |
| `DeleteBtn.jsx` | No | Yes (no directive needed) | Add `"use client"` (defensive) | Uses `useState` (line 10), event handlers (lines 15-16). | High |
| `DeleteWarningModal.jsx` | Yes | Yes | Stay client | Uses Zustand (line 11), `framer-motion` (line 4), `useEffect` (line 27). | — |
| `InputBtnTempl.jsx` | No | No | Stay server | Pure — receives `onClick` as prop. | — |
| `MenuBtn.jsx` | Yes | Yes | Stay client | Uses `useState` (line 9), Zustand (line 11). | — |
| `ModalTemplateCloseAble.jsx` | No | Yes (no directive needed) | Add `"use client"` (defensive) | Uses `useState`, `useEffect`, `useRef`, `framer-motion` (lines 1-3). | High |
| `ModalTemplatePrimary.jsx` | No | Yes (no directive needed) | Add `"use client"` (defensive) | Uses `useState`, `useEffect`, `useRef`, `framer-motion`, `window` access (line 48). | High |
| `NewListBtn.jsx` | No | Yes (no directive needed) | Add `"use client"` (defensive) | Uses `useRouter` (line 12), Zustand (line 14). | High |
| `OrdinaryBtn.jsx` | No | No | Stay server | Pure — receives `onClick` as prop. | — |
| `Overlay.jsx` | No | Yes (no directive needed) | Add `"use client"` (defensive) | Uses `framer-motion` (line 1). | Medium |
| `SortMethodBtn.jsx` | No | Yes (no directive needed) | Add `"use client"` (defensive) | Uses `useState` (line 10), `useRef` (line 9), Zustand (line 13). | High |
| `SortMethodModal.jsx` | No | No | Stay server | Pure — receives `setSortMethod` as prop, renders buttons. | — |
| `Spinner.jsx` | Yes | Yes | Stay client | Uses `usePathname` (line 14), `useState`/`useEffect` (lines 15-32). | — |
| `SpinnerMini.jsx` | No | No | Stay server | Pure CSS animation. | — |
| `StarBtn.jsx` | No | Yes (no directive needed) | Add `"use client"` (defensive) | Uses Zustand (line 6), event handler (line 16). | High |
| `switch.jsx` | Yes | Yes | Stay client | Uses `@radix-ui/react-switch` (interactive component, line 4). | — |
| `TimePicker.jsx` | No | No | Stay server | Pure — receives callbacks as props. | — |

### `app/_components/editSidebarSection/`

| File | `"use client"`? | Necessary? | Action | Reasoning | Priority |
|------|:---:|:---:|:---|:---|:---:|
| `EditSidebar.jsx` | Yes | Yes | Stay client | Uses `usePathname`, `useEffect`, Zustand, event listeners (lines 19, 48, 61). | — |
| `ActionFooter.jsx` | No | No | Stay server | Pure — receives callbacks as props. | — |
| `AddFile.jsx` | No | No | Stay server | Pure — renders disabled button placeholder. | — |
| `AddNote.jsx` | No | Yes (no directive needed) | Add `"use client"` (defensive) | Uses `useState`, `useEffect`, `useRef`, `autosize` (lines 2-9). | High |
| `AddToMyDay.jsx` | No | Yes (no directive needed) | Add `"use client"` (defensive) | Uses Zustand (line 7). | High |
| `BoxBtn.jsx` | No | No | Stay server | Pure — receives callbacks as props. | — |
| `BoxTemplate.jsx` | No | No | Stay server | Pure — styles only. | — |
| `TaskOverView.jsx` | No | No | Stay server | Pure — composes client components. | — |
| `TaskTitleEditor.jsx` | No | Yes (no directive needed) | Add `"use client"` (defensive) | Uses `useState`, `useEffect`, `useRef`, `autosize`, Zustand (lines 3-4, 8). | High |
| `ReminderBox.jsx` | No | No | Stay server | Pure — composes other components. | — |

#### `reminderBoxModals/`

| File | `"use client"`? | Necessary? | Action | Reasoning | Priority |
|------|:---:|:---:|:---|:---|:---:|
| `AddDueModal.jsx` | No | No | Stay server | Pure — receives callbacks as props. Renders as child of client modal. | — |
| `AddReminderModal.jsx` | No | No | Stay server | Pure — same pattern. | — |
| `AddRepeatModal.jsx` | No | No | Stay server | Pure — same pattern. | — |
| `DatePickerModal.jsx` | No | Yes (no directive needed) | Add `"use client"` (defensive) | Uses `useState` (line 20). | Medium |
| `DateTimePickerModal.jsx` | No | Yes (no directive needed) | Add `"use client"` (defensive) | Uses `useState`, `useRef` (lines 2, 29-30). | Medium |
| `ModalActionBtn.jsx` | No | No | Stay server | Pure — receives callbacks as props. | — |

#### `reminderBoxSection/`

| File | `"use client"`? | Necessary? | Action | Reasoning | Priority |
|------|:---:|:---:|:---|:---|:---:|
| `AddDue.jsx` | No | Yes (no directive needed) | Add `"use client"` (defensive) | Uses `useState`, `useRef`, Zustand (lines 4, 15). | High |
| `AddReminder.jsx` | No | Yes (no directive needed) | Add `"use client"` (defensive) | Uses `useState`, `useRef`, Zustand (lines 4, 15). | High |
| `AddRepeat.jsx` | No | Yes (no directive needed) | Add `"use client"` (defensive) | Uses `useState`, `useRef`, `useEffect`, Zustand (lines 3, 12, 18, 27). | High |

#### `stepSection/`

| File | `"use client"`? | Necessary? | Action | Reasoning | Priority |
|------|:---:|:---:|:---|:---|:---:|
| `Steps.jsx` | No | No | Stay server | Pure — composes `StepsList` and `AddStep`. | — |
| `StepsList.jsx` | No | No | Stay server | Pure — maps steps to `StepItem`. | — |
| `StepItem.jsx` | No | Yes (no directive needed) | Add `"use client"` (defensive) | Uses `useState`, `useRef` (lines 2, 9-10). | High |
| `StepTitleEditor.jsx` | No | Yes (no directive needed) | Add `"use client"` (defensive) | Uses `useState`, `useRef`, `autosize`, Zustand (lines 2-3, 7). | High |
| `StepCompleteBtn.jsx` | No | Yes (no directive needed) | Add `"use client"` (defensive) | Uses Zustand (line 10). | High |
| `AddStep.jsx` | No | Yes (no directive needed) | Add `"use client"` (defensive) | Uses `useState`, Zustand (lines 4, 8). | High |
| `StepActionModal.jsx` | No | Yes (no directive needed) | Add `"use client"` (defensive) | Uses Zustand (line 13). | High |

### `app/_components/minimizerSection/`

| File | `"use client"`? | Necessary? | Action | Reasoning | Priority |
|------|:---:|:---:|:---|:---|:---:|
| `TasksMinimizer.jsx` | Yes | Yes | Stay client | Uses `useState`, `framer-motion` animation (lines 3-4). | — |
| `DefaultMinimizer.jsx` | No | **BUG: Uses `useMemo` without import (lines 14, 18, 23)** | Fix bug + add `"use client"` | **Critical bug**: `useMemo` is used (lines 14, 18, 23) but not imported from React. This will throw a `ReferenceError` at runtime. Fix: add `import { useMemo } from "react"`. | **Critical** |
| `AllMinimizer.jsx` | No | No | Stay server | Pure — only filters/manipulates data. | — |
| `PlannedMinimizer.jsx` | No | No | Stay server | Pure — same as above. | — |

### `app/_components/sidebarSection/`

| File | `"use client"`? | Necessary? | Action | Reasoning | Priority |
|------|:---:|:---:|:---|:---|:---:|
| `Sidebar.jsx` | Yes | Yes | Stay client | Uses `useUser` (Clerk), `usePathname`, `useEffect`, `useRef`, Zustand (lines 3, 25, 29, 48). | — |
| `SidebarNav.jsx` | Yes | Yes | Stay client | Uses Zustand via `tasksList` prop from parent (actually reads from parent's store, but the component is already in client boundary). Could be refactored to receive data as props. | Low |
| `SidebarLink.jsx` | Yes | Partial | Refactor | Uses `usePathname` (line 19) to determine active state and `useTaskStore` (line 22). The active state could be passed as a prop from a server component. However, the store subscription makes it inherently client-bound. | Low |
| `CategoriesList.jsx` | No | No | Stay server | Pure — sorts and maps categories. | — |
| `CategoryItem.jsx` | No | No | Stay server | Pure — passes props to client `SidebarLink`. | — |
| `UserMenu.jsx` | No | Yes (no directive needed) | Add `"use client"` (defensive) | Uses `useState`, `useEffect`, `useRef`, `framer-motion`, `ClerkLoaded`/`UserButton` (lines 3, 11, 17, 42, 74). | High |
| `UserStatus.jsx` | No | Yes (no directive needed) | Add `"use client"` (defensive) | Uses Zustand (line 7). | High |
| `TaskSearch.jsx` | No | Yes (no directive needed) | Add `"use client"` (defensive) | Uses `useState`, `useEffect`, `useRouter` (lines 4-9). | High |
| `ProfileModal.jsx` | No | Yes (no directive needed) | Add `"use client"` (defensive) | Uses Zustand (line 10), `UserButton` (Clerk), `SignOutButton`, event handlers. | High |
| `UserSignupHandler.jsx` | Yes | Yes | Stay client | Uses `useUser` (Clerk), `useCallback`, `useEffect` (lines 3-4). | — |

### `app/_components/shareListSection/`

| File | `"use client"`? | Necessary? | Action | Reasoning | Priority |
|------|:---:|:---:|:---|:---|:---:|
| `InitialView.jsx` | No | No | Stay server | Pure — receives callbacks as props. | — |
| `InvitationLanding.jsx` | No | No | Stay server | Pure — renders `ClerkLoading`/`ClerkLoaded` wrappers (these work server-side). | — |
| `InvitationLandingContent.jsx` | Yes | Yes | Stay client | Uses `useAuth`, `useRouter`, `useTransition`, `useState`, `useEffect` (lines 4, 7, 14-15). | — |
| `InvitationUsersList.jsx` | No | No | Stay server | Pure — receives callbacks as props. | — |
| `LinkCreatedView.jsx` | Yes | Partial | Refactor | Uses `useState` for `isCopied` (line 16) and `navigator.clipboard` (line 21). The interactive copy logic could be extracted into a small client wrapper. | Low |
| `ManageMembers.jsx` | Yes | Yes | Stay client | Uses Zustand (line 15). | — |
| `MoreOptionsView.jsx` | No | Yes (no directive needed) | Add `"use client"` (defensive) | Uses Zustand (line 13), `Switch` (line 54) which is a Radix client component. | High |
| `ShareBtn.jsx` | No | Yes (no directive needed) | Add `"use client"` (defensive) | Uses `useState` (line 8), event handlers. | High |
| `ShareListModal.jsx` | No | Yes (no directive needed) | Add `"use client"` (defensive) | Uses `useState`, `useTransition`, `framer-motion` (lines 3-4, 12-13). | High |

### `app/_components/taskInputSection/`

| File | `"use client"`? | Necessary? | Action | Reasoning | Priority |
|------|:---:|:---:|:---|:---|:---:|
| `TaskInput.jsx` | Yes | Yes | Stay client | Uses `useState`, `useRef`, `useEffect`, `framer-motion`, Zustand (lines 5, 12, 14, 24). | — |
| `InputAddDue.jsx` | No | Yes (no directive needed) | Add `"use client"` (defensive) | Uses `useState`, `useRef` (lines 2, 16-17). | High |
| `InputAddReminder.jsx` | No | Yes (no directive needed) | Add `"use client"` (defensive) | Uses `useState`, `useRef` (lines 2, 15-16). | High |
| `InputAddRepeat.jsx` | No | Yes (no directive needed) | Add `"use client"` (defensive) | Uses `useState`, `useRef` (lines 2, 16). | High |

---

## Summary of Key Findings

### 1. High-Impact Conversion: `NoTaskInMyDay.jsx` (Remove `"use client"`)
- **File**: `app/_components/NoTaskInMyDay.jsx`
- **Current**: Has `"use client"`
- **Why it's safe**: Pure presentational component — no hooks, no event handlers, no browser APIs, no Zustand.
- **Action**: Simply remove the `"use client"` directive. No other changes needed.

### 2. Critical Bug: `DefaultMinimizer.jsx` — Missing `useMemo` Import
- **File**: `app/_components/minimizerSection/DefaultMinimizer.jsx`
- **Lines 14, 18, 23**: Uses `useMemo()` but `useMemo` is not imported from React.
- **Impact**: Runtime crash (`ReferenceError: useMemo is not defined`) when this component renders.
- **Action**: Add `import { useMemo } from "react"` at the top of the file.

### 3. Defensive Gap: ~30 Files Missing `"use client"` That Use Hooks
While these files currently work (because all parent pages are client components and they inherit the client boundary), they lack the defensive `"use client"` directive. If any of them is ever imported by a Server Component (e.g., a future server-rendered page, layout, or route group), they will crash at build time with:

```
Error: Event handlers cannot be used in Server Components.
```

Affected high-priority files include:
- `app/_components/Template.jsx`
- `app/_components/CategoryTitleEditor.jsx`
- `app/_components/TaskItem.jsx`
- `app/_components/ListToggler.jsx`
- `app/_components/CompleteBtn.jsx`
- `app/_components/StarBtn.jsx`
- `app/_components/DeleteBtn.jsx`
- `app/_components/NewListBtn.jsx`
- `app/_components/SortMethodBtn.jsx`
- `app/_components/ModalTemplateCloseAble.jsx`
- `app/_components/ModalTemplatePrimary.jsx`
- `app/_components/AddNote.jsx`
- `app/_components/TaskTitleEditor.jsx`
- `app/_components/AddToMyDay.jsx`
- `app/_components/AddDue.jsx`
- `app/_components/AddReminder.jsx`
- `app/_components/AddRepeat.jsx`
- `app/_components/StepItem.jsx`
- `app/_components/StepTitleEditor.jsx`
- `app/_components/StepCompleteBtn.jsx`
- `app/_components/AddStep.jsx`
- `app/_components/StepActionModal.jsx`
- `app/_components/UserMenu.jsx`
- `app/_components/UserStatus.jsx`
- `app/_components/TaskSearch.jsx`
- `app/_components/ProfileModal.jsx`
- `app/_components/MoreOptionsView.jsx`
- `app/_components/ShareBtn.jsx`
- `app/_components/ShareListModal.jsx`
- `app/_components/InputAddDue.jsx`
- `app/_components/InputAddReminder.jsx`
- `app/_components/InputAddRepeat.jsx`

### 4. Architectural Refactoring — Page-Level Server/Client Split (Medium Priority)

All task page files (`app/tasks/*/page.js`) follow an almost identical pattern:

```jsx
"use client";
// ... imports ...
export default function Page() {
  const { tasksList, ... } = useTaskStore(useShallow(...));  // Client: Zustand
  const listRef = useRef(null);                              // Client: useRef
  useEffect(() => { listRef.current.scrollIntoView(...) }, [...]) // Client: useEffect
  // ... data filtering (pure) ...
  return <Template listRef={listRef} listConfig={listConfig} />;
}
```

**Recommended Refactoring Pattern** (for each task page):

1. Create a **Server Component page** (`page.js`) that:
   - Filters/transforms data (this is pure — works server-side)
   - Defines the `listConfig` object
   - Passes data as props to a thin client wrapper

2. Create a **thin Client Component wrapper** that:
   - Reads from Zustand (or receives pre-filtered data as props)
   - Implements the scroll-into-view effect
   - Renders the `Template` component

**Example structure**:
```
app/tasks/my-day/
  page.js           → Server Component: filters data, passes as props
  MyDayContent.jsx  → "use client": usesRef/useEffect for scroll, renders Template
```

This would reduce the client bundle for 7+ page files from "everything" to "just the interactive scroll wrapper".

---

## Action Plan

### Phase 1: Critical Bug Fix (Priority: **Immediate**)

- [ ] **Fix `DefaultMinimizer.jsx`**: Add `import { useMemo } from "react"` at the top of the file (lines 14, 18, 23 use `useMemo` without importing it).

### Phase 2: High-Priority Conversions (Priority: **High**)

- [ ] **Convert `NoTaskInMyDay.jsx` to Server Component**: Remove `"use client"` directive. No other changes needed.
- [ ] **Add `"use client"` defensively to ~30 files** listed in Finding #3 above. This ensures they will not crash if imported by a Server Component in the future.

### Phase 3: Medium-Priority Refactoring

- [ ] **Page-level Server/Client split** for task pages:
  1. `app/tasks/all/page.js` — Extract Zustand read + scroll effect into `AllPageContent.jsx`
  2. `app/tasks/completed/page.js` — Extract into `CompletedPageContent.jsx`
  3. `app/tasks/important/page.js` — Extract into `ImportantPageContent.jsx`
  4. `app/tasks/my-day/page.js` — Extract into `MyDayPageContent.jsx`
  5. `app/tasks/planned/page.js` — Extract into `PlannedPageContent.jsx`
  6. `app/tasks/search/page.js` — Extract into `SearchPageContent.jsx` (also move `useSearchParams` into the client wrapper)
  7. `app/tasks/page.js` — Extract into `TasksPageContent.jsx`
  8. `app/tasks/[slug]/page.js` — Extract into `SlugPageContent.jsx` (this one is more complex due to `useParams`, `useRouter`, and event handlers)

- [ ] **Refactor `NoResults.jsx`**: Extract `window.history.back()` into a small client wrapper; make the parent a Server Component.
- [ ] **Refactor `LinkCreatedView.jsx`**: Extract `navigator.clipboard` logic into a small client wrapper; make the parent a Server Component.
- [ ] **Refactor `SidebarLink.jsx`**: Pass `isActive` as a prop from a server component instead of using `usePathname` internally.
- [ ] **Refactor `app/profile/[[...rest]]/page.js`**: Extract `MenuBtn` into a client wrapper; keep the layout as a Server Component.

### Phase 4: Low-Priority / Nice-to-Have

- [ ] **Audit `_lib/` files** for server/client safety (e.g., `useCustomeToast.js`, `useSupabaseRealtimeToken.js` are client-only hooks — ensure they are never imported server-side).
- [ ] **Consider moving `app/taskStore.js`** to a pattern where server components can read initial data without subscribing to the store (e.g., pass initial state as props from server to client).

---

## Risks & Uncertainties

### 1. `DefaultMinimizer.jsx` — `useMemo` Bug
**Risk**: This is a confirmed runtime crash. The component will throw `ReferenceError: useMemo is not defined` when it renders. This is **not speculative** — the code clearly calls `useMemo()` on lines 14, 18, and 23 without importing it.

**Evidence**:
- Line 0: No import statement exists (the file starts with `import { sortTasks } from "../../_lib/utils";`)
- Lines 14, 18, 23: `useMemo(...)` is called

### 2. `Template.jsx` — Missing `"use client"` (Defensive)
**Risk**: Currently works because all parent pages are client components. If a future developer creates a Server Component page that imports `Template`, it will crash. This is a ticking time bomb.

**Evidence**: Lines 9, 21: `import { useState } from "react"` and `const [mustFocus, setMustFocus] = useState(false)`. Line 24: `useEffect(...)`. Line 31: `function handleClick(e) { ... }`.

### 3. `CategoryTitleEditor.jsx` — Missing `"use client"` (Defensive)
**Risk**: Same as Template. Uses `useState`, `useEffect`, `useRef`, `autosize`, and Zustand.

**Evidence**: Lines 2-5: imports `useEffect`, `useRef`, `useState`, `autosize`, `useTaskStore`.

### 4. `TaskItem.jsx` — Missing `"use client"` (Defensive)
**Risk**: Uses Zustand and `onClick` handler.

**Evidence**: Line 27: `useTaskStore(...)`. Line 37: `onClick={(e) => handleActiveTaskSidebar(task, e)}`.

### 5. Page-Level Refactoring Uncertainty
**Risk**: The recommended server/client split for task pages assumes that `useTaskStore` data can be passed as props from a server component. However, the Zustand store is persisted to `sessionStorage` and contains real-time data. A server component cannot read `sessionStorage` or subscribe to real-time updates. The refactoring would need to:
- Pass initial data as props (from a server data fetch)
- Let the client wrapper subscribe to Zustand for real-time updates
- Handle the "hydration mismatch" between server-rendered data and client-side Zustand state

**Recommendation**: This refactoring is non-trivial. Consider it for a future sprint, not the current one.

### 6. `SidebarLink.jsx` — `usePathname` Dependency
**Risk**: `usePathname` is a Next.js client hook. To make this a Server Component, the active state would need to be passed as a prop. This is feasible but requires changes to all callers.

### 7. `ModalTemplatePrimary.jsx` — `window.innerWidth` Access
**Risk**: Line 48 accesses `window.innerWidth` directly in the component body (not inside a `useEffect`). This will crash during SSR if the component is ever rendered on the server. Currently it's only rendered inside client components, but this is fragile.

**Evidence**: Line 48: `isCenteredModal && window.innerWidth >= 768 ? justify : ...`

### 8. `NoResults.jsx` — `window.history.back()` in Component Body
**Risk**: Line 42: `onClick={() => window.history.back()}`. This is inside an event handler, so it's safe (only runs on click). But the component has `"use client"` unnecessarily for just this one line.

### 9. Files That Need Manual Inspection
The following files were not read because they are not `.jsx` files, but they may contain client/server boundary issues:
- `app/_lib/useCustomeToast.js` — Likely a client hook (uses `react-hot-toast`)
- `app/_lib/useSupabaseRealtimeToken.js` — Likely a client hook (uses Supabase realtime)
- `app/_lib/supabase-browser.js` — Client-side Supabase client
- `app/_lib/supabase-server.js` — Server-side Supabase client (should be safe)
- `app/_lib/data-services.js` — Server-side data access (should be safe)
- `app/_lib/utils.js` — Pure utility functions (should be safe)
- `app/_lib/configs.js` — Constants (should be safe)
- `app/_lib/logger.js` — Logging utility (should be safe)

**Recommendation**: Manually inspect `useCustomeToast.js` and `useSupabaseRealtimeToken.js` to ensure they are never imported by Server Components.

---

## Final Notes

1. **No code was modified** during this audit. All findings are based on file reads and analysis.
2. The **critical bug** in `DefaultMinimizer.jsx` (missing `useMemo` import) should be fixed immediately — it will cause a runtime crash.
3. The **defensive `"use client"` gap** affects ~30 files. While they work today, adding the directive is a low-risk, high-safety improvement.
4. The **page-level server/client split** is the most impactful architectural change but requires careful planning due to Zustand's client-only nature.
5. All recommendations are backed by specific line numbers and code evidence in the table above.