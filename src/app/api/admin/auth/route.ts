import { NextResponse } from "next/server";
import { setAdminSession, verifyPassword, getAdminSession, clearAdminSession } from "@/lib/auth";
import { verifyAdminLogin } from "@/lib/bootstrap";
import { loginSchema } from "@/lib/validators";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = loginSchema.parse(body);
    const admin = await verifyAdminLogin(data.email, data.password);

    if (!admin || !(await verifyPassword(data.password, admin.passwordHash))) {
      return NextResponse.json(
        {
          error:
            "Invalid email or password. Use ADMIN_EMAIL and ADMIN_PASSWORD from your .env file, then run npm run db:seed if you changed them.",
        },
        { status: 401 }
      );
    }

    await setAdminSession({ sub: admin.id, email: admin.email });
    return NextResponse.json({ ok: true, email: admin.email });
  } catch (e) {
    if (e instanceof Error && e.name === "ZodError") {
      return NextResponse.json(
        { error: "Password must be at least 8 characters." },
        { status: 400 }
      );
    }
    console.error("[admin/auth]", e);
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
