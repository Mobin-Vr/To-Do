import { SyncIcon } from '@/public/icons';
import { useRef, useState } from 'react';
import InputBtnTempl from '../_ui/InputBtnTempl';
import ModalTemplate from '../_ui/ModalTemplate';
import AddRepeatModal from '../EditSidebar/remiderBoxModals/AddRepeatModal';
import ModalTemplateCloseAble from '../_ui/ModalTemplateCloseAble';

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
            icon={<SyncIcon />}
            onClick={toggleModal}
         />

         <ModalTemplateCloseAble
            parentRef={AddRepeatRef}
            isModalOpen={isModalOpen}
            toggleModal={toggleModal}
            className='bottom-[3rem] -right-3.5 w-auto text-xs font-normal'
         >
            <AddRepeatModal
               updateDueDate={setTaskDueDate}
               updateRepeat={setTaskRepeat}
               isForTaskInput={true}
               taskDueDate={taskDueDate}
               taskRepeat={taskRepeat}
            />
         </ModalTemplateCloseAble>
      </div>
   );
}
