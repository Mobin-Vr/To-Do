"use client";

import { HomeIcon } from "@/public/icons/icons";
import { useEffect, useRef } from "react";

import { BG_COLORS, defaultCategoryId } from "../_lib/configs";
import useTaskStore from "../taskStore";
import Template from "../_components/Template";
import { useShallow } from "zustand/react/shallow";

export default function Page() {
  const { tasksList, getCategoriesList } = useTaskStore(
    useShallow((state) => ({
      tasksList: state.tasksList,
      getCategoriesList: state.getCategoriesList,
    })),
  );

  const tasks = tasksList.filter(
    (task) => task.task_category_id === defaultCategoryId,
  );

  const theCategory = getCategoriesList()?.find(
    (cat) => cat.category_id === defaultCategoryId,
  );

  const bgColor = BG_COLORS["/tasks"];

  const listConfig = {
    bgColor,
    listName: "Tasks",
    listIcon: <HomeIcon size="32px" color={bgColor.primaryText} />,
    theCategory,
    tasks,
  };

  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [tasksList.length]);

  return <Template listRef={listRef} listConfig={listConfig} />;
}
