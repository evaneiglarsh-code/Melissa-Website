import Image from "next/image";
import melissaHeadshot from "../public/melissa-headshot.jpeg";
import expoWide from "../public/expo-wide.jpg";
import expoStage from "../public/expo-stage.jpg";
import paddleMeditation from "../public/paddle-meditation.jpg";

const bookingEmail = "ReadingWithMC@gmail.com";
const bookingHref = `mailto:${bookingEmail}?subject=Reading with Melissa`;

function SunMark({ small = false }: { small?: boolean }) {
  return <span className={small ? "sun-mark sun-mark-small" : "sun-mark"} aria-hidden="true"><i /></span>;
}

const offerings = [
  {
    symbol: "✦",
    title: "Private Readings",
    text: "Personal, evidential messages offered with compassion, honesty and the intention to bring comfort and closure.",
  },
  {
    symbol: "☾",
    title: "Galleries & Events",
    text: "Powerful live experiences for intimate groups, public audiences, retreats and private gatherings.",
  },
  {
    symbol: "◌",
    title: "Spiritual Development",
    text: "Classes, workshops and mentorship to help adults and children understand and honor their natural intuition.",
  },
];

const testimonials = [
  {
    quote: "Melissa Cubillas’ mediumship readings are undeniable. Her professional, positive approach invariably results in an uplifting experience that fosters healing and closure. Just amazing!",
    name: "Susan & Dr. Drew Pinsky",
  },
  {
    quote: "I’ve never been more impressed by a psychic medium until meeting Melissa Cubillas. She is simply the best.",
    name: "Jill Zarin",
    role: "The Real Housewives of New York",
  },
  {
    quote: "Melissa is a truly wonderful medium. I’m so grateful for the accurate and healing messages she brought through. Her connection to Spirit is strong. She is a true blessing in this world.",
    name: "Bill Philipps",
    role: "Psychic medium & author",
  },
];

