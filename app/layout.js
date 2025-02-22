import { ClerkProvider, SignedIn } from "@clerk/nextjs";
import { Roboto_Flex } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import HealthStatusSync from "./_components/HealthStatusSync";
import ReminderHandler from "./_components/ReminderHandler";
import TaskRealTimeListener from "./_components/TaskRealTimeListener";
import "./_styles/globals.css";
import UserSignupHandler from "./_components/sidebarSection/UserSignupHandler";
import Sidebar from "./_components/sidebarSection/Sidebar";
import EditSidebar from "./_components/editSidebarSection/EditSidebar";

const roboto = Roboto_Flex({
  subsets: ["latin"],
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
    "1000",
  ],
  display: "swap",
});

const iranSansRegular = localFont({
  src: "../public/IRANSansWeb.ttf",
  weight: "400",
  style: "normal",
  display: "swap",
});

export const metadata = {
  title: "Microsoft To Do",
  description:
    "Stay on top of your tasks with Microsoft To Do, syncing across all your devices.",
};

export default async function RootLayout({ children }) {
  return (
    <ClerkProvider dynamic>
      <html lang="en">
        <body
          className={`${roboto.className} ${iranSansRegular.className} relative z-50 flex h-screen flex-col overflow-hidden sm:flex-row`}
        >
          <SignedIn>
            {/* Monitors database and internet connectivity. Updates the Zustand store with real-time health statuses for global access */}
            <HealthStatusSync />

            {/* This component handles checking and creating a new user in the database upon sign-in */}
            <UserSignupHandler />

            {/* get new tasks in real time */}
            <TaskRealTimeListener />

            {/* handle reminders */}
            <ReminderHandler />

            {/* Absolute Sidebar */}
            <Sidebar />
            {/* Absolute Editsidebar */}
            <EditSidebar />
          </SignedIn>

          <main className="h-full overflow-y-hidden sm:flex-1">{children}</main>

          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
