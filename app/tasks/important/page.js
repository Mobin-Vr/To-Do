"use client";

import { StarIcon } from "@/public/icons/icons";
import { useEffect, useRef } from "react";

import { useShallow } from "zustand/react/shallow";
import Template from "../../_components/Template";
import { BG_COLORS, defaultCategoryId } from "../../_lib/configs";
import useTaskStore from "../../_store/useTaskStore";
import useCategoryStore from "../../_store/useCategoryStore";

export default function Page() {
  const listRef = useRef(null);

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

  const theCategory = categoriesList?.find(
    (cat) => cat.category_id === defaultCategoryId,
  );

  const tasks = tasksList.filter((task) => task.is_task_starred) || [];

  const bgColor = BG_COLORS["/important"];

  const listConfig = {
    bgColor,
    listName: "Important",
    listIcon: <StarIcon size="32px" color={bgColor.primaryText} />,
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