import { NextResponse, after } from "next/server";
import { cleanAnswers, isConfigured, processSubmission } from "@/lib/pipeline";

// Reflector API: receives a completed Reflection Wizard, answers right away, then
// writes the Reflection and emails it after the response has been sent.
//
// Configure on Vercel (see .env.example):
//   ANTHROPIC_API_KEY     writes the Reflection
//   RESEND_API_KEY        sends the emails
//   REFLECTOR_FROM_EMAIL     verified sender, e.g. "Eternal <reflections@eternaltilidie.com>"
//   REFLECTOR_NOTIFY_EMAIL   team inbox that gets a copy with every answer attached
// Nothing is stored server-side; the team copy is the record.

export const runtime = "nodejs";
export const maxDuration = 300;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Body = { username?: string; name?: string; answers?: Record<string, string> };

function bad(error: string, status = 400) {
  return NextResponse.json({ ok: false, error }, { status });
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return bad("Invalid JSON.");
  }

  const email = (body.username || "").trim();
  const name = (body.name || "").trim().slice(0, 200);
  if (!EMAIL_RE.test(email)) return bad("A valid email is required.");
  if (name.length < 2) return bad("Name is required.");
  const answers = cleanAnswers(body.answers);
  if (Object.keys(answers).length === 0) return bad("No answers were sent.");

  const cfg = isConfigured();
  if (!cfg.generate || !cfg.mail) {
    // Not wired up yet: accept and log so the front end can be exercised.
    console.log(
      `[reflector] submission from ${email} (${name}) not processed: ` +
        `${cfg.generate ? "" : "ANTHROPIC_API_KEY missing "}${cfg.mail ? "" : "RESEND_API_KEY/REFLECTOR_FROM_EMAIL missing"}`,
      JSON.stringify(answers)
    );
    return NextResponse.json({ ok: true, processed: false }, { status: 202 });
  }

  after(async () => {
    await processSubmission({ email, name, answers });
  });
  return NextResponse.json({ ok: true, processed: true }, { status: 202 });
}
