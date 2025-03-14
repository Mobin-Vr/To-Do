"use client";

import { InfinityIcon } from "@/public/icons/icons";
import { useEffect, useRef } from "react";

import { useShallow } from "zustand/react/shallow";
import Template from "../../_components/Template";
import { BG_COLORS, defaultCategoryId } from "../../_lib/configs";
import useTaskStore from "../../taskStore";

export default function Page() {
  const { tasksList, getCategoriesList } = useTaskStore(
    useShallow((state) => ({
      tasksList: state.tasksList,
      getCategoriesList: state.getCategoriesList,
    })),
  );

  const listRef = useRef(null);

  const tasks = tasksList;

  const bgColor = BG_COLORS["/all"];

  const theCategory = getCategoriesList()?.find(
    (cat) => cat.category_id === defaultCategoryId,
  );

  const listConfig = {
    bgColor,
    listName: "All",
    listIcon: <InfinityIcon size="32px" color={bgColor.primaryText} />,
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
