import Image from "next/image";
import melissaHeadshot from "../public/melissa-headshot.jpeg";
import mcMonogram from "../public/mc-monogram.png";
import galleryFullRoom from "../public/gallery-full-room.jpg";
import paddleMeditation from "../public/paddle-meditation.jpg";
import StoryVideo from "./StoryVideo";

const bookingEmail = "ReadingWithMC@gmail.com";
const bookingHref = "#contact";
const kerriPhone = "+17543077772";
const kerriDisplayPhone = "754-307-7772";
const textKerriHref = `sms:${kerriPhone}?&body=${encodeURIComponent("Hi Kerri! My name is ____, and I would like to request a reading with Melissa. My request is: ____")}`;

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
          <Image className="brand-monogram" src={mcMonogram} alt="" aria-hidden="true" priority />
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
          <StoryVideo />
        </div>
      </section>

      <section className="about section" id="about">
        <div className="about-inner shell">
          <div className="about-photo">
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
          <article><strong>MC</strong><span>Evidential mediumship—delivered with honesty, heart and humor</span></article>
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
        <div className="action-heading shell">
          <div className="action-copy">
            <p className="eyebrow light">Melissa in action</p>
            <h2>From intimate moments<br />to full rooms.</h2>
            <p>Melissa regularly tours, sharing her gift through galleries, workshops, webinars, large groups and personalized mentorship programs. Her teaching has taken her across the U.S. and internationally, including the Omega Institute and the Fellowship of the Spirit in Lily Dale.</p>
          </div>
          <p className="action-note">No two rooms are the same. Every gathering begins with the same intention: to create connection, healing and space for what matters most.</p>
        </div>
        <figure className="action-feature shell">
          <Image
            src={galleryFullRoom}
            alt="A full audience gathered for one of Melissa's live gallery events"
            fill
            placeholder="blur"
            sizes="(max-width: 720px) 100vw, 1300px"
          />
        </figure>
      </section>

      <section className="mission section shell">
        <div className="mission-copy">
          <p className="eyebrow">Beyond the reading</p>
          <h2>Spirit, service<br />&amp; a whole lot<br />of heart.</h2>
          <p>Melissa is known for being no-nonsense, spunky and deeply compassionate. Her work extends beyond readings—from spiritual interventions and house clearings to assisting with missing-person cases and helping others develop their own intuitive gifts.</p>
          <p>She serves on the Board of Directors for the Centered Heart Foundation, mentoring children as they discover their gifts and develop life skills. She also shares her time with organizations including Helping Parents Heal and Forever Family.</p>
          <p>Melissa is also a certified Spiritualist minister for The Journey Within, Spiritual Church and Center for Spiritual Evolvement.</p>
        </div>
        <div className="mission-photo">
          <Image src={paddleMeditation} alt="Melissa practicing yoga on a paddleboard" fill placeholder="blur" sizes="(max-width: 760px) 100vw, 38vw" />
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
          <p className="eyebrow">Private reading requests</p>
          <h2>Ready to connect?</h2>
          <p>Melissa&apos;s assistant, Kerri, personally coordinates all private reading requests.</p>
          <div className="booking-card">
            <div className="booking-detail">
              <span>Your booking contact</span>
              <strong>Kerri</strong>
              <a href={`sms:${kerriPhone}`}>{kerriDisplayPhone}</a>
            </div>
            <div className="booking-detail booking-request">
              <span>What to include</span>
              <p>Text your <strong>name</strong> and a brief description of your <strong>request</strong>.</p>
            </div>
            <a className="square-button booking-text-button" href={textKerriHref}>Text Kerri <span>→</span></a>
          </div>
          <small className="booking-note">Text message is the preferred way to reach Kerri.</small>
        </div>
      </section>

      <footer className="site-footer shell">
        <div className="brand footer-brand">
          <Image className="brand-monogram" src={mcMonogram} alt="" aria-hidden="true" />
          <span className="brand-copy"><strong>Melissa Cubillas</strong><small>Psychic medium &amp; spiritual teacher</small></span>
        </div>
        <nav aria-label="Footer navigation"><a href="#story">Story</a><a href="#about">About</a><a href="#offerings">Offerings</a><a href="#testimonials">Testimonials</a></nav>
        <div className="social-links"><a href="https://www.instagram.com/melissamcmedium/" target="_blank" rel="noreferrer" aria-label="Melissa on Instagram">◎</a><a href={`mailto:${bookingEmail}`} aria-label="Email Melissa">✦</a></div>
        <small className="legal">© {new Date().getFullYear()} Melissa Cubillas · For entertainment purposes only.</small>
      </footer>
    </main>
  );
}
