import { ClerkProvider } from '@clerk/nextjs';
import { Roboto } from 'next/font/google';
import SidebarNav from './_components/SidebarNav';
import './_styles/globals.css';

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

export default function RootLayout({ children }) {
   return (
      <ClerkProvider dynamic>
         <html lang='en'>
            <body
               className={`${roboto.className} relative flex flex-col h-screen z-50`}
            >
               <SidebarNav />
               <main className='h-full overflow-y-hidden'>{children}</main>
            </body>
         </html>
      </ClerkProvider>
   );
}
