<div style="display: flex; align-items: center; justify-content: center;">
  <h1 style="margin: 0; display: flex; align-items: center;">
    <img src="public/icons/logo.png" alt="logo" style="width: 35px; height: 35px; border-radius: 3px; margin-right: 10px;" />
    Microsoft To Do&nbsp;<small style="font-size: 0.7em;">(clone)</small>
  </h1>
</div>

<br>

A full-stack task management app built to explore production-grade architecture: secure multi-user data access, real-time collaboration, offline resilience, and server-driven rendering — not just a UI clone of Microsoft To Do.

<br>

## 🌐 Live Demo — [**Try it now**](https://ms-todo100.vercel.app)

> ⚠️ Google login via Clerk may require a VPN in some regions.
> If login fails, use this test account:

```makefile
Username:  test1
Password:  11223344.Rr
```

<br>

## 📷 Preview

<div style="display: flex; align-items: center; justify-content: center;">
<img src="https://github.com/Mobin-Vr/To-Do/blob/main/public/ScreenShots/appPreview.gif" width="260" alt="App Preview">
</div>

<br>

## Overview

This app lets users manage tasks across custom and default lists (including a "My Day" view), share lists with collaborators, and stay in sync in real time across devices. It's built as a learning project focused on the parts of an app that are easy to get wrong: who's allowed to write what, what happens when the network drops, and how to keep the UI fast without leaking loading states to the user.

<br>

## 🛠️ Tech Stack

| Layer              | Technology                                                  |
| ------------------ | ----------------------------------------------------------- |
| Frontend           | Next.js 16 (App Router), React, Tailwind CSS, Framer Motion |
| Backend & Database | Supabase (PostgreSQL, Row Level Security, RPC, Realtime)    |
| Auth               | Clerk (middleware-based route protection)                   |
| State Management   | Zustand + Immer, split into domain-scoped stores            |
| AI                 | DeepSeek API (natural language task parsing)                |
| Tooling            | Next.js cache, Server Actions                               |

<br>

## 🚀 Key Features

**Task management**

- Custom and default lists, including a "My Day" view for the current day
- Star, complete, and categorize tasks; add notes, subtasks, due dates, reminders, and repeat rules
- Search across owned and shared tasks
- Task reminder alarm with pop-up notification when a reminder is due

**AI-assisted task input**

- Natural language input is parsed into structured task fields (title, due date, reminder, repeat rule, starred status, steps) via a DeepSeek-powered parser
- Supports both English and Persian input
- In-flight requests are debounced and cancelled with `AbortController` so stale AI responses can't overwrite what the user is currently typing

**Real-time collaboration**

- Share lists via invitation links; remove collaborators or disable sharing/invitations entirely
- Changes propagate to collaborators instantly through Supabase Realtime, with an authenticated user filtered out of their own collaborator list
- Realtime auth token refreshes on an interval so long-lived sessions don't silently drop their subscription

**Offline support**

- Changes made while offline are queued in a local change log and synced once the connection returns
- Multiple edits to the same task are consolidated into a single write to avoid redundant requests

**Reliability & error handling**

- Custom `AppError` class and a shared `handleAsyncError` utility standardize error handling across Server Actions
- Environment-aware error boundary: verbose output in development, safe fallback in production
- Lightweight health-check endpoint with a cooldown to avoid hammering the database on repeated checks
- Clerk middleware protects sensitive routes; dedicated API routes handle user lookup and health checks with their own auth checks

<br>

## 🎯 Architecture & Key Decisions

**Server Actions as the only database gateway.** The client never talks to Supabase directly for mutations. All writes go through Server Actions, which call RPC functions — one auditable entry point per mutation instead of authorization logic scattered across client components.

**Reads and writes are separated.** `data-services.js` (reads) and `Actions.js` (mutations) live in separate modules. Reads are cached with Next.js's `'use cache'` directive (`cacheLife`, `cacheTag`), which is only safe to do aggressively because mutation code lives elsewhere and can't accidentally invalidate the cache in unpredictable ways.

**RLS and RPC are the actual authorization boundary, not the client.** Early versions assumed the client could be trusted to send the right IDs. That assumption doesn't hold, so authorization was pushed entirely into the database: RLS policies gate every table, and anything with side effects beyond a simple row check goes through a `SECURITY DEFINER` RPC that re-validates the caller server-side.

