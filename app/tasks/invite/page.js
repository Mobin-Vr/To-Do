import InvitationLanding from "@/app/_components/shareListSection/InvationLanding";

export default function Page({ searchParams }) {
  const token = searchParams.token;

  return <InvitationLanding token={token} />;
}
