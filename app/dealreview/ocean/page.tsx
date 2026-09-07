import type { Metadata } from "next";
import Image from "next/image";
import "./deal.css";

import graffitiLogo from "@/public/images/graffiti-logo.png";
import avatarsTogether from "@/public/images/avatars-together.jpg";

export const metadata: Metadata = {
  title: "Ocean × Eternal — Deal Review",
  description: "Eternal’s first-look deal review of Ocean: consumption, attribution, catalog, audience, financial framing and deal risks.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Ocean × Eternal — Deal Review",
    description: "First-look deal review: consumption, attribution, catalog, audience, financial framing and deal risks.",
    type: "website",
    url: "https://eternaltilidie.com/dealreview/ocean",
    images: [{ url: "https://eternaltilidie.com/og-ocean-deal-review.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ocean × Eternal — Deal Review",
    description: "First-look deal review: consumption, attribution, catalog, audience, financial framing and deal risks.",
    images: ["https://eternaltilidie.com/og-ocean-deal-review.jpg"],
  },
};

const C = {
  pink: "#f97fc0",
  red: "#f2543d",
  yellow: "#f5c518",
  green: "#6abf40",
  blue: "#3b82f6",
  cyan: "#2ec4e6",
  grey: "rgba(255,255,255,0.55)",
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
    <p className="dr-kicker">
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
    <div className="dr-section-head">
      <Kicker color={color}>{kicker}</Kicker>
      <h2 className="anton dr-h2">{title}</h2>
      {children && <p className="dr-body dr-muted">{children}</p>}
    </div>
  );
}

type Card = { label: string; num: string; sub: string; color: string; white?: boolean; small?: boolean };

function Cards({ items, cols = 4 }: { items: Card[]; cols?: 2 | 3 | 4 }) {
  const cls = ["dr-cards", cols === 3 && "dr-cards--3", cols === 2 && "dr-cards--2"].filter(Boolean).join(" ");
  return (
    <ul className={cls}>
      {items.map((c) => (
        <li key={c.label} className="dr-card" style={v(c.color)}>
          <span className="label">{c.label}</span>
          <span className={["num", c.white && "num--white", c.small && "num--sm"].filter(Boolean).join(" ")}>{c.num}</span>
          <span className="sub">{c.sub}</span>
        </li>
      ))}
    </ul>
  );
}

type Bar = { name: string; val: string; pct: string; w: number; neg?: boolean };

function Bars({ items }: { items: Bar[] }) {
  return (
    <ul className="dr-bars">
      {items.map((b, i) => (
        <li key={b.name}>
          <span className="name">{b.name}</span>
          <span className="track">
            <span
              className="fill"
              style={v(b.neg ? C.red : PALETTE[i % PALETTE.length], { "--w": `${b.w}%` } as React.CSSProperties)}
            />
          </span>
          <span className="val" style={{ color: b.neg ? C.red : "#fff" }}>
            {b.val}
            <small>{b.pct}</small>
          </span>
        </li>
      ))}
    </ul>
  );
}

// ---- data (verbatim from the 9/3/2026 first-look pull) ----

const ATTRIBUTION: Bar[] = [
  { name: "Love Me For Real", val: "28.5K", pct: "+96.8%", w: 100 },
  { name: "Preach", val: "3.8K", pct: "+13.0%", w: 13.3 },
  { name: "I NEED YOUR LOVE", val: "950", pct: "+3.2%", w: 3.3 },
  { name: "Dadada", val: "681", pct: "+2.3%", w: 2.4 },
  { name: "Nobody", val: "-3,368", pct: "-11.4%", w: 11.8, neg: true },
  { name: "I Want Your Love", val: "-1,361", pct: "-4.6%", w: 4.8, neg: true },
  { name: "Other (7 tracks)", val: "204", pct: "+0.7%", w: 0.7 },
];

const MARKETS: Bar[] = [
  { name: "US", val: "34.6K", pct: "34.0%", w: 100 },
  { name: "GB", val: "15.8K", pct: "15.5%", w: 45.6 },
  { name: "AU", val: "15.0K", pct: "14.8%", w: 43.5 },
  { name: "NL", val: "5.4K", pct: "5.3%", w: 15.6 },
  { name: "DE", val: "5.0K", pct: "5.0%", w: 14.7 },
  { name: "CA", val: "4.4K", pct: "4.3%", w: 12.6 },
  { name: "IE", val: "3.4K", pct: "3.3%", w: 9.7 },
];

