import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const entries = await prisma.waitlistEntry.findMany({
    orderBy: { createdAt: "desc" },
    include: { batch: true },
  });
  return NextResponse.json({ entries });
}
