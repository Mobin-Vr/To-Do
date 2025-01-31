import { defaultCategoryId } from '@/app/_lib/utils';
import CategoryItem from './CategoryItem';

export default function CategoriesList({ categoriesList, toggleSidebar }) {
   return (
      <ul className=' pt-2'>
         {categoriesList
            .filter((cat) => cat.category_id !== defaultCategoryId)
            .map((cat) => (
               <CategoryItem
                  key={cat.category_id}
                  category={cat}
                  toggleSidebar={toggleSidebar}
               />
            ))}
      </ul>
   );
}
