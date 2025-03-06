import { generateNewUuid, getDateNowIso } from "@/app/_lib/utils";
import useTaskStore from "@/app/taskStore";
import { PlusIcon } from "@/public/icons/icons";
import { redirect } from "next/navigation";
import { useShallow } from "zustand/react/shallow";

export default function NewListBtn({
  className,
  getUserState,
  addCategoryToStore,
}) {
  const { toggleSidebar, toggleTitleFocus } = useTaskStore(
    useShallow((state) => ({
      toggleSidebar: state.toggleSidebar,
      toggleTitleFocus: state.toggleTitleFocus,
    })),
  );

  function handleNewList() {
    const uuId = generateNewUuid();

    const newCategory = {
      category_id: uuId,
      category_title: "",
      category_owner_id: getUserState().user_id,
      category_created_at: getDateNowIso(),
      has_category_invitation: false,
      has_category_collaborator: false,
    };

    addCategoryToStore(newCategory);
    toggleTitleFocus(true);
    toggleSidebar();

    redirect(`/tasks/${uuId}`);
  }
  return (
    <button
      onClick={handleNewList}
      className={`mt-1 flex h-12 w-full items-center gap-3 rounded-md px-1 text-sm hover:bg-sidebar-hover ${className}`}
    >
      <PlusIcon color="#000" />
      <span>New list</span>
    </button>
  );
}
