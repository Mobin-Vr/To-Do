"use client";

import { TickCircleIcon } from "@/public/icons/icons";
import { BG_COLORS } from "@/app/_lib/configs";
import Template from "@/app/_components/Template";
import useTaskListPage from "@/app/_lib/useTaskListPage";

export default function Page() {
  const bgColor = BG_COLORS["/completed"];

  const { listRef, listConfig } = useTaskListPage({
    filterFn: (task) => task.is_task_completed,
    listName: "Completed",
    bgColor,
    iconElement: <TickCircleIcon size="32px" color={bgColor.primaryText} />,
  });

  return (
    <Template listRef={listRef} listConfig={listConfig} showInput={false} />
  );
}
