import Image from "next/image";
import melissaHeadshot from "../public/melissa-headshot.jpeg";

const bookingEmail = "ReadingWithMC@gmail.com";
const bookingHref = `mailto:${bookingEmail}?subject=Reading with Melissa`;

function SunMark({ small = false }: { small?: boolean }) {
  return <span className={small ? "sun-mark sun-mark-small" : "sun-mark"} aria-hidden="true"><i /></span>;
}

function Lotus() {
  return (
    <svg className="service-icon lotus" viewBox="0 0 64 48" aria-hidden="true">
      <path d="M32 42C22 34 20 22 32 7c12 15 10 27 0 35Z" />
      <path d="M31 42C17 40 8 32 8 18c14 2 23 10 23 24Z" />
      <path d="M33 42c14-2 23-10 23-24-14 2-23 10-23 24Z" />
      <path d="M29 42C17 46 7 42 3 31c12-2 22 2 26 11Z" />
      <path d="M35 42c12 4 22 0 26-11-12-2-22 2-26 11Z" />
    </svg>
  );
}

const offerings = [
  { icon: <SunMark small />, title: "Psychic Readings", text: "Guidance, insight and messages that may bring clarity to your life." },
  { icon: <span className="crescent" aria-hidden="true">☾</span>, title: "Mediumship", text: "Receive messages and connection from loved ones who have crossed over." },
  { icon: <Lotus />, title: "Events & Gatherings", text: "Private events, group readings, spiritual gatherings and special experiences." },
];

export default function Home() {
  return (
    <main id="home">
      <header className="site-header shell">
        <a className="brand" href="#home" aria-label="Melissa Cubillas home">
          <SunMark />
          <span className="brand-copy"><strong>Melissa Cubillas</strong><small>Psychic medium &amp; spiritual guide</small></span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#home">Home</a><a href="#about">About</a><a href="#readings">Readings</a><a href="#events">Events</a><a href="#contact">Contact</a>
        </nav>
        <a className="pill-button" href={bookingHref}>Book a reading <span>→</span></a>
      </header>

      <section className="hero">
        <div className="hero-wash" aria-hidden="true" />
        <div className="hero-inner shell">
          <div className="hero-copy">
            <p className="eyebrow">Psychic medium &amp; spiritual guide</p>
            <h1>Melissa<br />Cubillas</h1>
            <p className="hero-lines"><em>Messages from beyond.</em><em>Clarity for the present.</em><em>Connection to what matters most.</em></p>
            <a className="square-button" href={bookingHref}>Book a reading <span>→</span></a>
          </div>
          <div className="hero-portrait">
            <div className="halo" aria-hidden="true" />
            <Image src={melissaHeadshot} alt="Melissa Cubillas" fill priority placeholder="blur" sizes="(max-width: 760px) 100vw, 53vw" />
          </div>
        </div>
      </section>

      <section className="connection section shell" id="readings">
        <div className="ornament-heading"><span /><h2>A connection beyond the physical</h2><span /></div>
        <p className="connection-intro">Melissa Cubillas is a gifted psychic medium and spiritual guide who helps people find clarity, healing and connection. Through compassionate, intuitive readings, she brings through messages from loved ones, offers insight into your path, and helps you reconnect with your higher self.</p>
        <div className="offering-grid">
          {offerings.map((offering) => (
            <article key={offering.title} id={offering.title.startsWith("Events") ? "events" : undefined}>
              <div className="icon-wrap">{offering.icon}</div><h3>{offering.title}</h3><p>{offering.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about section" id="about">
        <div className="about-inner shell">
          <div className="about-photo">
            <div className="portrait-arch" aria-hidden="true" />
            <Image src={melissaHeadshot} alt="Melissa Cubillas, psychic medium and spiritual guide" fill placeholder="blur" sizes="(max-width: 760px) 100vw, 45vw" />
          </div>
          <div className="about-copy">
            <p className="eyebrow">About Melissa</p>
            <h2>Guided by intuition.<br />Grounded in love.</h2>
            <p>Melissa&apos;s journey as a psychic medium began at an early age, and her gift has only deepened with time. With a natural ability to connect with the spirit world and a deep sense of empathy, she brings comfort, clarity and healing to every session.</p>
            <p>Her work is rooted in love, truth and the belief that we are never truly alone.</p>
            <a className="text-link" href={`mailto:${bookingEmail}?subject=Learning more about Melissa`}>Learn more <span>→</span></a>
          </div>
        </div>
      </section>

      <section className="kind-words section shell" aria-label="Client experience">
        <div className="ornament-heading"><span /><h2>What you can expect</h2><span /></div>
        <div className="values-grid">
          <article><strong>Compassion</strong><p>A warm, supportive space where you can feel seen, heard and at ease.</p></article>
          <article><strong>Connection</strong><p>An honest, intuitive experience centered on the people and questions that matter most.</p></article>
          <article><strong>Clarity</strong><p>Messages offered with care, integrity and room for your own inner knowing.</p></article>
        </div>
      </section>

      <section className="ready" id="contact">
        <div className="ready-sun" aria-hidden="true" />
        <div className="ready-inner shell"><h2>Ready to Connect?</h2><p>Book your private reading with Melissa.</p><a className="square-button" href={bookingHref}>Book a reading <span>→</span></a></div>
      </section>

      <footer className="site-footer shell">
        <div className="brand footer-brand"><SunMark /><span className="brand-copy"><strong>Melissa Cubillas</strong><small>Psychic medium &amp; spiritual guide</small></span></div>
        <nav aria-label="Footer navigation"><a href="#home">Home</a><a href="#about">About</a><a href="#readings">Readings</a><a href="#events">Events</a><a href="#contact">Contact</a></nav>
        <div className="social-links"><a href="https://www.instagram.com/melissamcmedium/" target="_blank" rel="noreferrer" aria-label="Melissa on Instagram">◎</a><a href={`mailto:${bookingEmail}`} aria-label="Email Melissa">✦</a></div>
      </footer>
    </main>
  );
}
