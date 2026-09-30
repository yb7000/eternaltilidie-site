import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import "./meet.css";

import graffitiLogo from "@/public/images/graffiti-logo.png";
import doodleStar from "@/public/images/doodle-star.png";
import doodleHeart from "@/public/images/doodle-heart.png";
import sweatCover from "@/public/images/jasmine-yen-sweat.jpeg";

export const metadata: Metadata = {
  title: "Meet Jasmine Yen",
  description: "R&B Pop Singer-songwriter",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Meet Jasmine Yen",
    description: "R&B Pop Singer-songwriter",
    type: "website",
    url: "https://eternaltilidie.com/meet/jasmine-yen",
    images: [{ url: "https://eternaltilidie.com/og-meet-jasmine-yen-2.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Meet Jasmine Yen",
    description: "R&B Pop Singer-songwriter",
    images: ["https://eternaltilidie.com/og-meet-jasmine-yen-2.jpg"],
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

const v = (color: string) => ({ "--dot": color } as React.CSSProperties);

/* ---------- media ----------
 * Photos: every image in public/images/jasmine/ (.jpg, .jpeg, .png, .webp) shows up
 * in the gallery, in file-name order, so the page never has a broken image.
 * Songs: `src` is a file in public/media/ ("/media/sweat.mp3") or a full URL.
 * Videos: `youtube` is the id from the YouTube link (youtu.be/<id>).
 */

const PHOTO_DIR = "images/jasmine";
const PHOTO_EXT = /\.(jpe?g|png|webp)$/i;

type Song = { title: string; note: string; src: string };
const SONGS: Song[] = [
  {
    title: "Listen to SWEAT",
    note: "Her newest single",
    src: "/media/sweat.mp3",
  },
];

type Video = { title: string; youtube: string };
const VIDEOS: Video[] = [{ title: "WATCH SWEAT", youtube: "X1fpeBn45yY" }];

type Link = { label: string; href: string };
const LINKS: Link[] = [
  { label: "Spotify", href: "https://open.spotify.com/artist/4PQ0uJWdQam5rtXciDKVnS" },
  { label: "Apple Music", href: "https://music.apple.com/us/artist/jasmine-yen/1697792324" },
  { label: "YouTube", href: "https://www.youtube.com/channel/UCHWF-bilhgUaKFiq1mEirdw" },
  { label: "TikTok", href: "https://www.tiktok.com/@jasmineyen_" },
  { label: "Instagram", href: "https://www.instagram.com/jasmineyen/" },
];

function photoFiles(): string[] {
  const dir = path.join(process.cwd(), "public", PHOTO_DIR);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => PHOTO_EXT.test(f))
    .sort()
    .map((f) => `/${PHOTO_DIR}/${f}`);
}

/* ---------- copy ---------- */

const QUICK_FACTS: { big: string; small: string }[] = [
  { big: "7", small: "How old she was when she wrote her first song" },
  { big: "19", small: "Her age when she signed with a big record label" },
  { big: "6", small: "Languages" },
  { big: "2", small: "Instruments she plays" },
];

const STORY: { when: string; what: string }[] = [
  {
    when: "When she was little",
    what: "She sang along to Aretha Franklin, belted out Disney songs, and knew every song from High School Musical by heart. Music was basically her first language.",
  },
  {
    when: "Age 7",
    what: "She wrote her very first song.",
  },
  {
    when: "2022",
    what: "She won a scholarship to Berklee College of Music in Boston, one of the most prestigious music schools in the world. A scholarship means the school picked her because she was so good, and helped pay for her to go.",
  },
  {
    when: "2023",
    what: "At 19, she became the youngest artist ever to sign with Sony China. That same year she put out her first album, called tbh (short for “to be honest”).",
  },
  {
    when: "Now",
    what: "Her new song and music video, Sweat, is out.",
  },
  {
    when: "October 2026",
    what: "She is starring in a campaign for Balenciaga, a luxury fashion brand.",
  },
  {
    when: "Spring 2027",
    what: "A new EP (a mini album), then her second album. She will also act in her first major global studio film.",
  },
];

const CAN_DO = [
  { title: "Singer-songwriter", body: "She sings, and she writes the songs herself." },
  { title: "Multi-instrumentalist", body: "She plays more than one instrument." },
  { title: "Dancer", body: "She moves, too." },
  { title: "Multilingual", body: "She speaks 6 languages." },
];

const LOVES = ["Poetry", "Painting", "Musical theater"];

const BRANDS = ["Gucci", "Prada", "Schiaparelli", "YSL", "Tom Ford Beauty", "Fendi", "Loewe"];

const QUIZ: { q: string; a: string }[] = [
  { q: "How old was Jasmine when she wrote her first song?", a: "7 years old." },
  { q: "What is the name of her first album, and what does it stand for?", a: "tbh, which means “to be honest.”" },
  { q: "Which famous music school gave her a scholarship?", a: "Berklee College of Music." },
  { q: "What is her newest song called?", a: "Sweat." },
  { q: "What new thing is she trying in 2027?", a: "Acting! She's in her first big movie." },
];

/* ---------- bits ---------- */

function Dots() {
  return (
    <div className="dots dots--small">
      {PALETTE.map((c) => (
        <span key={c} style={{ background: c }} />
      ))}
    </div>
  );
}

function Head({ kicker, color, title }: { kicker: string; color: string; title: string }) {
  return (
    <div className="mt-head">
      <p className="mt-kicker">
        <i style={{ background: color }} />
        {kicker}
      </p>
      <h2 className="anton mt-h2">{title}</h2>
    </div>
  );
}

export default function MeetJasmineYen() {
  const photos = photoFiles();
  const songs = SONGS.filter((s) => s.src);
  const videos = VIDEOS.filter((x) => x.youtube);

  return (
    <div className="mt-root">
      <div className="grain" aria-hidden />

      <header className="mt-header">
        <a href="/" className="brand" aria-label="Eternal">
          <Image src={graffitiLogo} alt="Eternal" style={{ width: 78, height: "auto" }} />
        </a>
      </header>

      <main className="mt-page">
        {/* hero */}
        <section className="mt-hero">
          <Image
            src={doodleStar}
            alt=""
            className="mt-floaty"
            style={{ top: -10, right: "4%", width: 70, height: "auto" }}
          />
          <div className="mt-hero-copy">
            <p className="mt-hanzi">甄濟如</p>
            <h1 className="anton mt-h1">
              Meet
              <br />
              <span style={{ color: C.pink }}>Jasmine</span> Yen
            </h1>
            <p className="mt-lede">
              Jasmine is a Chinese R&amp;B Pop singer-songwriter. She won a scholarship
              to Berklee College of Music, and at 19 she was the youngest artist signed to Sony
              China. Now she&apos;s independent, and she&apos;s in an upcoming global fashion
              campaign with Balenciaga. Her new song{" "}
              <a
                className="mt-lede-link"
                href="https://youtu.be/X1fpeBn45yY"
                target="_blank"
                rel="noopener noreferrer"
              >
                SWEAT
              </a>{" "}
              is out now.
            </p>
            <Dots />
          </div>
          <div className="mt-hero-art">
            <Image
              src={sweatCover}
              alt="Cover art for Sweat by Jasmine Yen"
              priority
              sizes="(max-width: 820px) 90vw, 420px"
            />
          </div>
        </section>

        {/* quick facts */}
        <section>
          <Head kicker="Jasmine in 10 seconds" color={C.yellow} title="The quick facts" />
          <div className="mt-facts">
            {QUICK_FACTS.map((f, i) => (
              <div key={f.small} className="mt-fact" style={v(PALETTE[i % PALETTE.length])}>
                <span className="anton mt-fact-big">{f.big}</span>
                <span className="mt-fact-small">{f.small}</span>
              </div>
            ))}
          </div>
        </section>

        {/* photos */}
        {photos.length > 0 && (
          <section>
            <Head kicker="Pictures" color={C.cyan} title="This is Jasmine" />
            <div className="mt-photos">
              {photos.map((src) => (
                <div key={src} className="mt-photo">
                  <Image src={src} alt="Jasmine Yen" fill sizes="(max-width: 820px) 50vw, 300px" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* story */}
        <section>
          <Head kicker="Her story" color={C.pink} title="From singing along to signing" />
          <ol className="mt-story">
            {STORY.map((s, i) => (
              <li key={s.when} style={v(PALETTE[i % PALETTE.length])}>
                <span className="mt-when">{s.when}</span>
                <p>{s.what}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* listen */}
        <section>
          <Head kicker="Press play" color={C.green} title="Listen & watch" />
          {songs.length > 0 && (
            <ul className="mt-tracks">
              {songs.map((s, i) => (
                <li key={s.title} style={v(PALETTE[i % PALETTE.length])}>
                  <div className="mt-track-meta">
                    <span className="mt-track-title">{s.title}</span>
                    <span className="mt-muted">{s.note}</span>
                  </div>
                  <audio controls preload="none" src={s.src} />
                </li>
              ))}
            </ul>
          )}
          {videos.map((x) => (
            <figure key={x.title} className="mt-video">
              <figcaption className="anton mt-video-title">{x.title}</figcaption>
              <div className="mt-video-frame">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${x.youtube}`}
                  title={x.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </figure>
          ))}
        </section>

        {/* skills + loves */}
        <section>
          <Head kicker="Her superpowers" color={C.blue} title="What she can do" />
          <div className="mt-cards">
            {CAN_DO.map((c, i) => (
              <div key={c.title} className="mt-card" style={v(PALETTE[(i + 2) % PALETTE.length])}>
                <p className="mt-card-title">{c.title}</p>
                <p className="mt-muted">{c.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-body">When she&apos;s not making music, she loves:</p>
          <div className="mt-chips">
            {LOVES.map((t, i) => (
              <span key={t} className="mt-chip" style={v(PALETTE[i % PALETTE.length])}>
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* fashion */}
        <section>
          <Head kicker="Fashion" color={C.red} title="Big brands call her" />
          <p className="mt-body">
            Famous fashion brands ask Jasmine to wear their clothes and star in their photos and
            videos. She has worked with:
          </p>
          <div className="mt-brands">
            {BRANDS.map((b) => (
              <span key={b} className="anton">
                {b}
              </span>
            ))}
          </div>
          <p className="mt-body">
            Next up: <strong>Balenciaga</strong>, starting October 2026.
          </p>
        </section>

        {/* quiz */}
        <section>
          <Image
            src={doodleHeart}
            alt=""
            className="mt-floaty"
            style={{ right: "2%", width: 56, height: "auto" }}
          />
          <Head kicker="Pop quiz" color={C.yellow} title="Were you paying attention?" />
          <p className="mt-muted">Tap a question to see the answer.</p>
          <div className="mt-quiz">
            {QUIZ.map((x, i) => (
              <details key={x.q} style={v(PALETTE[i % PALETTE.length])}>
                <summary>{x.q}</summary>
                <p>{x.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* links */}
        {LINKS.length > 0 && (
          <section>
            <Head kicker="Find her" color={C.cyan} title="Follow Jasmine" />
            <div className="mt-links">
              {LINKS.map((l, i) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={v(PALETTE[i % PALETTE.length])}
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
          </section>
        )}

        <footer className="mt-footer">
          <Dots />
          <p className="mt-body">
            Jasmine&apos;s story is just getting started. Her first album was the first verse. The
            chorus is on the way.
          </p>
        </footer>
      </main>
    </div>
  );
}
