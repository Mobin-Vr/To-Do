"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import Spinner from "@/app/_components/_ui/Spinner";
import Template from "@/app/_components/Template";
import { BG_COLORS } from "@/app/_lib/configs";
import useTaskListPage from "@/app/_lib/useTaskListPage";
import useCategoryStore from "@/app/_store/useCategoryStore";
import useDeleteModalStore from "@/app/_store/useDeleteModalStore";
import useInvitationStore from "@/app/_store/useInvitationStore";

export default function SlugContent({ category }) {
  const router = useRouter();
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

  const { listRef, listConfig } = useTaskListPage({
    filterFn: (task) => task.task_category_id === category.category_id,
    listName: category.category_title,
    bgColor,
    iconElement: "",
    initialCategory: category,
  });

  if (isRedirecting) return <Spinner defaultBgColor={BG_COLORS["/default"]} />;

  return (
    <Template
      listRef={listRef}
      listConfig={listConfig}
      handleDeleteCategory={() =>
        showDeleteModal("category", category.category_title, async () => {
          setIsRedirecting(true);
          await deleteCategoryFromStore(category.category_id);
          router.push("/tasks");
        })
      }
      handleLeaveInvitation={() =>
        showDeleteModal("leave", category.category_title, async () => {
          setIsRedirecting(true);
          const res = await leaveInvitationFromStore(category.category_id);
          if (res.status) router.push("/tasks");
        })
      }
      theCategoryId={category.category_id}
    />
  );
}
