<div style="display: flex; align-items: center; justify-content: center;">
  <h1 style="margin: 0; display: flex; align-items: center;">
    <img src="public/icons/logo.png" alt="persian" style="width: 35px; height: 35px; border-radius: 3px; margin-right: 10px;" />
    Microsoft Todo&nbsp;<small style="font-size: 0.7em;">(clone)</small>
  </h1>
</div>

<br>

A **feature-rich** **task management app** inspired by **Microsoft To Do**, with complete features for organizing and tracking your tasks. This app allows you to easily **share your task lists** with friends or colleagues. Manage your tasks anytime and anywhere, and never forget any of them.

<br>

## 📷 Preview

<div style="display: flex; align-items: center; justify-content: center;">
<img src="https://github.com/Mobin-Vr/To-Do/blob/main/public/ScreenShots/appPreview.gif" width="260" alt="App Preview">
</div>

💡 **Built with precision, performance, and security in mind.**

<br>

## 🚀 Features

- **Custom & Default Lists**: Users can create lists and organize their tasks. A special "My Day" list displays tasks for the current day.
- **Real-time Task Sync**: Shared lists sync across users instantly using **Supabase Realtime & RLS**.
- **List Invitation & Access Control**:

  - Share lists with others through invitation links.
  - Remove users from shared lists.
  - Disable list sharing for users: This will restrict access to the list, allowing only the owner to view and modify it.
  - Disable invitation links: This prevents new users from being added to the shared list through invitation links.

- **Task Management**:
  - Star, mark as completed, and categorize tasks.
  - Add notes and subtasks (steps) to tasks.
  - Set reminders, due dates, and repeat rules.
- **Offline Support & Change Log Mechanism**:

  - If the connection drops, changes are logged and synced when reconnected.
  - Ensures data consistency even during network failures.

- **Task Reminder Alarm**: A pop-up alarm triggers when a task's time reminder is up, ensuring that users are notified instantly at the scheduled time.

- **Client-Side Optimizations**:

  - Uses **Zustand for state management**, stored in **Session Storage** to boost performance.
  - Prevents unnecessary database requests by only syncing relevant changes.

- **Error Collection & Future Fixes**: Collects all client-side errors and sends them to the database to be addressed and fixed in future versions.

- **Route Protection**: Implemented using middleware and Clerk, ensuring only authenticated users can access sensitive pages, protecting restricted areas of the app.

- **Task Search**: Enables searching between the user’s tasks and tasks shared with the user, making it easy to find and manage tasks across all lists.

- **Full Responsive & Mobile-First Design**:

  - Carefully crafted UI with pixel-perfect details.
  - **Framer Motion** is used for smooth transitions and modal animations, providing a soft and attractive user experience.
  - **Custom Color System**: A separate color scheme for each list component, ensuring unique visual identities.
  - **Themed Loading Spinner**: A loading spinner that aligns with the overall theme, ensuring all components feel integrated with the app's design.
  - **Custom Images**: Used for designing key pages like login, join invitations, and "My Day," adding visually appealing, intricate elements to the UI.

<br>

## 🛠️ Tech Stack

| Technology                  | Purpose                                      |
| --------------------------- | -------------------------------------------- |
| **Next.js 15 (App Router)** | Main framework                               |
| **Supabase**                | Database, Realtime Sync (RLS, RPC)           |
| **Clerk**                   | Authentication & User Management             |
| **Server Actions**          | Secure database interactions                 |
| **Zustand**                 | State Management (stored in Session Storage) |
| **Tailwind CSS**            | Styling                                      |
| **Framer Motion**           | Smooth animations for transitions and modals |
|                             |

<br>

## 🏆 Technical Challenges & Solutions

### **1️⃣ Real-Time Synchronization Issues**

- **Challenge**: Keeping tasks **consistently synced** between multiple users while avoiding race conditions.
- **Solution**: Used **Supabase Realtime + RPC functions** to ensure users always receive the latest data. If the real-time listener fails, an **RPC function is triggered on reload** to fetch the latest state.

### **2️⃣ Security & Authorization (RLS & RPC)**

- **Challenge**: Preventing unauthorized modifications.
- **Solution**: Implemented **Row Level Security (RLS) & RPC functions**, enforcing strict authentication and authorization checks **directly at the database level**.

### **3️⃣ Handling Offline Mode & Change Log**

- **Challenge**: Ensuring tasks are **not lost** when users go offline.
- **Solution**: Implemented a **Change Log Mechanism** that temporarily stores updates in **Session Storage** and syncs them when the connection is restored.

  - All changes are consolidated to optimize database writes and prevent unnecessary operations.
  - Multiple updates to the same task are batched into a single optimized request.

### **4️⃣ Task Recurrence & Reminder System**

- **Challenge**: Handling **due dates, repeat rules, and reminders** seamlessly.
- **Solution**: Built a **custom recurrence logic** and integrated a notification system that triggers reminders via **modal pop-ups**.

<br>

## 🎯 Key Architectural Decisions

- **Next.js**: I chose that for its seamless integration of front-end and back-end development. With **(SSR)** and **Server Actions**, it allows efficient and secure client-database communication, simplifying the architecture and enabling rapid, scalable development for feature-rich, real-time applications.

- **Server Actions**: Server Actions serve as an intermediary, securely managing client-database communication and preventing direct client-to-database connections.

  - Enhanced Security
  - Control over Data Flow

- **Security, Authentication & Authorization**:

  - No Direct Client-Database Connection: All interactions are routed through Server Actions to enhance security and reliability.

  - Authentication & Authorization: Managed at the database level using RLS and RPC functions, ensuring only authorized users can access sensitive data.

- **RPC Functions for Critical Updates**: Ensures **atomic database operations**, preventing inconsistent states and ensuring reliable data updates across the app.

- **Zustand for State Management**: State is stored in **Session Storage**, improving performance by persisting state and reducing unnecessary re-renders.

<br>

## 📌 Lessons Learned

This project helped refine my skills in:

- **Advanced Next.js & Server Actions**
- **Database security (RLS, RPC, Supabase Functions)**
- **Optimizing state management (Zustand + Session Storage)**
- **Building resilient real-time systems**
- **Handling offline sync & managing conflicts**

&nbsp;

&nbsp;

# You can use or test the app in two ways

### 🅰️ Use the live version on Vercel

#### Simply visit this link ▶️ [Microsoft Todo clone](https://ms-todo100.vercel.app)

### ⚠️ Note

- Google login in Clerk requires a good VPN due to sanctions.
- If login fails, use the following test account (Just for test):

  ```
  Username:  test1
  Password:  11223344.Rr
  ```

---

### 🅱️ Run the project locally:

1️⃣ Clone the repository from GitHub

```bash
git clone https://github.com/Mobin-Vr/To-Do.git
```

2️⃣ Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

3️⃣ Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
