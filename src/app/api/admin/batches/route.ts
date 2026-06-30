import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { sendBatchOpenNotification } from "@/lib/email";

export async function GET() {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const batches = await prisma.batch.findMany({
    orderBy: { number: "desc" },
    include: { _count: { select: { entries: true } } },
  });
  return NextResponse.json({ batches });
}

export async function POST(req: Request) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { batchId } = await req.json();
  const batch = await prisma.batch.findUnique({
    where: { id: batchId },
    include: { entries: true },
  });
  if (!batch) {
    return NextResponse.json({ error: "Batch not found." }, { status: 404 });
  }

  let sent = 0;
  for (const entry of batch.entries) {
    await sendBatchOpenNotification(entry.email, entry.fullName, batch);
    await prisma.waitlistEntry.update({
      where: { id: entry.id },
      data: { status: "notified" },
    });
    sent++;
  }

  return NextResponse.json({ ok: true, sent });
}
