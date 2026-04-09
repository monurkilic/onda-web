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

// BURAYI DÜZENLE: WhatsApp numaranı 905... şeklinde boşluksuz yaz
const MY_PHONE_NUMBER = "905XXXXXXXXX"; 

export default function PropertyDetail({ property }) {
  if (!property) return <div style={{ color: '#fff', textAlign: 'center', padding: '100px' }}>İlan yükleniyor...</div>;

  const shareMessage = encodeURIComponent(`Merhaba, ondayatirim.com üzerinden "${property.title}" ilanınızla ilgili bilgi almak istiyorum.`);
  const whatsappUrl = `https://wa.me/${MY_PHONE_NUMBER}?text=${shareMessage}`;

  // Harita linkini iframe için düzenleme (Basit bir çözüm)
  const getMapEmbedUrl = (url) => {
    if (!url) return null;
    // Eğer link bir paylaşım linkiyse, embed formatına çevirmeye çalışıyoruz
    return url.replace("maps/place", "maps/embed/v1/place");
  };

  return (
    <>
      <Head>
        <title>{property.title} | Onda Yatırım</title>
        <meta name="description" content={`${property.location} lokasyonunda ${property.propertyType} fırsatı.`} />
      </Head>

      <style dangerouslySetInnerHTML={{ __html: `
        .detail-container { max-width: 1000px; margin: 120px auto; padding: 0 20px; color: #fff; font-family: sans-serif; }
        .detail-header { border-bottom: 1px solid rgba(212,175,55,0.2); padding-bottom: 20px; margin-bottom: 40px; }
        .detail-title { font-size: 2.2rem; font-weight: 300; letter-spacing: 2px; line-height: 1.2; }
        .detail-loc { color: #d4af37; font-size: 1rem; letter-spacing: 2px; text-transform: uppercase; margin-top: 10px; }
        
        .main-img-box { width: 100%; border: 1px solid rgba(212,175,55,0.2); margin-bottom: 20px; overflow: hidden; }
        .main-img { width: 100%; height: auto; display: block; object-fit: contain; }
        
        .gallery-grid { display: grid; grid-template-cols: repeat(4, 1fr); gap: 10px; margin-bottom: 60px; }
        .gallery-item { width: 100%; aspect-ratio: 4/3; object-fit: cover; border: 1px solid rgba(255,255,255,0.1); }

        .info-grid { display: grid; grid-template-cols: repeat(4, 1fr); gap: 15px; background: rgba(13,34,63,0.5); padding: 25px; border: 1px solid rgba(212,175,55,0.1); margin-bottom: 50px; }
        .info-item { text-align: center; border-right: 1px solid rgba(212,175,55,0.1); }
        .info-item:last-child { border-right: none; }
        .info-label { color: #8e8e8e; font-size: 0.65rem; letter-spacing: 1px; text-transform: uppercase; display: block; margin-bottom: 5px; }
        .info-value { color: #d4af37; font-size: 1rem; font-weight: bold; }

        .analysis-box { background: #fff; color: #0a192f; padding: 50px; border-left: 6px solid #d4af37; line-height: 1.8; margin-bottom: 60px; }
        .analysis-title { color: #0a192f; font-size: 1.6rem; margin-bottom: 25px; font-weight: 700; border-bottom: 3px solid #0a192f; display: inline-block; }

        /* Harita Bölümü */
        .map-section { margin-bottom: 60px; }
        .map-title { color: #d4af37; font-size: 1rem; letter-spacing: 3px; margin-bottom: 20px; text-transform: uppercase; }
        .map-frame { width: 100%; height: 400px; border: 1px solid rgba(212,175,55,0.2); filter: grayscale(1) invert(1) contrast(0.9); }

        .btn-whatsapp { display: block; background: #25D366; color: #fff; padding: 20px; text-align: center; text-decoration: none; font-weight: bold; letter-spacing: 2px; border-radius: 4px; }

        @media (max-width: 768px) {
          .info-grid { grid-template-cols: repeat(2, 1fr); }
          .gallery-grid { grid-template-cols: repeat(2, 1fr); }
          .map-frame { height: 300px; }
        }
      `}} />

      <main className="detail-container">
        <header className="detail-header">
          <h1 className="detail-title">{property.title}</h1>
          <p className="detail-loc">{property.location}</p>
        </header>

        <img src={urlFor(property.mainImage).url()} className="main-img" alt={property.title} />
        
        <div className="gallery-grid">
          {property.gallery?.map((img, i) => (
            <img key={i} src={urlFor(img).width(600).url()} className="gallery-item" alt="Galeri" />
          ))}
        </div>

        <div className="info-grid">
          <div className="info-item"><span className="info-label">Fiyat</span><span className="info-value">{property.price} {property.currency}</span></div>
          <div className="info-item"><span className="info-label">Mülk Tipi</span><span className="info-value">{property.propertyType}</span></div>
          <div className="info-item"><span className="info-label">Metrekare</span><span className="info-value">{property.area} m²</span></div>
          <div className="info-item"><span className="info-label">Oda Sayısı</span><span className="info-value">{property.rooms}</span></div>
        </div>

        {property.analysis && (
          <section className="analysis-box">
            <h2 className="analysis-title">ONDA ANALİZİ</h2>
            <div className="analysis-content">
              <PortableText value={property.analysis} />
            </div>
          </section>
        )}

        {/* Canlı Harita Bölümü */}
        {property.googleMapsUrl && (
          <section className="map-section">
            <h3 className="map-title">MÜLK KONUMU</h3>
            <iframe 
              className="map-frame"
              src={`https://www.google.com/maps/embed/v1/place?key=SENIN_GOOGLE_MAPS_API_KEYIN&q=${encodeURIComponent(property.location)}`}
              allowFullScreen
            ></iframe>
          </section>
        )}

        <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-whatsapp">
          WHATSAPP İLE BİLGİ AL
        </a>
      </main>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const property = await client.fetch(`
    *[_type == "property" && slug.current == $slug][0]{
      title, location, price, currency, propertyType, area, rooms, mainImage, gallery, analysis, googleMapsUrl
    }
  `, { slug });
  return { props: { property } };
}