const RELEASES: { name: string; label: string; note: string; joint?: boolean }[] = [
  { name: "Preach (feat. Vivace)", label: "Ocean & Vivace", note: "Joint w/ collaborator", joint: true },
  { name: "Love Me For Real", label: "Salt Water", note: "His own imprint" },
  { name: "I Want Your Love", label: "Salt Water", note: "His own imprint" },
  { name: "Nobody", label: "Salt Water", note: "His own imprint" },
  { name: "Dadada", label: "Salt Water", note: "His own imprint" },
  { name: "I NEED YOUR LOVE (feat. BEADS)", label: "Salt Water", note: "His own imprint" },
  { name: "On and On", label: "Salt Water", note: "His own imprint" },
  { name: "I Know", label: "Salt Water", note: "His own imprint" },
  { name: "More Than Me", label: "Salt Water", note: "His own imprint" },
  { name: "Loving U", label: "Salt Water", note: "His own imprint" },
  { name: "Not Over", label: "Salt Water", note: "His own imprint" },
  { name: "Your Love / Take Me High / Work Dance Go", label: "Salt Water", note: "His own imprint" },
];

type Signal = "strong" | "building" | "thin" | "none";
const SIGNAL_COLOR: Record<Signal, string> = {
  strong: C.green,
  building: C.blue,
  thin: C.yellow,
  none: C.grey,
};

const CHATTER: { name: string; signal: Signal; desc: string }[] = [
  {
    name: "TikTok",
    signal: "strong",
    desc: "180.7K followers, 3.08M profile likes, 50 videos tracked, 137,987 views, 6.2% engagement (Songstats, live 9/3).",
  },
  {
    name: "Instagram",
    signal: "strong",
    desc: "63,454 followers, 17 videos tracked, 107,740 views, 2.7% engagement (Songstats, live 9/3).",
  },
  {
    name: "YouTube (artist)",
    signal: "thin",
    desc: "96 subscribers, 18 videos, 36,133 views, 3.0% engagement — a small, dedicated artist-content channel, separate from his 519K-subscriber production-tutorial channel (same @prodbyocean handle, different content purpose).",
  },
  {
    name: "SoundCloud",
    signal: "building",
    desc: "11,493 followers, 229,125 lifetime streams, 4.6% engagement — a real secondary channel with organic fan comments on “Preach.”",
  },
  {
    name: "X / Twitter",
    signal: "thin",
    desc: "3,724 followers (Songstats). Active, mostly production-nerd content; some real DJ-radio spins found via search (FUTUREGROOVE FM Tokyo, 8/13).",
  },
  { name: "Facebook", signal: "thin", desc: "1,635 followers (Songstats)." },
  {
    name: "Reddit",
    signal: "none",
    desc: "No dedicated subreddit found — r/prodbyocean redirects to a subreddit search with zero results (checked live 9/3).",
  },
  {
    name: "Discord",
    signal: "strong",
    desc: "“Ocean’s Discord” — 4,947 members, 224 online at time of check, real live-message activity (verified via a current invite link, checked live 9/3).",
  },
  {
    name: "Press / blogs",
    signal: "thin",
    desc: "No dedicated music-press coverage found for the Ocean artist singles specifically (checked live 9/3). Coverage instead centers on his production/tutorial brand: a 24hip-hop.com feature, a DJ-set placement on “Let Him Cook Radio” (3/18/26), and an AIAIAI hardware-brand partnership.",
  },
  {
    name: "Radio",
    signal: "thin",
    desc: "13 tracked spins across 11 stations; 1 SiriusXM play, ~$16 tracked SXM royalties (Songstats). “Love Me For Real” also logged a DJ-radio spin on FUTUREGROOVE FM Tokyo, 8/13 — one day before its release, so it can’t be cleanly separated from the release-day effect.",
  },
];

