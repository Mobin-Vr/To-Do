import { SortIcon } from '@/public/icons';
import { useRef, useState } from 'react';
import useTaskStore from '../../taskStore';
import SortMethodModal from './SortMethodModal';
import ModalTemplate from './ModalTemplate';

function SortMethodBtn({}) {
   const sortRef = useRef(null);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const setSortMethod = useTaskStore((state) => state.setSortMethod);

   const toggleModal = () => setIsModalOpen(!isModalOpen);

   return (
      <div ref={sortRef} className='relative'>
         <button
            onClick={toggleModal}
            className='p-1 rounded-sm flex items-center justify-center hover:bg-gray-300'
         >
            <SortIcon />
         </button>

         <ModalTemplate
            parentRef={sortRef}
            isModalOpen={isModalOpen}
            toggleModal={toggleModal}
            className='top-8 right-0 w-40 text-xs font-normal'
         >
            <SortMethodModal setSortMethod={setSortMethod} />
         </ModalTemplate>
      </div>
   );
}

export default SortMethodBtn;
