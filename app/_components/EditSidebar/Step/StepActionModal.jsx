import { getDateNowIso } from '@/app/_lib/utils';
import useTaskStore from '@/app/taskStore';
import { PlusIcon, TickCircleIcon, TrashIcon } from '@/public/icons';
import { useShallow } from 'zustand/react/shallow';
import { ModalActionButton } from '../remiderBoxModals/ModalActionBtn';

export default function StepActionModal({ task, step }) {
   const { updateStep, removeStep, addTaskToStore, getUserInfo } = useTaskStore(
      useShallow((state) => ({
         updateStep: state.updateStep,
         removeStep: state.removeStep,
         addTaskToStore: state.addTaskToStore,
         getUserInfo: state.getUserInfo,
      }))
   );

   function handleUpdate() {
      updateStep(task.task_id, step.step_id, {
         isCompleted: !step.isCompleted,
      });
   }

   function handleRemove() {
      removeStep(task.task_id, step.step_id);
   }

   function handlePromote() {
      const promotedStep = {
         task_id: step.step_id,
         task_owner_id: getUserInfo().user_id,
         task_title: step.step_title,
         task_categoryId: task.task_category_id,
         task_note: '',
         task_due_date: null,
         task_reminder: null,
         task_repeat: null,
         task_steps: [],
         task_created_at: getDateNowIso(),
         task_updated_at: step.step_updated_at,
         task_completed_at: step.step_completed_at,
         is_task_completed: step.is_step_completed,
         is_task_starred: false,
         is_task_in_myday: false,
      };

      addTaskToStore(promotedStep);
      removeStep(task.task_id, step.step_id);
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
