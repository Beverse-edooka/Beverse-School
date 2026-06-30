import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { mentorSchema } from "@/lib/validators";

async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) return null;
  return session;
}

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const mentors = await prisma.mentor.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });
  return NextResponse.json({ mentors });
}

export async function POST(req: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const data = mentorSchema.parse(await req.json());
    const mentor = await prisma.mentor.create({ data });
    return NextResponse.json({ mentor });
  } catch {
    return NextResponse.json({ error: "Invalid data." }, { status: 400 });
  }
}
