"use client";

import { useEffect, useRef } from "react";
import { useShallow } from "zustand/react/shallow";
import useTaskStore from "@/app/_store/useTaskStore";
import useCategoryStore from "@/app/_store/useCategoryStore";
import { defaultCategoryId } from "@/app/_lib/configs";

export default function useTaskListPage({
  filterFn,
  listName,
  bgColor,
  iconElement,
  initialCategory = undefined,
  extraListConfig = {},
}) {
  const listRef = useRef(null);

  const { tasksList } = useTaskStore(
    useShallow((state) => ({ tasksList: state.tasksList })),
  );
  const { categoriesList } = useCategoryStore(
    useShallow((state) => ({ categoriesList: state.categoriesList })),
  );

  // Determine categoryId from initialCategory or fallback to default
  const categoryId = initialCategory?.category_id ?? defaultCategoryId;

  // Use the provided category if available; otherwise search the store
  const theCategory =
    initialCategory ??
    categoriesList?.find((cat) => cat.category_id === categoryId);

  const tasks = tasksList.filter(filterFn) || [];

  const listConfig = {
    bgColor,
    listName,
    listIcon: iconElement,
    theCategory,
    tasks,
    ...extraListConfig,
  };

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [tasks.length]);

  return { listRef, listConfig, tasks, theCategory };
}