**Server-side hydration for initial data.** A `(dashboard)` route group with a server layout fetches tasks, categories, and invitations before any HTML reaches the client, then hydrates the Zustand stores via a `TasksStoreHydrator` — removing the empty-state-then-populate flash a client-only fetch would produce.

**Zustand split by domain.** State started as a single ~900-line store where every consumer re-rendered on unrelated changes and cross-feature bugs were common. It's now split into domain-scoped stores (users, UI, tasks, categories, invitations, sync, delete-modal) with explicit handling for the dependencies that do cross store boundaries.

<br>

## 🏆 Technical Challenges & Solutions

**Real-time subscription silently failing.** A mismatch between the JWT variable used to authenticate the Supabase Realtime client and the one Clerk actually issued meant channel subscriptions were failing with no visible error. Fixed by aligning the token source, and added a 45-second refresh interval so the token doesn't expire mid-session and drop the subscription later.

**A tautological join in collaborator RLS policies.** An audit of the RLS policies found a join condition on the collaborators table that always evaluated true, bypassing the intended access check. Combined with a missing `WITH CHECK` on invitation updates (letting an update set a row to a state that would never have been allowed on insert), these were the two most severe findings — both rewritten and re-tested.

**Client-supplied authorization parameters.** Several RPC functions accepted a list ID or user ID from the client and trusted it for authorization decisions. These were removed in favor of deriving identity from the authenticated session inside the RPC itself, and unsafe function overloads that bypassed the fix were dropped.

**SSR flicker on dynamic category pages.** Category pages briefly rendered a 404 before the real content loaded, because the existence check happened client-side after the initial render. Moved the check server-side using Next.js's `notFound()`, so the correct outcome — real page or true 404 — is decided before any HTML is sent.

**AI parser race conditions.** Fast typing into the task input could fire multiple parse requests, and a slower earlier response could resolve after a faster later one, overwriting fresh user input with stale AI output. Solved with debounced requests, `AbortController` cancellation of in-flight requests, and per-field tracking of manual edits so the AI never overwrites a field the user has already changed by hand.

<br>

## 🔒 Security

Security was treated as a dedicated audit pass over the whole backend, not a one-off fix:

- **RLS is the source of truth.** Every table has policies that assume the client is untrusted; the client only ever sees what it's allowed to see, regardless of what the UI requests.
- **No client-trusted authorization parameters.** RPC functions derive the caller's identity and permissions from the authenticated session, not from arguments passed in by the client.
- **Mutations are forced through `SECURITY DEFINER` RPCs**, giving one consistent, auditable path for writes instead of relying on RLS alone for complex multi-step operations.
- **Findings fixed during the audit** included the tautological join in collaborator policies, the missing `WITH CHECK` on invitation updates, a broken `invitation_leave` function, and unsafe function overloads that were subsequently dropped.
- **Realtime auth is refreshed on an interval**, not just at connection time, so long sessions don't lose their subscription silently when a token expires.

<br>

## 🗺️ Future Roadmap

- End-to-end testing with Playwright covering critical flows (auth, list sharing, task CRUD, offline sync)
- Error monitoring with Sentry (or similar) to replace the current error-reporting placeholder with real alerting and stack traces
- Progressive Web App support (installable, offline shell, background sync for the existing change-log mechanism)
- CI/CD pipeline running lint, type checks, and the future E2E suite on every pull request before merge
- Rate limiting on Server Actions and API routes to protect against abuse, particularly the AI parsing endpoint
- Persian (RTL) UI localization to match the natural-language parser's existing bilingual support

<br>

## 📌 Lessons Learned / Skills Demonstrated

- Treating RLS and RPC functions as the actual security boundary, not a convenience layer — including finding and fixing a policy bug that had been silently over-permissive
- Diagnosing SSR/RSC issues (loading flashes, 404 flicker) by reasoning about what runs on the server vs. the client and when
- Managing race conditions in real-time sync and AI request handling using cancellation and explicit ownership of "who's allowed to overwrite this field"
- Refactoring a growing, tangled state store into domain-scoped stores without breaking features that depended on cross-store state
- Reading a codebase critically enough to find bugs introduced by earlier versions of the same project

&nbsp;
