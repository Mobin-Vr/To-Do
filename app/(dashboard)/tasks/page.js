"use client";

import { HomeIcon } from "@/public/icons/icons";
import { BG_COLORS, defaultCategoryId } from "@/app/_lib/configs";
import Template from "@/app/_components/Template";
import useTaskListPage from "@/app/_lib/useTaskListPage";

export default function Page() {
  const bgColor = BG_COLORS["/tasks"];

  const { listRef, listConfig } = useTaskListPage({
    filterFn: (task) => task.task_category_id === defaultCategoryId,
    listName: "Tasks",
    bgColor,
    iconElement: <HomeIcon size="32px" color={bgColor.primaryText} />,
  });

  return <Template listRef={listRef} listConfig={listConfig} />;
}
