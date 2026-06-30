import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import {
  hashPassword,
  setUserSession,
  verifyPassword,
} from "@/lib/auth";
import { loginSchema, registerSchema } from "@/lib/validators";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const mode = body.mode as string;

    if (mode === "register") {
      const data = registerSchema.parse(body);
      const exists = await prisma.siteUser.findUnique({
        where: { email: data.email.toLowerCase() },
      });
      if (exists) {
        return NextResponse.json(
          { error: "An account with this email already exists." },
          { status: 409 }
        );
      }
      const user = await prisma.siteUser.create({
        data: {
          email: data.email.toLowerCase(),
          fullName: data.fullName,
          passwordHash: await hashPassword(data.password),
        },
      });
      await setUserSession({
        sub: user.id,
        role: "user",
        email: user.email,
      });
      return NextResponse.json({
        ok: true,
        user: { id: user.id, email: user.email, fullName: user.fullName },
      });
    }

    const data = loginSchema.parse(body);
    const user = await prisma.siteUser.findUnique({
      where: { email: data.email.toLowerCase() },
    });
    if (!user || !(await verifyPassword(data.password, user.passwordHash))) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }
    await setUserSession({
      sub: user.id,
      role: "user",
      email: user.email,
    });
    return NextResponse.json({
      ok: true,
      user: { id: user.id, email: user.email, fullName: user.fullName },
    });
  } catch (e) {
    if (e instanceof Error && e.name === "ZodError") {
      return NextResponse.json({ error: "Invalid input." }, { status: 400 });
    }
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
