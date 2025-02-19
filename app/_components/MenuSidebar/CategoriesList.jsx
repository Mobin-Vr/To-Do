import { defaultCategoryId } from "@/app/_lib/configs";
import CategoryItem from "./CategoryItem";

export default function CategoriesList({ categoriesList, toggleSidebar }) {
  const list = categoriesList.filter(
    (cat) => cat.category_id !== defaultCategoryId,
  );

  return (
    <ul className="flex flex-col gap-1 pt-2">
      {list.map((cat) => (
        <CategoryItem
          key={cat.category_id}
          category={cat}
          toggleSidebar={toggleSidebar}
        />
      ))}
    </ul>
  );
}
