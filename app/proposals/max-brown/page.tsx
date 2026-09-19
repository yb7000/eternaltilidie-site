import type { Metadata } from "next";
import Image from "next/image";
import "./letter.css";

import graffitiLogo from "@/public/images/graffiti-logo.png";
import doodleStar from "@/public/images/doodle-star.png";
import doodleHeart from "@/public/images/doodle-heart.png";
import avatarsTogether from "@/public/images/avatars-together.jpg";

export const metadata: Metadata = {
  title: "Max Brown × Eternal",
  description: "A letter to Max Brown: a six-month internship proposal from Eternal.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Max Brown × Eternal",
    description: "A letter. A six-month internship proposal.",
    type: "website",
    url: "https://eternaltilidie.com/proposals/max-brown",
    images: [{ url: "https://eternaltilidie.com/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Max Brown × Eternal",
    description: "A letter. A six-month internship proposal.",
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

// ---- the scope of work (from the internship outline, 9/19/2026) ----

const PROJECTS: { name: string; sub: string; color: string }[] = [
  { name: "Eternal", sub: "The technology label. Product development.", color: C.cyan },
  { name: "Ocean", sub: "Producer, DJ and solo artist. Day-to-day management.", color: C.blue },
  { name: "Kennyflowers", sub: "Artist. Day-to-day management, Interscope Records.", color: C.pink },
  { name: "Jasmine Yen", sub: "Artist. Day-to-day management with the Yen family.", color: C.yellow },
];

const STANDING_ORDERS: string[] = [
  "Keep track of every unanswered question in every group chat you're in with Daouda.",
  "Keep track of introductions made by Daouda or Langa that need to become meetings or projects for Eternal.",
  "Remind Daouda, Langa and the artist teams about the tasks they're supposed to complete.",
  "Make sure every single task has a lead. No exceptions.",
  "Send the to-do list in the morning. Send it back at night with the checks.",
  "Attend meetings, take the notes, and know the situation.",
  "Read the AI-generated transcripts and pull out the tasks and deliverables that need execution.",
  "Monitor the situation.",
];

type Track = { name: string; desc: string; bullets: string[] };

const TRACKS: Track[] = [
  {
    name: "Ocean",
    desc: "A&R. This is where your producer ear goes to work.",
    bullets: [
      "Create A&R suggestions for samples to remix, interpolate or cover, and deliver them to Ocean.",
    ],
  },
  {
    name: "Kennyflowers",
    desc: "The major-label side.",
    bullets: [
      "Keep Daouda on track for his meetings with senior A&R and marketing leadership at Interscope Records on behalf of Kennyflowers.",
    ],
  },
  {
    name: "Jasmine Yen",
    desc: "Artist Management.",
    bullets: [
      "Schedule and attend meetings with Daouda and the Yen family.",
      "Keep track of what Daouda needs to complete for them, and make sure he completes it.",
    ],
  },
  {
    name: "Eternal",
    desc: "The product side. You'll be one of the first people to break the new apps before anyone else does.",
    bullets: [
      "Product review, Q&A and bug support for one of the new Eternal apps.",
      "Manage live broadcast recordings and their metadata.",
      "Manage Biscuit Run logistics.",
      "Build out the CRM and how people access it. Addy.",
    ],
  },
];

const LEARN: { title: string; body: string }[] = [
  {
    title: "How to develop a production brand",
    body: "The thing you're already building for yourself, seen from the management side.",
  },
  {
    title: "A&R and production management",
    body: "Finding the record, and then running everything it takes to get it made and out.",
  },
  {
    title: "How a technology-focused artist management company runs",
    body: "Business development, operations and compliance. The unglamorous part that decides whether a company survives.",
  },
  {
    title: "How to form an opinion on a hit",
    body: "Identifying a hit song or record, and being able to say why. Out loud, in the room.",
  },
  {
    title: "How to work with a major label",
    body: "A&R, creative, marketing, admin, distribution and promotions departments. Who does what, and how to get things through them.",
  },
];

const WE_GIVE: string[] = [
  "A seat inside a working label, not a classroom version of one.",
  "Direct time with Daouda and Langa, every week: real questions, real answers, real decisions.",
  "The tools we actually run on, including the apps you'll be helping test.",
  "Internship credit from CreateSafe, Inc. to Drexel University.",
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
          <Kicker color={C.cyan}>Six-month internship proposal · September 19, 2026</Kicker>
          <h1 className="anton lt-h1">
            Max,
            <br />
            <span className="accent">let&rsquo;s work.</span>
          </h1>
          <p className="lt-lede">
            <strong>Come intern at Eternal.</strong> Learn the inside of building a production brand,
            artist management and how a label works.
          </p>
          <Dots />
        </section>

        {/* The role */}
        <section className="lt-section">
          <SectionHead kicker="The role" color={C.cyan} title="Direct support for Daouda">
            You&rsquo;d be working directly with me, alongside my co-founder Langa Kambi-Shamba. I oversee the
            day-to-day management of Kennyflowers, Ocean and Jasmine Yen, and product development for
            Eternal, our technology label. You&rsquo;d be supporting me across all four.
          </SectionHead>
          <ul className="lt-cards">
            {PROJECTS.map((p) => (
              <li key={p.name} className="lt-card" style={v(p.color)}>
                <span className="num">{p.name}</span>
                <span className="sub">{p.sub}</span>
              </li>
            ))}
          </ul>
          <p className="lt-body">
            Small team, a lot happening, no back row.
          </p>
        </section>

        {/* Standing orders */}
        <section className="lt-section">
          <SectionHead kicker="Every day" color={C.red} title="The standing orders">
            This is the job underneath the job. Do these eight things relentlessly and everything else gets
            easier for everyone.
          </SectionHead>
          <ol className="lt-orders">
            {STANDING_ORDERS.map((t, i) => (
              <li key={t} style={v(PALETTE[i % PALETTE.length])}>
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <span className="text">{t}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* The scope of work */}
        <section className="lt-section">
          <SectionHead kicker="Day to day" color={C.yellow} title="What you'd actually be doing">
            Not &ldquo;shadow the team.&rdquo; Things you own, project by project, with your name on them.
          </SectionHead>
          <ol className="lt-tracks">
            {TRACKS.map((t, i) => (
              <li key={t.name} style={v(PALETTE[(i + 4) % PALETTE.length])}>
                <span className="num">{i + 1}</span>
                <div className="grow">
                  <span className="name">{t.name}</span>
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
            Built around Drexel, not against it. Your studies and your music come first.
          </SectionHead>
          <ul className="lt-cards">
            <li className="lt-card" style={v(C.green)}>
              <span className="label">Length</span>
              <span className="num">6 months</span>
              <span className="sub">the role as we discussed it</span>
            </li>
            <li className="lt-card" style={v(C.blue)}>
              <span className="label">Reports to</span>
              <span className="num">Daouda Leonard</span>
              <span className="sub">direct support, day to day</span>
            </li>
            <li className="lt-card" style={v(C.pink)}>
              <span className="label">Alongside</span>
              <span className="num">Langa Kambi-Shamba</span>
              <span className="sub">co-founder</span>
            </li>
            <li className="lt-card" style={v(C.yellow)}>
              <span className="label">Credit</span>
              <span className="num">Drexel University</span>
              <span className="sub">internship credit from CreateSafe, Inc.</span>
            </li>
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
              <h3>How you&rsquo;re graded</h3>
              <p>
                One measure: how successful you are in enabling me to generate revenue for the projects
                above. Not hours logged, not tasks counted. Did the work move the money for Eternal, Ocean,
                Kennyflowers and Jasmine Yen. That&rsquo;s the bar, and it&rsquo;s the same bar I hold myself to.
              </p>
              <p>
                The credit line on the other side of it reads: <strong style={{ color: C.yellow }}>skilled at
                A&amp;R and production management for an artist and artist manager.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* What you learn */}
        <section className="lt-section">
          <SectionHead kicker="At the end" color={C.blue} title="What you will learn" />
          <div className="lt-cards lt-cards--2" style={{ display: "grid" }}>
            {LEARN.map((q, i) => (
              <div key={q.title} className="lt-textcard" style={v(PALETTE[(i + 3) % PALETTE.length])}>
                <h3>{q.title}</h3>
                <p>{q.body}</p>
              </div>
            ))}
          </div>
          <p className="lt-body">
            And the thing that matters most, which doesn&rsquo;t fit in a card: six months of real work, a set
            of real relationships, and a clear picture of where you want to go next. Whether that&rsquo;s here,
            or somewhere this helps you get to.
          </p>
        </section>

        {/* The ask */}
        <section className="lt-ask">
          <Kicker color="#000">The ask</Kicker>
          <h2 className="anton lt-h2">Let&rsquo;s set the next meeting.</h2>
          <p>
            I&rsquo;m getting all of this memorialized in a proper internship document for Drexel. In the
            meantime, read this, sit with it, and schedule our next session via my Calendly link. We will
            use that time to answer any questions and go over the scope of work to gain further shared
            alignment.
          </p>
          <div className="lt-cta-row">
            <a
              className="lt-cta"
              style={v(C.yellow)}
              href="https://calendly.com/daoudaleonard"
              target="_blank"
              rel="noopener"
            >
              Schedule on Calendly
            </a>
          </div>
        </section>

        {/* Sign-off */}
        <section className="lt-section">
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
