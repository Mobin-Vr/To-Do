"use client";

import { useSearchParams } from "next/navigation";
import Template from "@/app/_components/Template";
import { BG_COLORS } from "@/app/_lib/configs";
import useTaskListPage from "@/app/_lib/useTaskListPage";

export default function SearchContent() {
  const query = useSearchParams().get("query") || "";
  const bgColor = BG_COLORS["/search"];

  const { listRef, listConfig, tasks } = useTaskListPage({
    filterFn: (task) =>
      task.task_title.toLowerCase().includes(query.toLowerCase()),
    listName: "Search",
    bgColor,
    iconElement: "",
    extraListConfig: { query },
    scrollDeps: [tasks.length],
  });

  return (
    <Template
      listRef={listRef}
      listConfig={listConfig}
      showInput={false}
      showSearch={tasks.length === 0}
    />
  );
}
