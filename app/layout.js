import { ClerkProvider, Show } from "@clerk/nextjs";
import { Roboto_Flex } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import Spinner from "./_components/_ui/Spinner";
import HealthStatusSync from "./_components/HealthStatusSync";
import ReloadStoreInitializer from "./_components/ReloadStoreInitializer";
import ReminderHandler from "./_components/ReminderHandler";
import ResetTaskStore from "./_components/ResetTaskStore";
import UserSignupHandler from "./_components/sidebarSection/UserSignupHandler";
import TaskRealTimeListener from "./_components/TaskRealTimeListener";
import UnsavedChangesWarning from "./_components/UnsavedChangesWarning";
import "./_styles/globals.css";
import { Suspense } from "react";
import Sidebar from "./_components/sidebarSection/Sidebar";
import SpinnerMini from "./_components/_ui/SpinnerMini";
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
  src: "../public/fonts/IRANSansWeb.ttf",
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
          className={`${roboto.className} ${iranSansRegular.className} relative z-50 flex h-dvh flex-col overflow-hidden sm:flex-row`}
        >
          <Show when="signed-in">
            <HealthStatusSync />
            <UnsavedChangesWarning />
            <UserSignupHandler />
            <ReloadStoreInitializer />
            {<TaskRealTimeListener />}
            <ReminderHandler />

            <Suspense fallback={null}>
              <Sidebar />
            </Suspense>
            <Suspense fallback={null}>
              <EditSidebar />
            </Suspense>
          </Show>

          <Show when="signed-out">
            <ResetTaskStore />
          </Show>

          <main className="h-full overflow-y-hidden sm:flex-1">{children}</main>

          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
