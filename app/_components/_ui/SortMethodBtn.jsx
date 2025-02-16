import { SortIcon } from '@/public/icons';
import { useRef, useState } from 'react';
import useTaskStore from '../../taskStore';
import ModalTemplateCloseAble from './ModalTemplateCloseAble';
import SortMethodModal from './SortMethodModal';

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
            className='p-1 rounded-md flex items-center justify-center hover:bg-gray-300'
            style={{
               backgroundColor: hover ? bgColor.buttonHover : 'transparent',
            }}
         >
            <SortIcon />
         </button>

         <ModalTemplateCloseAble
            parentRef={sortRef}
            isModalOpen={isModalOpen}
            toggleModal={toggleModal}
            className='top-8 right-0 w-40 text-xs font-normal'
         >
            <SortMethodModal setSortMethod={setSortMethod} />
         </ModalTemplateCloseAble>
      </div>
   );
}

export default SortMethodBtn;
