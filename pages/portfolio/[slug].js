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
  if (!property) return <div style={{ color: '#fff', textAlign: 'center', padding: '100px' }}>İlan bulunamadı.</div>;

  return (
    <>
      <Head>
        <title>{property.title || 'İlan'} | Onda Yatırım</title>
      </Head>

      <style dangerouslySetInnerHTML={{ __html: `
        .detail-container { max-width: 1000px; margin: 120px auto; padding: 0 20px; color: #fff; font-family: sans-serif; }
        .detail-header { border-bottom: 1px solid rgba(212,175,55,0.2); padding-bottom: 20px; margin-bottom: 40px; }
        .detail-title { font-size: 2rem; font-weight: 300; letter-spacing: 2px; }
        .main-img { width: 100%; height: auto; max-height: 60vh; object-fit: cover; border: 1px solid rgba(212,175,55,0.2); margin-bottom: 20px; }
        .info-grid { display: grid; grid-template-cols: repeat(4, 1fr); gap: 15px; background: rgba(13,34,63,0.4); padding: 25px; border: 1px solid rgba(212,175,55,0.1); margin-bottom: 50px; }
        .info-item { text-align: center; }
        .info-label { color: #8e8e8e; font-size: 0.65rem; letter-spacing: 2px; text-transform: uppercase; display: block; margin-bottom: 5px; }
        .info-value { color: #d4af37; font-size: 1.1rem; font-weight: bold; }
        .analysis-box { background: #fff; color: #0a192f; padding: 40px; border-left: 5px solid #d4af37; line-height: 1.7; margin-top: 50px; }
        .analysis-title { font-size: 1.5rem; margin-bottom: 20px; border-bottom: 2px solid #0a192f; display: inline-block; }
        @media (max-width: 768px) { .info-grid { grid-template-cols: repeat(2, 1fr); } .detail-title { font-size: 1.5rem; } }
      `}} />

      <main className="detail-container">
        <div className="detail-header">
          <h1 className="detail-title">{property.title}</h1>
          <p style={{color: '#d4af37', marginTop: '10px'}}>{property.location}</p>
        </div>

        {property.mainImage && (
          <img src={urlFor(property.mainImage).url()} className="main-img" alt={property.title} />
        )}

        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Fiyat</span>
            <span className="info-value">{property.price} {property.currency}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Mülk Tipi</span>
            <span className="info-value">{property.propertyType || '-'}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Metrekare</span>
            <span className="info-value">{property.area ? `${property.area} m²` : '-'}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Oda Sayısı</span>
            <span className="info-value">{property.rooms || '-'}</span>
          </div>
        </div>

        {property.analysis && Array.isArray(property.analysis) && (
          <section className="analysis-box">
            <h2 className="analysis-title">ONDA ANALİZİ</h2>
            <div className="analysis-content">
              <PortableText value={property.analysis} />
            </div>
          </section>
        )}

        <div style={{ marginTop: '50px', display: 'flex', gap: '15px' }}>
          <a href="https://wa.me/905XXXXXXXXX" style={{ flex: 1, background: '#d4af37', color: '#0a192f', padding: '18px', textAlign: 'center', textDecoration: 'none', fontWeight: 'bold' }}>
            BİLGİ AL
          </a>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const { slug } = params;
    const property = await client.fetch(`
      *[_type == "property" && slug.current == $slug][0]{
        title, location, price, currency, propertyType, area, rooms, mainImage, gallery, googleMapsUrl, analysis
      }
    `, { slug });

    return { props: { property: property || null } };
  } catch (error) {
    return { props: { property: null } };
  }
}
