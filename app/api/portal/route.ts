import { NextResponse } from "next/server";
import { FIELD_KINDS } from "@/lib/intake";

// Portal API: receives sign-ups (with the completed intake) and sign-ins.
//
// Storage is the same Airtable table that powers reflector.createsafe.io
// ("reflector" in base app5WG0xIVwBPorx9). Configure on Vercel:
//   AIRTABLE_TOKEN      personal access token with data.records:read/write on the base
//   AIRTABLE_BASE_ID    defaults to app5WG0xIVwBPorx9
//   AIRTABLE_TABLE      defaults to "reflector"
// Without AIRTABLE_TOKEN the route accepts submissions and logs them, so the
// front end can be exercised before the integration is wired up.
//
// Passwords: the intake table has no credential column, so the password is not
// stored anywhere yet. Sign-in currently checks only that an intake exists for
// the email. Swap `verifyPassword` / `storePassword` for a real auth provider
// (Clerk, Supabase, NextAuth, …) when accounts need to be secured.

export const runtime = "nodejs";

const BASE_ID = process.env.AIRTABLE_BASE_ID || "app5WG0xIVwBPorx9";
const TABLE = process.env.AIRTABLE_TABLE || "reflector";
const TOKEN = process.env.AIRTABLE_TOKEN;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Body = {
  action?: "signup" | "signin";
  username?: string;
  name?: string;
  password?: string;
  answers?: Record<string, string>;
};

type AirtableFields = Record<string, string | string[] | number>;

function airtableUrl(path = "") {
  return `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE)}${path}`;
}

function bad(error: string, status = 400) {
  return NextResponse.json({ ok: false, error }, { status });
}

// Coerce the flat CSV-shaped record into Airtable's field types.
function toAirtableFields(answers: Record<string, string>): AirtableFields {
  const fields: AirtableFields = {};
  for (const [key, raw] of Object.entries(answers)) {
    const kind = FIELD_KINDS[key];
    if (!kind) continue; // ignore anything not in the schema
    const value = String(raw ?? "").trim();
    if (!value) continue;
    if (kind === "multi") fields[key] = value.split(",").map((s) => s.trim()).filter(Boolean);
    else if (kind === "scale") fields[key] = Number(value);
    else fields[key] = value.slice(0, 20000);
  }
  return fields;
}

async function findByEmail(email: string) {
  const formula = `LOWER({username})="${email.toLowerCase().replace(/"/g, '\\"')}"`;
  const res = await fetch(airtableUrl(`?maxRecords=1&filterByFormula=${encodeURIComponent(formula)}`), {
    headers: { authorization: `Bearer ${TOKEN}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Airtable lookup failed (${res.status})`);
  const data = (await res.json()) as { records: { id: string; fields: AirtableFields }[] };
  return data.records[0] ?? null;
}

async function upsert(fields: AirtableFields) {
  const existing = typeof fields.username === "string" ? await findByEmail(fields.username) : null;
  const res = await fetch(existing ? airtableUrl(`/${existing.id}`) : airtableUrl(), {
    method: existing ? "PATCH" : "POST",
    headers: { authorization: `Bearer ${TOKEN}`, "content-type": "application/json" },
    body: JSON.stringify({ fields, typecast: true }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Airtable write failed (${res.status}) ${text.slice(0, 300)}`);
  }
  return (await res.json()) as { id: string };
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return bad("Invalid JSON.");
  }

  const email = (body.username || "").trim();
  if (!EMAIL_RE.test(email)) return bad("A valid email is required.");

  if (body.action === "signin") {
    if (!body.password) return bad("Password is required.");
    if (!TOKEN) {
      // No store configured: let the client resume from its local draft.
      return NextResponse.json({ ok: true, stored: false });
    }
    try {
      const rec = await findByEmail(email);
      if (!rec) return bad("We don’t have an account for that email yet. Sign up to get started.", 404);
      return NextResponse.json({ ok: true, stored: true, name: rec.fields.name ?? null });
    } catch (err) {
      console.error("[portal] signin", err);
      return bad("We couldn’t reach the sign-in service. Try again shortly.", 502);
    }
  }

  if (body.action === "signup") {
    const name = (body.name || "").trim();
    if (name.length < 2) return bad("Name is required.");
    if (!body.password || body.password.length < 8) return bad("Password must be at least 8 characters.");
    const fields = toAirtableFields(body.answers || {});
    fields.username = email;
    fields.name = name.slice(0, 200);

    if (!TOKEN) {
      console.log("[portal] signup (no AIRTABLE_TOKEN set; not stored)", JSON.stringify(fields));
      return NextResponse.json({ ok: true, stored: false });
    }
    try {
      const rec = await upsert(fields);
      return NextResponse.json({ ok: true, stored: true, id: rec.id });
    } catch (err) {
      console.error("[portal] signup", err);
      return bad("We couldn’t save your answers. They are still on this device. Try again shortly.", 502);
    }
  }

  return bad("Unknown action.");
}
