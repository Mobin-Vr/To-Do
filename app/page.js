import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";

export default async function Page() {
  const { userId } = await auth();

  if (userId) redirect("/tasks");
  else redirect("/log-in");

  return null;
}
