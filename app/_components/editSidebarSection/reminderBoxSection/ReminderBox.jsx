import Border from "@/app/_components/_ui/Border";
import BoxTemplate from "@/app/_components/editSidebarSection/BoxTemplate";
import AddDue from "@/app/_components/editSidebarSection/reminderBoxSection/AddDue";
import AddReminder from "@/app/_components/editSidebarSection/reminderBoxSection/AddReminder";
import AddRepeat from "@/app/_components/editSidebarSection/reminderBoxSection/AddRepeat";

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
