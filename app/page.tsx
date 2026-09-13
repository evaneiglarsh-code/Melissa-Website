const bookingEmail = "ReadingWithMC@gmail.com";

const services = [
  {
    number: "01",
    title: "Private Readings",
    text: "A personal, evidential session created to bring clarity, comfort, and connection.",
  },
  {
    number: "02",
    title: "Messages from Heaven",
    text: "Intimate and large-group galleries where spirit, story, and healing meet.",
  },
  {
    number: "03",
    title: "Spiritual Development",
    text: "Classes and mentorship for learning to trust, understand, and honor your own intuition.",
  },
];

export default function Home() {
  return (
    <main>
      <nav className="nav shell" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Melissa Cubillas home">
          <span>MC</span>
          <small>Melissa Cubillas</small>
        </a>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#offerings">Offerings</a>
          <a href="#events">Events</a>
          <a href="#contact">Contact</a>
        </div>
        <a className="nav-cta" href={`mailto:${bookingEmail}?subject=Reading inquiry`}>
          Book a reading
        </a>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow">International psychic medium · Spiritual teacher</p>
          <h1>Love never<br />truly leaves us.</h1>
          <p className="hero-intro">
            Melissa Cubillas creates honest, healing connections between this world and the next—always with compassion, clarity, and a little Brooklyn soul.
          </p>
          <div className="hero-actions">
            <a className="button button-dark" href={`mailto:${bookingEmail}?subject=Reading inquiry`}>
              Book a reading <span aria-hidden="true">↗</span>
            </a>
            <a className="text-link" href="#about">Discover Melissa <span aria-hidden="true">↓</span></a>
          </div>
        </div>

        <div className="hero-art" aria-label="Melissa Cubillas monogram artwork">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="star star-one">✦</div>
          <div className="star star-two">✧</div>
          <div className="portrait-placeholder">
            <span className="portrait-kicker">Psychic medium</span>
            <strong>MC</strong>
            <span className="portrait-caption">New York · Worldwide</span>
          </div>
          <p className="handwritten">The soul always<br />finds a way.</p>
        </div>
      </section>

      <section className="press-strip" aria-label="Selected media">
        <span>As seen on</span>
        <strong>BRAVO</strong>
        <strong>OXYGEN</strong>
        <strong>CTV</strong>
        <strong>THE REAL HOUSEWIVES</strong>
      </section>

      <section className="about shell section" id="about">
        <div className="section-label"><span>01</span> Meet Melissa</div>
        <div className="about-grid">
          <h2>Equal parts<br /><em>gifted</em> and grounded.</h2>
          <div className="about-copy">
            <p className="lead">
              Melissa has communicated with spirit since she was three years old. Today, she is known around the world for readings that are compassionate, unmistakably honest, and deeply human.
            </p>
            <p>
              Before embracing mediumship full time, Melissa worked as a celebrity makeup artist by day and a psychic medium by night. Sharing her story on television changed everything. Now she helps people reconnect with loved ones, find closure, and recognize their own intuitive abilities.
            </p>
            <a className="text-link dark" href={`mailto:${bookingEmail}?subject=Learn more about Melissa`}>More about Melissa <span>→</span></a>
          </div>
        </div>
      </section>

      <section className="offerings section" id="offerings">
        <div className="shell">
          <div className="section-label light"><span>02</span> Work with Melissa</div>
          <div className="offerings-heading">
            <h2>Connection takes<br />many forms.</h2>
            <p>Begin wherever you are. Every experience is rooted in integrity, love, and the understanding that no two journeys look the same.</p>
          </div>
          <div className="service-list">
            {services.map((service) => (
              <article className="service" key={service.number}>
                <span>{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <a href={`mailto:${bookingEmail}?subject=${encodeURIComponent(service.title)}`} aria-label={`Inquire about ${service.title}`}>↗</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="quote-section shell section">
        <div className="quote-mark">“</div>
        <blockquote>
          Melissa gave me more than a message. She gave me the unmistakable feeling that love continues—and the peace to move forward.
        </blockquote>
        <p>Client testimonial</p>
      </section>

      <section className="events section" id="events">
        <div className="shell events-grid">
          <div>
            <div className="section-label"><span>03</span> Gather together</div>
            <h2>Upcoming<br />events</h2>
          </div>
          <article className="event-card">
            <div className="date"><strong>10</strong><span>OCT<br />2026</span></div>
            <div>
              <p className="eyebrow">Staten Island, New York</p>
              <h3>An Intimate Evening with Spirit</h3>
              <p>Messages, connection, and a live Q&amp;A at the historic Jacques Marchais Museum of Tibetan Art.</p>
            </div>
            <a className="button button-outline" href="https://www.tibetanmuseum.org/event-details/an-intimate-evening-with-spirit-psychic-medium-melissa-cubillas" target="_blank" rel="noreferrer">Event details ↗</a>
          </article>
        </div>
      </section>

      <section className="contact section" id="contact">
        <div className="moon" aria-hidden="true" />
        <div className="shell contact-inner">
          <p className="eyebrow">Your connection begins here</p>
          <h2>There is more<br />waiting for you.</h2>
          <p>For readings, events, media, and teaching inquiries, reach out to Melissa’s team.</p>
          <a className="button button-light" href={`mailto:${bookingEmail}?subject=Website inquiry`}>Begin your inquiry <span>↗</span></a>
        </div>
      </section>

      <footer className="footer shell">
        <div className="brand footer-brand"><span>MC</span><small>Melissa Cubillas</small></div>
        <p>Psychic medium · Spiritual teacher · Media personality</p>
        <div className="footer-links">
          <a href="https://www.instagram.com/melissamcmedium/" target="_blank" rel="noreferrer">Instagram</a>
          <a href={`mailto:${bookingEmail}`}>Email</a>
        </div>
        <small>© {new Date().getFullYear()} Melissa Cubillas. For entertainment purposes only.</small>
      </footer>
    </main>
  );
}
