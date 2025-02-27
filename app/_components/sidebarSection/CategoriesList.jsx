import { defaultCategoryId } from "@/app/_lib/configs";
import CategoryItem from "./CategoryItem";

export default function CategoriesList({ categoriesList, toggleSidebar }) {
  const list = categoriesList.filter(
    (cat) => cat.category_id !== defaultCategoryId,
  );

  const sortedListByDate = list.sort(
    (a, b) => new Date(a.category_created_at) - new Date(b.category_created_at),
  );

  return (
    <ul className="flex flex-col gap-1 pt-2">
      {sortedListByDate.map((cat) => (
        <CategoryItem
          key={cat.category_id}
          category={cat}
          toggleSidebar={toggleSidebar}
        />
      ))}
    </ul>
  );
}
