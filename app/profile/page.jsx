import { UserProfile } from '@clerk/nextjs';
import MenuBtn from '../_components/_ui/MenuBtn';
import { BG_COLORS } from '../_lib/configs';

export default function Page() {
   const bgColor = BG_COLORS['/my-day'];
   return (
      <div className='relative flex justify-center items-center h-full w-full bg-gray-50'>
         <MenuBtn className='absolute top-6 left-8 z-10' bgColor={bgColor} />

         <UserProfile />
      </div>
   );
}
