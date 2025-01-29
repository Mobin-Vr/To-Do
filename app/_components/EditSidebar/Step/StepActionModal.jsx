import { getDateNowIso } from '@/app/_lib/utils';
import useTaskStore from '@/app/taskStore';
import { PlusIcon, TickCircleIcon, TrashIcon } from '@/public/icons';
import { useShallow } from 'zustand/react/shallow';
import { ModalActionButton } from '../remiderBoxModals/ModalActionBtn';

export default function StepActionModal({ task, step }) {
   const { updateStep, removeStep, addTaskToStore } = useTaskStore(
      useShallow((state) => ({
         updateStep: state.updateStep,
         removeStep: state.removeStep,
         addTaskToStore: state.addTaskToStore,
      }))
   );

   function handleUpdate() {
      updateStep(task.id, step.id, { isCompleted: !step.isCompleted });
   }

   function handleRemove() {
      removeStep(task.id, step.id);
   }

   function handlePromote() {
      const promotedStep = {
         id: step.id,
         title: step.title,
         isCompleted: step.isCompleted,
         isStarred: false,
         note: '',
         categoryId: task.categoryId,
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
      removeStep(task.id, step.id);
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
            icon={<TrashIcon />}
            label='Delete step'
            onClick={handleRemove}
         />
      </>
   );
}
