import InvitationLanding from "@/app/_components/shareListSection/InvationLanding";

export default async function Page({ searchParams }) {
  const { token } = await searchParams;

  return <InvitationLanding token={token} />;
}
