import { FIELD_KINDS } from "./intake";
import { generateReflection, type Reflection } from "./reflection";
import {
  renderReceivedHtml,
  renderReflectionHtml,
  renderReflectionText,
  renderTeamHtml,
  sendMail,
} from "./email";

// What happens after an artist submits The Reflection Wizard:
//   1. write their Reflection with Claude,
//   2. email it to them,
//   3. email the team a copy with every answer attached (this is the record;
//      nothing is stored anywhere else).
// If step 1 fails the artist gets a short "received" note and the team copy
// carries the error, so no submission is ever lost.

export type Submission = { email: string; name: string; answers: Record<string, string> };

// Keep only known fields, trimmed and bounded.
export function cleanAnswers(raw: unknown): Record<string, string> {
  const out: Record<string, string> = {};
  if (!raw || typeof raw !== "object") return out;
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    if (!FIELD_KINDS[key]) continue;
    const s = String(value ?? "").trim();
    if (s) out[key] = s.slice(0, 20000);
  }
  return out;
}

export function isConfigured(): { generate: boolean; mail: boolean } {
  return {
    generate: Boolean(process.env.ANTHROPIC_API_KEY),
    mail: Boolean(process.env.RESEND_API_KEY && process.env.PORTAL_FROM_EMAIL),
  };
}

export async function processSubmission(
  sub: Submission,
  deps: { generate?: typeof generateReflection; send?: typeof sendMail } = {}
): Promise<{ reflection: Reflection | null; error?: string }> {
  const generate = deps.generate ?? generateReflection;
  const send = deps.send ?? sendMail;
  const tag = `[portal] ${sub.email}`;

  let reflection: Reflection | null = null;
  let error: string | undefined;
  try {
    reflection = await generate(sub.name, sub.answers);
  } catch (err) {
    error = err instanceof Error ? err.message : String(err);
    console.error(`${tag} reflection failed:`, error);
  }

  // 2. the artist
  try {
    if (reflection) {
      await send({
        to: sub.email,
        subject: `${reflection.salutation}, your Reflection from Eternal`,
        html: renderReflectionHtml(reflection),
        text: renderReflectionText(reflection),
        replyTo: process.env.PORTAL_REPLY_TO || process.env.PORTAL_NOTIFY_EMAIL,
      });
    } else {
      await send({
        to: sub.email,
        subject: "We have your answers",
        html: renderReceivedHtml(sub.name),
        text: `Thank you, ${sub.name}. We have your answers. Your Reflection is being written by hand this time, and someone from Eternal will send it to you personally.`,
        replyTo: process.env.PORTAL_REPLY_TO || process.env.PORTAL_NOTIFY_EMAIL,
      });
    }
  } catch (err) {
    console.error(`${tag} mail to artist failed:`, err);
    error = (error ? error + "; " : "") + `artist email failed: ${err instanceof Error ? err.message : String(err)}`;
  }

  // 3. the team
  const notify = process.env.PORTAL_NOTIFY_EMAIL;
  if (notify) {
    try {
      await send({
        to: notify,
        subject: `${reflection ? "Reflection" : "Reflection needs a hand"}: ${sub.name} <${sub.email}>`,
        html: renderTeamHtml(sub.name, sub.email, sub.answers, reflection, error),
        replyTo: sub.email,
        attachments: [
          {
            filename: `${slug(sub.name)}-answers.json`,
            content: JSON.stringify({ email: sub.email, name: sub.name, ...sub.answers }, null, 2),
            contentType: "application/json",
          },
          ...(reflection
            ? [
                {
                  filename: `${slug(sub.name)}-reflection.json`,
                  content: JSON.stringify(reflection, null, 2),
                  contentType: "application/json",
                },
                {
                  filename: `Reflection for ${sub.name}.txt`,
                  content: renderReflectionText(reflection),
                  contentType: "text/plain",
                },
              ]
            : []),
        ],
      });
    } catch (err) {
      console.error(`${tag} mail to team failed:`, err);
    }
  }

  return { reflection, error };
}

function slug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "artist";
}
