import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { mentorSchema } from "@/lib/validators";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  try {
    const data = mentorSchema.partial().parse(await req.json());
    const mentor = await prisma.mentor.update({ where: { id }, data });
    return NextResponse.json({ mentor });
  } catch {
    return NextResponse.json({ error: "Update failed." }, { status: 400 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  await prisma.mentor.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
