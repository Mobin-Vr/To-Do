"use client";

import Template from "@/app/_components/Template";
import { BG_COLORS } from "@/app/_lib/configs";
import useTaskListPage from "@/app/_lib/useTaskListPage";
import { SunIcon } from "@/public/icons/icons";

export default function Page() {
  const bgColor = BG_COLORS["/my-day"];

  const { listRef, listConfig } = useTaskListPage({
    filterFn: (task) => task.is_task_in_myday,
    listName: "My Day",
    bgColor,
    iconElement: <SunIcon size="32px" color={bgColor.primaryText} />,
  });

  return <Template listRef={listRef} listConfig={listConfig} />;
}
