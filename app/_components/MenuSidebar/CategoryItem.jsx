import MenuBtn from '../_ui/MenuBtn';
import SidebarLink from './SidebarLink';

export default function CategoryItem({ category, toggleSidebar }) {
   return (
      <SidebarLink
         href={`/tasks/${category.id}`}
         title={category.title}
         categoryId={category.id}
         onClick={toggleSidebar}
      >
         <MenuBtn className='text-[#3063ab]' />
      </SidebarLink>
   );
}
