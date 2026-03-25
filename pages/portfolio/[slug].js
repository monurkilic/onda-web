import { useState } from 'react';
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import Head from 'next/head';

const client = createClient({ projectId: 'k8cd67dp', dataset: "production", apiVersion: "2023-01-01", useCdn: false });
const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

export default function PropertyDetail({ property }) {
  const [photoIndex, setPhotoIndex] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!property) return null;
  const allPhotos = [property.mainImage, ...(property.gallery || [])];
  const waLink = `https://wa.me/905326466909?text=${encodeURIComponent(`Merhaba, "${property.title}" ilanı hakkında bilgi alabilir miyim?`)}`;

  const next = (e) => { e.stopPropagation(); setPhotoIndex((prev) => (prev + 1) % allPhotos.length); };
  const prev = (e) => { e.stopPropagation(); setPhotoIndex((prev) => (prev - 1 + allPhotos.length) % allPhotos.length); };

  return (
    <div style={{backgroundColor: '#0a192f', color: '#fff', minHeight: '100vh', fontFamily: 'serif', overflowX: 'hidden'}}>
      <Head>
        <title>{property.title} | Onda Yatırım</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      <style dangerouslySetInnerHTML={{ __html: `
        .container { max-width: 1100px; margin: 0 auto; padding: 40px 20px; }
        .gal-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 10px; margin-top: 20px; }
        .mobile-menu { display: none; position: fixed; top: 0; right: 0; width: 100%; height: 100%; background: #0a192f; z-index: 1000; flex-direction: column; align-items: center; justify-content: center; gap: 30px; }
        .hamburger { display: none; cursor: pointer; flex-direction: column; gap: 5px; z-index: 1100; }
        .hamburger div { width: 25px; height: 3px; background: #d4af37; transition: 0.3s; }
        @media (max-width: 768px) { 
          .hero-t { font-size: 1.8rem !important; } 
          .container { padding: 20px 15px; } 
          .gal-grid { grid-template-columns: repeat(2, 1fr); }
          .hamburger { display: flex !important; }
        }
      `}} />

      {/* HEADER */}
      <nav style={{padding: '15px 30px', borderBottom: '1px solid rgba(212,175,55,0.1)', background: '#0a192f', position: 'sticky', top: 0, zIndex: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <a href="/" style={{display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none'}}>
          <img src="/logo.png" style={{height: '30px'}} alt="Logo" />
          <span style={{color: '#d4af37', fontSize: '1rem', fontWeight: 'bold'}}>ONDA</span>
        </a>
        <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div style={{transform: isMenuOpen ? 'rotate(45deg) translate(5px, 6px)' : 'none'}}></div>
          <div style={{opacity: isMenuOpen ? 0 : 1}}></div>
          <div style={{transform: isMenuOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'none'}}></div>
        </div>
      </nav>

      <div className="mobile-menu" style={{display: isMenuOpen ? 'flex' : 'none'}}>
        <a href="/" style={{color: '#fff', fontSize: '1.5rem', textDecoration: 'none'}}>GİRİŞ</a>
        <a href="/portfolio" style={{color: '#d4af37', fontSize: '1.5rem', textDecoration: 'none'}}>PORTFÖY</a>
        <a href="/about" style={{color: '#fff', fontSize: '1.5rem', textDecoration: 'none'}}>HAKKIMIZDA</a>
        <a href="/contact" style={{color: '#fff', fontSize: '1.5rem', textDecoration: 'none'}}>İLETİŞİM</a>
      </div>

      <main className="container">
        <h1 className="hero-t" style={{fontSize: '2.5rem', color: '#d4af37', textAlign: 'center', marginBottom: '10px'}}>{property.title}</h1>
        <p style={{textAlign: 'center', color: '#8e8e8e', marginBottom: '40px'}}>{property.location}</p>
        
        <div onClick={() => setPhotoIndex(0)} style={{width: '100%', borderRadius: '4px', overflow: 'hidden', cursor: 'zoom-in', border: '1px solid rgba(212,175,55,0.2)'}}>
          <img src={urlFor(property.mainImage).width(1200).url()} style={{width: '100%', display: 'block'}} alt="M" />
        </div>

        <div className="gal-grid">
          {property.gallery && property.gallery.map((img, i) => (
            <div key={i} onClick={() => setPhotoIndex(i + 1)} style={{cursor: 'zoom-in', borderRadius: '2px', overflow: 'hidden', height: '140px', border: '1px solid rgba(212,175,55,0.1)'}}>
              <img src={urlFor(img).width(600).url()} style={{width: '100%', height: '100%', objectFit: 'cover'}} alt="G" />
            </div>
          ))}
        </div>

        <div style={{margin: '50px 0', textAlign: 'center'}}>
          <div style={{fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '40px'}}>{property.price} {property.currency}</div>
          <div style={{padding: '40px', background: 'rgba(212, 175, 55, 0.03)', borderLeft: '4px solid #d4af37', textAlign: 'left'}}>
            <h4 style={{color: '#d4af37', marginTop: 0, letterSpacing: '3px', fontSize: '0.8rem'}}>ONDA ANALİZİ</h4>
            <p style={{lineHeight: '2', color: '#ccc', fontStyle: 'italic', fontSize: '1.1rem'}}>"{property.analysis}"</p>
          </div>
        </div>

        <div style={{display: 'flex', justifyContent: 'center', marginBottom: '60px'}}>
          <a href={waLink} target="_blank" rel="noreferrer" style={{padding: '20px 50px', background: '#25D366', color: '#fff', textDecoration: 'none', fontWeight: 'bold', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '10px'}}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" style={{height: '24px'}} alt="WA" /> WHATSAPP İLE SOR
          </a>
        </div>
      </main>

      <footer style={{padding: '60px 20px', borderTop: '1px solid rgba(212,175,55,0.1)', textAlign: 'center', opacity: 0.4}}>© 2026 ONDA YATIRIM</footer>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = await client.fetch(`*[_type == "property" && defined(slug.current)][].slug.current`);
  return { paths: paths.map((slug) => ({ params: { slug } })), fallback: 'blocking' };
}
export async function getStaticProps({ params }) {
  const property = await client.fetch(`*[_type == "property" && slug.current == $slug][0]`, { slug: params.slug });
  return { props: { property }, revalidate: 10 };
}
