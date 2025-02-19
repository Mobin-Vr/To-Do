import { delay, getTimeAgo } from "@/app/_lib/utils";
import DeleteBtn from "../_ui/DeleteBtn";

export default function ActionFooter({
  task,
  toggleEditSidebar,
  deleteTaskFromStore,
}) {
  if (!task.task_created_at) return;

  const timeAgoCreated = getTimeAgo(task.task_created_at);
  const timeAgoCompleted = getTimeAgo(task.task_completed_at);

  let ActionFooterText = task.is_task_completed
    ? `Completed ${timeAgoCompleted}`
    : `Created ${timeAgoCreated}`;

  async function handleDelete() {
    // 1. close side bar
    toggleEditSidebar();
    await delay(200);

    // 2. Delete the task
    deleteTaskFromStore(task.task_id);
  }

  return (
    <div className="border-t-1 relative flex h-12 items-center justify-between gap-4 border border-gray-200 p-3 font-light text-gray-700">
      <span className="w-full text-center text-[0.8rem]">
        {ActionFooterText}
      </span>

      <DeleteBtn
        onClick={handleDelete}
        className="absolute right-0 flex aspect-square h-full items-center justify-center rounded-md transition-all duration-300 hover:bg-sidebar-hover"
        useDefaultStyle={false}
      />
    </div>
  );
}
