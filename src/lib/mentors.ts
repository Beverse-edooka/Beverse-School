import { prisma } from "@/lib/db";

export type MentorDisplay = {
  id: string;
  name: string;
  role: string;
  bio: string;
  photoUrl: string | null;
  isDummy: boolean;
  invite?: boolean;
};

const DUMMY_POOL: Omit<MentorDisplay, "id">[] = [
  {
    name: "Being announced",
    role: "Senior Diagnostic Leader",
    bio: "Our academic advisory board is being confirmed — senior leaders across Sales, Operations, Quality, and Product.",
    photoUrl: null,
    isDummy: true,
  },
  {
    name: "Being announced",
    role: "Senior Diagnostic Leader",
    bio: "Each adviser co-designs the curriculum for their track and mentors students directly through the programme.",
    photoUrl: null,
    isDummy: true,
  },
  {
    name: "Join the board",
    role: "For industry leaders",
    bio: "Lead in diagnostics and want to shape the next generation? We'd like to talk — reach us through the details below.",
    photoUrl: null,
    isDummy: true,
    invite: true,
  },
];

function mapDbMentor(m: {
  id: string;
  name: string;
  role: string;
  bio: string;
  photoUrl: string | null;
}): MentorDisplay {
  return { ...m, isDummy: false };
}

export async function getActiveMentors() {
  return prisma.mentor.findMany({
    where: { isActive: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });
}

export function fillMentorSlots(
  dbMentors: Awaited<ReturnType<typeof getActiveMentors>>,
  count: number
): MentorDisplay[] {
  const real = dbMentors.map(mapDbMentor);
  const result: MentorDisplay[] = [...real];

  let dummyIndex = 0;
  while (result.length < count) {
    const dummy = DUMMY_POOL[dummyIndex % DUMMY_POOL.length];
    result.push({
      id: `dummy-${dummyIndex}`,
      ...dummy,
    });
    dummyIndex++;
  }

  return result.slice(0, count);
}

export async function getMentorsForSection(count = 3) {
  const mentors = await getActiveMentors();
  return fillMentorSlots(mentors, count);
}

export async function getFeaturedMentorsForHero(count = 4) {
  const mentors = await prisma.mentor.findMany({
    where: { isActive: true, featured: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    take: count,
  });

  if (mentors.length >= count) {
    return mentors.map(mapDbMentor);
  }

  const all = await getActiveMentors();
  const combined = [...mentors];
  for (const m of all) {
    if (combined.length >= count) break;
    if (!combined.find((c) => c.id === m.id)) combined.push(m);
  }

  return fillMentorSlots(combined, count);
}

export async function getOpenBatch() {
  let batch = await prisma.batch.findFirst({
    where: { status: "open" },
    orderBy: { number: "asc" },
    include: { _count: { select: { entries: true } } },
  });

  if (!batch) {
    const last = await prisma.batch.findFirst({ orderBy: { number: "desc" } });
    const nextNumber = (last?.number ?? 0) + 1;
    batch = await prisma.batch.create({
      data: {
        number: nextNumber,
        name: `Cohort ${nextNumber}`,
        maxSeats: 25,
        status: "open",
      },
      include: { _count: { select: { entries: true } } },
    });
  }

  return batch;
}

export async function joinWaitlist({
  fullName,
  email,
  phone,
}: {
  fullName: string;
  email: string;
  phone?: string;
}) {
  let batch = await getOpenBatch();

  if (batch._count.entries >= batch.maxSeats) {
    await prisma.batch.update({
      where: { id: batch.id },
      data: { status: "full" },
    });
    const nextNumber = batch.number + 1;
    batch = await prisma.batch.create({
      data: {
        number: nextNumber,
        name: `Cohort ${nextNumber}`,
        maxSeats: 25,
        status: "open",
      },
      include: { _count: { select: { entries: true } } },
    });
  }

  const entry = await prisma.waitlistEntry.upsert({
    where: { email_batchId: { email: email.toLowerCase(), batchId: batch.id } },
    update: { fullName, phone },
    create: {
      fullName,
      email: email.toLowerCase(),
      phone,
      batchId: batch.id,
    },
  });

  const count = await prisma.waitlistEntry.count({ where: { batchId: batch.id } });
  if (count >= batch.maxSeats) {
    await prisma.batch.update({
      where: { id: batch.id },
      data: { status: "full" },
    });
  }

  return { entry, batch };
}
