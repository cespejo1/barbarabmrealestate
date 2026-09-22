import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ContactForm from '../components/ContactForm';
import { site } from '../site-data';

export const metadata: Metadata = {
  title: 'Bienes Raíces en el Sur de Florida',
  description: 'Asesoría personalizada para comprar o vender propiedades en Wellington, West Palm Beach, Fort Lauderdale, Miami y todo el sur de Florida.',
  keywords: ['bienes raíces sur de Florida', 'casas en Wellington Florida', 'propiedades West Palm Beach', 'bienes raíces Fort Lauderdale', 'casas en Miami'],
  alternates: { canonical: '/es', languages: { 'en-US': '/', 'es-US': '/es' } },
  openGraph: {
    title: 'Bienes Raíces en el Sur de Florida | Barbara B.M.',
    description: 'Asesoría personal para compradores y vendedores en Wellington, West Palm Beach, Fort Lauderdale y Miami.',
    type: 'website', locale: 'es_US', alternateLocale: ['en_US'], url: '/es',
    images: [{ url: '/hero-home.png', width: 1920, height: 1024 }],
  },
};

const listings = [
  { status: 'Residencia destacada', location: 'Residencia Frente al Agua', area: 'Sur de Florida', price: 'Precio a solicitud', details: '4 habitaciones  ·  5 baños  ·  Frente al agua', image: '/listing-waterfront.png' },
  { status: 'Vida junto al mar', location: 'Residencia con Vista al Mar', area: 'Sur de Florida', price: 'Oferta privada', details: '3 habitaciones  ·  3.5 baños  ·  Vista al mar', image: '/listing-condo.png' },
  { status: 'Favorita del vecindario', location: 'Casa Renovada', area: 'Sur de Florida', price: 'Próximamente', details: '3 habitaciones  ·  2 baños  ·  Jardín', image: '/listing-bungalow.png' },
];

const Arrow = () => <span aria-hidden="true">↗</span>;

export default function SpanishHome() {
  return (
    <main id="top" lang="es">
      <header className="nav shell">
        <a className="brand" href="#top" aria-label={`Inicio de ${site.name}`}><span className="brand-mark">{site.shortName}</span><span>{site.name}<small>Sur de Florida</small></span></a>
        <nav className="nav-links" aria-label="Navegación principal"><a href="#properties">Propiedades</a><a href="#services">Servicios</a><a href="#about">Acerca de mí</a><Link className="language-link" href="/" hrefLang="en">EN</Link></nav>
        <a className="nav-cta" href="#contact">Hablemos <Arrow /></a>
      </header>

      <section className="hero">
        <Image className="hero-image" src="/hero-home.png" alt="Casa contemporánea frente al agua rodeada de palmeras al atardecer" fill priority sizes="100vw" />
        <div className="hero-shade" />
        <div className="hero-content shell"><p className="eyebrow light">Bienes raíces en el sur de Florida</p><h1>Encuentra tu lugar<br />bajo el <em>sol.</em></h1><p>Atención personalizada y conocimiento local en Wellington, West Palm Beach, Fort Lauderdale y Miami.</p><div className="hero-actions"><a className="button cream" href="#properties">Ver propiedades <Arrow /></a><a className="text-link" href="#contact">Comienza tu búsqueda</a></div></div>
        <div className="hero-note">Vive plenamente <span>01 / 03</span></div>
      </section>

      <section className="intro shell" id="about"><p className="eyebrow">Un enfoque personal</p><div><h2>Tu experiencia inmobiliaria debe ser<br /><em>clara, cuidadosa</em> y personal.</h2><p>Ya sea que busques tu próximo hogar o estés listo para vender en Wellington, West Palm Beach, Fort Lauderdale, Miami o cualquier parte del sur de Florida, Barbara ofrece orientación serena y atención cuidadosa en cada paso.</p><a className="under-link" href="#contact">Conoce a Barbara <Arrow /></a></div></section>

      <section className="properties" id="properties">
        <div className="shell section-head"><div><p className="eyebrow">Propiedades seleccionadas</p><h2>Lugares a los que<br /><em>querrás volver.</em></h2></div><p>Explora hogares y oportunidades privadas en Wellington, West Palm Beach, Fort Lauderdale, Miami y todo el sur de Florida.</p></div>
        <div className="listing-grid shell">{listings.map((listing, index) => <article className="listing" key={listing.location}><div className="listing-image"><Image src={listing.image} alt={listing.location} fill sizes="(max-width: 800px) 100vw, 33vw" /><span>{String(index + 1).padStart(2, '0')}</span></div><div className="listing-top"><p>{listing.status}</p><span>{listing.price}</span></div><h3>{listing.location}</h3><p className="listing-area">{listing.area}</p><p className="listing-details">{listing.details}</p></article>)}</div>
        <div className="shell property-foot"><p>¿Buscas algo específico?</p><a className="button dark" href="#contact">Ver oportunidades <Arrow /></a></div>
      </section>

      <section className="services shell" id="services"><div className="services-heading"><p className="eyebrow">Cómo puedo ayudarte</p><h2>Servicio atento,<br /><em>desde el primer paso hasta las llaves.</em></h2></div><div className="service-list"><article><span>01</span><h3>Comprar</h3><p>Una búsqueda enfocada en tu estilo de vida, tus prioridades y tus metas a largo plazo.</p><a href="#contact" aria-label="Consulta sobre comprar">↗</a></article><article><span>02</span><h3>Vender</h3><p>Posicionamiento estratégico, presentación impecable y orientación constante en cada detalle.</p><a href="#contact" aria-label="Consulta sobre vender">↗</a></article><article><span>03</span><h3>Reubicarte</h3><p>Conocimiento local para comprender los vecindarios, la vida diaria y dónde te sentirás en casa.</p><a href="#contact" aria-label="Consulta sobre reubicación">↗</a></article></div></section>

      <section className="quote"><div className="shell"><p className="eyebrow light">La diferencia de Barbara</p><blockquote>“Un hogar es mucho más que una transacción. Es donde comienza el próximo capítulo de tu historia.”</blockquote><p className="signature">Barbara <span>Asesora de bienes raíces</span></p></div></section>

      <section className="contact" id="contact"><div className="shell contact-grid"><div><p className="eyebrow">Conversemos</p><h2>Tu próximo paso<br /><em>comienza aquí.</em></h2></div><div className="contact-copy"><p>Cuéntame qué estás buscando o qué estás listo para dejar atrás. Me encantará conocer tu historia.</p><ContactForm language="es" /></div></div></section>

      <footer className="footer shell"><a className="brand" href="#top"><span className="brand-mark">{site.shortName}</span><span>{site.name}<small>Sur de Florida</small></span></a><p>Orientación personal para tu próximo paso.</p><div><Link href="/" hrefLang="en">English</Link><a href="#contact">Contacto</a><a href="#top">Volver arriba ↑</a><span>© {new Date().getFullYear()}</span></div></footer>
    </main>
  );
}
