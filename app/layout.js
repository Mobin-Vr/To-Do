import { ClerkProvider, SignedIn } from '@clerk/nextjs';
import { Roboto } from 'next/font/google';
import './_styles/globals.css';

import HealthStatusSync from './_components/HealthStatusSync';

import Sidebar from './_components/menuSidebar/Sidebar';
import UserSignupHandler from './_components/menuSidebar/UserSignupHandler';
import { currentUser } from '@clerk/nextjs/server';
import { Toaster } from 'react-hot-toast';
import TaskRealTimeListener from './_components/TaskRealTimeListener';

const roboto = Roboto({
   subsets: ['latin'],
   weight: ['300', '400', '500', '700'],
   style: ['normal', 'italic'],
});

export const metadata = {
   title: 'Microsoft To Do',
   description:
      'Stay on top of your tasks with Microsoft To Do, syncing across all your devices.',
};

export default async function RootLayout({ children }) {
   //  const user = await currentUser();
   return (
      <ClerkProvider dynamic>
         <html lang='en'>
            <body
               className={`${roboto.className} relative flex flex-col sm:flex-row h-screen z-50`}
            >
               <SignedIn>
                  {/* Monitors database and internet connectivity. Updates the Zustand store with real-time health statuses for global access */}
                  <HealthStatusSync />

                  {/* This component handles checking and creating a new user in the database upon sign-in */}
                  <UserSignupHandler />

                  <Sidebar />

                  {/* get new tasks in real time */}
                  <TaskRealTimeListener />
               </SignedIn>

               <main className='h-full overflow-y-hidden sm:flex-1'>
                  {children}
               </main>

               <Toaster />
            </body>
         </html>
      </ClerkProvider>
   );
}
