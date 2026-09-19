import type { Metadata } from "next";
import Image from "next/image";
import "./letter.css";

import graffitiLogo from "@/public/images/graffiti-logo.png";
import doodleStar from "@/public/images/doodle-star.png";
import doodleHeart from "@/public/images/doodle-heart.png";
import avatarsTogether from "@/public/images/avatars-together.jpg";

export const metadata: Metadata = {
  title: "Max Brown × Eternal",
  description: "A letter to Max Brown: an internship proposal from Eternal.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Max Brown × Eternal",
    description: "A letter. An internship proposal.",
    type: "website",
    url: "https://eternaltilidie.com/proposals/max-brown",
    images: [{ url: "https://eternaltilidie.com/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Max Brown × Eternal",
    description: "A letter. An internship proposal.",
    images: ["https://eternaltilidie.com/og.png"],
  },
};

const C = {
  pink: "#f97fc0",
  red: "#f2543d",
  yellow: "#f5c518",
  green: "#6abf40",
  blue: "#3b82f6",
  cyan: "#2ec4e6",
};
const PALETTE = [C.pink, C.red, C.yellow, C.green, C.blue, C.cyan];

const v = (color: string, extra?: React.CSSProperties) =>
  ({ "--dot": color, ...extra } as React.CSSProperties);

function Dots({ small = false }: { small?: boolean }) {
  return (
    <div className={small ? "dots dots--small" : "dots"}>
      {PALETTE.map((c) => (
        <span key={c} style={{ background: c }} />
      ))}
    </div>
  );
}

function Kicker({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <p className="lt-kicker">
      <i style={{ background: color }} />
      {children}
    </p>
  );
}

function SectionHead({
  kicker,
  color,
  title,
  children,
}: {
  kicker: string;
  color: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="lt-section-head">
      <Kicker color={color}>{kicker}</Kicker>
      <h2 className="anton lt-h2">{title}</h2>
      {children && <p className="lt-body lt-muted">{children}</p>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// TODO(scope): the tracks, terms and deliverables below are placeholders.
// Fill them in from the Notion doc "Max Brown Internship Scope of Work"
// (createsafe.notion.site/Max-Brown-Internship-Scope-of-Work-3e00634fd687802aaac8e0cacf499a90).
// Anything with `todo: true` renders a red FROM NOTION badge so the page can't
// be sent with placeholders in it by accident. Delete the `todo` flags once real.
// ---------------------------------------------------------------------------

type Track = { name: string; desc: string; bullets: string[]; todo?: boolean };

const TRACKS: Track[] = [
  {
    name: "Track one",
    desc: "One-line description of the first area of work from the scope doc.",
    bullets: ["Responsibility or deliverable", "Responsibility or deliverable", "Responsibility or deliverable"],
    todo: true,
  },
  {
    name: "Track two",
    desc: "One-line description of the second area of work from the scope doc.",
    bullets: ["Responsibility or deliverable", "Responsibility or deliverable"],
    todo: true,
  },
  {
    name: "Track three",
    desc: "One-line description of the third area of work from the scope doc.",
    bullets: ["Responsibility or deliverable", "Responsibility or deliverable"],
    todo: true,
  },
];

type Term = { label: string; num: string; sub: string; color: string; todo?: boolean };

const TERMS: Term[] = [
  { label: "Start", num: "Date", sub: "from the scope doc", color: C.green, todo: true },
  { label: "Length", num: "Duration", sub: "from the scope doc", color: C.blue, todo: true },
  { label: "Time", num: "Hrs / week", sub: "around your Drexel schedule", color: C.yellow, todo: true },
  { label: "Where", num: "Remote / LA", sub: "from the scope doc", color: C.pink, todo: true },
];

const WE_GIVE: string[] = [
  "A seat inside a working label, not a classroom version of one.",
  "Direct time with Daouda every week: real questions, real answers, real decisions.",
  "The tools we actually run on, including StudioOS, our artist portal.",
  "Credit on the things you touch. Your name goes where your work goes.",
];

const WE_ASK: string[] = [
  "Show up curious. The people who win here are the ones who ask the second question.",
  "Own what you take on. Small things done all the way beat big things done halfway.",
  "Keep making music. This is meant to feed your work, not replace it.",
  "Tell us when something isn't working. Early and honestly.",
];

const WALK_AWAY: { title: string; body: string }[] = [
  {
    title: "How a label actually runs",
    body: "The operating rhythm behind a release: what gets decided, who decides it, when, and why. The part nobody teaches producers.",
  },
  {
    title: "How an artist gets built",
    body: "Not just launched. Built, and then kept thriving. You'll see the whole arc up close on real artists, not case studies.",
  },
  {
    title: "How to read the industry in real time",
    body: "What's trending, what's about to, and how to turn a read on culture into a plan you can actually execute.",
  },
  {
    title: "How to take a vision to reality",
    body: "You said this is the muscle you want to build. This is where you build it, on projects that ship.",
  },
];

export default function MaxBrownLetter() {
  return (
    <div className="lt-root">
      <header className="lt-header">
        <a className="brand" href="https://eternaltilidie.com">
          <Image src={graffitiLogo} alt="Eternal" style={{ width: 78, height: "auto" }} />
        </a>
        <div className="lt-header-right">
          <span className="lt-header-label">A letter to Max Brown</span>
        </div>
      </header>

      <main className="lt-page">
        {/* Opening */}
        <section className="lt-section" style={{ gap: 26, position: "relative" }}>
          <Image
            src={doodleStar}
            alt=""
            className="lt-floaty"
            style={{ right: "4%", top: "-10px", width: "clamp(44px,6vw,80px)", height: "auto", opacity: 0.85 }}
          />
          <Image
            src={doodleHeart}
            alt=""
            className="lt-floaty"
            style={{ right: "14%", top: "150px", width: "clamp(34px,4vw,56px)", height: "auto", opacity: 0.7, animationDuration: "11s" }}
          />
          <Kicker color={C.cyan}>Eternal · Internship proposal · September 19, 2026</Kicker>
          <h1 className="anton lt-h1">
            Max,
            <br />
            <span className="accent">let&rsquo;s work.</span>
          </h1>
          <p className="lt-lede">
            We&rsquo;ve talked three times this week. Every call ended the same way: with me wanting to keep
            going. So instead of another call, here&rsquo;s a letter. It says what I&rsquo;d like to build with you,
            what you&rsquo;d actually be doing, and what I&rsquo;m asking of you in return.
          </p>
          <p className="lt-lede">
            Short version: <strong>come intern at Eternal.</strong> Learn the inside of a label by working inside one.
          </p>
          <Dots />
        </section>

        {/* Why you */}
        <section className="lt-section">
          <SectionHead kicker="Why you" color={C.pink} title="You already told us what you want" />
          <p className="lt-body">
            When you went through the Reflection Wizard, you wrote this:
          </p>
          <blockquote className="lt-quote" style={v(C.pink)}>
            <p>
              &ldquo;The kind of help that I am looking for lies in the music business. I want to learn the ins
              and outs of label operation as well as how to not only build an artist, but how to keep them
              thriving and pushing the limits.&rdquo;
            </p>
            <cite>Max Brown, The Reflection Wizard</cite>
          </blockquote>
          <p className="lt-body">
            That is, almost word for word, what a label does all day. It&rsquo;s also the thing you can&rsquo;t
            learn from the outside. You can read about it, you can watch it on YouTube, but the real
            education is being in the room when a decision gets made and understanding why.
          </p>
          <p className="lt-body">
            Two other things you wrote stuck with me. One: when you hear a sound, you spend hours recreating
            it until you crack the code. Two: you&rsquo;re extremely adaptable, and you can look at a situation
            from every angle. Those are producer instincts. They are also, exactly, operator instincts. The
            difference between the two is just what you point them at.
          </p>
        </section>

        {/* What Eternal is */}
        <section className="lt-section">
          <SectionHead kicker="Where you'd be" color={C.cyan} title="What Eternal is">
            An audiovisual technology label. A home for artists developing the next generation of storytelling.
          </SectionHead>
          <div className="lt-cards lt-cards--2" style={{ display: "grid" }}>
            <div className="lt-textcard" style={v(C.cyan)}>
              <h3>A label</h3>
              <p>
                We sign, develop and release artists. We do the work a label does: A&amp;R, production, release
                strategy, marketing, partnerships, and the long game of keeping an artist growing after the
                first record lands.
              </p>
            </div>
            <div className="lt-textcard" style={v(C.yellow)}>
              <h3>A technology company</h3>
              <p>
                We build the tools we run on. Our artists manage production, administration and marketing
                through{" "}
                <a className="lt-link" href="https://eternal.createos.app" target="_blank" rel="noopener">
                  StudioOS
                </a>
                , our own artist portal. You&rsquo;d learn the business on the same system we use to run it.
              </p>
            </div>
          </div>
          <p className="lt-body">
            Small team, a lot happening, no back row. Whoever is in the room is in the work. That&rsquo;s the
            point of doing this here rather than at a place where an intern watches from a desk.
          </p>
        </section>

        {/* The scope of work */}
        <section className="lt-section">
          <SectionHead kicker="What you'd actually do" color={C.yellow} title="The scope of work">
            This is the real list. Not &ldquo;shadow the team.&rdquo; Things you own, with your name on them.
          </SectionHead>
          <ol className="lt-tracks">
            {TRACKS.map((t, i) => (
              <li key={t.name} style={v(PALETTE[i % PALETTE.length])}>
                <span className="num">{i + 1}</span>
                <div className="grow">
                  <span className="name">
                    {t.name}
                    {t.todo && <span className="lt-todo">From Notion</span>}
                  </span>
                  <span className="desc">{t.desc}</span>
                  <ul>
                    {t.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* The shape of it */}
        <section className="lt-section">
          <SectionHead kicker="How it works" color={C.green} title="The shape of it">
            Built around Drexel, not against it. Your studies and your music come first. This fits in the
            hours around them.
          </SectionHead>
          <ul className="lt-cards">
            {TERMS.map((t) => (
              <li key={t.label} className="lt-card" style={v(t.color)}>
                <span className="label">
                  {t.label}
                  {t.todo && <span className="lt-todo">From Notion</span>}
                </span>
                <span className="num">{t.num}</span>
                <span className="sub">{t.sub}</span>
              </li>
            ))}
          </ul>
          <div className="lt-split">
            <div className="lt-textcard" style={v(C.green)}>
              <h3>What we give</h3>
              <ul className="lt-list" style={v(C.green)}>
                {WE_GIVE.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <div className="lt-textcard" style={v(C.red)}>
              <h3>What we ask</h3>
              <ul className="lt-list" style={v(C.red)}>
                {WE_ASK.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* What you walk away with */}
        <section className="lt-section">
          <SectionHead kicker="At the end" color={C.blue} title="What you walk away with" />
          <div className="lt-cards lt-cards--2" style={{ display: "grid" }}>
            {WALK_AWAY.map((q, i) => (
              <div key={q.title} className="lt-textcard" style={v(PALETTE[(i + 3) % PALETTE.length])}>
                <h3>{q.title}</h3>
                <p>{q.body}</p>
              </div>
            ))}
          </div>
          <p className="lt-body">
            And the thing that matters most, which doesn&rsquo;t fit in a card: a body of real work, a set of
            real relationships, and a clear picture of where you want to go next. Whether that&rsquo;s here, or
            somewhere this helps you get to.
          </p>
        </section>

        {/* The ask */}
        <section className="lt-ask">
          <Kicker color="#000">The ask</Kicker>
          <h2 className="anton lt-h2">Say yes, then let&rsquo;s set a start date</h2>
          <p>
            Read this, sit with it, and tell me what you think. If something in the scope feels off, say
            so; it&rsquo;s a proposal, not a contract. If it feels right, reply with a yes and we&rsquo;ll lock the
            start date and first week on our next call.
          </p>
          <div className="lt-cta-row">
            <a
              className="lt-cta"
              style={v(C.yellow)}
              href="mailto:daouda@createsafe.io?subject=Max%20x%20Eternal%20%E2%80%94%20yes"
            >
              I&rsquo;m in
            </a>
            <a className="lt-cta lt-cta--ghost" style={v(C.cyan)} href="mailto:daouda@createsafe.io?subject=Max%20x%20Eternal%20%E2%80%94%20questions">
              I have questions
            </a>
          </div>
        </section>

        {/* Sign-off */}
        <section className="lt-section">
          <p className="lt-body">
            You wrote that you feel empowered because you&rsquo;ve been using what&rsquo;s at your disposal to make
            something of yourself. Consider this one more thing at your disposal.
          </p>
          <p className="lt-body">Talk soon,</p>
          <div className="lt-sign">
            <span className="name">Daouda Leonard</span>
            <span className="role">Eternal · CreateSafe</span>
            <a className="lt-link lt-note" href="mailto:daouda@createsafe.io">
              daouda@createsafe.io
            </a>
          </div>
        </section>

        {/* Closing */}
        <section className="lt-closing">
          <Image
            src={avatarsTogether}
            alt="Eternal avatars standing together"
            style={{ width: "min(360px,70vw)", height: "auto" }}
          />
          <p className="lt-sub">Let&rsquo;s build something eternal.</p>
          <div className="closing-social">
            <a href="https://www.tiktok.com/@eternaltilidie" target="_blank" rel="noopener">
              TikTok
            </a>
            <span>&amp;</span>
            <a href="https://www.instagram.com/eternaltilidie/" target="_blank" rel="noopener">
              IG
            </a>
            <span>: @eternaltilidie</span>
          </div>
          <Dots small />
        </section>
      </main>

      <div className="grain" />
    </div>
  );
}
