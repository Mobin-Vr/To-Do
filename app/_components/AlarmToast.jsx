import { BellIcon, TickCircleIcon } from "@/public/icons";
import OrdinaryBtn from "./_ui/OrdinaryBtn";

export default function AlarmToast({
  task,
  t,
  toast,
  updateReminder,
  toggleCompleted,
  alarmSound,
  autoStopTimeout,
}) {
  return (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } pointer-events-auto flex h-full w-full max-w-sm flex-col items-center justify-center gap-4 rounded-md bg-gray-700 p-3 text-gray-100 opacity-95 shadow-lg ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex flex-col items-center">
        <strong className="mb-1.5 border-b-2 border-b-gray-500 text-xs">
          Reminder
        </strong>

        <p className="text-center text-sm font-light">{task.task_title}</p>
      </div>

      <div className="flex w-full max-w-fit gap-2 px-3">
        <OrdinaryBtn
          text="Snooze"
          mode="toast"
          className="w-[6.5rem] flex-1"
          onClick={() => {
            clearTimeout(autoStopTimeout);
            alarmSound.loop = false;
            alarmSound.pause();
            alarmSound.currentTime = 0;
            toast.dismiss(t.id);

            // Add new reminder 5 minutes later
            const newReminderTime = new Date(
              Date.now() + 5 * 60 * 1000,
            ).toISOString();
            updateReminder(task.task_id, newReminderTime);
          }}
        >
          <BellIcon size="15" />
        </OrdinaryBtn>

        <OrdinaryBtn
          text="Complete"
          mode="toast"
          className="w-[6.5rem] flex-1"
          onClick={() => {
            clearTimeout(autoStopTimeout);
            alarmSound.loop = false;
            alarmSound.pause();
            alarmSound.currentTime = 0;
            toast.dismiss(t.id);
            toggleCompleted(task.task_id);
          }}
        >
          <TickCircleIcon size="15" />
        </OrdinaryBtn>
      </div>
    </div>
  );
}
