import CompleteBtn from "../_ui/CompleteBtn";
import StarBtn from "../_ui/StarBtn";
import BoxTemplate from "./BoxTemplate";
import Steps from "./stepSection/Steps";
import TaskTitleEditor from "./TaskTitleEditor";

function TaskOverView({ task, bgColor }) {
  return (
    <BoxTemplate className="flex flex-col p-3 py-0">
      <div className="flex items-start justify-between">
        <CompleteBtn
          task={task}
          className="ml-0.5 mt-3 flex justify-center"
          bgColor={bgColor}
        />

        <TaskTitleEditor
          task={task}
          className="flex-1 overflow-hidden whitespace-pre-wrap break-words text-xl font-medium"
        />

        <StarBtn task={task} className="mr-2 mt-3" bgColor={bgColor} />
      </div>

      <Steps task={task} bgColor={bgColor} />
    </BoxTemplate>
  );
}

export default TaskOverView;
