import { ListIcon } from "@/public/icons/icons";
import SidebarLink from "./SidebarLink";
import useTaskStore from "@/app/taskStore";
import { useShallow } from "zustand/react/shallow";

export default function CategoryItem({ category, toggleSidebar }) {
  const { invitations } = useTaskStore(
    useShallow((state) => ({
      invitations: state.invitations,
    })),
  );

  const hasCollab = invitations.includes(
    (invitation) => invitation.invitation_category_id === category.category_id,
  );

  return (
    <SidebarLink
      href={`/tasks/${category.category_id}`}
      title={category.category_title}
      categoryId={category.category_id}
      onClick={toggleSidebar}
      hasCollab={hasCollab}
    >
      <span className="text-blue-600">
        <ListIcon />
      </span>
    </SidebarLink>
  );
}
