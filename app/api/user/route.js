import { auth } from "@clerk/nextjs/server";
import { getUserByEmail } from "@/app/_lib/data-services";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { userId, getToken } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const token = await getToken({ template: "supabase" });
  const user = await getUserByEmail(email, token);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}
