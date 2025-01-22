import { PlusIcon, TickCircleIcon, TrashIcon } from '@/public/icons';
import { ModalActionButton } from '../remiderBoxModals/ModalActionBtn';
import useTaskStore from '@/app/store';
import { useShallow } from 'zustand/react/shallow';
import { getDateNowIso } from '@/app/_lib/utils';

export default function StepActionModal({ taskId, step }) {
   const { updateStep, removeStep, addTaskToStore } = useTaskStore(
      useShallow((state) => ({
         updateStep: state.updateStep,
         removeStep: state.removeStep,
         addTaskToStore: state.addTaskToStore,
      }))
   );

   function handleUpdate() {
      updateStep(taskId, step.id, { isCompleted: !step.isCompleted });
   }

   function handleRemove() {
      removeStep(taskId, step.id);
   }

   function handlePromote() {
      const promotedStep = {
         id: step.id,
         title: step.title,
         isCompleted: step.isCompleted,
         isStarred: false,
         note: '',
         categoryId: null,
         isAddedToMyDay: false,
         updatedAt: step.updatedAt,
         completedAt: step.completedAt,
         createdAt: getDateNowIso(),
         dueDate: null,
         reminder: null,
         repeat: null,
         parentTaskId: null,
         assignedTo: null,
         steps: [],
      };

      addTaskToStore(promotedStep);
      removeStep(taskId, step.id);
   }

   return (
      <>
         <ModalActionButton
            icon={<TickCircleIcon size='16px' />}
            label='Mark as completed'
            onClick={handleUpdate}
         />

         <ModalActionButton
            icon={<PlusIcon size='16px' />}
            label='Promote to task'
            className='border-b border-gray-100'
            onClick={handlePromote}
         />

         <ModalActionButton
            icon={<TrashIcon size='16px' />}
            label='Delete step'
            onClick={handleRemove}
         />
      </>
   );
}
