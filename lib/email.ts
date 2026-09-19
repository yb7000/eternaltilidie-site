import { STEPS } from "./intake";
import type { Reflection } from "./reflection";

// Email rendering (Eternal-styled HTML + plain text) and delivery through Resend.

const PALETTE = ["#f97fc0", "#f2543d", "#f5c518", "#6abf40", "#3b82f6", "#2ec4e6"];
const SITE = "https://eternaltilidie.com";

export function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

const HEAD = `font-family: Anton, Impact, 'Arial Narrow Bold', 'Helvetica Neue', Arial, sans-serif; text-transform: uppercase; letter-spacing: 0.5px; margin: 0; color: #ffffff;`;
const BODY = `font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 700; font-size: 16px; line-height: 1.6; color: #ffffff; margin: 0;`;

function dots(): string {
  return `<div style="margin: 0; line-height: 0;">${PALETTE.map(
    (c) => `<span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background: ${c}; margin-right: 12px;"></span>`
  ).join("")}</div>`;
}

function kicker(label: string, color: string): string {
  return `<p style="${BODY} font-size: 12px; letter-spacing: 3px; text-transform: uppercase; margin: 0 0 10px;"><span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: ${color}; margin-right: 10px; vertical-align: middle;"></span>${escapeHtml(label)}</p>`;
}

function list(items: string[], ordered = false): string {
  if (!items.length) return "";
  const tag = ordered ? "ol" : "ul";
  return `<${tag} style="${BODY} padding-left: 22px; margin: 0;">${items
    .map((i) => `<li style="margin: 0 0 8px;">${escapeHtml(i)}</li>`)
    .join("")}</${tag}>`;
}

function block(label: string, color: string, title: string, inner: string): string {
  if (!inner) return "";
  return `<div style="padding: 0 0 36px;">${kicker(label, color)}<h2 style="${HEAD} font-size: 26px; line-height: 1.05; margin: 0 0 16px;">${escapeHtml(title)}</h2>${inner}</div>`;
}

function section(label: string, color: string, title: string, inner: string): string {
  const b = block(label, color, title, inner);
  return b ? `<tr><td>${b}</td></tr>` : "";
}

function shell(inner: string, preheader: string): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="dark">
<meta name="supported-color-schemes" content="dark">
<title>Eternal</title>
</head>
<body style="margin: 0; padding: 0; background: #111111;">
<div style="display: none; max-height: 0; overflow: hidden; opacity: 0;">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: #111111;">
<tr><td align="center" style="padding: 32px 16px 56px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 640px;">
<tr><td style="padding: 0 0 28px;">
  <a href="${SITE}" style="text-decoration: none;"><img src="${SITE}/images/graffiti-logo.png" width="96" alt="Eternal" style="display: block; width: 96px; height: auto; border: 0;"></a>
</td></tr>
<tr><td style="border: 2px solid #ffffff; padding: 36px 28px 28px; background: #161616;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${inner}
</table>
</td></tr>
<tr><td style="padding: 24px 0 0;">
  <p style="${BODY} font-size: 12px; font-weight: 400; color: #999999;">Eternal · <a href="${SITE}" style="color: #999999;">eternaltilidie.com</a> · TikTok &amp; IG <a href="https://www.instagram.com/eternaltilidie/" style="color: #999999;">@eternaltilidie</a></p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

export function renderReflectionHtml(r: Reflection): string {
  const rows = [
    `<tr><td style="padding: 0 0 28px;">${dots()}</td></tr>`,
    `<tr><td style="padding: 0 0 8px;">${kicker("Your Reflection", "#f5c518")}</td></tr>`,
    `<tr><td style="padding: 0 0 28px;"><h1 style="${HEAD} font-size: 44px; line-height: 0.95;">${escapeHtml(r.salutation)},</h1></td></tr>`,
    `<tr><td style="padding: 0 0 40px;">${r.portrait.map((p) => `<p style="${BODY} margin: 0 0 14px;">${escapeHtml(p)}</p>`).join("")}</td></tr>`,
    section("Milestones", "#f97fc0", "Plan to", list(r.milestones)),
    section("Daily", "#f2543d", "Create a daily schedule with time devoted to", list(r.dailyTime)),
    section("Practice", "#6abf40", "Create a daily schedule to learn and practice", list(r.learnPractice)),
    section("To do", "#3b82f6", "Next steps", list(r.toDo, true)),
    section("Affirmations", "#2ec4e6", "Repeat these affirmations daily", list(r.affirmations)),
    `<tr><td style="padding: 8px 0 0;">${dots()}</td></tr>`,
  ];
  return shell(rows.join(""), `${r.salutation}, your Reflection from Eternal.`);
}

