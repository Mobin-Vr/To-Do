import MenuBtn from '../_ui/MenuBtn';
import SidebarLink from './SidebarLink';

export default function CategoryItem({ category, toggleSidebar }) {
   return (
      <SidebarLink
         href={`/tasks/${category.category_id}`}
         title={category.category_title}
         categoryId={category.category_id}
         onClick={toggleSidebar}
      >
         <MenuBtn className='text-[#3063ab]' />
      </SidebarLink>
   );
}
