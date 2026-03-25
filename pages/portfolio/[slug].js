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

  // Tüm fotoğrafları bir diziye toplayalım (Ana resim + Galeri)
  const allPhotos = [property.mainImage, ...(property.gallery || [])];
  const waLink = `https://wa.me/905326466909?text=${encodeURIComponent(`Merhaba Onur Bey, "${property.title}" ilanı hakkında bilgi alabilir miyim?`)}`;

  // Lightbox Navigasyon Fonksiyonları
  const nextPhoto = (e) => { e.stopPropagation(); setPhotoIndex((prev) => (prev + 1) % allPhotos.length); };
  const prevPhoto = (e) => { e.stopPropagation(); setPhotoIndex((prev) => (prev - 1 + allPhotos.length) % allPhotos.length); };

  return (
    <div style={{backgroundColor: '#0a192f', color: '#fff', minHeight: '100vh', fontFamily: 'serif'}}>
      <Head><title>{property.title} | Onda Yatırım</title></Head>

      <style dangerouslySetInnerHTML={{ __html: `
        .slider-container { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; gap: 15px; padding-bottom: 20px; scrollbar-width: none; }
        .slider-container::-webkit-scrollbar { display: none; }
        .slider-item { flex: 0 0 85%; scroll-snap-align: center; position: relative; border: 1px solid rgba(212,175,55,0.2); border-radius: 4px; overflow: hidden; }
        @media (min-width: 768px) { .slider-item { flex: 0 0 45%; } }
      `}} />

      {/* 1. LIGHTBOX (NAVİGASYONLU) */}
      {photoIndex !== null && (
        <div onClick={() => setPhotoIndex(null)} style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.95)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out'}}>
          <button onClick={prevPhoto} style={{position: 'absolute', left: '20px', background: 'none', border: 'none', color: '#d4af37', fontSize: '40px', cursor: 'pointer'}}>‹</button>
          <img src={urlFor(allPhotos[photoIndex]).width(1500).url()} style={{maxWidth: '90%', maxHeight: '85%', border: '1px solid #d4af37'}} />
          <button onClick={nextPhoto} style={{position: 'absolute', right: '20px', background: 'none', border: 'none', color: '#d4af37', fontSize: '40px', cursor: 'pointer'}}>›</button>
          <div style={{position: 'absolute', bottom: '20px', color: '#8e8e8e', fontSize: '0.9rem'}}>{photoIndex + 1} / {allPhotos.length}</div>
        </div>
      )}

      {/* NAVİGASYON */}
      <nav style={{padding: '20px', borderBottom: '1px solid rgba(212,175,55,0.1)', textAlign: 'center', background: 'rgba(10, 25, 47, 0.95)', position: 'sticky', top: 0, zIndex: 100}}>
        <a href="/portfolio" style={{color: '#d4af37', textDecoration: 'none', letterSpacing: '2px', fontSize: '0.8rem'}}>← PORTFÖYE DÖN</a>
      </nav>

      <main style={{maxWidth: '1200px', margin: '0 auto', padding: '40px 20px'}}>
        
        {/* 2. ŞIK SLIDER */}
        <div className="slider-container">
          {allPhotos.map((img, i) => (
            <div key={i} className="slider-item" onClick={() => setPhotoIndex(i)} style={{cursor: 'zoom-in'}}>
              <img src={urlFor(img).width(1000).url()} style={{width: '100%', height: '400px', objectFit: 'cover'}} />
            </div>
          ))}
        </div>

        {/* BAŞLIK VE FİYAT */}
        <div style={{margin: '40px 0', borderBottom: '1px solid rgba(212,175,55,0.1)', paddingBottom: '30px'}}>
          <h1 style={{fontSize: '2.8rem', color: '#d4af37', fontWeight: '300', margin: '0 0 15px 0'}}>{property.title}</h1>
          <p style={{fontSize: '1.2rem', color: '#8e8e8e', letterSpacing: '2px'}}>{property.location}</p>
          <div style={{fontSize: '2.2rem', color: '#fff', marginTop: '20px', fontWeight: 'bold'}}>{property.price} {property.currency}</div>
        </div>

        {/* AKSİYON BUTONLARI */}
        <div style={{display: 'flex', gap: '15px', marginBottom: '60px', flexWrap: 'wrap'}}>
          <a href={waLink} target="_blank" style={{flex: 1, minWidth: '250px', textAlign: 'center', padding: '20px', background: '#25D366', color: '#fff', textDecoration: 'none', fontWeight: 'bold', borderRadius: '2px', letterSpacing: '2px'}}>WHATSAPP İLE BİLGİ AL</a>
          <a href="#map" style={{flex: 1, minWidth: '250px', textAlign: 'center', padding: '20px', border: '1px solid #d4af37', color: '#d4af37', textDecoration: 'none', fontWeight: 'bold', borderRadius: '2px', letterSpacing: '2px'}}>KONUMU İNCELE</a>
        </div>

        {/* ONDA ANALİZİ */}
        <div style={{padding: '50px', background: 'rgba(212, 175, 55, 0.03)', borderLeft: '4px solid #d4af37', marginBottom: '80px'}}>
          <h3 style={{color: '#d4af37', margin: '0 0 20px 0', letterSpacing: '3px', fontSize: '0.8rem'}}>ONDA ANALİZİ</h3>
          <p style={{lineHeight: '2.2', fontSize: '1.1rem', color: '#ccc', fontStyle: 'italic'}}>"{property.analysis}"</p>
        </div>

        {/* 3. GÖMÜLÜ HARİTA */}
        <section id="map" style={{marginBottom: '100px'}}>
          <h3 style={{color: '#d4af37', marginBottom: '30px', letterSpacing: '3px'}}>KONUM</h3>
          <div style={{width: '100%', height: '450px', background: '#0d223f', border: '1px solid rgba(212, 175, 55, 0.1)', borderRadius: '4px', overflow: 'hidden'}}>
            {property.googleMapsUrl ? (
              <iframe 
                src={property.googleMapsUrl.replace('view', 'embed')} // Basit bir dönüşüm denemesi
                width="100%" height="100%" style={{border:0}} allowFullScreen="" loading="lazy">
              </iframe>
            ) : (
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#8e8e8e'}}>Harita verisi bulunamadı.</div>
            )}
          </div>
        </section>

      </main>

      <footer style={{padding: '80px 20px', borderTop: '1px solid rgba(212,175,55,0.1)', textAlign: 'center', opacity: 0.5, fontSize: '0.75rem'}}>
        © 2026 ONDA YATIRIM | ARADIĞINIZ HER ŞEY ONDA
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
