import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import {
  hashPassword,
  setAdminSession,
  verifyPassword,
  getAdminSession,
  clearAdminSession,
} from "@/lib/auth";
import { loginSchema } from "@/lib/validators";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = loginSchema.parse(body);
    const admin = await prisma.admin.findUnique({
      where: { email: data.email.toLowerCase() },
    });
    if (!admin || !(await verifyPassword(data.password, admin.passwordHash))) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }
    await setAdminSession({ sub: admin.id, email: admin.email });
    return NextResponse.json({ ok: true, email: admin.email });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ admin: null });
  return NextResponse.json({ admin: { email: session.email } });
}

export async function DELETE() {
  await clearAdminSession();
  return NextResponse.json({ ok: true });
}
