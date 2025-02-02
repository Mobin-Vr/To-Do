import useTaskStore from '@/app/taskStore';
import { ArrowIcon } from '@/public/icons';
import { useShallow } from 'zustand/react/shallow';
import OrdinaryBtn from '../_ui/OrdinaryBtn';
import { Switch } from '../_ui/switch';

export default function MoreOptionsView({
   onBackToLinkCreated,
   toggleModal,
   link,
   theCategoryId,
}) {
   const {
      invitations,
      setInvitationAccessLimitInStore: setLimit,
      stopSharingInvitationInStore: stopSharing,
   } = useTaskStore(
      useShallow((state) => ({
         invitations: state.invitations,
         setInvitationAccessLimitInStore: state.setInvitationAccessLimitInStore,
         stopSharingInvitationInStore: state.stopSharingInvitationInStore,
      }))
   );

   const limitAccess = invitations.find(
      (inv) => inv.invitation_category_id === theCategoryId
   )?.invitation_limit_access;

   async function handleLimitAccess() {
      await setLimit(theCategoryId);
   }

   async function handleStopSharing() {
      await stopSharing(theCategoryId);
      toggleModal();
   }

   return (
      <div className='h-full flex flex-col justify-between text-sm font-light text-black'>
         <div className='w-full text-center px-2 py-3 border-b border-b-gray-300'>
            <p className='font-normal'>More options</p>
            <button
               onClick={onBackToLinkCreated}
               className='transform scale-x-[-1] absolute top-2 left-2 text-gray-500 p-2'
            >
               <ArrowIcon />
            </button>
         </div>

         <div className='w-full px-3 py-4 border-b border-b-gray-300'>
            <div className='w-full flex justify-between items-center mb-1'>
               <p className='self-center'>Limit access to current members</p>
               <Switch
                  checked={limitAccess}
                  onCheckedChange={handleLimitAccess}
                  id='airplane-mode'
                  className='data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-500'
               />
            </div>

            <p className='text-gray-700 text-xs'>
               Toggle to prevent joining new people.
            </p>
         </div>

         <div className='px-3 py-4 border-b w-full border-b-gray-300 flex-1'>
            <p className='mb-2'>Invitation link</p>
            <span className='text-gray-700 text-xs'>{link}</span>
         </div>

         <div className='px-3 py-3 w-full'>
            <OrdinaryBtn
               onClick={handleStopSharing}
               text='Stop sharing'
               mode='warn'
               className='font-thin text-sm w-full'
            />
         </div>
      </div>
   );
}
