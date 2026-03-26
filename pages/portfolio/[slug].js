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
  const waLink = `https://wa.me/905326466909?text=${encodeURIComponent(`Merhaba, "${property.title}" hakkında bilgi alabilir miyim?`)}`;

  const next = (e) => { e.stopPropagation(); setPhotoIndex((prev) => (prev + 1) % allPhotos.length); };
  const prev = (e) => { e.stopPropagation(); setPhotoIndex((prev) => (prev - 1 + allPhotos.length) % allPhotos.length); };

  return (
    <div style={{backgroundColor: '#0a192f', color: '#fff', minHeight: '100vh', fontFamily: 'serif', overflowX: 'hidden'}}>
      <Head><title>{property.title} | Onda Yatırım</title></Head>
      <style dangerouslySetInnerHTML={{ __html: `
        .container { max-width: 1100px; margin: 0 auto; padding: 40px 20px; }
        .gal-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 10px; margin-top: 20px; }
        .hamburger { display: none; cursor: pointer; flex-direction: column; gap: 5px; z-index: 2100; padding: 10px; }
        .hamburger div { width: 25px; height: 3px; background: #d4af37; transition: 0.3s; }
        .mobile-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #0a192f; z-index: 2000; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 30px; transform: translateX(100%); transition: 0.4s; }
        .mobile-overlay.active { transform: translateX(0); }
        @media (max-width: 768px) { 
          .hero-t { font-size: 1.8rem !important; } 
          .container { padding: 20px 15px; } 
          .gal-grid { grid-template-columns: repeat(2, 1fr); } 
          .hamburger { display: flex !important; }
          .desktop-links { display: none !important; }
        }
      `}} />

      {/* LIGHTBOX */}
      {photoIndex !== null && (
        <div onClick={() => setPhotoIndex(null)} style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.95)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <button onClick={prev} style={{position: 'absolute', left: '15px', background: 'none', color: '#d4af37', fontSize: '40px', border: 'none', cursor: 'pointer'}}>‹</button>
          <img src={urlFor(allPhotos[photoIndex]).width(1200).url()} style={{maxWidth: '90%', maxHeight: '80%', border: '1px solid #d4af37'}} alt="P" />
          <button onClick={next} style={{position: 'absolute', right: '15px', background: 'none', color: '#d4af37', fontSize: '40px', border: 'none', cursor: 'pointer'}}>›</button>
        </div>
      )}

      {/* HEADER */}
      <nav style={{padding: '15px 30px', borderBottom: '1px solid rgba(212,175,55,0.1)', background: '#0a192f', position: 'sticky', top: 0, zIndex: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <a href="/" style={{display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none'}}>
          <img src="/logo.png" style={{height: '30px'}} alt="L" />
          <span style={{color: '#d4af37', fontWeight: 'bold', letterSpacing: '2px'}}>ONDA</span>
        </a>
        <div className="desktop-links" style={{display: 'flex', gap: '20px', fontSize: '0.8rem'}}>
          <a href="/portfolio" style={{color: '#fff', textDecoration: 'none'}}>PORTFÖY</a>
          <a href="/about" style={{color: '#fff', textDecoration: 'none'}}>HAKKIMIZDA</a>
          <a href="/contact" style={{color: '#fff', textDecoration: 'none'}}>İLETİŞİM</a>
        </div>
        <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div style={{transform: isMenuOpen ? 'rotate(45deg) translate(5px, 6px)' : 'none'}}></div>
          <div style={{opacity: isMenuOpen ? 0 : 1}}></div>
          <div style={{transform: isMenuOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'none'}}></div>
        </div>
      </nav>

      <div className={`mobile-overlay ${isMenuOpen ? 'active' : ''}`}>
        <a href="/" style={{color: '#fff', fontSize: '1.5rem', textDecoration: 'none'}} onClick={() => setIsMenuOpen(false)}>GİRİŞ</a>
        <a href="/portfolio" style={{color: '#d4af37', fontSize: '1.5rem', textDecoration: 'none'}} onClick={() => setIsMenuOpen(false)}>PORTFÖY</a>
        <a href="/about" style={{color: '#fff', fontSize: '1.5rem', textDecoration: 'none'}} onClick={() => setIsMenuOpen(false)}>HAKKIMIZDA</a>
        <a href="/contact" style={{color: '#fff', fontSize: '1.5rem', textDecoration: 'none'}} onClick={() => setIsMenuOpen(false)}>İLETİŞİM</a>
      </div>

      <main className="container">
        <h1 className="hero-t" style={{fontSize: '2.5rem', color: '#d4af37', textAlign: 'center', marginBottom: '10px'}}>{property.title}</h1>
        <p style={{textAlign: 'center', color: '#8e8e8e', marginBottom: '30px', letterSpacing: '2px'}}>{property.location}</p>
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
          <div style={{padding: '30px', background: 'rgba(212, 175, 55, 0.03)', borderLeft: '4px solid #d4af37', textAlign: 'left'}}>
            <h4 style={{color: '#d4af37', marginTop: 0, letterSpacing: '3px'}}>ONDA ANALİZİ</h4>
            <p style={{lineHeight: '1.8', color: '#ccc', fontStyle: 'italic'}}>"{property.analysis}"</p>
          </div>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', marginBottom: '60px'}}>
          <a href={waLink} target="_blank" rel="noreferrer" style={{padding: '20px 50px', background: '#25D366', color: '#fff', textDecoration: 'none', fontWeight: 'bold', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '10px'}}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" style={{height: '24px'}} alt="W" /> WHATSAPP İLE SOR
          </a>
        </div>
        <section style={{marginBottom: '60px'}}>
          <h3 style={{color: '#d4af37', marginBottom: '25px'}}>KONUM</h3>
          <div style={{height: '400px', background: '#0d223f', borderRadius: '4px', overflow: 'hidden'}}>
            {property.googleMapsUrl && <iframe src={property.googleMapsUrl} width="100%" height="100%" style={{border:0}} allowFullScreen="" loading="lazy"></iframe>}
          </div>
        </section>
      </main>

   <footer style={{padding: '60px 20px', borderTop: '1px solid rgba(212,175,55,0.1)', textAlign: 'center', background: '#0a192f', marginTop: '40px'}}>
        <div style={{marginBottom: '30px'}}>
          <SocialIcons size={24} />
        </div>
        
        <div style={{display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '0.8rem', flexWrap: 'wrap', marginBottom: '20px'}}>
          <a href="/" style={{color: '#fff', textDecoration: 'none', letterSpacing: '1px'}}>GİRİŞ</a>
          <a href="/portfolio" style={{color: '#8e8e8e', textDecoration: 'none', letterSpacing: '1px'}}>PORTFÖY</a>
          <a href="/valuation" style={{color: '#8e8e8e', textDecoration: 'none', letterSpacing: '1px'}}>MÜLK DEĞERLEME</a>
          <a href="/about" style={{color: '#8e8e8e', textDecoration: 'none', letterSpacing: '1px'}}>HAKKIMIZDA</a>
          <a href="/contact" style={{color: '#8e8e8e', textDecoration: 'none', letterSpacing: '1px'}}>İLETİŞİM</a>
        </div>
        
        <p style={{fontSize: '0.7rem', opacity: 0.4, letterSpacing: '2px'}}>© 2026 ONDA YATIRIM | Aradığınız her şey ONDA</p>
      </footer>
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
