import { getDateNowIso } from "@/app/_lib/utils";
import useTaskStore from "@/app/taskStore";
import {
  CircleIcon,
  PlusIcon,
  TickCircleIcon,
  TrashIcon,
} from "@/public/icons/icons";
import { useShallow } from "zustand/react/shallow";
import { ModalActionButton } from "../reminderBoxModals/ModalActionBtn";

export default function StepActionModal({ task, step }) {
  const { updateTaskInStore, addTaskToStore, getUserState, showDeleteModal } =
    useTaskStore(
      useShallow((state) => ({
        updateTaskInStore: state.updateTaskInStore,
        addTaskToStore: state.addTaskToStore,
        getUserState: state.getUserState,
        showDeleteModal: state.showDeleteModal,
      })),
    );

  function handleUpdate() {
    const updatedFields = {
      is_step_completed: !step.is_step_completed,
      step_completed_at: step.is_step_completed ? null : getDateNowIso(),
    };

    updateTaskInStore(task.task_id, {
      task_steps: task.task_steps.map((theStep) =>
        theStep.step_id === step.step_id
          ? { ...theStep, ...updatedFields }
          : theStep,
      ),
    });
  }

  function handleRemove() {
    // 1. Show warn modal
    showDeleteModal("step", step.step_title, async () => {
      // 2. Remove the step
      updateTaskInStore(task.task_id, {
        task_steps: task.task_steps.filter((s) => s.step_id !== step.step_id),
      });
    });
  }

  function handlePromote() {
    const promotedStep = {
      task_id: step.step_id,
      task_owner_id: getUserState().user_id,
      task_title: step.step_title,
      task_category_id: task.task_category_id,
      task_category_title: "Tasks",
      task_note: "",
      task_due_date: null,
      task_reminder: null,
      task_repeat: null,
      task_steps: [],
      task_created_at: getDateNowIso(),
      task_completed_at: step.step_completed_at,
      task_updated_at: step.step_updated_at,
      is_task_completed: step.is_step_completed,
      is_task_starred: false,
      is_task_in_myday: false,
    };

    // Add the promoted step in tasksList
    addTaskToStore(promotedStep);

    // Remove the step
    updateTaskInStore(task.task_id, {
      task_steps: task.task_steps.filter((s) => s.step_id !== step.step_id),
    });
  }

  return (
    <>
      <ModalActionButton
        icon={step.is_step_completed ? <CircleIcon /> : <TickCircleIcon />}
        onClick={handleUpdate}
        label={
          step.is_step_completed ? "Mark as not completed" : "Mark as completed"
        }
      />

      <ModalActionButton
        icon={<PlusIcon />}
        label="Promote to task"
        className="border-b border-gray-100"
        onClick={handlePromote}
      />

      <ModalActionButton
        icon={<TrashIcon />}
        label="Delete step"
        onClick={handleRemove}
      />
    </>
  );
}
