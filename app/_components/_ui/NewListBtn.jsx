import { generateNewUuid, getDateNowIso } from '@/app/_lib/utils';
import useTaskStore from '@/app/store';
import { PlusIcon } from '@/public/icons';
import { redirect } from 'next/navigation';

export default function NewListBtn({
   className,
   userInfo,
   addCategoryToStore,
}) {
   const toggleSidebar = useTaskStore((state) => state.toggleSidebar);

   function handleNewList() {
      const uuId = generateNewUuid();
      const newCategory = {
         id: uuId,
         title: 'list-1',
         owner_id: userInfo.id,
         created_at: getDateNowIso(),
         is_shared: false,
      };

      addCategoryToStore(newCategory);
      toggleSidebar();
      redirect(`/tasks/${uuId}`);
   }
   return (
      <button
         onClick={handleNewList}
         className={`flex gap-3 text-sm text-gray-800 items-center  hover:bg-accent-50 py-1.5 pl-1 rounded-sm ${className}`}
      >
         <PlusIcon color='#000' />
         <span>New list</span>
      </button>
   );
}
