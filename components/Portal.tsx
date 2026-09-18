"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import graffitiLogo from "@/public/images/graffiti-logo.png";
import doodleStar from "@/public/images/doodle-star.png";
import mascot from "@/public/images/mascot.png";
import { FORM_NAME, STEPS, isVisible, stepMissing, toRecord, type Answers, type Question } from "@/lib/intake";

const PALETTE = ["#f97fc0", "#f2543d", "#f5c518", "#6abf40", "#3b82f6", "#2ec4e6"];
const color = (i: number) => PALETTE[i % PALETTE.length];

type Mode = "signin" | "signup" | "intake" | "done";
type Account = { username: string; name: string; password: string };

const DRAFT_PREFIX = "eternal-portal:";
const draftKey = (email: string) => DRAFT_PREFIX + email.trim().toLowerCase();

function readDraft(email: string): { answers: Answers; step: number; submitted?: boolean } | null {
  try {
    const raw = window.localStorage.getItem(draftKey(email));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
function writeDraft(email: string, data: { answers: Answers; step: number; submitted?: boolean }) {
  try {
    window.localStorage.setItem(draftKey(email), JSON.stringify(data));
  } catch {
    /* storage unavailable: the form still works, it just won't resume */
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Dots({ active = -1 }: { active?: number }) {
  return (
    <div className="dots dots--small pt-dots">
      {PALETTE.map((c, i) => (
        <span key={c} style={{ background: c, opacity: active < 0 || i <= active ? 1 : 0.25 }} />
      ))}
    </div>
  );
}

// ---------- field renderers ----------

function Chips({
  options,
  value,
  onChange,
  single,
  tint,
}: {
  options: { value: string; label?: string; note?: string }[];
  value: string[];
  onChange: (next: string[]) => void;
  single?: boolean;
  tint: string;
}) {
  const noted = options.some((o) => o.note);
  return (
    <div
      className={noted ? "pt-chips pt-chips--cards" : "pt-chips"}
      role={single ? "radiogroup" : "group"}
      style={{ "--dot": tint } as React.CSSProperties}
    >
      {options.map((o) => {
        const on = value.includes(o.value);
        return (
          <button
            key={o.value}
            type="button"
            role={single ? "radio" : "checkbox"}
            aria-checked={on}
            className={on ? "pt-chip on" : "pt-chip"}
            onClick={() => {
              if (single) onChange([o.value]);
              else onChange(on ? value.filter((v) => v !== o.value) : [...value, o.value]);
            }}
          >
            <span className="pt-chip-label">{o.label ?? o.value}</span>
            {o.note && <span className="pt-chip-note">{o.note}</span>}
          </button>
        );
      })}
    </div>
  );
}

function Scale({
  q,
  value,
  onChange,
  tint,
}: {
  q: Extract<Question, { kind: "scale" }>;
  value: number | undefined;
  onChange: (n: number) => void;
  tint: string;
}) {
  const v = value ?? Math.round((q.min + q.max) / 2);
  const pct = ((v - q.min) / (q.max - q.min)) * 100;
  return (
    <div className="pt-scale" style={{ "--dot": tint, "--pct": `${pct}%` } as React.CSSProperties}>
      <div className="pt-scale-row">
        <span className="pt-scale-end">{q.low}</span>
        <span className="anton pt-scale-num" aria-hidden>
          {value == null ? "–" : v}
        </span>
        <span className="pt-scale-end pt-scale-end--r">{q.high}</span>
      </div>
      <input
        type="range"
        min={q.min}
        max={q.max}
        step={1}
        value={v}
        aria-label={q.label}
        aria-valuetext={`${v} of ${q.max}`}
        onChange={(e) => onChange(Number(e.target.value))}
        onPointerDown={() => value == null && onChange(v)}
      />
      <div className="pt-scale-ticks" aria-hidden>
        {Array.from({ length: q.max - q.min + 1 }, (_, i) => (
          <span key={i} className={i + q.min <= v && value != null ? "on" : undefined} />
        ))}
      </div>
      {value == null && <p className="pt-hint">Drag the slider to set a value.</p>}
    </div>
  );
}

function Field({
  q,
  answers,
  setAnswer,
  tint,
  invalid,
}: {
  q: Question;
  answers: Answers;
  setAnswer: (key: string, v: Answers[string]) => void;
  tint: string;
  invalid: boolean;
}) {
  const id = "q-" + q.key;
  const raw = answers[q.key];
  const list = Array.isArray(raw) ? raw : raw == null ? [] : [String(raw)];
  return (
    <div className={invalid ? "pt-field pt-field--invalid" : "pt-field"}>
      <label htmlFor={id} className="pt-label">
        {q.label}
        {q.required ? <span className="pt-req"> *</span> : null}
      </label>
      {q.hint && <p className="pt-hint">{q.hint}</p>}

      {q.kind === "text" && (
        <input
          id={id}
          className="pt-input"
          type="text"
          value={typeof raw === "string" ? raw : ""}
          placeholder={q.placeholder}
          onChange={(e) => setAnswer(q.key, e.target.value)}
        />
      )}
      {q.kind === "textarea" && (
        <textarea
          id={id}
          className="pt-input pt-textarea"
          rows={4}
          value={typeof raw === "string" ? raw : ""}
          placeholder={q.placeholder}
          onChange={(e) => setAnswer(q.key, e.target.value)}
        />
      )}
      {q.kind === "single" && (
        <Chips options={q.options} value={list} single tint={tint} onChange={(n) => setAnswer(q.key, n[0])} />
      )}
      {q.kind === "multi" && (
        <Chips options={q.options} value={list} tint={tint} onChange={(n) => setAnswer(q.key, n)} />
      )}
      {q.kind === "scale" && (
        <Scale q={q} value={typeof raw === "number" ? raw : undefined} tint={tint} onChange={(n) => setAnswer(q.key, n)} />
      )}
      {invalid && <p className="pt-error">This one is required.</p>}
    </div>
  );
}

// ---------- portal ----------

export default function Portal() {
  const [mode, setMode] = useState<Mode>("signup");
  const [account, setAccount] = useState<Account>({ username: "", name: "", password: "" });
  const [authError, setAuthError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState(0);
  const [showErrors, setShowErrors] = useState(false);
  const [busy, setBusy] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const current = STEPS[step];
  const tint = color(step);
  const missing = useMemo(() => stepMissing(current, answers), [current, answers]);

  // persist the draft as the user goes
  useEffect(() => {
    if (mode !== "intake" || !account.username) return;
    writeDraft(account.username, { answers, step });
  }, [answers, step, mode, account.username]);

  const setAnswer = useCallback((key: string, v: Answers[string]) => {
    setAnswers((a) => ({ ...a, [key]: v }));
  }, []);

  const scrollTop = () => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const startSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const email = account.username.trim();
    if (!EMAIL_RE.test(email)) return setAuthError("Enter a valid email address.");
    if (account.name.trim().length < 2) return setAuthError("Tell us your name or artist name.");
    if (account.password.length < 8) return setAuthError("Password needs at least 8 characters.");
    setAuthError(null);
    const draft = readDraft(email);
    if (draft?.submitted) {
      setAnswers(draft.answers);
      setMode("done");
      return;
    }
    if (draft) {
      setAnswers(draft.answers);
      setStep(Math.min(draft.step, STEPS.length - 1));
    }
    setMode("intake");
  };

  const signin = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = account.username.trim();
    if (!EMAIL_RE.test(email)) return setAuthError("Enter a valid email address.");
    if (!account.password) return setAuthError("Enter your password.");
    setAuthError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/portal", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ action: "signin", username: email, password: account.password }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; name?: string };
      if (!res.ok || !data.ok) {
        setAuthError(data.error || "We couldn’t sign you in. Check your email and password.");
        return;
      }
      const draft = readDraft(email);
      if (data.name) setAccount((a) => ({ ...a, name: data.name as string }));
      if (draft) {
        setAnswers(draft.answers);
        setStep(Math.min(draft.step, STEPS.length - 1));
        setMode(draft.submitted ? "done" : "intake");
      } else {
        setMode("intake");
      }
    } catch {
      setAuthError("Network error. Try again in a moment.");
    } finally {
      setBusy(false);
    }
  };

  const next = () => {
    if (missing.length) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    if (step < STEPS.length - 1) {
      setStep(step + 1);
      scrollTop();
    } else {
      void submit();
    }
  };

  const back = () => {
    setShowErrors(false);
    if (step === 0) setMode("signup");
    else setStep(step - 1);
    scrollTop();
  };

  const submit = async () => {
    setBusy(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/portal", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          action: "signup",
          username: account.username.trim(),
          name: account.name.trim(),
          password: account.password,
          answers: toRecord(answers),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setSubmitError(data.error || "Something went wrong sending your answers. Try again.");
        return;
      }
      writeDraft(account.username, { answers, step, submitted: true });
      setMode("done");
      scrollTop();
    } catch {
      setSubmitError("Network error. Your answers are saved on this device. Try again in a moment.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="pt-root">
      <header className="pt-header">
        <a className="brand" href="https://eternaltilidie.com">
          <Image src={graffitiLogo} alt="Eternal" style={{ width: 78, height: "auto" }} />
        </a>
        <div className="pt-header-right">
          <span className="pt-header-label">Portal</span>
          {mode === "intake" && (
            <span className="pt-header-count">
              {String(step + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
            </span>
          )}
        </div>
      </header>

      <Image
        src={doodleStar}
        alt=""
        className="floaty pt-floaty"
        style={{ left: "6%", top: "18%", width: "clamp(44px,6vw,84px)", height: "auto", opacity: 0.55, animationDuration: "8s" }}
      />
      <Image
        src={doodleStar}
        alt=""
        className="floaty pt-floaty"
        style={{ right: "7%", top: "62%", width: "clamp(34px,4.5vw,64px)", height: "auto", opacity: 0.45, scale: "-1 1", animationDuration: "10s" }}
      />

      <main className="pt-page" ref={topRef}>
        {(mode === "signin" || mode === "signup") && (
          <section className="pt-card pt-auth">
            <div className="pt-auth-head">
              <Image src={mascot} alt="" className="pt-mascot" style={{ width: "clamp(88px,11vw,124px)", height: "auto" }} />
              <p className="pt-kicker">
                <i style={{ background: "#f5c518" }} />
                {mode === "signup" ? "Join Eternal" : "Welcome back"}
              </p>
              <h1 className="anton pt-h1">{mode === "signup" ? "Tell us who you are" : "Sign in"}</h1>
              <p className="pt-lede">
                {mode === "signup"
                  ? `Create your account, then walk through ${FORM_NAME}: a short intake that is how we get to know you before we work together.`
                  : "Pick up where you left off, or revisit what you told us."}
              </p>
            </div>

            <div className="pt-tabs" role="tablist" aria-label="Sign up or sign in">
              <button
                type="button"
                role="tab"
                aria-selected={mode === "signup"}
                className={mode === "signup" ? "on" : undefined}
                onClick={() => {
                  setMode("signup");
                  setAuthError(null);
                }}
              >
                Sign up
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mode === "signin"}
                className={mode === "signin" ? "on" : undefined}
                onClick={() => {
                  setMode("signin");
                  setAuthError(null);
                }}
              >
                Sign in
              </button>
            </div>

            <form className="pt-form" onSubmit={mode === "signup" ? startSignup : signin} noValidate>
              <div className="pt-field">
                <label className="pt-label" htmlFor="username">
                  Email
                </label>
                <input
                  id="username"
                  className="pt-input"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="you@domain.com"
                  value={account.username}
                  onChange={(e) => setAccount({ ...account, username: e.target.value })}
                />
              </div>
              {mode === "signup" && (
                <div className="pt-field">
                  <label className="pt-label" htmlFor="name">
                    Name or artist name
                  </label>
                  <input
                    id="name"
                    className="pt-input"
                    type="text"
                    autoComplete="name"
                    placeholder="ARA"
                    value={account.name}
                    onChange={(e) => setAccount({ ...account, name: e.target.value })}
                  />
                </div>
              )}
              <div className="pt-field">
                <label className="pt-label" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  className="pt-input"
                  type="password"
                  autoComplete={mode === "signup" ? "new-password" : "current-password"}
                  placeholder={mode === "signup" ? "At least 8 characters" : "••••••••"}
                  value={account.password}
                  onChange={(e) => setAccount({ ...account, password: e.target.value })}
                />
              </div>
              {authError && (
                <p className="pt-error" role="alert">
                  {authError}
                </p>
              )}
              <div className="pt-actions">
                <button type="submit" className="pt-btn pt-btn--primary" disabled={busy}>
                  {busy ? "One sec…" : mode === "signup" ? "Start the intake →" : "Sign in →"}
                </button>
              </div>
              <p className="pt-fine">
                {mode === "signup" ? (
                  <>
                    Already have an account?{" "}
                    <button type="button" className="pt-linkbtn" onClick={() => setMode("signin")}>
                      Sign in
                    </button>
                    .
                  </>
                ) : (
                  <>
                    New here?{" "}
                    <button type="button" className="pt-linkbtn" onClick={() => setMode("signup")}>
                      Create an account
                    </button>
                    .
                  </>
                )}
              </p>
            </form>
            <Dots />
          </section>
        )}

        {mode === "intake" && (
          <section className="pt-card" style={{ "--dot": tint } as React.CSSProperties}>
            <div className="pt-progress" aria-hidden>
              {STEPS.map((s, i) => (
                <span
                  key={s.id}
                  className={i < step ? "done" : i === step ? "now" : undefined}
                  style={{ background: i <= step ? color(i) : undefined }}
                />
              ))}
            </div>

            <div className="pt-step-head">
              <p className="pt-kicker">
                <i style={{ background: tint }} />
                {current.kicker}
              </p>
              <h1 className="anton pt-h1">{current.title}</h1>
              {current.intro && <p className="pt-lede">{current.intro}</p>}
              <p className="pt-who">
                {account.name || account.username}
                {" · "}
                <button type="button" className="pt-linkbtn" onClick={() => setMode("signup")}>
                  not you?
                </button>
              </p>
            </div>

            <form
              className="pt-form"
              onSubmit={(e) => {
                e.preventDefault();
                next();
              }}
              noValidate
            >
              {current.questions.filter((q) => isVisible(q, answers)).map((q) => (
                <Field
                  key={q.key}
                  q={q}
                  answers={answers}
                  setAnswer={setAnswer}
                  tint={tint}
                  invalid={showErrors && missing.includes(q.key)}
                />
              ))}

              {submitError && (
                <p className="pt-error" role="alert">
                  {submitError}
                </p>
              )}

              <div className="pt-actions">
                <button type="button" className="pt-btn" onClick={back} disabled={busy}>
                  ← Back
                </button>
                <button type="submit" className="pt-btn pt-btn--primary" disabled={busy}>
                  {busy ? "Sending…" : step === STEPS.length - 1 ? "Submit" : "Next →"}
                </button>
              </div>
              <p className="pt-fine">Your answers save on this device as you go.</p>
            </form>
          </section>
        )}

        {mode === "done" && (
          <section className="pt-card pt-done">
            <Image src={mascot} alt="" className="pt-mascot" style={{ width: "clamp(110px,14vw,160px)", height: "auto" }} />
            <p className="pt-kicker">
              <i style={{ background: "#6abf40" }} />
              You’re in
            </p>
            <h1 className="anton pt-h1">Thank you, {(account.name || account.username).split(" ")[0]}.</h1>
            <p className="pt-lede">
              We read every intake. Someone from the Eternal team will reach out at{" "}
              <strong>{account.username}</strong>.
            </p>
            <div className="pt-actions pt-actions--center">
              <button
                type="button"
                className="pt-btn"
                onClick={() => {
                  setStep(0);
                  setMode("intake");
                }}
              >
                Review my answers
              </button>
              <a className="pt-btn pt-btn--primary" href="https://eternaltilidie.com">
                Back to Eternal →
              </a>
            </div>
            <Dots />
          </section>
        )}
      </main>

      <div className="grain" />
    </div>
  );
}
