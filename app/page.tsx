import Image from "next/image";
import Deck from "@/components/Deck";
import Logo3D from "@/components/Logo3D";

import graffitiLogo from "@/public/images/graffiti-logo.png";
import doodleStar from "@/public/images/doodle-star.png";
import doodleHeart from "@/public/images/doodle-heart.png";
import mascot from "@/public/images/mascot.png";
import crowdEvent from "@/public/images/crowd-event.jpg";
import kidSkiMask from "@/public/images/kid-ski-mask.jpg";
import nighthawks from "@/public/images/nighthawks.jpg";
import crowdHearts from "@/public/images/crowd-hearts.jpg";
import placeLogoTiles from "@/public/images/place-logo-tiles.jpg";
import photoBoothGrid from "@/public/images/photo-booth-grid.jpg";
import avatarWorld from "@/public/images/avatar-world.jpg";
import boxHeadsForest from "@/public/images/box-heads-forest.jpg";
import avatarsTogether from "@/public/images/avatars-together.jpg";

const DOT_COLORS = ["#f97fc0", "#f2543d", "#f5c518", "#6abf40", "#3b82f6", "#2ec4e6"];

function Dots({ small = false }: { small?: boolean }) {
  return (
    <div className={small ? "dots dots--small" : "dots"}>
      {DOT_COLORS.map((c) => (
        <span key={c} style={{ background: c }} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <Deck>
      <section className="slide slide--center" style={{ gap: 36 }}>
        <Image
          src={graffitiLogo}
          alt="Eternal graffiti logo"
          priority
          style={{ width: "clamp(280px,42vw,520px)", height: "auto" }}
        />
        <p className="hero-lede">
          <em>Eternal</em> is a technology label for artists to develop the next generation of
          storytelling.
        </p>
        <Dots />
      </section>

      <section className="slide slide--center" style={{ gap: 32, position: "relative" }}>
        <Image
          src={doodleStar}
          alt=""
          className="floaty"
          style={{
            left: "12%",
            top: "22%",
            width: "clamp(50px,7vw,90px)",
            height: "auto",
            opacity: 0.9,
            animationDuration: "7s",
          }}
        />
        <Image
          src={doodleStar}
          alt=""
          className="floaty"
          style={{
            right: "14%",
            top: "16%",
            width: "clamp(40px,5vw,70px)",
            height: "auto",
            opacity: 0.8,
            scale: "-1 1",
            animationDuration: "9s",
          }}
        />
        <Image
          src={doodleStar}
          alt=""
          className="floaty"
          style={{
            right: "10%",
            bottom: "24%",
            width: "clamp(36px,4vw,60px)",
            height: "auto",
            opacity: 0.7,
            animationDuration: "8s",
          }}
        />
        <Image
          src={mascot}
          alt="Place mascot doodle"
          style={{ width: "clamp(130px,16vw,190px)", height: "auto" }}
        />
        <p className="studio-lede">
          Our{" "}
          <a
            className="underlined"
            href="https://eternal.createos.app"
            target="_blank"
            rel="noopener"
          >
            Studio
          </a>{" "}
          portal is how you can connect, engage and collaborate with the Eternal team.
        </p>
        <p className="studio-sub">
          It is a new platform for developing unique URL and IRL experiences for art to be seen
          and heard.
        </p>
        <p className="studio-note">Eternal was born in NYC and based in LA.</p>
      </section>

      <section className="slide slide--cover">
        <Image
          src={crowdEvent}
          alt="Crowd at an Eternal event"
          fill
          sizes="100vw"
          className="bg-img"
          style={{ opacity: 0.55 }}
        />
        <div
          className="overlay"
          style={{
            background: "radial-gradient(ellipse at center,rgba(0,0,0,.55),rgba(0,0,0,.85))",
          }}
        />
        <div className="tech-culture-copy">
          <h2 className="anton">
            TECHNOLOGY AND
            <br />
            CULTURE ARE THE SAME.
          </h2>
          <p>
            We&apos;ve been building culture and community alongside artists from the beginning.{" "}
            <em>Artists</em> influence everything that we make, and together we build new worlds
            for our communities.
          </p>
        </div>
      </section>

      <section className="slide slide--cover" style={{ padding: 0 }}>
        <Image
          src={kidSkiMask}
          alt="Kid in a beaded ski mask at a show"
          fill
          sizes="100vw"
          className="bg-img"
          style={{ objectPosition: "center 30%", opacity: 0.85 }}
        />
        <div
          className="overlay"
          style={{
            background: "linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.25) 40%,rgba(0,0,0,.55))",
          }}
        />
        <h2 className="anton listen-title">
          LISTEN TO
          <br />
          THE KIDS
        </h2>
      </section>

      <section className="slide slide--center" style={{ gap: 36 }}>
        <Image
          src={nighthawks}
          alt="Hopper's Nighthawks with a lone figure outside"
          style={{
            width: "min(600px,88vw)",
            height: "auto",
            boxShadow: "0 20px 60px rgba(0,0,0,.6)",
          }}
        />
        <h2 className="anton shaped-title">
          WHAT HAPPENED? WHAT HAS SHAPED THEIR EMERGENT NEEDS AND VALUES?
        </h2>
        <p className="shaped-copy">
          Gen Z is the child of fractured truth, a natural disaster that forced social
          interaction online, and has been dubbed the &ldquo;loneliest generation&rdquo;.
        </p>
      </section>

      <section className="slide slide--cover">
        <Image
          src={crowdHearts}
          alt="Crowd with hand-drawn hearts"
          fill
          sizes="100vw"
          className="bg-img"
          style={{ objectPosition: "center bottom", opacity: 0.5 }}
        />
        <div
          className="overlay"
          style={{ background: "linear-gradient(rgba(0,0,0,.75),rgba(0,0,0,.35))" }}
        />
        <Image
          src={doodleHeart}
          alt=""
          className="floaty"
          style={{
            left: "8%",
            top: "14%",
            width: "clamp(44px,6vw,80px)",
            height: "auto",
            animationDuration: "8s",
          }}
        />
        <Image
          src={doodleHeart}
          alt=""
          className="floaty"
          style={{
            right: "10%",
            bottom: "18%",
            width: "clamp(36px,5vw,64px)",
            height: "auto",
            scale: "-1 1",
            animationDuration: "10s",
          }}
        />
        <div className="presence-copy">
          <p>
            They are seeking the sensation of <span className="underlined">presence</span>.
          </p>
          <p>
            They value their <span className="underlined">expression</span>. It guides them
            towards diversity, inclusion, and communities.
          </p>
          <p>
            This is their basis of building as a collective — through sharing their voice on
            media, culture, and the platforms themselves.
          </p>
        </div>
      </section>

      <section className="slide slide--center" style={{ gap: 40 }}>
        <p className="third-place-intro">
          The first and second place have been compressed, and the third place distorted.
        </p>
        <div className="places-row">
          <div className="place-card">
            <span className="emoji">🏠</span>
            <span className="name">HOME</span>
            <span className="rank">1st place</span>
          </div>
          <div className="place-card">
            <span className="emoji">🏢</span>
            <span className="name">WORK</span>
            <span className="rank">2nd place</span>
          </div>
          <div className="place-card">
            <span className="emoji emoji--question">?</span>
            <span className="name">?</span>
            <span className="rank">3rd place</span>
          </div>
        </div>
        <Image
          src={placeLogoTiles}
          alt="Place logo tiles"
          style={{ width: "clamp(180px,24vw,280px)", height: "auto" }}
        />
        <div className="third-place-copy">
          <p className="lead">
            <span className="highlight">Eternal</span> is that new 3rd place. For music,
            conversation, events and discovery.
          </p>
        </div>
      </section>

      <section className="slide slide--center" style={{ gap: 36 }}>
        <Image
          src={photoBoothGrid}
          alt="Photo-booth grid from Eternal festivals"
          style={{ width: "min(620px,90vw)", height: "auto" }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
          <p className="powered-kicker">Our first experience was:</p>
          <h2 className="anton powered-title">&ldquo;POWERED BY ETERNAL&rdquo;</h2>
        </div>
        <div className="powered-copy">
          <p>A community 10,000 strong — built person by person.</p>
          <p>
            Festival experiences for 18–28 year olds in NYC, Los Angeles, and Chicago — with free
            admission.
          </p>
          <p>
            Real cultural moments that looped straight into <em>cross platform social connections</em>.
          </p>
        </div>
      </section>

      <section
        className="slide"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "clamp(24px,5vw,64px)",
          flexWrap: "wrap",
          padding: "96px 32px",
        }}
      >
        <h2 className="anton merging-title">MERGING THE DIGITAL AND PHYSICAL LIKE NEVER BEFORE</h2>
        <Image
          src={avatarWorld}
          alt="3D render of a Place avatar world"
          style={{ flex: "0 1 460px", width: "min(460px,86vw)", height: "auto" }}
        />
      </section>

      <section className="slide slide--cover">
        <Image
          src={boxHeadsForest}
          alt="People with Eternal boxes on their heads in a forest"
          fill
          sizes="100vw"
          className="bg-img"
          style={{ opacity: 0.6 }}
        />
        <div
          className="overlay"
          style={{
            background: "linear-gradient(rgba(0,0,0,.7),rgba(0,0,0,.3) 55%,rgba(0,0,0,.6))",
          }}
        />
        <div className="rethink-copy">
          <p className="setup">We don&apos;t believe in replacing the physical with the digital.</p>
          <h2 className="anton">WE WANT TO CREATE EXPERIENCES THAT RETHINK AND CONNECT BOTH</h2>
          <p className="close">
            The combination of artists and emergent <em>technologies</em> makes this possible.
          </p>
        </div>
      </section>

      <section
        className="slide"
        style={{
          display: "flex",
          alignItems: "flex-start",
          alignContent: "center",
          justifyContent: "center",
          gap: "clamp(16px,2.5vw,32px)",
          flexWrap: "wrap",
          padding: "96px 32px",
        }}
      >
        <Logo3D src="/models/eternal-logo-3d.obj" className="logo-3d" />
        <div className="founder-copy">
          <h2 className="anton">ORIGIN STORY</h2>
          <p>
            Eternal was founded in 2019 by Reggie James and Luca Repola in NYC. Today it is
            spearheaded by Daouda Leonard and a team of technologists, A&amp;R&apos;s, and artist
            managers in Los Angeles.
          </p>
        </div>
      </section>

      <section className="slide slide--center" style={{ gap: 36 }}>
        <Image
          src={avatarsTogether}
          alt="Place avatars standing together"
          style={{ width: "min(560px,88vw)", height: "auto" }}
        />
        <Image
          src={graffitiLogo}
          alt="Eternal graffiti logo"
          style={{ width: "clamp(140px,18vw,200px)", height: "auto" }}
        />
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
