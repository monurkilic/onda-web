import { useState, useEffect, useRef } from 'react';
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import Head from 'next/head';

const client = createClient({ projectId: 'k8cd67dp', dataset: "production", apiVersion: "2023-01-01", useCdn: false });
const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

export default function PropertyDetail({ property }) {
  const [photoIndex, setPhotoIndex] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  if (!property) return null;
  const allPhotos = [property.mainImage, ...(property.gallery || [])];
  const waLink = `https://wa.me/905326466909?text=${encodeURIComponent(`Merhaba Onur Bey, "${property.title}" ilanı hakkında bilgi alabilir miyim?`)}`;

  // Otomatik Slider Fonksiyonu
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % allPhotos.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [allPhotos.length]);

  // Slayt değiştiğinde scroll yap
  useEffect(() => {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.offsetWidth;
      sliderRef.current.scrollTo({ left: currentSlide * slideWidth, behavior: 'smooth' });
    }
  }, [currentSlide]);

  return (
    <div style={{backgroundColor: '#0a192f', color: '#fff', minHeight: '100vh', fontFamily: 'serif', overflowX: 'hidden'}}>
      <Head>
        <title>{property.title} | Onda Yatırım</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>

      <style dangerouslySetInnerHTML={{ __html: `
        .slider-wrapper { position: relative; width: 100%; max-width: 1100px; margin: 0 auto; overflow: hidden; border-radius: 4px; border: 1px solid rgba(212,175,55,0.2); }
        .slider-container { display: flex; overflow-x: auto; scroll-behavior: smooth; scroll-snap-type: x mandatory; scrollbar-width: none; -ms-overflow-style: none; }
        .slider-container::-webkit-scrollbar { display: none; }
        .slide { flex: 0 0 100%; scroll-snap-align: start; height: 500px; cursor: zoom-in; position: relative; }
        .slide img { width: 100%; height: 100%; object-fit: cover; }
        
        @media (max-width: 768px) {
          .slide { height: 300px; }
          .hero-title { font-size: 2rem !important; }
          .action-buttons { flex-direction: column; }
        }
      `}} />

      {/* 1. LIGHTBOX */}
      {photoIndex !== null && (
        <div onClick={() => setPhotoIndex(null)} style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.95)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out'}}>
           <img src={urlFor(allPhotos[photoIndex]).width(1500).url()} style={{maxWidth: '95%', maxHeight: '90%', border: '1px solid #d4af37'}} />
           <p style={{position: 'absolute', bottom: 20, color: '#d4af37'}}>{photoIndex + 1} / {allPhotos.length}</p>
        </div>
      )}

      {/* NAVİGASYON */}
      <nav style={{padding: '20px', borderBottom: '1px solid rgba(212,175,55,0.1)', textAlign: 'center', background: 'rgba(10, 25, 47, 0.95)', position: 'sticky', top: 0, zIndex: 100}}>
        <a href="/portfolio" style={{color: '#d4af37', textDecoration: 'none', letterSpacing: '2px', fontSize: '0.8rem'}}>← PORTFÖYE DÖN</a>
      </nav>

      <main style={{maxWidth: '1200px', margin: '0 auto', padding: '40px 20px'}}>
        
        {/* 2. OTOMATİK SLIDER */}
        <div className="slider-wrapper">
          <div className="slider-container" ref={sliderRef}>
            {allPhotos.map((img, i) => (
              <div key={i} className="slide" onClick={() => setPhotoIndex(i)}>
                <img src={urlFor(img).width(1200).url()} alt={`${property.title} - ${i}`} />
              </div>
            ))}
          </div>
          {/* Slayt Noktaları */}
          <div style={{position: 'absolute', bottom: '15px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px'}}>
            {allPhotos.map((_, i) => (
              <div key={i} style={{width: '8px', height: '8px', borderRadius: '50%', background: currentSlide === i ? '#d4af37' : 'rgba(255,255,255,0.3)', transition: '0.3s'}} />
            ))}
          </div>
        </div>

        {/* BİLGİ ALANI */}
        <div style={{marginTop: '40px'}}>
          <h1 className="hero-title" style={{fontSize: '3rem', color: '#d4af37', fontWeight: '300', margin: '0 0 10px 0'}}>{property.title}</h1>
          <p style={{fontSize: '1.2rem', color: '#8e8e8e', letterSpacing: '2px', marginBottom: '20px'}}>{property.location}</p>
          <div style={{fontSize: '2.5rem', color: '#fff', fontWeight: 'bold', marginBottom: '40px'}}>{property.price} {property.currency}</div>

          <div className="action-buttons" style={{display: 'flex', gap: '15px', marginBottom: '60px'}}>
            <a href={waLink} target="_blank" style={{flex: 1, textAlign: 'center', padding: '20px', background: '#25D366', color: '#fff', textDecoration: 'none', fontWeight: 'bold', borderRadius: '2px', letterSpacing: '1px'}}>WHATSAPP İLE SOR</a>
            <a href="#contact" style={{flex: 1, textAlign: 'center', padding: '20px', border: '1px solid #d4af37', color: '#d4af37', textDecoration: 'none', fontWeight: 'bold', borderRadius: '2px'}}>İLETİŞİME GEÇ</a>
          </div>

          <div style={{padding: '40px', background: 'rgba(212, 175, 55, 0.03)', borderLeft: '4px solid #d4af37', marginBottom: '60px'}}>
            <h3 style={{color: '#d4af37', margin: '0 0 15px 0', fontSize: '0.7rem', letterSpacing: '3px'}}>ONDA ANALİZİ</h3>
            <p style={{lineHeight: '2', fontSize: '1.1rem', color: '#ccc', fontStyle: 'italic'}}>"{property.analysis}"</p>
          </div>
        </div>

        {/* 3. DİREKT HARİTA GÖRÜNÜMÜ */}
        <section style={{marginBottom: '80px'}}>
          <h3 style={{color: '#d4af37', marginBottom: '25px', letterSpacing: '3px', fontSize: '0.8rem'}}>KONUM VE ÇEVRE</h3>
          <div style={{width: '100%', height: '400px', background: '#0d223f', border: '1px solid rgba(212, 175, 55, 0.1)', borderRadius: '2px', overflow: 'hidden'}}>
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

      {/* 4. FOOTER */}
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
