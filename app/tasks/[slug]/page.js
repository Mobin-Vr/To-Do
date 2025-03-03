"use client";

import Spinner from "@/app/_components/_ui/Spinner";
import Template from "@/app/_components/Template";
import { BG_COLORS } from "@/app/_lib/configs";
import useTaskStore from "@/app/taskStore";
import { notFound, redirect, useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/react/shallow";

export default function Page({}) {
  const [isRedirecting, setIsRedirecting] = useState(false);

  const slugId = useParams().slug;
  const listRef = useRef(null);
  const bgColor = BG_COLORS["/slug"];

  const {
    deleteCategoryFromStore,
    leaveInvitationFromStore,
    tasksList,
    getCategoriesList,
    showDeleteModal,
  } = useTaskStore(
    useShallow((state) => ({
      deleteCategoryFromStore: state.deleteCategoryFromStore,
      leaveInvitationFromStore: state.leaveInvitationFromStore,
      tasksList: state.tasksList,
      getCategoriesList: state.getCategoriesList,
      showDeleteModal: state.showDeleteModal,
    })),
  );

  const theCategory = getCategoriesList()?.find(
    (cat) => cat.category_id === slugId,
  );

  if (!theCategory) notFound();

  const tasks = tasksList.filter(
    (task) => task.task_category_id === theCategory.category_id,
  );

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [tasksList.length]);

  useEffect(() => {
    if (!theCategory && !isRedirecting) setIsRedirecting(true);
  }, [theCategory, isRedirecting]);

  const listConfig = theCategory
    ? {
        bgColor,
        listName: theCategory.category_title,
        listIcon: "",
        theCategory,
        tasks,
      }
    : null;

  async function handleDeleteCategory() {
    // 1. Show warn modal
    showDeleteModal("category", theCategory.category_title, async () => {
      // 2.
      setIsRedirecting(true);

      // 3. Delete the category
      await deleteCategoryFromStore(theCategory.category_id);

      // 4. Redirect the url
      redirect("/tasks");
    });
  }

  async function handleLeaveInvitation() {
    // 1. Show warn modal
    showDeleteModal("leave", theCategory.category_title, async () => {
      // 2.
      setIsRedirecting(true);

      // 3. leave the invitation
      const res = await leaveInvitationFromStore(theCategory.category_id);

      // 4. Redirect the url
      if (res.status) redirect("/tasks");
    });
  }

  // CHANGE LATER with a real loader
  if (isRedirecting) return <Spinner defaultBgColor={BG_COLORS["/default"]} />;

  return (
    <Template
      listRef={listRef}
      listConfig={listConfig}
      handleDeleteCategory={handleDeleteCategory}
      handleLeaveInvitation={handleLeaveInvitation}
      theCategoryId={theCategory.category_id}
    />
  );
}
