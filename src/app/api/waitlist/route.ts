import { NextResponse } from "next/server";
import { joinWaitlist } from "@/lib/mentors";
import { sendWaitlistConfirmation } from "@/lib/email";
import { waitlistSchema } from "@/lib/validators";

export async function POST(req: Request) {
  try {
    const body = waitlistSchema.parse(await req.json());
    const { entry, batch } = await joinWaitlist(body);
    await sendWaitlistConfirmation(body.email, body.fullName, batch);
    return NextResponse.json({
      ok: true,
      batch: { name: batch.name, number: batch.number },
      message: `You have been added to the waitlist for ${batch.name}.`,
    });
  } catch (e) {
    if (e instanceof Error && e.name === "ZodError") {
      return NextResponse.json({ error: "Please fill all required fields." }, { status: 400 });
    }
    console.error(e);
    return NextResponse.json({ error: "Could not join waitlist." }, { status: 500 });
  }
}
