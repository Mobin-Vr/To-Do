"use client";

import { TodayCalendarIcon } from "@/public/icons/icons";
import { BG_COLORS } from "@/app/_lib/configs";
import Template from "@/app/_components/Template";
import useTaskListPage from "@/app/_lib/useTaskListPage";

export default function Page() {
  const bgColor = BG_COLORS["/planned"];

  const { listRef, listConfig } = useTaskListPage({
    filterFn: (task) =>
      task.is_task_in_myday || task.task_reminder || task.task_due_date,
    listName: "Planned",
    bgColor,
    iconElement: <TodayCalendarIcon size="32px" color={bgColor.primaryText} />,
  });

  return <Template listRef={listRef} listConfig={listConfig} />;
}
