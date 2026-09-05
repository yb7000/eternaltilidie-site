import type { Metadata } from "next";
import Image from "next/image";
import Deck from "@/components/Deck";
import "./proposal.css";

import graffitiLogo from "@/public/images/graffiti-logo.png";
import doodleStar from "@/public/images/doodle-star.png";
import doodleHeart from "@/public/images/doodle-heart.png";
import mascot from "@/public/images/mascot.png";
import crowdHearts from "@/public/images/crowd-hearts.jpg";
import kidSkiMask from "@/public/images/kid-ski-mask.jpg";
import boxHeadsForest from "@/public/images/box-heads-forest.jpg";
import avatarsTogether from "@/public/images/avatars-together.jpg";

export const metadata: Metadata = {
  title: "Jasmine Yen × Eternal",
  description: "Service & partnership proposal from Eternal for Jasmine Yen.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Jasmine Yen × Eternal",
    description: "Service & partnership proposal.",
    type: "website",
    url: "https://eternaltilidie.com/proposals/jasmine-yen",
    images: [{ url: "https://eternaltilidie.com/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jasmine Yen × Eternal",
    description: "Service & partnership proposal.",
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

// Costs + deal-terms slides are kept in the source but not rendered.
const SHOW_COMMERCIALS = false;

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
    <p className="p-kicker">
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
  items: string[];
  cols?: boolean;
  big?: boolean;
  colorize?: boolean;
  color?: string;
}) {
  const cls = ["p-list", cols && "p-list--cols", big && "p-list--big"].filter(Boolean).join(" ");
  return (
    <ul className={cls}>
      {items.map((t, i) => (
        <li
          key={t}
          style={{ "--dot": colorize ? PALETTE[i % PALETTE.length] : color } as React.CSSProperties}
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

type Phase = { name: string; color: string; process: string[]; deliverables: string[] };

function Process({ phases }: { phases: Phase[] }) {
  return (
    <div className="p-process">
      <div className="head" aria-hidden />
      <div className="head">The Process</div>
      <div className="head">The Deliverables</div>
      {phases.map((p, i) => (
        <div key={p.name} style={{ display: "contents" }}>
          <div className="phase">
            <span className="num" style={{ background: p.color }}>
              {i + 1}
            </span>
            <span>{p.name}</span>
          </div>
          <ul>
            {p.process.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <ul className="deliv" style={{ "--dot": p.color } as React.CSSProperties}>
            {p.deliverables.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

type Member = { name: string; role: string };

function TeamGroup({ label, members, offset = 0 }: { label: string; members: Member[]; offset?: number }) {
  return (
    <div className="p-team-group">
      <h3 className="anton p-team-label">{label}</h3>
      <div className="p-team-row">
        {members.map((m, i) => (
          <div key={m.name} className="p-member">
            <span
              className="p-chip"
              style={{ "--dot": PALETTE[(i + offset) % PALETTE.length] } as React.CSSProperties}
            >
              {m.name}
            </span>
            <span className="p-role">{m.role}</span>
          </div>
        ))}
      </div>
    </div>
  );
}


export default function JasmineYenProposal() {
  return (
    <Deck>
      {/* 01 — Cover */}
      <section className="slide slide--cover pslide pslide--center">
        <Image
          src={crowdHearts}
          alt=""
          fill
          priority
          sizes="100vw"
          className="bg-img"
          style={{ objectPosition: "center bottom", opacity: 0.35 }}
        />
        <div
          className="overlay"
          style={{ background: "linear-gradient(rgba(17,17,17,.8),rgba(17,17,17,.45) 50%,rgba(17,17,17,.9))" }}
        />
        <Image
          src={doodleHeart}
          alt=""
          className="floaty"
          style={{ left: "8%", top: "16%", width: "clamp(44px,6vw,80px)", height: "auto", animationDuration: "8s" }}
        />
        <Image
          src={doodleStar}
          alt=""
          className="floaty"
          style={{ right: "10%", bottom: "20%", width: "clamp(40px,5vw,70px)", height: "auto", animationDuration: "9s" }}
        />
        <h1 className="anton p-title p-title--xl">Jasmine Yen</h1>
        <p className="p-sub">Service &amp; Partnership Proposal</p>
        <Dots />
      </section>

      {/* 02 — Our mission */}
      <section className="slide pslide">
        <div className="p-inner">
          <Kicker color={C.yellow}>Our mission</Kicker>
          <h2 className="anton p-title p-title--sm">Overview</h2>
          <p className="p-body">
            <span className="highlight">WE INTEND</span> to address the specific needs of Jasmine Yen by
            pulling from our dynamic knowledge base, network of industry partners, and production
            management platform to provide Jasmine and the team with the insights, tools and people
            needed to birth a new artist&apos;s career.
          </p>
          <p className="p-body">
            <span className="highlight">WE WILL</span> work closely with Jasmine to assist in completing
            the production of the album while simultaneously supporting the development of the Jasmine
            Yen brand and managing the marketing of the distribution of the first music promotional
            campaign.
          </p>
          <p className="p-body">
            <span className="highlight">OUR OBJECTIVE</span> is to help Jasmine start and grow a career
            as a recording and performing artist — using a modern hit-making approach to produce a
            record that stands out in the current new artist landscape.
          </p>
        </div>
      </section>

      {/* 03 — Our values */}
      <section className="slide pslide">
        <div className="p-inner">
          <Kicker color={C.green}>Our values</Kicker>
          <h2 className="anton p-title p-title--sm">We believe in:</h2>
          <List
            colorize
            items={[
              "Honesty, transparency and accountability.",
              "Clear communication.",
              "Obsessing over how things sound, look, and why they strike a chord.",
              "Translating vague ideas and references into tangible, actionable vision.",
              "Understanding the areas of art, culture and design that you want to explore.",
              "Absorbing ideas and discussing feedback empathetically.",
              "Investing many hours every day to improve our process and learn new skills.",
              "Proactively troubleshooting and solving problems with clever solutions.",
            ]}
          />
        </div>
      </section>

      {/* 04 — Our goals */}
      <section className="slide slide--cover pslide">
        <Image
          src={kidSkiMask}
          alt=""
          fill
          sizes="100vw"
          className="bg-img"
          style={{ objectPosition: "center 30%", opacity: 0.35 }}
        />
        <div
          className="overlay"
          style={{ background: "linear-gradient(90deg,rgba(17,17,17,.92),rgba(17,17,17,.55))" }}
        />
        <div className="p-inner">
          <Kicker color={C.blue}>Our goals</Kicker>
          <List
            big
            colorize
            items={[
              "Develop an artist journey that has clear and achievable objectives.",
              "Create and curate the artist's image through content creation.",
              "Form a dedicated team to work alongside the artist.",
              "Grow with the artist to the heights of their own aspirations.",
            ]}
          />
        </div>
      </section>

      {/* 05 — Our product */}
      <section className="slide pslide">
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
        <div className="p-inner p-split">
          <div className="p-col">
            <Kicker color={C.cyan}>Our product</Kicker>
            <h2 className="anton p-title p-title--sm">StudioOS</h2>
            <p className="p-body">
              Jasmine and the team will be able to manage all aspects of the production,
              administration, and marketing processes through{" "}
              <a className="p-link" href="https://eternal.createos.app" target="_blank" rel="noopener">
                StudioOS
              </a>
              , our personalized artist portal.
            </p>
            <p className="p-body p-body--sm" style={{ opacity: 0.8 }}>
              To view the portal:{" "}
              <a className="p-link" href="https://eternal.createos.app" target="_blank" rel="noopener">
                eternal.createos.app
              </a>
            </p>
          </div>
          <Image
            src={mascot}
            alt="Eternal mascot doodle"
            style={{ flex: "0 0 auto", width: "clamp(160px,20vw,260px)", height: "auto" }}
          />
        </div>
      </section>

      {/* 06 — Services: Development */}
      <section className="slide pslide">
        <div className="p-inner">
          <Kicker color={C.pink}>Our services</Kicker>
          <h2 className="anton p-title p-title--sm">Development</h2>
          <p className="p-body p-body--sm" style={{ maxWidth: 900 }}>
            We enhance our artists&apos; creation process by providing on-demand production services
            with an emphasis on content creation, production management, and terms of exchange
            communications. Specific services include:
          </p>
          <List
            cols
            color={C.pink}
            items={[
              "Development of communication strategies",
              "Development of public persona",
              "Development of performance abilities",
              "A&R",
              "Sourcing song demos",
              "Research and recruitment of featured artists, songwriters, engineers, and co-producers",
              "Creative direction to support the completion of record productions",
              "Creating and managing the album production schedule",
              "Delivering terms of exchange to management of creative collaborators",
              "Scheduling songwriting, production, and mixing sessions",
              "Delivering album metadata to management, repertoire holder or distributor",
            ]}
          />
        </div>
      </section>

      {/* 07 — Services: Marketing */}
      <section className="slide pslide">
        <div className="p-inner">
          <Kicker color={C.yellow}>Our services</Kicker>
          <h2 className="anton p-title p-title--sm">Marketing</h2>
          <p className="p-body p-body--sm" style={{ maxWidth: 900 }}>
            We specialize in narrative building and figuring out how to plug new and traditional means
            of marketing and promotion into storytelling. We leverage our diverse network of creatives
            to make sure the music (and the brand) lives its best life. We bring savviness and passion
            to every project, stretching budgets, calling in favors, adapting to changing rollout
            plans, and creating a safe space for feedback. Our services include:
          </p>
          <List
            cols
            color={C.yellow}
            items={[
              "Strategy Development & Brand Narrative Ideation",
              "Discovery, Research & Sauce Hunting",
              "Development of brand assets",
              "Learning how to communicate a brand",
              "Content Segmentation & Audience Mapping",
              "DSP Relationship Management",
              "Ad/Media Buying",
              "Implementation of marketing strategies and plans",
            ]}
          />
        </div>
      </section>

      {/* 08 — Services: Administration */}
      <section className="slide pslide">
        <div className="p-inner">
          <Kicker color={C.cyan}>Our services</Kicker>
          <h2 className="anton p-title p-title--sm">Administration</h2>
          <p className="p-body p-body--sm" style={{ maxWidth: 900 }}>
            StudioOS will give Jasmine and the team access to the information and assets they need
            at any time, from anywhere. In addition to this custom dashboard, we also handle the
            following functions:
          </p>
          <List
            color={C.cyan}
            items={[
              "Team Coordination & Communications",
              "Asset Management",
              "Project Management",
              "Managing expenses and balancing budget for album production",
              "Negotiating terms of exchange with creative collaborators",
            ]}
          />
        </div>
      </section>

      {/* 09 — Year 1: Development */}
      <section className="slide pslide">
        <div className="p-inner">
          <Kicker color={C.pink}>Year 1: Development</Kicker>
          <Process
            phases={[
              {
                name: "Assessment & Preparation",
                color: C.pink,
                process: [
                  "Review album demos",
                  "Review all current to-do's for album completion",
                  "Review master wish list of potential artist collaborations",
                  "Brainstorm next steps, collaboration ideas",
                  "Develop work plan to complete album",
                ],
                deliverables: ["Strategy Guide", "Production Work Plan", "StudioOS Access"],
              },
              {
                name: "Development & Planning",
                color: C.yellow,
                process: [
                  "Strategy Development and 5-Year Goal Alignment Workshop",
                  "Primal Branding Workshop",
                  "Artist Development & Management Workshop",
                  "Communication Strategies Workshop",
                ],
                deliverables: ["Artist Management Plan", "Brand Management Plan"],
              },
              {
                name: "Implementation & Execution",
                color: C.green,
                process: [
                  "Weekly all-hands production calls/meetings",
                  "Outreach for features, songs or instrumentals",
                  "Sourcing of production assistance",
                  "Sessions",
                ],
                deliverables: ["Completed Album", "Delivery of masters to Jasmine"],
              },
            ]}
          />
          <p className="p-note">
            *** Features, producers and songwriter costs are heavily dependent upon creative. The cost
            to produce final music, visual and written assets are not included in these services. A
            final scope-of-work will be drafted and delivered based on our discovery session. ***
          </p>
        </div>
      </section>

      {/* 10 — Year 1: Marketing */}
      <section className="slide pslide">
        <div className="p-inner">
          <Kicker color={C.yellow}>Year 1: Marketing</Kicker>
          <Process
            phases={[
              {
                name: "Assessment & Preparation",
                color: C.pink,
                process: [
                  "Creation of User Profiles",
                  "Research",
                  "Development of marketing plan",
                  "Content Assessment",
                ],
                deliverables: ["Marketing Plan"],
              },
              {
                name: "Development",
                color: C.yellow,
                process: [
                  "Development of brand assets",
                  "Team Sourcing",
                  "Develop mood boards for projects to ensure a clear, specific direction for each asset",
                ],
                deliverables: ["Creative visual collaborators secured", "Brand Assets"],
              },
              {
                name: "Implementation & Execution",
                color: C.green,
                process: [
                  "Manage the creation of assets and associated deadlines",
                  "Liaise with other creatives (graphic designers, videographers, photographers, etc.)",
                  "Control and allocate budget to ensure the right costs lead to the right creative result",
                  "Content release scheduling & pitching",
                ],
                deliverables: ["Music Videos", "Social Assets", "Street Campaigns"],
              },
            ]}
          />
          <p className="p-note">
            *** Content development costs are heavily dependent upon creative. Estimated costs are
            based on objectives, scope of work, activities, deliverables, and timeline. A final
            scope-of-work will be drafted and delivered based on our discovery session. ***
          </p>
        </div>
      </section>

      {/* 11 — Production team */}
      <section className="slide pslide pslide--center">
        <Kicker color={C.green}>Our production team</Kicker>
        <div className="p-team">
          <TeamGroup
            label="Lead"
            members={[
              { name: "Daouda Leonard", role: "Production Manager" },
              { name: "Jon Tanners", role: "Creative Director" },
            ]}
          />
          <TeamGroup
            label="Support"
            offset={2}
            members={[
              { name: "Dannie Fite", role: "A&R" },
              { name: "Langa Kambi-Shamba", role: "Project Manager" },
              { name: "Sarah Kahn", role: "Production Assistant" },
            ]}
          />
        </div>
      </section>

      {/* 12 — Agency team */}
      <section className="slide pslide pslide--center">
        <Kicker color={C.blue}>Our agency team</Kicker>
        <div className="p-team">
          <TeamGroup
            label="Lead"
            members={[
              { name: "Erica Castello", role: "Primal Branding Specialist" },
              { name: "Stu Iverson", role: "Strategy Specialist" },
              { name: "Lucia Margarita", role: "Communications Manager" },
            ]}
          />
          <TeamGroup
            label="Support"
            offset={3}
            members={[
              { name: "Yung Jake", role: "Creative Advisor" },
              { name: "Billy Walsh", role: "Marketing Advisor" },
            ]}
          />
        </div>
      </section>

      {/* 13 — Business model */}
      <section className="slide slide--cover pslide">
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
        <div className="p-inner">
          <Kicker color={C.red}>Our business model</Kicker>
          <div className="p-years">
            <div className="p-year">
              <h3 className="anton" style={{ color: C.pink }}>
                Year 1
              </h3>
              <p>
                Year one is our mutual opportunity to gather information and explore the creative
                possibilities of partnership. Execution is what turns an experiment into a venture and
                a venture into lifelong value. The proposed structure for year one is a monthly
                development fee that leaves all intellectual property rights to Jasmine Yen. We charge
                a mutually cost efficient upfront fee compared to the average price of artist
                development and management costs. At the end of this term, Eternal will present a
                detailed game plan outlining a post mortem on the results of our year one
                collaboration as well as new objectives, strategy, and growth options for expansion.
              </p>
            </div>
            <div className="p-year">
              <h3 className="anton" style={{ color: C.yellow }}>
                Year 2
              </h3>
              <p>
                If both parties consent to continued collaboration at the end of year one, Eternal
                will source and manage the talent needed to continue to accelerate Jasmine&apos;s
                creative career. This phase in the Eternal model is structured on the premise of
                shared risk and shared upside. We will work together during year two to develop an
                operating budget and fees based on contract length. This will translate to a cash and
                net profits commission model, where both parties will be able to rapidly iterate on a
                variety of pathways that lead to the highest level of growth.
              </p>
            </div>
            <div className="p-year">
              <h3 className="anton" style={{ color: C.cyan }}>
                Year 3
              </h3>
              <p>
                Year 3 is all about understanding, utilizing, testing, and sustaining our co-created
                IP, products including music, merchandise and visual media. Once we have shared
                reality about what was accomplished in year two, Eternal and Jasmine will negotiate a
                sustainable equity exchange in the development of formal long-term partnership to
                develop an ancillary entertainment business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Costs + The deal — hidden for now; flip SHOW_COMMERCIALS to bring them back */}
      {SHOW_COMMERCIALS && (
        <>
        {/* Costs (hidden) */}
        <section className="slide pslide">
          <div className="p-inner" style={{ maxWidth: 920 }}>
            <Kicker color={C.yellow}>Costs</Kicker>
            <table className="p-costs">
              <thead>
                <tr>
                  <th scope="col">Year 1 activities</th>
                  <th scope="col">Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="c-dev">Development</td>
                  <td>$165,000</td>
                </tr>
                <tr>
                  <td className="c-mkt">Marketing</td>
                  <td>$90,000</td>
                </tr>
                <tr>
                  <td className="c-adm">Administration</td>
                  <td>$45,000</td>
                </tr>
                <tr className="total">
                  <td>Total cost</td>
                  <td>
                    <span className="highlight">$300,000</span>
                  </td>
                </tr>
                <tr className="terms">
                  <td>Payment terms</td>
                  <td>$25,000 paid monthly</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* The deal (hidden) */}
        <section className="slide pslide">
          <div className="p-inner p-split">
            <div className="p-col">
              <Kicker color={C.green}>Our deal</Kicker>
              <h2 className="anton p-title p-title--sm">The terms</h2>
              <List
                colorize
                items={[
                  "$25K per month, 12 months with a 3 month initial discovery and preparation period.",
                  "If Jasmine Yen decides to move on without Eternal after the initial period, a $25K success fee will be paid upon termination of agreement.",
                  "All asset development and promotion activities will incur additional costs TBD based on scope of creative and labor costs.",
                ]}
              />
            </div>
            <p className="anton p-stat" style={{ flex: "0 1 auto" }}>
              $25K
              <small>per month · 12 months</small>
            </p>
          </div>
        </section>
        </>
      )}

      {/* 14 — Closing */}
      <section className="slide slide--center pslide--center" style={{ gap: 28 }}>
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
        <p className="p-sub">Let&apos;s build something eternal.</p>
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
