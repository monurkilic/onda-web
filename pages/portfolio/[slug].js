import { useState } from 'react';
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import Head from 'next/head';

const client = createClient({ projectId: 'k8cd67dp', dataset: "production", apiVersion: "2023-01-01", useCdn: false });
const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

export default function PropertyDetail({ property }) {
  const [lightboxImg, setLightboxImg] = useState(null);

  if (!property) return null;

  // Tüm fotoğrafları bir diziye toplayalım (Ana resim + Galeri)
  const allPhotos = [property.mainImage, ...(property.gallery || [])];
  const waLink = `https://wa.me/905326466909?text=${encodeURIComponent(`Merhaba Onur Bey, "${property.title}" ilanı hakkında bilgi alabilir miyim?`)}`;

  return (
    <div style={{backgroundColor: '#0a192f', color: '#fff', minHeight: '100vh', fontFamily: 'serif', overflowX: 'hidden'}}>
      <Head>
        <title>{property.title} | Onda Yatırım</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </Head>

      {/* MOBİL UYUMLULUK CSS KURALLARI */}
      <style dangerouslySetInnerHTML={{ __html: `
        .main-container { width: 100%; max-width: 1100px; margin: 0 auto; padding: 40px 20px; box-sizing: border-box; }
        .hero-title { font-size: 3rem; color: #d4af37; fontWeight: 300; margin: 0 0 10px 0; text-align: center; line-height: 1.3; }
        .location-text { font-size: 1.2rem; color: #8e8e8e; letterSpacing: '2px'; marginBottom: '30px'; text-align: center; }
        .main-image-wrapper { width: 100%; aspect-ratio: 16 / 9; border: 1px solid rgba(212,175,55,0.2); border-radius: 4px; overflow: hidden; margin-bottom: 20px; }
        .main-image-wrapper img { width: 100%; height: 100%; object-fit: cover; }
        .gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px; margin-bottom: 50px; }
        .gallery-item { border: 1px solid rgba(212,175,55,0.1); border-radius: 2px; overflow: hidden; aspect-ratio: 4 / 3; cursor: zoom-in; }
        .gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: 0.3s; }
        .gallery-item:hover img { transform: scale(1.05); }
        .analysis-box { padding: 50px; background: 'rgba(212, 175, 55, 0.03)'; borderLeft: '4px solid #d4af37'; marginBottom: '60px'; box-sizing: border-box; }
        .analysis-box p { lineHeight: '2'; fontSize: '1.1rem'; color: '#ccc'; fontStyle: 'italic'; }
        
        @media (max-width: 768px) {
          .main-container { padding: 20px 15px; }
          .hero-title { font-size: 1.8rem; margin: 0 0 5px 0; }
          .location-text { font-size: 1rem; marginBottom: '20px'; }
          .main-image-wrapper { margin-bottom: 10px; }
          .gallery-grid { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 8px; margin-bottom: 30px; }
          .analysis-box { padding: 25px; margin-bottom: 40px; }
          .analysis-box p { fontSize: '1rem'; lineHeight: '1.8'; }
        }
      `}} />

      {/* 1. LIGHTBOX */}
      {lightboxImg && (
        <div onClick={() => setLightboxImg(null)} style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.95)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out'}}>
           <img src={lightboxImg} style={{maxWidth: '95%', maxHeight: '90%', border: '1px solid #d4af37', borderRadius: '2px'}} />
           <p style={{position: 'absolute', bottom: 20, color: '#d4af37'}}>× Kapat</p>
        </div>
      )}

      {/* NAVİGASYON */}
      <nav style={{padding: '20px', borderBottom: '1px solid rgba(212,175,55,0.1)', textAlign: 'center', background: 'rgba(10, 25, 47, 0.95)', position: 'sticky', top: 0, zIndex: 100}}>
        <a href="/portfolio" style={{color: '#d4af37', textDecoration: 'none', letterSpacing: '2px', fontSize: '0.8rem'}}>← PORTFÖYE DÖN</a>
      </nav>

      <main className="main-container">
        
        {/* 2. BAŞLIK VE LOKASYON (EN ÜSTTE VE ORTALI) */}
        <h1 className="hero-title">{property.title}</h1>
        <p className="location-text">{property.location}</p>

        {/* 3. ANA GÖRSEL (BÜYÜK) */}
        <div className="main-image-wrapper" onClick={() => setLightboxImg(urlFor(property.mainImage).width(1500).url())} style={{cursor: 'zoom-in'}}>
          <img src={urlFor(property.mainImage).width(1200).url()} alt={property.title} />
        </div>

        {/* 4. DİĞER FOTOĞRAFLAR (GALERİ - TIKLAYINCA BÜYÜR) */}
        <div className="gallery-grid">
          {property.gallery && property.gallery.map((img, i) => (
            <div key={i} className="gallery-item" onClick={() => setLightboxImg(urlFor(img).width(1200).url())}>
              <img src={urlFor(img).width(600).url()} alt={`${property.title} - ${i + 1}`} />
            </div>
          ))}
        </div>

        {/* FİYAT VE ANALİZ */}
        <div style={{marginTop: '40px'}}>
          <div style={{fontSize: '2.5rem', color: '#fff', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center'}}>{property.price} {property.currency}</div>

          <div className="analysis-box">
            <h3 style={{color: '#d4af37', margin: '0 0 15px 0', fontSize: '0.7rem', letterSpacing: '3px'}}>ONDA ANALİZİ</h3>
            <p>"{property.analysis}"</p>
          </div>
        </div>

        {/* 5. WHATSAPP BUTONU (ŞIK, ORTALI, ANALİZİN ALTINDA) */}
        <div style={{display: 'flex', justifyContent: 'center', marginBottom: '80px'}}>
          <a href={waLink} target="_blank" rel="noreferrer" style={{padding: '20px 60px', background: '#25D366', color: '#fff', textDecoration: 'none', fontWeight: 'bold', borderRadius: '50px', letterSpacing: '1px', fontSize: '1rem', transition: 'all 0.2s', boxShadow: '0 4px 15px rgba(37, 211, 102, 0.2)'}}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WA" style={{height: '20px', verticalAlign: 'middle', marginRight: '10px'}} />
            WHATSAPP İLE SOR
          </a>
        </div>

        {/* 6. KONUM VE HARİTA (DİREKT GÖRÜNÜM) */}
        <section style={{marginBottom: '80px'}}>
          <h3 style={{color: '#d4af37', marginBottom: '25px', letterSpacing: '3px', fontSize: '0.8rem'}}>KONUM VE ÇEVRE</h3>
          <div style={{width: '100%', height: '400px', background: '#0d223f', border: '1px solid rgba(212, 175, 55, 0.1)', borderRadius: '4px', overflow: 'hidden'}}>
            {property.googleMapsUrl ? (
              <iframe 
                src={property.googleMapsUrl} 
                width="100%" height="100%" style={{border:0}} allowFullScreen="" loading="lazy">
              </iframe>
            ) : (
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#555'}}>Konum bilgisi hazırlanıyor...</div>
            )}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer style={{padding: '60px 20px', borderTop: '1px solid rgba(212,175,55,0.1)', textAlign: 'center', background: '#0d223f'}}>
        <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '30px', marginBottom: '30px', fontSize: '0.8rem', letterSpacing: '1px'}}>
          <a href="/" style={{color: '#8e8e8e', textDecoration: 'none'}}>ANA SAYFA</a>
          <a href="/portfolio" style={{color: '#8e8e8e', textDecoration: 'none'}}>PORTFÖY</a>
          <a href="/about" style={{color: '#8e8e8e', textDecoration: 'none'}}>HAKKIMIZDA</a>
          <a href="/contact" style={{color: '#8e8e8e', textDecoration: 'none'}}>İLETİŞİM</a>
        </div>
        <p style={{fontSize: '0.7rem', opacity: 0.5}}>© 2026 ONDA YATIRIM | Aradığınız her şey ONDA</p>
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
