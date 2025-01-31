import { RefreshCw } from '@/public/icons';
import { useRef, useState } from 'react';
import InputBtnTempl from '../_ui/InputBtnTempl';
import ModalTemplate from '../_ui/ModalTemplate';
import AddRepeatModal from '../EditSidebar/remiderBoxModals/AddRepeatModal';

export default function InputAddRepeat({
   setTaskRepeat,
   setTaskDueDate,
   taskDueDate,
   taskRepeat,
   className,
}) {
   const AddRepeatRef = useRef(null);
   const [isModalOpen, setIsModalOpen] = useState(false);

   const toggleModal = () => setIsModalOpen(!isModalOpen);

   return (
      <div ref={AddRepeatRef}>
         <InputBtnTempl
            className={`${className}`}
            icon={<RefreshCw size='16px' color='#222' />}
            onClick={toggleModal}
         />

         <ModalTemplate
            parentRef={AddRepeatRef}
            isModalOpen={isModalOpen}
            toggleModal={toggleModal}
            className='bottom-[5.3rem] right-6 w-auto text-xs font-normal'
         >
            <AddRepeatModal
               updateDueDate={setTaskDueDate}
               updateRepeat={setTaskRepeat}
               isForTaskInput={true}
               taskDueDate={taskDueDate}
               taskRepeat={taskRepeat}
            />
         </ModalTemplate>
      </div>
   );
}
