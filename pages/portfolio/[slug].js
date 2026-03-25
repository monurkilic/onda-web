import { useState } from 'react';
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import Head from 'next/head';

const client = createClient({ projectId: 'k8cd67dp', dataset: "production", apiVersion: "2023-01-01", useCdn: false });
const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

export default function PropertyDetail({ property }) {
  // Artık resim URL'si değil, resmin index'ini (sırasını) tutuyoruz
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(null);

  if (!property) return null;

  // Tüm fotoğrafları bir diziye toplayalım (Ana resim index 0'da)
  const allPhotos = [property.mainImage, ...(property.gallery || [])];
  const waLink = `https://wa.me/905326466909?text=${encodeURIComponent(`Merhaba Onur Bey, "${property.title}" ilanı hakkında bilgi alabilir miyim?`)}`;

  // Lightbox Navigasyon Fonksiyonları
  const showNext = (e) => {
    e.stopPropagation(); // Lightbox'ın kapanmasını engelle
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % allPhotos.length); // Son resimden sonra başa dön
  };

  const showPrev = (e) => {
    e.stopPropagation(); // Lightbox'ın kapanmasını engelle
    setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + allPhotos.length) % allPhotos.length); // İlk resimden önce sona git
  };

  // Ortak Ok Butonu Stili
  const arrowButtonStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(10, 25, 47, 0.8)',
    color: '#d4af37',
    border: '1px solid rgba(212, 175, 55, 0.3)',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    fontSize: '30px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    transition: 'all 0.2s',
    outline: 'none',
  };

  return (
    <div style={{backgroundColor: '#0a192f', color: '#fff', minHeight: '100vh', fontFamily: 'serif', overflowX: 'hidden'}}>
      <Head>
        <title>{property.title} | Onda Yatırım</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </Head>

      {/* MOBİL VE STİL KURALLARI */}
      <style dangerouslySetInnerHTML={{ __html: `
        .main-container { width: 100%; max-width: 1100px; margin: 0 auto; padding: 40px 20px; box-sizing: border-box; }
        .hero-title { font-size: 3rem; color: #d4af37; fontWeight: 300; margin: 0 0 10px 0; text-align: center; line-height: 1.3; }
        .main-image-wrapper { width: 100%; aspect-ratio: 16 / 9; border: 1px solid rgba(212,175,55,0.2); border-radius: 4px; overflow: hidden; margin-bottom: 20px; cursor: zoom-in; }
        .main-image-wrapper img { width: 100%; height: 100%; object-fit: cover; }
        .gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px; margin-bottom: 50px; }
        .gallery-item { border: 1px solid rgba(212,175,55,0.1); border-radius: 2px; overflow: hidden; aspect-ratio: 4 / 3; cursor: zoom-in; }
        .gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: 0.3s; }
        .gallery-item:hover img { transform: scale(1.05); }
        .nav-btn:hover { background: #d4af37 !important; color: #0a192f !important; transform: translateY(-50%) scale(1.1); }
        
        @media (max-width: 768px) {
          .main-container { padding: 20px 15px; }
          .hero-title { font-size: 1.8rem; }
          .gallery-grid { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 8px; }
          .arrow-btn { width: 45px !important; height: 45px !important; fontSize: '20px' !important; }
        }
      `}} />

      {/* 1. GELİŞMİŞ NAVİGASYONLU LIGHTBOX */}
      {currentPhotoIndex !== null && (
        <div onClick={() => setCurrentPhotoIndex(null)} style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.95)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out'}}>
           
           {/* Sol Ok */}
           <button className="nav-btn arrow-btn" onClick={showPrev} style={{...arrowButtonStyle, left: '20px'}}>
             &#10094; {/* Büyük Sol Ok karakteri */}
           </button>

           {/* Aktif Resim */}
           <img 
             src={urlFor(allPhotos[currentPhotoIndex]).width(1500).url()} 
             alt={`${property.title} - Büyük Görünüm`}
             style={{maxWidth: '95%', maxHeight: '90%', border: '1px solid #d4af37', borderRadius: '2px', box_sizing: 'border-box'}} 
           />

           {/* Sağ Ok */}
           <button className="nav-btn arrow-btn" onClick={showNext} style={{...arrowButtonStyle, right: '20px'}}>
             &#10095; {/* Büyük Sağ Ok karakteri */}
           </button>

           {/* Kapat Yazısı ve Sıra Göstergesi */}
           <p style={{position: 'absolute', top: 20, right: 30, color: '#d4af37', fontSize: '1.2rem', fontWeight: 'bold'}}>×</p>
           <p style={{position: 'absolute', bottom: 20, color: '#ccc', fontSize: '0.9rem', letterSpacing: '2px', background: 'rgba(10,25,47,0.7)', padding: '5px 15px', borderRadius: '20px'}}>
             {currentPhotoIndex + 1} / {allPhotos.length}
           </p>
        </div>
      )}

      {/* NAVİGASYON BAR */}
      <nav style={{padding: '20px', borderBottom: '1px solid rgba(212,175,55,0.1)', textAlign: 'center', background: 'rgba(10, 25, 47, 0.95)', position: 'sticky', top: 0, zIndex: 100}}>
        <a href="/portfolio" style={{color: '#d4af37', textDecoration: 'none', letterSpacing: '2px', fontSize: '0.8rem'}}>← PORTFÖYE DÖN</a>
      </nav>

      <main className="main-container">
        
        {/* BAŞLIK VE LOKASYON */}
        <h1 className="hero-title">{property.title}</h1>
        <p style={{fontSize: '1.2rem', color: '#8e8e8e', letterSpacing: '2px', marginBottom: '30px', textAlign: 'center'}}>{property.location}</p>

        {/* 2. ANA GÖRSEL (Tıklayınca Lightbox'ı index 0 ile açar) */}
        <div className="main-image-wrapper" onClick={() => setCurrentPhotoIndex(0)}>
          <img src={urlFor(property.mainImage).width(1200).url()} alt={property.title} />
        </div>

        {/* 3. DİĞER FOTOĞRAFLAR (Tıklayınca kendi index'i ile açar) */}
        <div className="gallery-grid">
          {property.gallery && property.gallery.map((img, i) => (
            <div key={i} className="gallery-item" onClick={() => setCurrentPhotoIndex(i + 1)}> {/* +1 çünkü index 0 ana resim */}
              <img src={urlFor(img).width(600).url()} alt={`${property.title} - Galeri ${i + 1}`} />
            </div>
          ))}
        </div>

        {/* FİYAT VE ANALİZ */}
        <div style={{marginTop: '40px'}}>
          <div style={{fontSize: '2.5rem', color: '#fff', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center'}}>{property.price} {property.currency}</div>

          <div style={{padding: '40px', background: 'rgba(212, 175, 55, 0.03)', borderLeft: '4px solid #d4af37', marginBottom: '60px'}}>
            <h3 style={{color: '#d4af37', margin: '0 0 15px 0', fontSize: '0.7rem', letterSpacing: '3px'}}>ONDA ANALİZİ</h3>
            <p style={{lineHeight: '2', fontSize: '1.1rem', color: '#ccc', fontStyle: 'italic'}}>"{property.analysis}"</p>
          </div>
        </div>

        {/* WHATSAPP BUTONU */}
        <div style={{display: 'flex', justifyContent: 'center', marginBottom: '80px'}}>
          <a href={waLink} target="_blank" rel="noreferrer" style={{padding: '20px 60px', background: '#25D366', color: '#fff', textDecoration: 'none', fontWeight: 'bold', borderRadius: '50px', letterSpacing: '1px', fontSize: '1rem', transition: 'all 0.2s', boxShadow: '0 4px 15px rgba(37, 211, 102, 0.2)'}}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WA" style={{height: '20px', verticalAlign: 'middle', marginRight: '10px'}} />
            WHATSAPP İLE SOR
          </a>
        </div>

        {/* KONUM VE HARİTA */}
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
      <footer style={{padding: '60px 20px', borderTop: '1px solid rgba(212, 175, 55, 0.1)', textAlign: 'center', background: '#0d223f'}}>
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
