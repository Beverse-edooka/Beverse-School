import { NextResponse } from "next/server";
import { getActiveMentors } from "@/lib/mentors";

export async function GET() {
  const mentors = await getActiveMentors();
  return NextResponse.json({ mentors });
}
