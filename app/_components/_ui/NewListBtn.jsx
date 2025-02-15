import { generateNewUuid, getDateNowIso } from '@/app/_lib/utils';
import useTaskStore from '@/app/taskStore';
import { PlusIcon } from '@/public/icons';
import { redirect } from 'next/navigation';
import { useShallow } from 'zustand/react/shallow';

export default function NewListBtn({
   className,
   getUserInfo,
   addCategoryToStore,
}) {
   const { toggleSidebar, toggleTitleFocus } = useTaskStore(
      useShallow((state) => ({
         toggleSidebar: state.toggleSidebar,
         toggleTitleFocus: state.toggleTitleFocus,
      }))
   );

   function handleNewList() {
      const uuId = generateNewUuid();

      const newCategory = {
         category_id: uuId,
         category_title: '',
         category_owner_id: getUserInfo().user_id,
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
         className={`flex gap-3 text-sm w-full text-gray-800 items-center  hover:bg-accent-50 p-1 mt-1 rounded-sm ${className}`}
      >
         <PlusIcon color='#000' />
         <span>New list</span>
      </button>
   );
}
