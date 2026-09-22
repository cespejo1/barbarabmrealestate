import Image from 'next/image';
import Link from 'next/link';
import { listings, site } from './site-data';

const Arrow = () => <span aria-hidden="true">↗</span>;

export default function Home() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: site.name,
    url: site.url,
    email: site.email,
    image: `${site.url}/hero-home.png`,
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'South Florida' },
      ...site.serviceAreas.map((name) => ({ '@type': 'City', name })),
    ],
    availableLanguage: ['English', 'Spanish'],
  };

  return (
    <main id="top">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <header className="nav shell">
        <a className="brand" href="#top" aria-label={`${site.name} home`}>
          <span className="brand-mark">{site.shortName}</span>
          <span>{site.name}<small>{site.market}</small></span>
        </a>
        <nav className="nav-links" aria-label="Main navigation">
          <a href="#properties">Properties</a><a href="#services">Services</a><a href="#about">About</a><Link className="language-link" href="/es" hrefLang="es">ES</Link>
        </nav>
        <a className="nav-cta" href="#contact">Let&apos;s talk <Arrow /></a>
      </header>

      <section className="hero">
        <Image className="hero-image" src="/hero-home.png" alt="Contemporary waterfront home surrounded by palms at sunset" fill priority sizes="100vw" />
        <div className="hero-shade" />
        <div className="hero-content shell">
          <p className="eyebrow light">South Florida real estate</p>
          <h1>Find your place<br />in the <em>sun.</em></h1>
          <p>Personal guidance, local perspective, and an elevated experience across Wellington, West Palm Beach, Fort Lauderdale, and Miami.</p>
          <div className="hero-actions"><a className="button cream" href="#properties">Explore properties <Arrow /></a><a className="text-link" href="#contact">Begin your search</a></div>
        </div>
        <div className="hero-note">Live beautifully <span>01 / 03</span></div>
      </section>

      <section className="intro shell" id="about">
        <p className="eyebrow">A personal approach</p>
        <div>
          <h2>Real estate should feel<br /><em>clear, considered,</em> and personal.</h2>
          <p>Whether you&apos;re looking for your next home or preparing to sell in Wellington, West Palm Beach, Fort Lauderdale, Miami, or elsewhere in South Florida, Barbara brings calm direction and careful attention to every move.</p>
          <a className="under-link" href="#contact">Meet Barbara <Arrow /></a>
        </div>
      </section>

      <section className="properties" id="properties">
        <div className="shell section-head"><div><p className="eyebrow">Curated properties</p><h2>Places worth<br /><em>coming home to.</em></h2></div><p>Explore homes and private opportunities across Wellington, West Palm Beach, Fort Lauderdale, Miami, and South Florida.</p></div>
        <div className="listing-grid shell">
          {listings.map((listing, index) => (
            <article className="listing" key={listing.location}>
              <div className="listing-image"><Image src={listing.image} alt={listing.location} fill sizes="(max-width: 800px) 100vw, 33vw" /><span>{String(index + 1).padStart(2, '0')}</span></div>
              <div className="listing-top"><p>{listing.status}</p><span>{listing.price}</span></div>
              <h3>{listing.location}</h3><p className="listing-area">{listing.area}</p><p className="listing-details">{listing.details}</p>
            </article>
          ))}
        </div>
        <div className="shell property-foot"><p>Looking for something specific?</p><a className="button dark" href="#contact">View all opportunities <Arrow /></a></div>
      </section>

      <section className="services shell" id="services">
        <div className="services-heading"><p className="eyebrow">How I can help</p><h2>Thoughtful service,<br /><em>from first step to keys.</em></h2></div>
        <div className="service-list">
          <article><span>01</span><h3>Buying</h3><p>A focused search shaped around your lifestyle, priorities, and long-term goals.</p><a href="#contact" aria-label="Ask about buying">↗</a></article>
          <article><span>02</span><h3>Selling</h3><p>Strategic positioning, polished presentation, and steady guidance through every detail.</p><a href="#contact" aria-label="Ask about selling">↗</a></article>
          <article><span>03</span><h3>Relocating</h3><p>Local insight that helps you understand neighborhoods, daily life, and where you&apos;ll feel at home.</p><a href="#contact" aria-label="Ask about relocating">↗</a></article>
        </div>
      </section>

      <section className="quote"><div className="shell"><p className="eyebrow light">The Barbara difference</p><blockquote>“A home is more than a transaction. It&apos;s where the next part of your story begins.”</blockquote><p className="signature">Barbara <span>Real estate advisor</span></p></div></section>

      <section className="contact" id="contact"><div className="shell contact-grid">
        <div><p className="eyebrow">Let&apos;s connect</p><h2>Your next move<br /><em>starts here.</em></h2></div>
        <div className="contact-copy"><p>Tell me a little about what you&apos;re looking for—or what you&apos;re ready to leave behind. I&apos;d love to hear your story.</p><a className="email" href={`mailto:${site.email}`}>{site.email} <Arrow /></a><div className="contact-options"><span><b>Buying</b>Find a home that fits</span><span><b>Selling</b>Plan your strongest launch</span><span><b>Relocating</b>Get to know the area</span></div></div>
      </div></section>

      <footer className="footer shell"><a className="brand" href="#top"><span className="brand-mark">{site.shortName}</span><span>{site.name}<small>{site.market}</small></span></a><p>Personal guidance for your next move.</p><div><Link href="/es" hrefLang="es">Español</Link><a href={`mailto:${site.email}`}>Email</a><a href="#top">Back to top ↑</a><span>© {new Date().getFullYear()}</span></div></footer>
    </main>
  );
}
