import { checkDatabaseHealth } from "@/app/_lib/data-services";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await checkDatabaseHealth();
  return NextResponse.json(result);
}
