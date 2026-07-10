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
  categoryId = defaultCategoryId,
  extraListConfig = {},
  scrollDeps,
}) {
  const listRef = useRef(null);

  const { tasksList } = useTaskStore(
    useShallow((state) => ({ tasksList: state.tasksList })),
  );
  const { categoriesList } = useCategoryStore(
    useShallow((state) => ({ categoriesList: state.categoriesList })),
  );

  const theCategory = categoriesList?.find(
    (cat) => cat.category_id === categoryId,
  );

  const tasks = tasksList.filter(filterFn) || [];

  const listConfig = {
    bgColor,
    listName,
    listIcon: iconElement,
    theCategory,
    tasks,
    ...extraListConfig,
  };

  useEffect(
    () => {
      if (listRef.current) {
        listRef.current.scrollIntoView({ behavior: "smooth" });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    scrollDeps ?? [tasks.length],
  );

  return { listRef, listConfig, tasks, theCategory };
}
