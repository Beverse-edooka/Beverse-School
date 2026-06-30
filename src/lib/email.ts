import nodemailer from "nodemailer";
import type { Batch } from "@prisma/client";

function getTransport() {
  const host = process.env.SMTP_HOST;
  if (!host) return null;

  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const transport = getTransport();
  const from = process.env.SMTP_FROM || "admissions@beverseschool.com";

  if (!transport) {
    console.log(`[email] To: ${to} | Subject: ${subject}`);
    return { ok: true, mocked: true };
  }

  await transport.sendMail({ from, to, subject, html });
  return { ok: true, mocked: false };
}

export async function sendWaitlistConfirmation(
  email: string,
  fullName: string,
  batch: Batch
) {
  return sendEmail({
    to: email,
    subject: `You're on the waitlist — ${batch.name}`,
    html: `
      <p>Hi ${fullName},</p>
      <p>Thank you for applying to Beverse School. You have been added to the waitlist for <strong>${batch.name}</strong>.</p>
      <p>We will email you when your cohort opens or when a seat becomes available.</p>
      <p>— Beverse School Admissions</p>
    `,
  });
}

export async function sendBatchOpenNotification(
  email: string,
  fullName: string,
  batch: Batch
) {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://beverseschool.com";
  return sendEmail({
    to: email,
    subject: `Applications open — ${batch.name}`,
    html: `
      <p>Hi ${fullName},</p>
      <p>Great news — <strong>${batch.name}</strong> at Beverse School is now accepting applications.</p>
      <p>There are only ${batch.maxSeats} seats. Apply now at <a href="${site}#apply">${site}</a>.</p>
      <p>— Beverse School Admissions</p>
    `,
  });
}
