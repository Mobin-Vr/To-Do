"use client";

import { HomeIcon } from "@/public/icons/icons";
import { useEffect, useRef } from "react";

import { BG_COLORS, defaultCategoryId } from "../_lib/configs";
import useTaskStore from "../_store/useTaskStore";
import useCategoryStore from "../_store/useCategoryStore";
import Template from "../_components/Template";
import { useShallow } from "zustand/react/shallow";

export default function Page() {
  const { tasksList } = useTaskStore(
    useShallow((state) => ({
      tasksList: state.tasksList,
    })),
  );
  const { categoriesList } = useCategoryStore(
    useShallow((state) => ({
      categoriesList: state.categoriesList,
    })),
  );

  const tasks = tasksList.filter(
    (task) => task.task_category_id === defaultCategoryId,
  );

  const theCategory = categoriesList?.find(
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
