import { auth } from "@clerk/nextjs/server";
import {
  getReleventTasks,
  getReleventCategories,
  getOwnerInvitations,
  getJoinedInvitations,
} from "@/app/_lib/data-services";
import TasksStoreHydrator from "@/app/_components/TasksStoreHydrator";

export default async function DashboardLayout({ children }) {
  const { userId, getToken } = await auth();

  if (!userId) {
    return children;
  }

  const token = await getToken({ template: "supabase" });

  const [tasks, categories, ownerInvitations, joinedInvitations] =
    await Promise.all([
      getReleventTasks(token),
      getReleventCategories(token),
      getOwnerInvitations(token),
      getJoinedInvitations(token),
    ]);

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
