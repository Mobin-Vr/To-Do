import InvitationLanding from '@/app/_components/shareList/InvationLanding';

export default function Page({ searchParams }) {
   const token = searchParams.token;

   return <InvitationLanding token={token} />;
}
