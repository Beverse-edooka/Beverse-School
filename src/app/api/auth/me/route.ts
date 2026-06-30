import { NextResponse } from "next/server";
import { clearUserSession, getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "user") {
    return NextResponse.json({ user: null });
  }
  const user = await prisma.siteUser.findUnique({
    where: { id: session.sub },
    select: { id: true, email: true, fullName: true },
  });
  return NextResponse.json({ user });
}

export async function DELETE() {
  await clearUserSession();
  return NextResponse.json({ ok: true });
}
