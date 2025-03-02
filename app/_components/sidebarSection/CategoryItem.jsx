import { ListIcon } from "@/public/icons/icons";
import SidebarLink from "./SidebarLink";

export default function CategoryItem({ category, toggleSidebar }) {
  const hasCollab = category.has_category_collaborator;

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
