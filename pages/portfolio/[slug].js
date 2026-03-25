import { useState } from 'react';
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import Head from 'next/head';

const client = createClient({ projectId: 'k8cd67dp', dataset: "production", apiVersion: "2023-01-01", useCdn: false });
const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

export default function PropertyDetail({ property }) {
  const [photoIndex, setPhotoIndex] = useState(null);
  if (!property) return null;
  const allPhotos = [property.mainImage, ...(property.gallery || [])];
  const waLink = `https://wa.me/905326466909?text=${encodeURIComponent(`Merhaba Onur Bey, "${property.title}" ilanı hakkında bilgi alabilir miyim?`)}`;

  const next = (e) => { e.stopPropagation(); setPhotoIndex((prev) => (prev + 1) % allPhotos.length); };
  const prev = (e) => { e.stopPropagation(); setPhotoIndex((prev) => (prev - 1 + allPhotos.length) % allPhotos.length); };

  return (
    <div style={{backgroundColor: '#0a192f', color: '#fff', minHeight: '100vh', fontFamily: 'serif', overflowX: 'hidden'}}>
      <Head><title>{property.title} | Onda Yatırım</title></Head>
      <style dangerouslySetInnerHTML={{ __html: `
        .container { max-width: 1100px; margin: 0 auto; padding: 40px 20px; }
        .gal-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 10px; margin-top: 20px; }
        @media (max-width: 768px) { .hero-t { font-size: 1.8rem !important; } .container { padding: 20px 15px; } }
      `}} />
      {photoIndex !== null && (
        <div onClick={() => setPhotoIndex(null)} style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.95)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <button onClick={prev} style={{position: 'absolute', left: '20px', background: 'none', border: 'none', color: '#d4af37', fontSize: '40px', cursor: 'pointer'}}>‹</button>
          <img src={urlFor(allPhotos[photoIndex]).width(1500).url()} style={{maxWidth: '90%', maxHeight: '80%', border: '1px solid #d4af37'}} alt="Foto" />
          <button onClick={next} style={{position: 'absolute', right: '20px', background: 'none', border: 'none', color: '#d4af37', fontSize: '40px', cursor: 'pointer'}}>›</button>
        </div>
      )}
      <nav style={{padding: '15px', borderBottom: '1px solid rgba(212,175,55,0.1)', textAlign: 'center', background: '#0a192f'}}>
        <a href="/portfolio" style={{color: '#d4af37', textDecoration: 'none', fontSize: '0.8rem'}}>← PORTFÖYE DÖN</a>
      </nav>
      <main className="container">
        <h1 className="hero-t" style={{fontSize: '2.8rem', color: '#d4af37', textAlign: 'center', marginBottom: '10px'}}>{property.title}</h1>
        <p style={{textAlign: 'center', color: '#8e8e8e', marginBottom: '30px'}}>{property.location}</p>
        <div onClick={() => setPhotoIndex(0)} style={{width: '100%', borderRadius: '4px', overflow: 'hidden', cursor: 'zoom-in'}}>
          <img src={urlFor(property.mainImage).width(1200).url()} style={{width: '100%', display: 'block'}} alt="Ana Resim" />
        </div>
        <div className="gal-grid">
          {property.gallery && property.gallery.map((img, i) => (
            <div key={i} onClick={() => setPhotoIndex(i + 1)} style={{cursor: 'zoom-in', borderRadius: '2px', overflow: 'hidden', height: '140px'}}>
              <img src={urlFor(img).width(600).url()} style={{width: '100%', height: '100%', objectFit: 'cover'}} alt="Galeri" />
            </div>
          ))}
        </div>
        <div style={{margin: '40px 0', textAlign: 'center'}}>
          <div style={{fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '30px'}}>{property.price} {property.currency}</div>
          <div style={{padding: '30px', background: 'rgba(212, 175, 55, 0.03)', borderLeft: '4px solid #d4af37', textAlign: 'left'}}>
            <h4 style={{color: '#d4af37', marginTop: 0, letterSpacing: '2px'}}>ONDA ANALİZİ</h4>
            <p style={{fontStyle: 'italic', lineHeight: '1.8', color: '#ccc'}}>"{property.analysis}"</p>
          </div>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', marginBottom: '60px'}}>
          <a href={waLink} target="_blank" rel="noreferrer" style={{padding: '18px 50px', background: '#25D366', color: '#fff', textDecoration: 'none', fontWeight: 'bold', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '10px'}}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" style={{height: '20px'}} alt="WA" /> WHATSAPP İLE SOR
          </a>
        </div>
        <section style={{marginBottom: '60px'}}>
          <h3 style={{color: '#d4af37', marginBottom: '20px'}}>KONUM</h3>
          <div style={{height: '400px', background: '#0d223f', borderRadius: '4px', overflow: 'hidden'}}>
            {property.googleMapsUrl && <iframe src={property.googleMapsUrl} width="100%" height="100%" style={{border:0}} allowFullScreen="" loading="lazy"></iframe>}
          </div>
        </section>
      </main>
      <footer style={{padding: '60px 20px', textAlign: 'center', borderTop: '1px solid rgba(212,175,55,0.1)', opacity: 0.5, fontSize: '0.7rem'}}>© 2026 ONDA YATIRIM</footer>
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