export function renderReflectionText(r: Reflection): string {
  const block = (title: string, items: string[], ordered = false) =>
    items.length ? `\n${title}\n${items.map((i, n) => (ordered ? `${n + 1}. ${i}` : `- ${i}`)).join("\n")}\n` : "";
  return [
    `${r.salutation},`,
    "",
    r.portrait.join("\n\n"),
    block("PLAN TO:", r.milestones),
    block("YOU SHOULD CREATE A DAILY SCHEDULE WITH TIME DEVOTED TO:", r.dailyTime),
    block("YOU SHOULD CREATE A DAILY SCHEDULE TO LEARN AND PRACTICE:", r.learnPractice),
    block("NEXT STEPS:", r.toDo, true),
    block("REPEAT THESE AFFIRMATIONS DAILY:", r.affirmations),
    "",
    "Eternal · eternaltilidie.com",
  ].join("\n");
}

// A short note for the artist when the Reflection could not be generated.
export function renderReceivedHtml(name: string): string {
  const rows = [
    `<tr><td style="padding: 0 0 28px;">${dots()}</td></tr>`,
    `<tr><td style="padding: 0 0 8px;">${kicker("Received", "#6abf40")}</td></tr>`,
    `<tr><td style="padding: 0 0 20px;"><h1 style="${HEAD} font-size: 40px; line-height: 0.95;">Thank you, ${escapeHtml(name)}.</h1></td></tr>`,
    `<tr><td><p style="${BODY}">We have your answers. Your Reflection is being written by hand this time, and someone from Eternal will send it to you personally.</p></td></tr>`,
  ];
  return shell(rows.join(""), "We have your answers.");
}

// The team copy: the Reflection, then every answer.
export function renderTeamHtml(
  name: string,
  email: string,
  answers: Record<string, string>,
  reflection: Reflection | null,
  error?: string
): string {
  const answerRows = STEPS.flatMap((s) =>
    s.questions
      .filter((q) => answers[q.key]?.trim())
      .map(
        (q) =>
          `<tr><td style="${BODY} font-size: 13px; color: #bbbbbb; padding: 8px 12px 8px 0; vertical-align: top; width: 40%;">${escapeHtml(q.label)}<br><span style="font-weight: 400; color: #777;">${q.key}</span></td><td style="${BODY} font-size: 14px; padding: 8px 0; vertical-align: top; white-space: pre-wrap; border-bottom: 1px solid #333;">${escapeHtml(answers[q.key])}</td></tr>`
      )
  ).join("");
  const rows = [
    `<tr><td style="padding: 0 0 8px;">${kicker(reflection ? "New Reflection" : "Reflection needs a hand", reflection ? "#6abf40" : "#f2543d")}</td></tr>`,
    `<tr><td style="padding: 0 0 8px;"><h1 style="${HEAD} font-size: 36px; line-height: 0.95;">${escapeHtml(name)}</h1></td></tr>`,
    `<tr><td style="padding: 0 0 28px;"><p style="${BODY}"><a href="mailto:${escapeHtml(email)}" style="color: #f5c518;">${escapeHtml(email)}</a></p></td></tr>`,
    error
      ? `<tr><td style="padding: 0 0 28px;"><p style="${BODY} color: #f2543d;">The Reflection could not be generated, so the artist got a “received” note instead. Error: ${escapeHtml(error)}</p></td></tr>`
      : "",
    reflection
      ? `<tr><td style="padding: 0 0 8px; border-bottom: 2px solid #fff;">${[
          `<p style="${BODY} margin: 0 0 14px;"><strong>${escapeHtml(reflection.salutation)},</strong></p>`,
          reflection.portrait.map((p) => `<p style="${BODY} margin: 0 0 12px;">${escapeHtml(p)}</p>`).join(""),
          `<div style="height: 24px;"></div>`,
          block("Milestones", "#f97fc0", "Plan to", list(reflection.milestones)),
          block("Daily", "#f2543d", "Daily schedule", list(reflection.dailyTime)),
          block("Practice", "#6abf40", "Learn and practice", list(reflection.learnPractice)),
          block("To do", "#3b82f6", "Next steps", list(reflection.toDo, true)),
          block("Affirmations", "#2ec4e6", "Affirmations", list(reflection.affirmations)),
        ].join("")}</td></tr>`
      : "",
    `<tr><td style="padding: 32px 0 12px;">${kicker("Answers", "#f5c518")}</td></tr>`,
    `<tr><td><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${answerRows}</table></td></tr>`,
  ];
  return shell(rows.join(""), `${name} completed The Reflection Wizard.`);
}

// ---------- delivery (Resend) ----------

export type Attachment = { filename: string; content: string; contentType?: string };

export type Mail = {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  attachments?: Attachment[];
};

export async function sendMail(mail: Mail): Promise<{ id: string }> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.PORTAL_FROM_EMAIL;
  if (!key || !from) throw new Error("RESEND_API_KEY and PORTAL_FROM_EMAIL must be set to send email");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
    body: JSON.stringify({
      from,
      to: [mail.to],
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
      reply_to: mail.replyTo,
      attachments: mail.attachments?.map((a) => ({
        filename: a.filename,
        content: Buffer.from(a.content, "utf8").toString("base64"),
        content_type: a.contentType,
      })),
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Resend ${res.status}: ${body.slice(0, 300)}`);
  }
  return (await res.json()) as { id: string };
}
