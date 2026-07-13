import { auth } from "@clerk/nextjs/server";
import {
  getReleventTasks,
  getReleventCategories,
  getOwnerInvitations,
  getJoinedInvitations,
} from "@/app/_lib/data-services";
import TasksStoreHydrator from "@/app/_components/TasksStoreHydrator";

// Helper to extract the value from a settled promise, falling back to an empty array
const getResult = (result) =>
  result.status === "fulfilled" ? result.value : [];

export default async function DashboardLayout({ children }) {
  const { userId, getToken } = await auth();

  if (!userId) return children;

  let token;
  try {
    token = await getToken({ template: "supabase" });
  } catch (error) {
    console.error("Failed to get Supabase token:", error);
    return children;
  }

  if (!token) {
    throw new Error("Authentication failed. Please try again.");
  }

  const results = await Promise.allSettled([
    getReleventTasks(token),
    getReleventCategories(token),
    getOwnerInvitations(token),
    getJoinedInvitations(token),
  ]);

  const tasks = getResult(results[0]);
  const categories = getResult(results[1]);
  const ownerInvitations = getResult(results[2]);
  const joinedInvitations = getResult(results[3]);

  return (
    <TasksStoreHydrator
      tasks={tasks}
      categories={categories}
      ownerInvitations={ownerInvitations}
      joinedInvitations={joinedInvitations}
    >
      {children}
    </TasksStoreHydrator>
  );
}
