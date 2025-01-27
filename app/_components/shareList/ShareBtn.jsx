import { ShareIcon } from '@/public/icons';
import { useState } from 'react';
import ModalTemplate from '../_ui/ModalTemplate';
import SharedListmodal from './ShareListModal';

export default function ShareBtn({}) {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const toggleModal = () => setIsModalOpen(!isModalOpen);

   return (
      <div>
         <button
            onClick={toggleModal}
            className='p-1 rounded-sm flex items-center justify-center hover:bg-gray-300'
         >
            <ShareIcon />
         </button>

         <ModalTemplate
            isModalOpen={isModalOpen}
            toggleModal={toggleModal}
            className='fixed right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 w-4/6 max-w-80 h-full max-h-[28rem] text-xs font-normal'
         >
            <SharedListmodal toggleModal={toggleModal} />
         </ModalTemplate>
      </div>
   );
}
