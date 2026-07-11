"use client";

import { InfinityIcon } from "@/public/icons/icons";
import { BG_COLORS } from "@/app/_lib/configs";
import Template from "@/app/_components/Template";
import useTaskListPage from "@/app/_lib/useTaskListPage";

export default function Page() {
  const bgColor = BG_COLORS["/all"];

  const { listRef, listConfig } = useTaskListPage({
    filterFn: () => true,
    listName: "All",
    bgColor,
    iconElement: <InfinityIcon size="32px" color={bgColor.primaryText} />,
  });

  return <Template listRef={listRef} listConfig={listConfig} />;
}
