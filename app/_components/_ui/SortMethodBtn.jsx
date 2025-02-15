import { SortIcon } from '@/public/icons';
import { useRef, useState } from 'react';
import useTaskStore from '../../taskStore';
import SortMethodModal from './SortMethodModal';
import ModalTemplate from './ModalTemplate';

function SortMethodBtn({ bgColor }) {
   const sortRef = useRef(null);
   const [hover, setHover] = useState(false);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const setSortMethod = useTaskStore((state) => state.setSortMethod);

   const toggleModal = () => setIsModalOpen(!isModalOpen);

   return (
      <div ref={sortRef} className='relative'>
         <button
            onClick={toggleModal}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className='p-1 rounded-sm flex items-center justify-center hover:bg-gray-300'
            style={{
               backgroundColor: hover ? bgColor.buttonHover : 'transparent',
            }}
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
