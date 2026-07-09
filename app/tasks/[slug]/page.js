"use client";

import Spinner from "@/app/_components/_ui/Spinner";
import NotFoundComponent from "@/app/_components/NotFoundComponent";
import Template from "@/app/_components/Template";
import { BG_COLORS } from "@/app/_lib/configs";
import useTaskStore from "@/app/_store/useTaskStore";
import useCategoryStore from "@/app/_store/useCategoryStore";
import useInvitationStore from "@/app/_store/useInvitationStore";
import useDeleteModalStore from "@/app/_store/useDeleteModalStore";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/react/shallow";

export default function Page() {
  const router = useRouter();

  const [isRedirecting, setIsRedirecting] = useState(false);
  const [slugId, setSlugId] = useState(null);

  const params = useParams();
  const listRef = useRef(null);
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
  const { showDeleteModal } = useDeleteModalStore(
    useShallow((state) => ({
      showDeleteModal: state.showDeleteModal,
    })),
  );

  useEffect(() => {
    if (params?.slug) {
      setSlugId(params.slug);
    }
  }, [params]);

  const categories = categoriesList;

  if (!categories || !slugId)
    return <Spinner defaultBgColor={BG_COLORS["/default"]} />;

  const theCategory = categories.find((cat) => cat.category_id === slugId);

  if (!theCategory) {
    return <NotFoundComponent />;
  }

  const tasks = tasksList.filter(
    (task) => task.task_category_id === theCategory.category_id,
  );

  const listConfig = {
    bgColor,
    listName: theCategory.category_title,
    listIcon: "",
    theCategory,
    tasks,
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
      listConfig={listConfig}
      handleDeleteCategory={handleDeleteCategory}
      handleLeaveInvitation={handleLeaveInvitation}
      theCategoryId={theCategory.category_id}
    />
  );
}