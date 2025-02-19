"use client";

import { TodayCalendarIcon } from "@/public/icons";
import { useEffect, useRef } from "react";

import { useShallow } from "zustand/react/shallow";
import Template from "../../_components/Template";
import { BG_COLORS, defaultCategoryId } from "../../_lib/configs";
import useTaskStore from "../../taskStore";

export default function Page() {
  const listRef = useRef(null);

  const { tasksList, getCategoriesList } = useTaskStore(
    useShallow((state) => ({
      tasksList: state.tasksList,
      getCategoriesList: state.getCategoriesList,
    })),
  );

  const theCategory = getCategoriesList()?.find(
    (cat) => cat.category_id === defaultCategoryId,
  );

  const tasks = tasksList.filter(
    (task) => task.is_task_in_myday || task.task_reminder || task.task_due_date,
  );

  const bgColor = BG_COLORS["/planned"];

  const listConfig = {
    bgColor,
    listName: "Planned",
    listIcon: <TodayCalendarIcon size="32px" color={bgColor.primaryText} />,
    theCategory,
    tasks,
  };

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [tasks.length]);

  return <Template listRef={listRef} listConfig={listConfig} />;
}