export default function Home() {
  return (
    <main id="home">
      <header className="site-header shell">
        <a className="brand" href="#home" aria-label="Melissa Cubillas home">
          <SunMark />
          <span className="brand-copy">
            <strong>Melissa Cubillas</strong>
            <small>Psychic medium &amp; spiritual teacher</small>
          </span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#story">Story</a>
          <a href="#about">About</a>
          <a href="#offerings">Offerings</a>
          <a href="#testimonials">Testimonials</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="pill-button" href={bookingHref}>Book a reading <span>→</span></a>
      </header>

      <section className="hero">
        <div className="hero-wash" aria-hidden="true" />
        <div className="hero-inner shell">
          <div className="hero-copy">
            <p className="eyebrow">International psychic medium · Spiritual teacher</p>
            <h1>Melissa<br />Cubillas</h1>
            <p className="hero-lines">
              <em>Messages from beyond.</em>
              <em>Clarity for the present.</em>
              <em>Connection to what matters most.</em>
            </p>
            <a className="square-button" href={bookingHref}>Book a reading <span>→</span></a>
          </div>
          <div className="hero-portrait">
            <div className="halo" aria-hidden="true" />
            <Image src={melissaHeadshot} alt="Melissa Cubillas" fill priority placeholder="blur" sizes="(max-width: 760px) 100vw, 53vw" />
          </div>
        </div>
      </section>

      <section className="media-ribbon" aria-label="Selected media appearances">
        <span>As seen &amp; heard on</span>
        <strong>OXYGEN</strong>
        <strong>BRAVO</strong>
        <strong>CTV</strong>
        <strong>THE REAL HOUSEWIVES</strong>
        <strong>THIS LIFE WITH DR. DREW</strong>
      </section>

      <section className="story section" id="story">
        <div className="shell">
          <div className="story-heading">
            <div>
              <p className="eyebrow light">Meet MC</p>
              <h2>Connection you<br />can <em>feel.</em></h2>
            </div>
            <p>Warm, quick-witted and unmistakably direct, Melissa brings heart and humanity to every message. See her gift in action.</p>
          </div>
          <div className="video-frame">
            <video controls playsInline preload="metadata" poster="/video-poster.jpg" aria-label="Melissa Cubillas live mediumship introduction">
              <source src="/melissa-expo-story.mp4" type="video/mp4" />
              Your browser does not support embedded video.
            </video>
            <div className="video-caption"><span>01</span> Melissa live · 2026 Expo</div>
          </div>
        </div>
      </section>

      <section className="about section" id="about">
        <div className="about-inner shell">
          <div className="about-photo">
            <div className="portrait-arch" aria-hidden="true" />
            <Image src={melissaHeadshot} alt="Melissa Cubillas, international psychic medium" fill placeholder="blur" sizes="(max-width: 760px) 100vw, 44vw" />
          </div>
          <div className="about-copy">
            <p className="eyebrow">Her story</p>
            <h2>A calling<br />since age three.</h2>
            <p className="lead">Melissa Cubillas—known simply as MC—is an internationally recognized celebrity psychic medium from New York who has communicated with those in spirit since she was three years old.</p>
            <p>For years, she lived two lives: celebrity makeup artist by day and psychic medium by night. That changed when Oxygen&apos;s groundbreaking docu-series <em>Living Different</em> documented the vulnerable moment she revealed her abilities to her family, friends and the world.</p>
            <p>After seeing the healing her gift could create, Melissa chose to honor her calling full time—helping people reconnect with loved ones in spirit through loving, evidential messages of comfort and closure.</p>
            <a className="text-link" href={bookingHref}>Connect with Melissa <span>→</span></a>
          </div>
        </div>
        <div className="milestones shell" aria-label="Melissa's journey">
          <article><strong>03</strong><span>Communicating with spirit since age three</span></article>
          <article><strong>TV</strong><span>Her story revealed on Oxygen&apos;s <em>Living Different</em></span></article>
          <article><strong>∞</strong><span>Now serving clients and audiences worldwide</span></article>
        </div>
      </section>

      <section className="offerings section shell" id="offerings">
        <div className="section-title">
          <p className="eyebrow">Ways to connect</p>
          <h2>Meet her wherever<br />you are.</h2>
          <p>From one-to-one readings to rooms filled with hundreds, every experience is grounded in love, integrity and authenticity.</p>
        </div>
        <div className="offering-grid">
          {offerings.map((offering, index) => (
            <article key={offering.title}>
              <span className="offering-number">0{index + 1}</span>
              <span className="offering-symbol" aria-hidden="true">{offering.symbol}</span>
              <h3>{offering.title}</h3>
              <p>{offering.text}</p>
              <a href={`mailto:${bookingEmail}?subject=${encodeURIComponent(offering.title)}`} aria-label={`Inquire about ${offering.title}`}>Inquire <span>↗</span></a>
            </article>
          ))}
        </div>
      </section>

      <section className="in-action">
        <div className="action-grid shell">
          <div className="action-copy">
            <p className="eyebrow light">Melissa in action</p>
            <h2>From intimate moments<br />to full rooms.</h2>
            <p>Melissa regularly tours, sharing her gift through galleries, workshops, webinars, large groups and personalized mentorship programs. Her teaching has taken her across the U.S. and internationally, including the Omega Institute and the Fellowship of the Spirit in Lily Dale.</p>
          </div>
          <div className="action-wide">
            <Image src={expoWide} alt="Melissa speaking to a full audience at a live event" fill placeholder="blur" sizes="(max-width: 760px) 100vw, 65vw" />
          </div>
          <div className="action-stage">
            <Image src={expoStage} alt="Melissa delivering messages during a live gallery" fill placeholder="blur" sizes="(max-width: 760px) 100vw, 37vw" />
          </div>
          <p className="action-note">No two rooms are the same. Every gathering begins with the same intention: to create connection, healing and space for what matters most.</p>
        </div>
      </section>

      <section className="mission section shell">
        <div className="mission-copy">
          <p className="eyebrow">Beyond the reading</p>
          <h2>Spirit, service<br />&amp; a whole lot<br />of heart.</h2>
          <p>Melissa is known for being no-nonsense, spunky and deeply compassionate. Her work extends beyond readings—from spiritual interventions and house clearings to assisting with missing-person cases and helping others develop their own intuitive gifts.</p>
          <p>She serves on the Board of Directors for the Centered Heart Foundation, mentoring children as they discover their gifts and develop life skills. She also shares her time with organizations including Helping Parents Heal and Forever Family.</p>
        </div>
        <div className="mission-photo">
          <Image src={paddleMeditation} alt="Melissa meditating on the water" fill placeholder="blur" sizes="(max-width: 760px) 100vw, 38vw" />
          <div className="mission-stamp"><span>Love</span><span>Integrity</span><span>Authenticity</span></div>
        </div>
      </section>

      <section className="testimonials section" id="testimonials">
        <div className="shell">
          <div className="ornament-heading"><span /><h2>Kind words</h2><span /></div>
          <div className="testimonial-grid">
            {testimonials.map((testimonial) => (
              <blockquote key={testimonial.name}>
                <span className="quote-mark">“</span>
                <p>{testimonial.quote}</p>
                <footer>
                  <strong>{testimonial.name}</strong>
                  {testimonial.role && <small>{testimonial.role}</small>}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="media-story section">
        <div className="shell media-story-grid">
          <p className="eyebrow light">Media &amp; teaching</p>
          <h2>A voice for the<br />anything-but-ordinary.</h2>
          <div>
            <p>Melissa&apos;s work has been featured on BRAVO&apos;s <em>The Real Housewives</em>, Oxygen, CTV and top-rated podcasts including <em>This Life with Dr. Drew Pinsky</em> and the award-winning <em>Calling Out</em> with Susan Pinsky.</p>
            <p>Whether she is connecting a legendary celebrity with a loved one in spirit, teaching a child to understand their intuition or helping a family find closure, Melissa meets every person with equal parts truth, humor and compassion.</p>
          </div>
        </div>
      </section>

      <section className="ready" id="contact">
        <div className="ready-sun" aria-hidden="true" />
        <div className="ready-inner shell">
          <p className="eyebrow">Your connection begins here</p>
          <h2>Ready to connect?</h2>
          <p>For readings, events, media and teaching inquiries, reach out to Melissa&apos;s team.</p>
          <a className="square-button" href={bookingHref}>Book a reading <span>→</span></a>
        </div>
      </section>

      <footer className="site-footer shell">
        <div className="brand footer-brand">
          <SunMark />
          <span className="brand-copy"><strong>Melissa Cubillas</strong><small>Psychic medium &amp; spiritual teacher</small></span>
        </div>
        <nav aria-label="Footer navigation"><a href="#story">Story</a><a href="#about">About</a><a href="#offerings">Offerings</a><a href="#testimonials">Testimonials</a></nav>
        <div className="social-links"><a href="https://www.instagram.com/melissamcmedium/" target="_blank" rel="noreferrer" aria-label="Melissa on Instagram">◎</a><a href={`mailto:${bookingEmail}`} aria-label="Email Melissa">✦</a></div>
        <small className="legal">© {new Date().getFullYear()} Melissa Cubillas · For entertainment purposes only.</small>
      </footer>
    </main>
  );
}
