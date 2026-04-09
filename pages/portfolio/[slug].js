import { useState } from 'react';
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import Head from 'next/head';
import { PortableText } from '@portabletext/react';

const client = createClient({
  projectId: 'k8cd67dp',
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: false
});

const builder = imageUrlBuilder(client);
const urlFor = (source) => (source ? builder.image(source) : null);

export default function PropertyDetail({ property }) {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  if (!property) return <div style={{ color: '#fff', textAlign: 'center', padding: '100px' }}>Yükleniyor...</div>;

  const images = [property.mainImage, ...(property.gallery || [])].filter(Boolean);

  const nextPhoto = () => setPhotoIndex((prev) => (prev + 1) % images.length);
  const prevPhoto = () => setPhotoIndex((prev) => (prev - 1 + images.length) % images.length);

  const whatsappUrl = `https://wa.me/905326466909?text=${encodeURIComponent(`Merhaba, "${property.title}" ilanınız hakkında detaylı bilgi rica ediyorum.`)}`;

  return (
    <>
      <Head>
        <title>{property.title} | Onda Yatırım</title>
      </Head>

      <style dangerouslySetInnerHTML={{ __html: `
        .container { max-width: 1100px; margin: 120px auto; padding: 0 20px; font-family: 'Inter', sans-serif; color: #fff; }
        
        /* Premium Galeri Dizaynı */
        .gallery-window { display: grid; grid-template-columns: 2fr 1fr; gap: 10px; height: 500px; margin-bottom: 40px; border-radius: 8px; overflow: hidden; }
        .main-feat { width: 100%; height: 100%; object-fit: cover; cursor: pointer; transition: 0.3s; }
        .side-grid { display: grid; grid-template-rows: 1fr 1fr; gap: 10px; }
        .side-img { width: 100%; height: 245px; object-fit: cover; cursor: pointer; transition: 0.3s; }
        .main-feat:hover, .side-img:hover { filter: brightness(0.8); }

        /* Lightbox (Fotoğraf Büyütme) */
        .lightbox { position: fixed; inset: 0; background: rgba(0,0,0,0.95); z-index: 9999; display: flex; align-items: center; justify-content: center; }
        .lightbox-content { position: relative; width: 90%; height: 80vh; display: flex; align-items: center; justify-content: center; }
        .lightbox-img { max-width: 100%; max-height: 100%; object-fit: contain; }
        .close-btn { position: absolute; top: -50px; right: 0; color: #fff; font-size: 2rem; cursor: pointer; }
        .nav-btn { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(212,175,55,0.2); color: #d4af37; border: 1px solid #d4af37; padding: 15px; cursor: pointer; transition: 0.3s; }
        .nav-btn:hover { background: #d4af37; color: #0a192f; }
        .prev-btn { left: -60px; }
        .next-btn { right: -60px; }

        /* Bilgi Alanları */
        .spec-bar { display: flex; justify-content: space-between; background: #0d223f; padding: 30px; border: 1px solid rgba(212,175,55,0.2); margin-bottom: 40px; }
        .spec-item { text-align: center; }
        .spec-label { display: block; color: #8e8e8e; font-size: 0.7rem; letter-spacing: 2px; margin-bottom: 5px; }
        .spec-val { color: #d4af37; font-size: 1.1rem; font-weight: bold; }

        /* Onda Analizi Raporu */
        .report-box { background: #fff; color: #0a192f; padding: 50px; border-left: 10px solid #d4af37; margin-bottom: 60px; }
        .report-title { font-size: 1.5rem; font-weight: 800; border-bottom: 2px solid #0a192f; display: inline-block; margin-bottom: 30px; }

        /* Harita Bölümü */
        .map-wrapper { width: 100%; height: 400px; border: 1px solid rgba(212,175,55,0.3); margin-bottom: 40px; overflow: hidden; border-radius: 4px; }
        .map-frame { width: 100%; height: 100%; border: 0; filter: grayscale(1) invert(0.9); }

        .wa-footer-btn { display: block; background: #25D366; color: #fff; padding: 25px; text-align: center; text-decoration: none; font-weight: bold; font-size: 1rem; border-radius: 4px; letter-spacing: 1px; transition: 0.3s; }
        .wa-footer-btn:hover { background: #128c7e; transform: scale(1.02); }

        @media (max-width: 768px) {
          .gallery-window { grid-template-cols: 1fr; height: auto; }
          .side-grid { display: none; }
          .spec-bar { flex-wrap: wrap; gap: 20px; }
          .spec-item { width: 45%; }
          .nav-btn { padding: 10px; }
          .prev-btn { left: 0; }
          .next-btn { right: 0; }
        }
      `}} />

      <main className="container">
        <h1 style={{ fontSize: '2.5rem', fontWeight: '300', marginBottom: '10px' }}>{property.title}</h1>
        <p style={{ color: '#d4af37', letterSpacing: '2px', marginBottom: '30px' }}>{property.location}</p>

        {/* Galeri Vitrini */}
        <div className="gallery-window">
          <img src={urlFor(images[0]).url()} className="main-feat" onClick={() => { setPhotoIndex(0); setIsOpen(true); }} />
          <div className="side-grid">
            {images.slice(1, 3).map((img, i) => (
              <img key={i} src={urlFor(img).url()} className="side-img" onClick={() => { setPhotoIndex(i + 1); setIsOpen(true); }} />
            ))}
          </div>
        </div>
        <p style={{ textAlign: 'right', fontSize: '0.8rem', color: '#8e8e8e', cursor: 'pointer' }} onClick={() => setIsOpen(true)}>+ Tüm Fotoğrafları Gör</p>

        {/* Teknik Bilgi Çubuğu */}
        <div className="spec-bar">
          <div className="spec-item"><span className="spec-label">FİYAT</span><span className="spec-val">{property.price} {property.currency}</span></div>
          <div className="spec-item"><span className="spec-label">TİP</span><span className="spec-val" style={{textTransform:'uppercase'}}>{property.propertyType}</span></div>
          <div className="spec-item"><span className="spec-label">NET ALAN</span><span className="spec-val">{property.area} m²</span></div>
          <div className="spec-item"><span className="spec-label">ODA</span><span className="spec-val">{property.rooms}</span></div>
        </div>

        {/* Onda Analizi */}
        {property.analysis && (
          <section className="report-box">
            <h2 className="report-title">ONDA ANALİZİ</h2>
            <PortableText value={property.analysis} />
          </section>
        )}

        {/* Harita */}
        <div className="map-wrapper">
          <iframe 
            src={property.googleMapsUrl || `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d195603.62681534968!2d32.60744655513543!3d39.91220473155708!2m3!1f0!2f0!3f0!3m2!1i1024!2i1024!4f13.1!3m3!1m2!1s0x14d347d520732db1%3A0xbdc57d0c08351f0!2sAnkara!5e0!3m2!1str!2str!4v1711200000000!5m2!1str!2str`}
            className="map-frame" 
            allowFullScreen="" 
            loading="lazy"
          ></iframe>
        </div>

        <a href={whatsappUrl} target="_blank" rel="noreferrer" className="wa-footer-btn">
          WHATSAPP İLE BİLGİ AL (+90 532 646 69 09)
        </a>
      </main>

      {/* Fotoğraf Geçişli Pencere (Lightbox) */}
      {isOpen && (
        <div className="lightbox">
          <div className="lightbox-content">
            <span className="close-btn" onClick={() => setIsOpen(false)}>✕</span>
            <button className="nav-btn prev-btn" onClick={prevPhoto}>←</button>
            <img src={urlFor(images[photoIndex]).url()} className="lightbox-img" />
            <button className="nav-btn next-btn" onClick={nextPhoto}>→</button>
            <p style={{ position: 'absolute', bottom: '-40px', color: '#fff' }}>{photoIndex + 1} / {images.length}</p>
          </div>
        </div>
      )}
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const property = await client.fetch(`*[_type == "property" && slug.current == $slug][0]{
    title, location, price, currency, propertyType, area, rooms, mainImage, gallery, analysis, googleMapsUrl
  }`, { slug });
  return { props: { property } };
}
