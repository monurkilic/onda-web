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
  const [activeImg, setActiveImg] = useState(null);

  if (!property) return <div style={{ color: '#fff', textAlign: 'center', padding: '100px' }}>İlan yükleniyor...</div>;

  // Tüm fotoğrafları tek bir dizide toplayalım (Ana resim + Galeri)
  const allImages = [property.mainImage, ...(property.gallery || [])].filter(Boolean);
  const currentDisplayImg = activeImg || property.mainImage;

  const whatsappUrl = `https://wa.me/905326466909?text=${encodeURIComponent(`Merhaba, ondayatirim.com üzerindeki "${property.title}" ilanınız hakkında bilgi almak istiyorum.`)}`;

  return (
    <>
      <Head>
        <title>{property.title} | Onda Yatırım</title>
        <meta name="description" content={`${property.location} lokasyonunda ${property.propertyType} fırsatı.`} />
      </Head>

      <style dangerouslySetInnerHTML={{ __html: `
        .detail-page { max-width: 1100px; margin: 120px auto; padding: 0 20px; color: #fff; font-family: 'Inter', sans-serif; }
        
        /* Başlık Alanı */
        .header-section { margin-bottom: 40px; border-left: 4px solid #d4af37; padding-left: 20px; }
        .header-title { font-size: 2.4rem; font-weight: 300; letter-spacing: 1px; margin-bottom: 10px; color: #fff; }
        .header-loc { color: #d4af37; font-size: 1rem; letter-spacing: 2px; text-transform: uppercase; }

        /* Görsel Alanı (Stage) */
        .visual-stage { display: flex; flex-direction: column; gap: 15px; margin-bottom: 50px; }
        .main-view-container { width: 100%; height: 65vh; overflow: hidden; border: 1px solid rgba(212,175,55,0.2); background: #000; position: relative; }
        .main-view-img { width: 100%; height: 100%; object-fit: contain; }
        
        /* Thumbnails (Film Şeridi) */
        .thumb-grid { display: grid; grid-template-cols: repeat(6, 1fr); gap: 10px; }
        .thumb-item { aspect-ratio: 1/1; cursor: pointer; border: 1px solid rgba(255,255,255,0.1); transition: 0.3s; overflow: hidden; }
        .thumb-item:hover { border-color: #d4af37; transform: scale(1.05); }
        .thumb-item.active { border: 2px solid #d4af37; }
        .thumb-img { width: 100%; height: 100%; object-fit: cover; }

        /* Teknik Bilgi Kartları */
        .specs-container { display: grid; grid-template-cols: repeat(4, 1fr); gap: 1px; background: rgba(212,175,55,0.2); border: 1px solid rgba(212,175,55,0.2); margin-bottom: 60px; }
        .spec-card { background: #0a192f; padding: 25px; text-align: center; }
        .spec-label { display: block; color: #8e8e8e; font-size: 0.7rem; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px; }
        .spec-value { color: #d4af37; font-size: 1.2rem; font-weight: bold; }

        /* Rasyonel Analiz Raporu */
        .analysis-wrapper { background: #fff; color: #0a192f; padding: 60px; border-radius: 2px; margin-bottom: 60px; position: relative; box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
        .analysis-wrapper::before { content: ""; position: absolute; top: 0; left: 0; width: 8px; height: 100%; background: #d4af37; }
        .analysis-badge { background: #0a192f; color: #d4af37; padding: 5px 15px; font-size: 0.7rem; letter-spacing: 3px; position: absolute; top: 20px; right: 20px; }
        .analysis-content h2 { font-size: 1.8rem; margin-bottom: 30px; border-bottom: 2px solid #0a192f; padding-bottom: 10px; }
        .analysis-text { line-height: 1.8; font-size: 1.05rem; }

        /* Harita ve İletişim */
        .map-box { width: 100%; height: 450px; margin-bottom: 40px; border: 1px solid rgba(212,175,55,0.2); filter: grayscale(1) invert(0.9) contrast(1.1); }
        .cta-footer { display: flex; gap: 20px; }
        .wa-btn { flex: 1; background: #25D366; color: #fff; padding: 22px; text-align: center; text-decoration: none; font-weight: bold; letter-spacing: 2px; border-radius: 4px; transition: 0.3s; }
        .wa-btn:hover { background: #128c7e; transform: translateY(-3px); }

        @media (max-width: 768px) {
          .header-title { font-size: 1.8rem; }
          .main-view-container { height: 40vh; }
          .thumb-grid { grid-template-cols: repeat(4, 1fr); }
          .specs-container { grid-template-cols: repeat(2, 1fr); }
          .analysis-wrapper { padding: 40px 20px; }
          .cta-footer { flex-direction: column; }
        }
      `}} />

      <main className="detail-page">
        {/* Başlık Bölümü */}
        <section className="header-section">
          <h1 className="header-title">{property.title}</h1>
          <p className="header-loc">{property.location}</p>
        </section>

        {/* Galeri Bölümü */}
        <section className="visual-stage">
          <div className="main-view-container">
            <img 
              src={urlFor(currentDisplayImg).url()} 
              className="main-view-img" 
              alt={property.title} 
            />
          </div>
          
          <div className="thumb-grid">
            {allImages.map((img, i) => (
              <div 
                key={i} 
                className={`thumb-item ${currentDisplayImg === img ? 'active' : ''}`}
                onClick={() => setActiveImg(img)}
              >
                <img src={urlFor(img).width(200).url()} className="thumb-img" alt="Küçük resim" />
              </div>
            ))}
          </div>
        </section>

        {/* Teknik Bilgiler */}
        <section className="specs-container">
          <div className="spec-card">
            <span className="spec-label">Fiyat</span>
            <span className="spec-value">{property.price} {property.currency}</span>
          </div>
          <div className="spec-card">
            <span className="spec-label">Mülk Tipi</span>
            <span className="spec-value">{property.propertyType}</span>
          </div>
          <div className="spec-card">
            <span className="spec-label">Net Alan</span>
            <span className="spec-value">{property.area} m²</span>
          </div>
          <div className="spec-card">
            <span className="spec-label">Oda Sayısı</span>
            <span className="spec-value">{property.rooms}</span>
          </div>
        </section>

        {/* Onda Analizi Bölümü */}
        {property.analysis && (
          <section className="analysis-wrapper">
            <div className="analysis-badge">RASYONEL ANALİZ</div>
            <div className="analysis-content">
              <h2>ONDA ANALİZİ</h2>
              <div className="analysis-text">
                <PortableText value={property.analysis} />
              </div>
            </div>
          </section>
        )}

        {/* Harita Bölümü */}
        <section style={{ marginBottom: '60px' }}>
          <h3 style={{ color: '#d4af37', letterSpacing: '3px', marginBottom: '20px', fontSize: '0.9rem' }}>KONUM VE ULAŞIM</h3>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3126.311756538183!2d27.091176575306657!3d38.41113097519961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bbd9006c09a89b%3A0xc392cae69d769623!2sOnda%20Yat%C4%B1r%C4%B1m!5e0!3m2!1str!2str!4v1740431268615!5m2!1str!2str" 
            className="map-box"
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>

        {/* İletişim Butonu */}
        <div className="cta-footer">
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="wa-btn">
            WHATSAPP İLE DETAYLI BİLGİ AL
          </a>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const property = await client.fetch(`
    *[_type == "property" && slug.current == $slug][0]{
      title, location, price, currency, propertyType, area, rooms, mainImage, gallery, analysis
    }
  `, { slug });

  return { props: { property } };
}
