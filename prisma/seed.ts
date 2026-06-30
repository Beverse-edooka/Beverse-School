import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@beverseschool.com";
  const password = process.env.ADMIN_PASSWORD || "BeverseAdmin2026!";
  const hash = await bcrypt.hash(password, 12);

  await prisma.admin.upsert({
    where: { email },
    update: { passwordHash: hash },
    create: { email, passwordHash: hash },
  });

  await prisma.batch.upsert({
    where: { number: 1 },
    update: {},
    create: {
      number: 1,
      name: "Cohort 1",
      maxSeats: 25,
      status: "open",
    },
  });

  console.log("Seeded admin:", email);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
