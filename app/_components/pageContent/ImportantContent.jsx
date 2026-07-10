"use client";

import { StarIcon } from "@/public/icons/icons";
import { BG_COLORS } from "@/app/_lib/configs";
import Template from "../Template";
import useTaskListPage from "@/app/_lib/useTaskListPage";

export default function ImportantContent() {
  const bgColor = BG_COLORS["/important"];

  const { listRef, listConfig } = useTaskListPage({
    filterFn: (task) => task.is_task_starred,
    listName: "Important",
    bgColor,
    iconElement: <StarIcon size="32px" color={bgColor.primaryText} />,
  });

  return <Template listRef={listRef} listConfig={listConfig} />;
}
