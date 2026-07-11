"use client";

import useCategoryStore from "@/app/_store/useCategoryStore";
import useInvitationStore from "@/app/_store/useInvitationStore";
import useTaskStore from "@/app/_store/useTaskStore";
import { useEffect } from "react";

export default function TasksStoreHydrator({
  tasks,
  categories,
  ownerInvitations,
  joinedInvitations,
  children,
}) {
  useEffect(() => {
    // Hydrate Zustand stores with the server‑fetched data.
    // After this point, all client components can consume the data.
    useTaskStore.getState().setTasksList(tasks);
    useCategoryStore.getState().setCategoriesList(categories);
    useInvitationStore.getState().setInvitations(ownerInvitations);
    useInvitationStore.getState().setSharedWithMe(joinedInvitations);
  }, [tasks, categories, ownerInvitations, joinedInvitations]);

  return children;
}
