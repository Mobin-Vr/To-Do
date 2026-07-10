"use client";

import { SunIcon } from "@/public/icons/icons";
import { BG_COLORS } from "@/app/_lib/configs";
import useUiStore from "@/app/_store/useUiStore";
import { useShallow } from "zustand/react/shallow";
import Template from "../Template";
import useTaskListPage from "@/app/_lib/useTaskListPage";

export default function MyDayContent() {
  const bgColor = BG_COLORS["/my-day"];

  const { showSpinner } = useUiStore(
    useShallow((state) => ({ showSpinner: state.showSpinner })),
  );

  const { listRef, listConfig } = useTaskListPage({
    filterFn: (task) => task.is_task_in_myday,
    listName: "My Day",
    bgColor,
    iconElement: <SunIcon size="32px" color={bgColor.primaryText} />,
  });

  return (
    <Template
      listRef={listRef}
      listConfig={listConfig}
      showSpinner={showSpinner}
    />
  );
}
