import { ClerkLoaded, ClerkLoading } from '@clerk/nextjs';
import InvitationLandingContent from './InvitationLandingContent';
import Spinner from '../_ui/Spinner';

export default function InvitationLanding({ token }) {
   return (
      <>
         <ClerkLoading>
            <Spinner />
         </ClerkLoading>

         <ClerkLoaded>
            <InvitationLandingContent token={token} />
         </ClerkLoaded>
      </>
   );
}
