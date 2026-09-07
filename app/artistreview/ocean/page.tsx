import type { Metadata } from "next";
import Image from "next/image";
import Deck from "@/components/Deck";
import "./review.css";

import graffitiLogo from "@/public/images/graffiti-logo.png";
import doodleStar from "@/public/images/doodle-star.png";
import mascot from "@/public/images/mascot.png";
import crowdEvent from "@/public/images/crowd-event.jpg";
import crowdHearts from "@/public/images/crowd-hearts.jpg";
import boxHeadsForest from "@/public/images/box-heads-forest.jpg";
import avatarsTogether from "@/public/images/avatars-together.jpg";

export const metadata: Metadata = {
  title: "Ocean × Eternal — Artist Review",
  description: "Eternal's artist review of Ocean: the artist, the numbers, the catalog and the plan.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Ocean × Eternal — Artist Review",
    description: "The artist, the numbers, the catalog and the plan.",
    type: "website",
    url: "https://eternaltilidie.com/artistreview/ocean",
    images: [{ url: "https://eternaltilidie.com/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ocean × Eternal — Artist Review",
    description: "The artist, the numbers, the catalog and the plan.",
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

const LINKS = {
  spotify: "https://open.spotify.com/artist/0WRpHrzIKi44X6ARRQKeGg",
  soundcloud: "https://soundcloud.com/prodbyocean",
  youtube: "https://www.youtube.com/@prodbyocean",
  tiktok: "https://www.tiktok.com/@prodbyocean",
  instagram: "https://www.instagram.com/prodbyocean/",
  apple: "https://music.apple.com/us/artist/ocean/1529024351",
  beatport: "https://www.beatport.com/artist/ocean/72708",
  bandcamp: "https://prodbyocean.bandcamp.com",
  site: "https://www.prodbyocean.com",
  liveChicago: "https://youtu.be/OzkoHpF14nw",
  letHimCook: "https://youtu.be/hlf82T5RfCo",
  latestSc: "https://soundcloud.com/prodbyocean/ocean-i-want-your-love",
  latestSp: "https://open.spotify.com/track/1c6ccgNZU2oULnXDilF5gm",
  unreleased: "https://untitled.stream/library/project/pLZmsUvuecYT23lfkMsAV",
};

// Spotify monthly listeners, first week of each month (Viberate, pulled Sept 6 2026).
const LISTENERS = [
  { mon: "Mar", val: "16.7K", h: 13 },
  { mon: "Apr", val: "43.1K", h: 34 },
  { mon: "May", val: "67.0K", h: 53 },
  { mon: "Jun", val: "99.0K", h: 78 },
  { mon: "Jul", val: "110K", h: 87 },
  { mon: "Aug", val: "108K", h: 85 },
  { mon: "Sep", val: "127K", h: 100 },
];

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
    <p className="ar-kicker">
      <i style={{ background: color }} />
      {children}
    </p>
  );
}

function List({
  items,
  cols = false,
  big = false,
  colorize = false,
  color = "#fff",
}: {
  items: React.ReactNode[];
  cols?: boolean;
  big?: boolean;
  colorize?: boolean;
  color?: string;
}) {
  const cls = ["ar-list", cols && "ar-list--cols", big && "ar-list--big"].filter(Boolean).join(" ");
  return (
    <ul className={cls}>
      {items.map((t, i) => (
        <li
          key={i}
          style={{ "--dot": colorize ? PALETTE[i % PALETTE.length] : color } as React.CSSProperties}
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

function Stat({
  num,
  label,
  delta,
  color,
}: {
  num: string;
  label: string;
  delta?: string;
  color: string;
}) {
  return (
    <li className="ar-stat" style={{ "--dot": color } as React.CSSProperties}>
      <span className="num">{num}</span>
      <span className="label">{label}</span>
      {delta && <span className="delta">{delta}</span>}
    </li>
  );
}

function Chips({ items, hot = [], color = C.yellow }: { items: string[]; hot?: string[]; color?: string }) {
  return (
    <ul className="ar-chips" style={{ "--dot": color } as React.CSSProperties}>
      {items.map((t) => (
        <li key={t} className={hot.includes(t) ? "hot" : undefined}>
          {t}
        </li>
      ))}
    </ul>
  );
}

type Track = { name: string; with?: string; kind: "Original" | "Sample"; status: string; tag?: string };

const PRIORITY_TRACKS: Track[] = [
  { name: "Hold My Breath", with: "how2fly", kind: "Original", status: "Complete", tag: "Sept 30" },
  { name: "Go With The Flow", with: "Gusta", kind: "Original", status: "Complete", tag: "Release" },
  { name: "Crazy", with: "Groovebaby", kind: "Original", status: "Complete", tag: "Release" },
  { name: "Do You Love Me", with: "HEADHIGH", kind: "Original", status: "Complete", tag: "Release" },
  { name: "Like I Love You v3", with: "CIEII", kind: "Original", status: "Complete", tag: "Release" },
  { name: "Somewhere In Heaven", kind: "Sample", status: "Complete", tag: "Release" },
  { name: "Where You Are", kind: "Original", status: "Demo · needs vocal", tag: "Release" },
  { name: "Off With Your Head (Edit)", kind: "Original", status: "Complete", tag: "SoundCloud" },
];

export default function OceanArtistReview() {
  return (
    <Deck innerLabel="Ocean" siteLink={false}>
      {/* 01 — Cover */}
      <section className="slide ar-cover">
        <Image
          src={crowdEvent}
          alt=""
          fill
          priority
          sizes="100vw"
          className="bg-img"
          style={{ objectPosition: "center 40%", opacity: 0.7 }}
        />
        <div className="overlay ar-cover-shade" />
        <div className="ar-cover-text">
          <p className="ar-sub">Artist Review</p>
          <h1 className="anton ar-title">Ocean</h1>
          <p className="ar-tagline">
            Euphoric Dance producer and DJ. North London born, Madrid based. 500K+ YouTube
            subscribers, a catalog of unreleased records, and a plan to get him on stage.
          </p>
          <Dots />
        </div>
      </section>

      {/* 02 — The artist */}
      <section className="slide ar-slide">
        <Image
          src={doodleStar}
          alt=""
          className="floaty"
          style={{ right: "12%", top: "18%", width: "clamp(44px,6vw,80px)", height: "auto", opacity: 0.85, animationDuration: "7s" }}
        />
        <Image
          src={doodleStar}
          alt=""
          className="floaty"
          style={{ right: "6%", bottom: "26%", width: "clamp(34px,4vw,56px)", height: "auto", opacity: 0.7, scale: "-1 1", animationDuration: "9s" }}
        />
        <div className="ar-inner ar-split">
          <div className="ar-col">
            <Kicker color={C.cyan}>The artist</Kicker>
            <h2 className="anton ar-title ar-title--sm">Who is Ocean?</h2>
            <p className="ar-body">
              Ocean is an electronic music producer and DJ from North London, currently living in
              Madrid. His style is <span className="highlight">Euphoric Dance</span>: a mix of trance,
              hard house, UK garage, techno and classic house.
            </p>
            <p className="ar-body">
              Before the records, there was the channel. Ocean built an audience of over 500K
              YouTube subscribers as a content creator, plus 20K owned fans on email and SMS. A
              strong business can be built around him.
            </p>
            <p className="ar-body ar-body--sm" style={{ opacity: 0.8 }}>
              Early audience growth is strongest in Australia, the UK and the US.
            </p>
          </div>
          <Image
            src={mascot}
            alt="Eternal mascot doodle"
            style={{ flex: "0 0 auto", width: "clamp(160px,20vw,260px)", height: "auto" }}
          />
        </div>
      </section>

      {/* 03 — The sound */}
      <section className="slide slide--cover ar-slide">
        <Image
          src={crowdHearts}
          alt=""
          fill
          sizes="100vw"
          className="bg-img"
          style={{ objectPosition: "center bottom", opacity: 0.4 }}
        />
        <div
          className="overlay"
          style={{ background: "linear-gradient(rgba(17,17,17,.85),rgba(17,17,17,.45) 50%,rgba(17,17,17,.9))" }}
        />
        <div className="ar-inner">
          <Kicker color={C.pink}>The sound</Kicker>
          <p className="ar-body ar-body--lg">
            Trance. Hard house. UK garage. Techno. Classic house. Ocean produces the track first,
            then finds the vocal that lifts it.
          </p>
          <p className="ar-body">
            The early feedback from sharing his music inside the A&amp;R community has been high
            interest in getting him in the room with some of the best writers and vocalists. Several
            labels are interested in singles and EP deals.
          </p>
          <p className="ar-sub" style={{ color: C.cyan }}>
            North Star: the Tiësto / Skepta of the dance world
          </p>
        </div>
      </section>

      {/* 04 — By the numbers */}
      <section className="slide ar-slide">
        <div className="ar-inner">
          <Kicker color={C.yellow}>By the numbers</Kicker>
          <h2 className="anton ar-title ar-title--sm">Audience</h2>
          <ul className="ar-stats">
            <Stat num="519K" label="YouTube subscribers" color={C.red} />
            <Stat num="181K" label="TikTok followers" color={C.cyan} />
            <Stat num="127K" label="Spotify monthly listeners" delta="7.6× since March" color={C.green} />
            <Stat num="63K" label="Instagram followers" color={C.pink} />
            <Stat num="20K" label="Owned fans (email + SMS)" color={C.yellow} />
            <Stat num="11.5K" label="SoundCloud followers" color={C.blue} />
            <Stat num="5.2K" label="Spotify followers" delta="+66% since March" color={C.green} />
            <Stat num="#2,217" label="Viberate rank · UK" delta="#37,959 worldwide" color={C.cyan} />
          </ul>
          <p className="ar-note">
            Platform figures via Viberate, September 6, 2026. Owned-fan count from the artist.
          </p>
        </div>
      </section>

      {/* 05 — Momentum */}
      <section className="slide ar-slide">
        <div className="ar-inner">
          <Kicker color={C.green}>Momentum</Kicker>
          <h2 className="anton ar-title ar-title--sm">Spotify monthly listeners, 2026</h2>
          <ul className="ar-growth" style={{ "--dot": C.cyan } as React.CSSProperties}>
            {LISTENERS.map((d, i) => (
              <li key={d.mon} style={{ "--dot": PALETTE[(i + 5) % PALETTE.length] } as React.CSSProperties}>
                <span className="val">{d.val}</span>
                <span className="bar" style={{ "--h": `${d.h}%` } as React.CSSProperties} />
                <span className="mon">{d.mon}</span>
              </li>
            ))}
          </ul>
          <p className="ar-body">
            From 16.7K to 127K monthly listeners in six months, and 5,000 Spotify followers reached
            in August. The audience is arriving. The job now is turning listeners into fans and
            fans into a business.
          </p>
        </div>
      </section>

      {/* 06 — Observations */}
      <section className="slide ar-slide">
        <div className="ar-inner">
          <Kicker color={C.red}>Material observations</Kicker>
          <List
            big
            colorize
            items={[
              <>
                The creator audience has not converted into a music audience yet. 519K YouTube
                subscribers next to 5.2K Spotify followers is the gap, and the opportunity.
              </>,
              <>
                No booking agent and no work visa means no shows. Getting shows is the game, and
                a record deal, a publishing deal or an agent with dates unlocks the visa.
              </>,
              <>
                The streaming profiles need cleaning up: split from same-name artists on Beatport,
                remove drill productions from the Spotify profile, claim and update editorial.
              </>,
              <>
                The current distributor does not give dance music the editorial support it needs.
                Time to move to a proper dance and electronic distributor.
              </>,
              <>
                There are 31 records in the pipeline, 21 of them complete. Most of them nobody has
                heard yet.
              </>,
            ]}
          />
        </div>
      </section>

      {/* 07 — The catalog */}
      <section className="slide ar-slide">
        <div className="ar-inner">
          <Kicker color={C.blue}>The catalog</Kicker>
          <div className="ar-cols ar-cols--2" style={{ alignItems: "end" }}>
            <h2 className="anton ar-title ar-title--sm">Unreleased records</h2>
            <ul className="ar-stats ar-stats--3">
              <Stat num="31" label="In the pipeline" color={C.blue} />
              <Stat num="21" label="Complete" color={C.green} />
              <Stat num="15" label="Collaborations" color={C.pink} />
            </ul>
          </div>
          <table className="ar-catalog">
            <thead>
              <tr>
                <th scope="col">Track</th>
                <th scope="col">With</th>
                <th scope="col">Type</th>
                <th scope="col">Status</th>
                <th scope="col">Plan</th>
              </tr>
            </thead>
            <tbody>
              {PRIORITY_TRACKS.map((t, i) => (
                <tr key={t.name}>
                  <td className="track">{t.name}</td>
                  <td className="dim">{t.with ?? "—"}</td>
                  <td className="dim">{t.kind}</td>
                  <td>{t.status}</td>
                  <td>
                    <span className="tag" style={{ "--dot": PALETTE[i % PALETTE.length] } as React.CSSProperties}>
                      {t.tag}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="ar-note">
            Priority records only. Listen to the full set of unreleased records{" "}
            <a className="ar-link" href={LINKS.unreleased} target="_blank" rel="noopener">
              here
            </a>
            .
          </p>
        </div>
      </section>

      {/* 08 — Recommendations */}
      <section className="slide ar-slide">
        <div className="ar-inner">
          <Kicker color={C.cyan}>Recommendations</Kicker>
          <h2 className="anton ar-title ar-title--sm">The game is getting shows</h2>
          <p className="ar-body ar-body--sm" style={{ maxWidth: 900 }}>
            To get shows we need an agent. To get an agent we need a pitch and a plan. In tandem,
            we build a public profile that makes Ocean stand out to labels, clubs, festivals and
            other artists.
          </p>
          <List
            cols
            colorize
            items={[
              "Maximize the Love Me Forever release: service the record to PR and re-deliver it through a proper dance distributor.",
              "Clean up every streaming profile: Spotify, Apple Music, Beatport. One Ocean, one catalog, one label name.",
              "Build the A&R plan and a release schedule: records that need no clearances first, then collabs, then label pitches, underground records and hits.",
              "Release every four to six weeks. Prioritize one-song deals with labels over waiting on a five-song EP.",
              "Send demos to vocalists and writers. Ninety percent of the time the track comes first, so the vocal is the multiplier.",
              "Create a sample DJ mix for agents, clubs, festivals and DSPs, and pair the next single with a curated mix on Apple Music.",
              "Build a distinct brand with a branded sound: brand code, updated visual aesthetic, an artist website and an updated EPK.",
              "Socialize Ocean to agents, artist-driven dance labels, publishers and the radio and media that break records in this lane.",
            ]}
          />
        </div>
      </section>

      {/* 09 — Release timeline */}
      <section className="slide ar-slide">
        <div className="ar-inner">
          <Kicker color={C.yellow}>Release timeline</Kicker>
          <h2 className="anton ar-title ar-title--sm">A record every four to six weeks</h2>
          <ul className="ar-timeline">
            {[
              { date: "Sept 25", what: "Single + Apple Music DJ mix", c: C.pink },
              { date: "Oct 23", what: "ADE. Targeting agents and labels", c: C.red },
              { date: "Nov 27", what: "Single", c: C.yellow },
              { date: "Jan 1", what: "Single", c: C.green },
              { date: "Feb 12", what: "Single", c: C.blue },
              { date: "Mar 26", what: "Ultra / WMC. Targeting parties and labels", c: C.cyan },
            ].map((m) => (
              <li key={m.date} style={{ "--dot": m.c } as React.CSSProperties}>
                <span className="anton date">{m.date}</span>
                <span className="what">{m.what}</span>
              </li>
            ))}
          </ul>
          <p className="ar-body">
            Milestones to plan around: ADE in October, WMC and Ultra in March, IMS in the spring.
            Shows in Australia for December and January if an agent can make it happen.
          </p>
        </div>
      </section>

      {/* 10 — Targets */}
      <section className="slide ar-slide">
        <div className="ar-inner">
          <Kicker color={C.pink}>Targets</Kicker>
          <div className="ar-cols">
            <div className="ar-block">
              <h3 className="anton" style={{ color: C.pink }}>
                Labels
              </h3>
              <Chips
                color={C.pink}
                hot={["Musical Freedom", "Thirty Knots", "Ultra Records"]}
                items={[
                  "Steel City Dance Discs",
                  "Fragrance Recordings",
                  "Looking For Trouble",
                  "Musical Freedom",
                  "Friends & Family",
                  "Three Six Zero",
                  "Defected",
                  "Ministry of Sound",
                  "Insomniac Records",
                  "Live From Earth",
                  "AWD",
                  "R&R",
                  "Ultra Records",
                  "NLV Records",
                  "Thirty Knots",
                ]}
              />
              <p style={{ opacity: 0.75 }}>Priority: artist-driven labels first. Publishing: Sony Music Publishing UK.</p>
            </div>
            <div className="ar-block">
              <h3 className="anton" style={{ color: C.yellow }}>
                Media &amp; radio
              </h3>
              <Chips
                color={C.yellow}
                items={["The Lot Radio", "HÖR Berlin", "Black House Radio", "Elevator Music", "HED", "Raw Cuts", "Insomniac Radio"]}
              />
              <p style={{ opacity: 0.75 }}>HÖR for European credibility, HED for the crossover, Raw Cuts because it is hot right now.</p>
            </div>
            <div className="ar-block">
              <h3 className="anton" style={{ color: C.cyan }}>
                Australia
              </h3>
              <Chips
                color={C.cyan}
                hot={["Beyond The Valley"]}
                items={[
                  "Beyond The Valley",
                  "Strawberry Fields",
                  "Terminal V",
                  "Lost Paradise",
                  "Wildlands",
                  "Pitch Music & Arts",
                  "Field Day",
                  "Lost Sundays",
                  "Tivoli",
                  "Nerve",
                  "Club Revel",
                ]}
              />
              <p style={{ opacity: 0.75 }}>Agents: Mushroom Group, Revolve, Agenda Group, Proxy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 11 — Long-term goals */}
      <section className="slide slide--cover ar-slide">
        <Image
          src={boxHeadsForest}
          alt=""
          fill
          sizes="100vw"
          className="bg-img"
          style={{ opacity: 0.28 }}
        />
        <div
          className="overlay"
          style={{ background: "linear-gradient(rgba(17,17,17,.92),rgba(17,17,17,.6) 55%,rgba(17,17,17,.9))" }}
        />
        <div className="ar-inner">
          <Kicker color={C.green}>Long-term goals</Kicker>
          <div className="ar-cols">
            <div className="ar-block">
              <h3 className="anton" style={{ color: C.pink }}>
                Top of the underground
              </h3>
              <p>
                Get to the top of the underground, then cross over into the commercial world. A
                Brit or MOBO for best dance when it is time for the album. Study who has done this
                before and what their journey looked like.
              </p>
            </div>
            <div className="ar-block">
              <h3 className="anton" style={{ color: C.yellow }}>
                A strong catalog
              </h3>
              <p>
                A balance of club records and hits. Create a classic album and a classic single.
                Build a distinct brand with a branded sound.
              </p>
            </div>
            <div className="ar-block">
              <h3 className="anton" style={{ color: C.cyan }}>
                Longevity
              </h3>
              <p>
                Owned fans, owned media, owned masters where possible. A career built person by
                person, the way we build everything at Eternal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 12 — Listen */}
      <section className="slide ar-slide">
        <div className="ar-inner">
          <Kicker color={C.blue}>Listen &amp; watch</Kicker>
          <div className="ar-cols ar-cols--2">
            <div className="ar-block">
              <h3 className="anton">Recent highlights</h3>
              <List
                colorize
                items={[
                  <a key="chi" className="ar-link" href={LINKS.liveChicago} target="_blank" rel="noopener">
                    Playing live in Chicago
                  </a>,
                  <a key="lhc" className="ar-link" href={LINKS.letHimCook} target="_blank" rel="noopener">
                    Let Him Cook Radio
                  </a>,
                  <>Insomniac Radio LUCID guest mix</>,
                ]}
              />
            </div>
            <div className="ar-block">
              <h3 className="anton">Latest release</h3>
              <p className="anton" style={{ fontSize: "clamp(28px,3.4vw,46px)", lineHeight: 1, letterSpacing: 0.5 }}>
                I WANT YOUR LOVE
              </p>
              <p>
                <a className="ar-link" href={LINKS.latestSp} target="_blank" rel="noopener">
                  Spotify
                </a>{" "}
                ·{" "}
                <a className="ar-link" href={LINKS.latestSc} target="_blank" rel="noopener">
                  SoundCloud
                </a>{" "}
                ·{" "}
                <a className="ar-link" href={LINKS.unreleased} target="_blank" rel="noopener">
                  Unreleased records
                </a>
              </p>
            </div>
          </div>
          <ul className="ar-profiles">
            {[
              { n: "Spotify", h: LINKS.spotify, c: C.green },
              { n: "YouTube", h: LINKS.youtube, c: C.red },
              { n: "SoundCloud", h: LINKS.soundcloud, c: C.yellow },
              { n: "TikTok", h: LINKS.tiktok, c: C.cyan },
              { n: "Instagram", h: LINKS.instagram, c: C.pink },
              { n: "Apple Music", h: LINKS.apple, c: C.blue },
              { n: "Beatport", h: LINKS.beatport, c: C.green },
              { n: "Bandcamp", h: LINKS.bandcamp, c: C.cyan },
              { n: "prodbyocean.com", h: LINKS.site, c: C.yellow },
            ].map((p) => (
              <li key={p.n} style={{ "--dot": p.c } as React.CSSProperties}>
                <a href={p.h} target="_blank" rel="noopener">
                  {p.n}
                </a>
                <span>@prodbyocean</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 13 — Closing */}
      <section className="slide slide--center ar-slide--center" style={{ gap: 28 }}>
        <Image
          src={avatarsTogether}
          alt="Eternal avatars standing together"
          style={{ width: "min(440px,80vw)", height: "auto" }}
        />
        <Image
          src={graffitiLogo}
          alt="Eternal graffiti logo"
          style={{ width: "clamp(140px,18vw,200px)", height: "auto" }}
        />
        <p className="ar-sub">Let&apos;s build something eternal.</p>
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
    </Deck>
  );
}