const RISKS: { id: string; blocking: boolean; title: string; evidence: string; collides: string; status: string }[] = [
  {
    id: "R1",
    blocking: true,
    title: "The Luminate artist-level ID for “Ocean” is a shared/merged entity across multiple unrelated real-world artists",
    evidence:
      "The artist-level Luminate ID resolved via ISRC lookup (ID on file) carries a discography spanning a Korean K-pop act, a Hungarian classics single, and a reggae DJ mixtape alongside this artist’s actual catalog — a name-collision on a common one-word stage name, not a data error on our end. Every figure in this deck is built from per-track ISRC lookups summed manually, never from the polluted artist-level total.",
    collides:
      "Any future automated pull or refresh script that queries the artist-level Luminate ID directly instead of per-track ISRCs",
    status: "Open — any refresh of this deck must keep using per-track ISRC sums, not the artist ID",
  },
  {
    id: "R2",
    blocking: false,
    title: "Single-track dependency remains above the 25% threshold even after a strong new release",
    evidence:
      "“Preach” still carries 39.2% of catalog-wide worldwide consumption in the current settled week — down from being effectively the whole story pre-baseline, but still a real concentration risk",
    collides: "Any pricing that treats the catalog as broadly diversified",
    status: "Open — worth re-checking after Love Me For Real’s provisional week settles",
  },
  {
    id: "R3",
    blocking: true,
    title: "Representation unconfirmed",
    evidence:
      "No manager or attorney confirmed directly. Public booking/enquiries route to the business address on the artist’s public profiles; the Songstats-sourced bio also lists Daouda Leonard (CreateSafe co-founder/CEO, a music-tech/AI platform and formerly Grimes’ manager) as a contact — the nature of that relationship to Ocean specifically is unconfirmed",
    collides: "Who Eternal would actually be negotiating with",
    status: "Open — confirm representation directly before any outreach",
  },
  {
    id: "R4",
    blocking: true,
    title: "Feature/collaborator splits on the two highest-consumption tracks are undocumented",
    evidence:
      "“Preach” (39.2% of current catalog consumption) is jointly credited to Ocean & Vivace; “I NEED YOUR LOVE” is credited with BEADS. No split sheet or ownership percentage found for either.",
    collides: "Any deal pricing that includes these two masters",
    status: "Open — would need direct confirmation before pricing",
  },
];

const QUESTIONS: { title: string; body: string }[] = [
  {
    title: "Growth level not yet settled",
    body: "See the Financial Thoughts section above — the current +40.7% read is real but still in motion. Re-pull in 2–3 weeks for a settled read on where Love Me For Real actually lands.",
  },
  { title: "Luminate artist-level ID is unusable for this artist", body: "See R1 in the Deal-Risk Register." },
  { title: "Feature/collaborator splits undocumented", body: "See R4 in the Deal-Risk Register." },
  { title: "Representation unconfirmed", body: "See R3 in the Deal-Risk Register." },
  {
    title: "Chartmetric — not available",
    body: "No Chartmetric access exists in this workspace — a platform/entitlement gap, not a search failure. Marked MISSING.",
  },
  {
    title: "Real payout data",
    body: "All revenue figures here are benchmark-rate estimates, not actual DistroKid payouts — pending real data.",
  },
];

