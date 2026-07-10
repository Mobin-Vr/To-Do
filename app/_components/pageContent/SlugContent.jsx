"use client";

import Spinner from "@/app/_components/_ui/Spinner";
import NotFoundComponent from "@/app/_components/NotFoundComponent";
import Template from "@/app/_components/Template";
import { BG_COLORS } from "@/app/_lib/configs";
import useTaskListPage from "@/app/_lib/useTaskListPage";
import useCategoryStore from "@/app/_store/useCategoryStore";
import useDeleteModalStore from "@/app/_store/useDeleteModalStore";
import useInvitationStore from "@/app/_store/useInvitationStore";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useShallow } from "zustand/react/shallow";

export default function SlugContent() {
  const router = useRouter();
  const params = useParams();
  const slugId = params?.slug;

  const [isRedirecting, setIsRedirecting] = useState(false);
  const bgColor = BG_COLORS["/slug"];

  const { deleteCategoryFromStore } = useCategoryStore(
    useShallow((state) => ({
      deleteCategoryFromStore: state.deleteCategoryFromStore,
    })),
  );
  const { leaveInvitationFromStore } = useInvitationStore(
    useShallow((state) => ({
      leaveInvitationFromStore: state.leaveInvitationFromStore,
    })),
  );
  const { showDeleteModal } = useDeleteModalStore(
    useShallow((state) => ({ showDeleteModal: state.showDeleteModal })),
  );

  // Read categories list to check if data is loaded
  const { categoriesList } = useCategoryStore(
    useShallow((state) => ({
      categoriesList: state.categoriesList,
    })),
  );

  // Call hook with placeholder listName (overwritten later)
  const { listRef, listConfig, theCategory } = useTaskListPage({
    filterFn: (task) => task.task_category_id === slugId,
    listName: "", // placeholder, will be replaced by actual category title
    bgColor,
    iconElement: "",
    categoryId: slugId,
  });

  // Show spinner while categories are still loading (or no slug)
  if (!slugId || !categoriesList) {
    return <Spinner defaultBgColor={BG_COLORS["/default"]} />;
  }

  // Category not found in the list
  if (!theCategory) {
    return <NotFoundComponent />;
  }

  // Override listName with actual category title
  const finalListConfig = {
    ...listConfig,
    listName: theCategory.category_title,
  };

  async function handleDeleteCategory() {
    showDeleteModal("category", theCategory.category_title, async () => {
      setIsRedirecting(true);
      await deleteCategoryFromStore(theCategory.category_id);
      router.push("/tasks");
    });
  }

  async function handleLeaveInvitation() {
    showDeleteModal("leave", theCategory.category_title, async () => {
      setIsRedirecting(true);
      const res = await leaveInvitationFromStore(theCategory.category_id);
      if (res.status) router.push("/tasks");
    });
  }

  if (isRedirecting) return <Spinner defaultBgColor={BG_COLORS["/default"]} />;

  return (
    <Template
      listRef={listRef}
      listConfig={finalListConfig}
      handleDeleteCategory={handleDeleteCategory}
      handleLeaveInvitation={handleLeaveInvitation}
      theCategoryId={theCategory.category_id}
    />
  );
}
