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
const urlFor = (source) => builder.image(source);

export default function PropertyDetail({ property }) {
  if (!property) return <div style={{ color: '#fff', textAlign: 'center', padding: '100px' }}>İlan yükleniyor...</div>;

  return (
    <>
      <Head>
        <title>{property.title} | Onda Yatırım</title>
        <meta name="description" content={`${property.location} lokasyonunda ${property.propertyType} fırsatı.`} />
      </Head>

      <style dangerouslySetInnerHTML={{ __html: `
        .detail-container { max-width: 1100px; margin: 120px auto; padding: 0 20px; color: #fff; font-family: sans-serif; }
        .detail-header { border-bottom: 1px solid rgba(212,175,55,0.2); padding-bottom: 30px; margin-bottom: 40px; }
        .detail-title { font-size: 2.5rem; font-weight: 300; letter-spacing: 2px; margin-bottom: 10px; }
        .detail-location { color: #d4af37; font-size: 1.1rem; letter-spacing: 2px; text-transform: uppercase; }
        
        /* Galeri */
        .main-img { width: 100%; height: 60vh; object-fit: cover; border: 1px solid rgba(212,175,55,0.2); margin-bottom: 20px; }
        .gallery-grid { display: grid; grid-template-cols: repeat(4, 1fr); gap: 15px; margin-bottom: 60px; }
        .gallery-item { aspect-ratio: 4/3; object-fit: cover; border: 1px solid rgba(255,255,255,0.1); cursor: pointer; transition: 0.3s; }
        .gallery-item:hover { border-color: #d4af37; }

        /* Teknik Detaylar Grid */
        .info-grid { display: grid; grid-template-cols: repeat(4, 1fr); gap: 20px; background: rgba(13,34,63,0.5); padding: 30px; border: 1px solid rgba(212,175,55,0.1); margin-bottom: 60px; }
        .info-item { text-align: center; border-right: 1px solid rgba(212,175,55,0.1); }
        .info-item:last-child { border-right: none; }
        .info-label { color: #8e8e8e; font-size: 0.7rem; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px; display: block; }
        .info-value { color: #d4af37; font-size: 1.2rem; font-weight: bold; }

        /* Onda Analizi Bölümü */
        .analysis-box { background: #fff; color: #0a192f; padding: 50px; border-left: 5px solid #d4af37; line-height: 1.8; }
        .analysis-title { color: #0a192f; font-size: 1.8rem; margin-bottom: 30px; border-bottom: 2px solid #0a192f; display: inline-block; }
        .analysis-content p { margin-bottom: 20px; }

        /* Alt CTA */
        .action-bar { margin-top: 60px; display: flex; gap: 20px; }
        .btn-call { flex: 1; background: #d4af37; color: #0a192f; padding: 20px; text-align: center; text-decoration: none; font-weight: bold; letter-spacing: 2px; }
        .btn-maps { flex: 1; border: 1px solid #d4af37; color: #d4af37; padding: 20px; text-align: center; text-decoration: none; font-size: 0.8rem; letter-spacing: 2px; }

        @media (max-width: 768px) {
          .info-grid { grid-template-cols: repeat(2, 1fr); gap: 30px; }
          .info-item:nth-child(2n) { border-right: none; }
          .gallery-grid { grid-template-cols: repeat(2, 1fr); }
          .analysis-box { padding: 30px 20px; }
          .action-bar { flex-direction: column; }
        }
      `}} />

      <main className="detail-container">
        <div className="detail-header">
          <h1 className="detail-title">{property.title}</h1>
          <p className="detail-location">{property.location}</p>
        </div>

        {/* Görseller */}
        <img src={urlFor(property.mainImage).url()} className="main-img" alt={property.title} />
        <div className="gallery-grid">
          {property.gallery?.map((img, i) => (
            <img key={i} src={urlFor(img).width(400).url()} className="gallery-item" alt="Galeri" />
          ))}
        </div>

        {/* Teknik Bilgi Kartı */}
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Fiyat</span>
            <span className="info-value">{property.price} {property.currency}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Mülk Tipi</span>
            <span className="info-value">{property.propertyType}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Metrekare</span>
            <span className="info-value">{property.area} m²</span>
          </div>
          <div className="info-item">
            <span className="info-label">Oda Sayısı</span>
            <span className="info-value">{property.rooms}</span>
          </div>
        </div>

        {/* Onda Analizi - Rapor Formatı */}
        {property.analysis && (
          <section className="analysis-box">
            <h2 className="analysis-title">ONDA ANALİZİ</h2>
            <div className="analysis-content">
              <PortableText value={property.analysis} />
            </div>
          </section>
        )}

        <div className="action-bar">
          <a href={`https://wa.me/905XXXXXXXXX?text=${property.title} ilanı hakkında bilgi almak istiyorum.`} className="btn-call">BİLGİ AL (WHATSAPP)</a>
          {property.googleMapsUrl && (
            <a href={property.googleMapsUrl} target="_blank" rel="noreferrer" className="btn-maps">KONUMU GÖSTER</a>
          )}
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const property = await client.fetch(`
    *[_type == "property" && slug.current == $slug][0]{
      title,
      location,
      price,
      currency,
      propertyType,
      status,
      area,
      rooms,
      mainImage,
      gallery,
      googleMapsUrl,
      analysis
    }
  `, { slug });

  return {
    props: { property }
  };
}
