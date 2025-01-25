import { RefreshCw, SettingsIcon, UserRoundCog } from '@/public/icons';

export default function ProfileModal() {
   return (
      <div className='text-sm'>
         <div className='py-2.5 px-3 border-b border-gray-100 flex items-center gap-4 hover:bg-accent-50'>
            <UserRoundCog size='18px' />
            <h4>Manage accounts</h4>
         </div>

         <div className='py-2.5 px-3 border-b border-gray-100 flex items-center gap-4 hover:bg-accent-50'>
            <RefreshCw size='18px' />
            <h4>Syncing</h4>
         </div>

         <div className='py-2.5 px-3 flex items-center gap-4 hover:bg-accent-50'>
            <SettingsIcon size='18px' />
            <h4>Settings</h4>
         </div>
      </div>
   );
}