export default function OceanDealReview() {
  return (
    <div className="dr-root">
      <header className="dr-header">
        <a className="brand" href="https://eternaltilidie.com">
          <Image src={graffitiLogo} alt="Eternal" style={{ width: 78, height: "auto" }} />
        </a>
        <div className="dr-header-right">
          <span className="dr-header-label">Ocean · Deal Review</span>
          <a className="dr-header-link" href="/artistreview/ocean">
            Artist review
          </a>
        </div>
      </header>

      <main className="dr-page">
        {/* Lede */}
        <section className="dr-section" style={{ gap: 26 }}>
          <Kicker color={C.cyan}>Eternal · Deal Review · Prepared 9/3/2026</Kicker>
          <h1 className="anton dr-h1">Ocean</h1>
          <p className="dr-lede">
            London/Madrid-based producer and DJ building a solo vocal-artist project. He already
            runs a real production brand — prodbyocean.com (sample packs, since 2020), a 519K-subscriber
            tutorial YouTube channel, and production credits with Young Adz, Chip, JJ Esko, and Lattz — and started releasing his own dance-pop singles as “Ocean” in Feb 2024.
          </p>
          <p className="dr-lede">
            The catalog is currently <span className="highlight">+40.7%</span> above its pre-release
            baseline, driven almost entirely by a new single that’s still climbing — not yet a settled level.
          </p>
          <Kicker color={C.pink}>Profiles</Kicker>
          <ul className="dr-profiles">
            {[
              { n: "Spotify", h: "https://open.spotify.com/artist/0WRpHrzIKi44X6ARRQKeGg", c: C.green },
              { n: "YouTube", h: "https://youtube.com/@prodbyocean", c: C.red },
              { n: "Instagram", h: "https://www.instagram.com/prodbyocean", c: C.pink },
              { n: "TikTok", h: "https://www.tiktok.com/@prodbyocean", c: C.cyan },
              { n: "X", h: "https://x.com/prodbyocean", c: C.yellow },
            ].map((p) => (
              <li key={p.n}>
                <a href={p.h} target="_blank" rel="noopener" style={v(p.c)}>
                  {p.n}
                </a>
              </li>
            ))}
          </ul>
          <Kicker color={C.red}>At a glance</Kicker>
          <Cards
            items={[
              { label: "WW streams, last settled week", num: "101.8K", sub: "week of 8/14, 43-market sweep", color: C.green },
              { label: "Vs. pre-release baseline", num: "+40.7%", sub: "8-wk baseline before Love Me For Real", color: C.green },
              { label: "Monthly listeners", num: "126.7K", sub: "Spotify, live 9/3", color: C.blue },
              { label: "Catalog", num: "18 tracks", small: true, sub: "12 releases, since 2/2024", color: C.yellow, white: true },
            ]}
          />
        </section>

        {/* The headline */}
        <section className="dr-section">
          <SectionHead kicker="The headline" color={C.green} title="A new single is carrying real growth — still climbing">
            Luminate weekly worldwide streams (paid consumption), per-track ISRC pulls, 43/47-market
            per-country sweep (CN/RU/IL/UA gated), summed across the full 14-track catalog. Window covers
            the 8-week pre-release baseline through the current in-progress week.
          </SectionHead>
          <div className="dr-cards dr-cards--2" style={{ display: "grid" }}>
            <div className="dr-textcard" style={v(C.green)}>
              <h3>Real growth, not yet a stable floor</h3>
              <p>
                Pre-release baseline: 72.3K/wk WW (mean of the 8 weeks before Love Me For Real, 8/14).
                Settled release week hit 101.8K (+40.7%), and the following provisional week (90.0K) is
                still above baseline — this single hasn’t peaked and decayed yet, it’s still moving.
              </p>
            </div>
            <div className="dr-textcard" style={v(C.yellow)}>
              <h3>Trailing 8 weeks (includes post-release decay)</h3>
              <p>
                7/10 → 8/28: 82.7K → 66.5K, -19.6%. This window opens right at the I Want Your Love
                release, so it’s secondary to the baseline figure above — not the headline.
              </p>
            </div>
          </div>
        </section>

        {/* Attribution */}
        <section className="dr-section">
          <SectionHead
            kicker="Growth attribution — 100% of the catalog enumerated"
            color={C.pink}
            title="What’s actually driving the delta"
          >
            All 100% of the +29.4K-stream delta is attributed across the full known 14-track catalog — no
            MISSING tracks.
          </SectionHead>
          <Bars items={ATTRIBUTION} />
          <p className="dr-body">
            Love Me For Real alone explains 96.8% of the total catalog delta — this is a single-release
            growth story, not a broad-catalog lift. Preach, the long-standing anchor, is also
            holding/growing (+13.0%). A handful of older singles (Nobody, I Want Your Love) are in mild
            natural decay, which is expected and doesn’t offset the new release’s pull.
          </p>
        </section>

        {/* US vs worldwide */}
        <section className="dr-section">
          <SectionHead kicker="Full consumption picture" color={C.blue} title="US vs. worldwide">
            Luminate stream counts, same 43-market sweep. US series from the same pull at zero extra cost.
          </SectionHead>
          <Cards
            items={[
              { label: "US, last settled week", num: "34.6K", sub: "week of 8/14", color: C.blue, white: true },
              { label: "Worldwide, last settled week", num: "101.8K", sub: "43 tracked markets", color: C.green, white: true },
              { label: "US concentration", num: "34.0%", sub: "a real international base — not US-led", color: C.cyan, white: true },
              { label: "#2 market", num: "GB", sub: "15.5% — AU close behind at 14.8%", color: C.yellow, white: true },
            ]}
          />
          <Kicker color={C.cyan}>Top markets by streams, week of 8/14 (Luminate, same sweep)</Kicker>
          <Bars items={MARKETS} />
          <p className="dr-body">
            Cross-checked against Spotify monthly-listener city data (Songstats, live 9/3): Melbourne, Sydney,
            London, Brisbane, Dublin, and Perth all rank in the top 6 cities — Australia and the UK/Ireland
            are the real center of gravity here, not just a US artist with incidental overseas listeners.
          </p>
          <div className="dr-textcard" style={v(C.blue)}>
            <h3>Streams per monthly listener</h3>
            <p>
              ~3.5x — ESTIMATED, dividing worldwide Luminate consumption by Spotify-only monthly listeners
              (not a clean like-for-like ratio, flagged per spec). Sits within the 3–6x casual-listening
              band — a real audience, not yet showing deep-repeat-fandom signal.
            </p>
          </div>
        </section>

        {/* Anchor track */}
        <section className="dr-section">
          <SectionHead kicker="What’s actually carrying the catalog" color={C.yellow} title="Anchor track: “Preach” (feat. Vivace)">
            Highest-consumption track in both the baseline window and the current settled week.
          </SectionHead>
          <Cards
            items={[
              { label: "Anchor track", num: "Preach", sub: "feat. Vivace, released 2/26/26", color: C.yellow, white: true },
              { label: "Anchor share", num: "39.2%", sub: "of full-catalog WW, last settled wk", color: C.red },
              { label: "Anchor 8-wk trend", num: "+10.6%", sub: "holding and growing, not eroding", color: C.green },
              { label: "Growth attribution", num: "100%", sub: "full 14-track catalog enumerated", color: C.cyan, white: true },
            ]}
          />
          <p className="dr-body">
            Preach remains the single biggest track (39.2% of catalog consumption) even as Love Me For Real
            grows fast enough to be nearly as large (28.5K vs. Preach’s 39.9K in the settled week) — real
            diversification is happening, but the catalog still leans on one track above the 25%
            single-track-dependency threshold (see R2 in the Deal-Risk Register). Preach’s own trend is
            positive, up 10.6% vs. its own baseline — this isn’t a case of an old hit propping up a
            declining catalog.
          </p>
        </section>

        {/* Catalog */}
        <section className="dr-section">
          <SectionHead kicker="What’s actually out there" color={C.green} title="Catalog & release cadence">
            A young but consistently active catalog.
          </SectionHead>
          <Cards
            items={[
              { label: "First release", num: "2/5/2024", small: true, sub: "EP “If not now, then when?”", color: C.pink, white: true },
              { label: "Total tracks", num: "18", sub: "exact count, Spotify catalog", color: C.green, white: true },
              { label: "Release groups", num: "12", sub: "1 EP, 11 singles", color: C.blue, white: true },
              { label: "Latest release", num: "Love Me For Real", small: true, sub: "single, 8/14/26", color: C.yellow, white: true },
            ]}
          />
          <div className="dr-textcard" style={v(C.green)}>
            <h3>Release cadence — trailing 12 months</h3>
            <p>
              9 of the 12 release groups landed in the trailing 12 months (More Than Me, I Know, On and On,
              I NEED YOUR LOVE, Preach, Dadada, Nobody, I Want Your Love, Love Me For Real) — a new release
              roughly every 5–6 weeks, a real and sustained cadence for an artist just over 2.5 years into
              this project.
            </p>
          </div>
        </section>

        {/* Distribution & label */}
        <section className="dr-section">
          <SectionHead kicker="Who’s actually releasing this" color={C.cyan} title="Distribution & label — 100% independent">
            Credited label per track, Luminate metadata. Full 14-track catalog checked (100% coverage).
          </SectionHead>
          <Cards
            items={[
              { label: "Major label affiliation", num: "0%", sub: "none found across full catalog", color: C.green },
              { label: "Self-released", num: "14 / 14", sub: "own imprint — “Salt Water”", color: C.cyan, white: true },
              { label: "Distributor", num: "DistroKid", small: true, sub: "per Beatport listing", color: C.blue, white: true },
              { label: "Manager", num: "Unconfirmed", small: true, sub: "see R3 in Deal-Risk Register", color: C.yellow },
            ]}
          />
          <ul className="dr-rows">
            {RELEASES.map((r, i) => (
              <li key={r.name}>
                <div className="grow">
                  <span className="name">{r.name}</span>
                </div>
                <span className="imprint">
                  <span className={r.joint ? "dr-tag dr-tag--ghost" : "dr-tag"} style={v(r.joint ? C.pink : PALETTE[i % PALETTE.length])}>
                    {r.label}
                  </span>
                  <span className="dr-muted">{r.note}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="dr-body">
            Every track routes through his own imprint, “Salt Water” (or a joint “Ocean & Vivace” credit on
            the one Preach collaboration) — no major or major-distributed indie found. This is a fully
            independent, DistroKid-distributed catalog with zero entanglements to unwind.
          </p>
        </section>

        {/* Chatter */}
        <section className="dr-section">
          <SectionHead
            kicker="Full sweep — IG, TikTok, YouTube, X, Reddit, Discord, press — all checked live 9/3"
            color={C.pink}
            title="Online chatter & sentiment"
          >
            A real, growing cross-platform base already in place before the artist project started, plus a
            genuinely active Discord community.
          </SectionHead>
          <ul className="dr-rows">
            {CHATTER.map((c) => (
              <li key={c.name}>
                <div className="grow">
                  <span className="line">
                    <span className="name">{c.name}</span>
                    <span className={c.signal === "none" ? "dr-tag dr-tag--ghost" : "dr-tag"} style={v(SIGNAL_COLOR[c.signal])}>
                      {c.signal}
                    </span>
                  </span>
                  <span className="desc">{c.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Fanbase conversion */}
        <section className="dr-section">
          <SectionHead kicker="A base already built from the producer brand" color={C.blue} title="Fanbase conversion" />
          <Cards
            cols={3}
            items={[
              { label: "Spotify followers", num: "5.1K", sub: "vs. 126.7K monthly listeners", color: C.yellow },
              { label: "Shazams", num: "5.5K", sub: "lifetime, Songstats", color: C.blue, white: true },
              { label: "Editorial playlists", num: "2 current / 6 lifetime", small: true, sub: "1.59M current reach, real algorithmic pickup", color: C.green, white: true },
            ]}
          />
          <p className="dr-body">
            Spotify follower count (5.1K) is thin relative to monthly listeners (126.7K) — a ~25:1
            listener-to-follower ratio, well below a converted-fandom signal. Most of the reach here is
            coming from playlist/algorithmic discovery, not yet a direct following that has converted over
            from the production brand’s 180K+ TikTok and 63K+ Instagram audiences.
          </p>
        </section>

        {/* Financial */}
        <section className="dr-section">
          <SectionHead kicker="Directional, not a formal valuation" color={C.yellow} title="Financial thoughts on value">
            No deal is in motion — this is a first-look framing for a hypothetical go-forward artist deal,
            pending real payout data and actual comps.
          </SectionHead>
          <Cards
            items={[
              { label: "Deal type (hypothetical)", num: "Go-forward artist deal", small: true, sub: "not on the board — no deal-shape decision has been made", color: C.pink, white: true },
              { label: "Run-rate: settled or still moving?", num: "Still moving", small: true, sub: "Love Me For Real is still climbing week over week", color: C.yellow },
              { label: "Est. WW streaming revenue run-rate", num: "$16K–$26K/yr", small: true, sub: "benchmark blended rate off the settled week, annualized", color: C.green },
              { label: "Net to artist (est.)", num: "~$15K–$26K/yr", small: true, sub: "self-distributed via DistroKid — flat fee, not a % cut", color: C.green },
            ]}
          />
          <p className="dr-body">
            <strong>What you’d actually be paying for:</strong> not an unknown prospect — an experienced,
            already-monetized producer/DJ with a real audience infrastructure (180K+ TikTok, 519K YouTube
            tutorial subs, established brand deals like AIAIAI) making a first serious push as a vocal artist
            in his own right, with early signs of real traction (a single still climbing 3 weeks
            post-release, a genuinely active 4,947-member Discord).
          </p>
          <p className="dr-body">
            <strong>Is the run-rate settled or still moving?</strong> Still moving. The settled week (8/14) is
            20 days post-close, but the release it’s built on is only 3 weeks old and the following complete
            week (8/21, provisional under the 10-day rule) is still above the settled week’s level — this
            hasn’t found a ceiling yet. Pricing off the current +40.7% delta risks overpaying for a spike that
            hasn’t proven it holds; a re-pull in 2–3 weeks, once Love Me For Real’s decay curve (or lack of
            one) is visible, would sharpen this materially.
          </p>
          <p className="dr-body">
            <strong>Structure, cheapest to priciest:</strong> (1) singles/EP deal with options — the standard
            entry point for an artist with one clear rising single and an otherwise-thin follower
            conversion; (2) distribution + marketing deal — would pair well with his existing
            production/content muscle rather than duplicate it; (3) full partnership — not yet supported,
            would need at least one more release proving the growth isn’t a one-single spike.
          </p>
          <div className="dr-textcard" style={v(C.yellow)}>
            <h3>Recommendation</h3>
            <p>
              Low guarantee, growth-triggered structure — avoid overpaying for the Love Me For Real spike
              specifically. The stronger long-term case here is the built-in audience and content machine
              he already operates, not this one track’s current trajectory.
            </p>
          </div>
        </section>

        {/* Risk register */}
        <section className="dr-section">
          <SectionHead kicker="Anything that would touch a future deal term" color={C.red} title="Deal-risk register">
            Structured deal-risk findings. No deal is in motion — these are findings that would matter if
            one were proposed.
          </SectionHead>
          <ul className="dr-rows">
            {RISKS.map((r) => (
              <li key={r.id}>
                <span className="risk-id">
                  <span className={r.blocking ? "dr-tag" : "dr-tag dr-tag--ghost"} style={v(r.blocking ? C.red : C.grey)}>
                    {r.id}
                    {r.blocking ? " · blocking" : ""}
                  </span>
                </span>
                <div className="grow">
                  <span className="risk-title">{r.title}</span>
                  <span className="desc">
                    <b>Evidence: </b>
                    {r.evidence}
                  </span>
                  <span className="desc">
                    <b>Collides with: </b>
                    {r.collides}
                  </span>
                  <span className="dr-status" style={v(C.yellow)}>
                    {r.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Open questions */}
        <section className="dr-section">
          <SectionHead kicker="Before the next pull" color={C.cyan} title="Open questions & data flags" />
          <div className="dr-cards dr-cards--2" style={{ display: "grid" }}>
            {QUESTIONS.map((q, i) => (
              <div key={q.title} className="dr-textcard" style={v(PALETTE[i % PALETTE.length])}>
                <h3>{q.title}</h3>
                <p>{q.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="dr-section">
          <SectionHead kicker="Who to reach" color={C.green} title="Contact">
            Booking/enquiries found via public profiles, not yet confirmed directly.
          </SectionHead>
          <ul className="dr-rows">
            <li>
              <div className="grow">
                <span className="name">Ocean (Artist)</span>
                <span className="desc">
                  Booking/enquiries via the business address on his public profiles ·{" "}
                  <a className="dr-link" href="https://www.instagram.com/prodbyocean" target="_blank" rel="noopener">
                    @prodbyocean
                  </a>
                </span>
              </div>
            </li>
            <li>
              <div className="grow">
                <span className="name">Manager</span>
                <span className="desc">Unconfirmed — see R3</span>
              </div>
            </li>
            <li>
              <div className="grow">
                <span className="name">Attorney</span>
                <span className="desc">None on file</span>
              </div>
            </li>
          </ul>
        </section>

        {/* Bottom line */}
        <section className="dr-bottom">
          <Kicker color="#000">Bottom line</Kicker>
          <p>
            An established producer/DJ (519K YouTube tutorial subs, a real sample-pack business, credits with
            Young Adz, Chip) making a genuine push as a solo vocal artist, 2.5 years and 18 tracks
            in. The catalog is +40.7% above its pre-release baseline, and unusually for this pipeline, 100% of
            that delta is attributable across a fully enumerated catalog — the growth is real and specific,
            driven by “Love Me For Real,” which is still climbing and hasn’t settled into a stable run-rate
            yet. A genuinely active 4,947-member Discord and a real international base (AU/UK-led, not
            US-led) suggest more than an algorithmic bump, but Spotify follower conversion (5.1K vs. 126.7K
            monthly listeners) is thin, single-track dependency on “Preach” remains above the 25% threshold,
            and representation is unconfirmed. If there’s a case here, it’s the built-in audience/content
            machine he already operates — not yet the current single’s trajectory, which needs another 2–3
            weeks to prove it holds. 100% independent (Salt Water / DistroKid), and no label entanglements
            to unwind.
          </p>
        </section>

        {/* Closing */}
        <section className="dr-closing">
          <Image
            src={avatarsTogether}
            alt="Eternal avatars standing together"
            style={{ width: "min(360px,70vw)", height: "auto" }}
          />
          <p className="dr-sub">Let’s build something eternal.</p>
          <p className="dr-body" style={{ textAlign: "center" }}>
            <a className="dr-link" href="/artistreview/ocean">
              Read the artist review
            </a>
          </p>
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
