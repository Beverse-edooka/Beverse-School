import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

/** Keeps the admin account in sync with ADMIN_EMAIL / ADMIN_PASSWORD in .env */
export async function ensureAdminAccount() {
  const email = (process.env.ADMIN_EMAIL || "admin@beverseschool.com").toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return;

  const passwordHash = await hashPassword(password);
  await prisma.admin.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash },
  });
}

export async function verifyAdminLogin(email: string, password: string) {
  const normalized = email.toLowerCase();
  const envEmail = (process.env.ADMIN_EMAIL || "admin@beverseschool.com").toLowerCase();
  const envPassword = process.env.ADMIN_PASSWORD;

  let admin = await prisma.admin.findUnique({ where: { email: normalized } });

  // If login matches .env credentials, sync DB hash (fixes 401 after .env changes)
  if (
    envPassword &&
    normalized === envEmail &&
    password === envPassword
  ) {
    await ensureAdminAccount();
    admin = await prisma.admin.findUnique({ where: { email: normalized } });
  }

  return admin;
}
