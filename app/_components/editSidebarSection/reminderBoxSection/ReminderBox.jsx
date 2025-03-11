import Border from "../../_ui/Border";
import BoxTemplate from "../BoxTemplate";
import AddDue from "./AddDue";
import AddReminder from "./AddReminder";
import AddRepeat from "./AddRepeat";

export default function ReminderBox({ task }) {
  return (
    <BoxTemplate className="flex flex-col justify-center">
      <AddReminder task={task} />
      <Border className="bg-gray-300" />

      <AddDue task={task} />
      <Border className="bg-gray-300" />

      <AddRepeat task={task} />
    </BoxTemplate>
  );
}
