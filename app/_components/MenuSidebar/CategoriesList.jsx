import { defaultCategoryId } from '@/app/_lib/utils';
import CategoryItem from './CategoryItem';

export default function CategoriesList({ categoriesList, toggleSidebar }) {
   return (
      <ul className=' pt-2'>
         {categoriesList
            .filter((cat) => cat.id !== defaultCategoryId)
            .map((cat) => (
               <CategoryItem
                  key={cat.id}
                  category={cat}
                  toggleSidebar={toggleSidebar}
               />
            ))}
      </ul>
   );
}
