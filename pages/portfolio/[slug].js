import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import Head from 'next/head';
import { useRouter } from 'next/router';

const client = createClient({ 
  projectId: 'k8cd67dp', 
  dataset: "production", 
  apiVersion: "2023-01-01", 
  useCdn: false 
});
const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

export default function PropertyDetail({ property }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div style={{textAlign: 'center', padding: '100px', color: '#d4af37', fontSize: '1.5rem'}}>Analiz Raporu Hazırlanıyor...</div>;
  }

  if (!property) {
    return <div style={{textAlign: 'center', padding: '100px', color: '#fff'}}>İlan bulunamadı.</div>;
  }

  // Bilgi satırı bileşeni
  const InfoRow = ({ label, value }) => value ? (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(212,175,55,0.1)' }}>
      <span style={{ color: '#d4af37', fontWeight: 'bold', fontSize: '0.9rem', textTransform: 'uppercase' }}>{label}</span>
      <span style={{ color: '#fff', fontSize: '1rem' }}>{value}</span>
    </div>
  ) : null;

  return (
    <>
      <Head>
        <title>{property.title} | ONDA YATIRIM</title>
        <meta name="description" content={property.excerpt || "Lüks gayrimenkul portföyü."} />
      </Head>

      <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
        <h1 style={{ color: '#d4af37', fontSize: '2.8rem', marginBottom: '10px', fontWeight: '300', letterSpacing: '2px' }}>{property.title}</h1>
        <p style={{ color: '#8e8e8e', marginBottom: '30px', fontSize: '1.1rem' }}>{property.location || "Konum Belirtilmedi"}</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
          {/* Sol Sütun: Fotoğraflar */}
          <div>
            {property.mainImage && (
              <img 
                src={urlFor(property.mainImage).width(800).url()} 
                style={{ width: '100%', borderRadius: '4px', border: '1px solid rgba(212,175,55,0.2)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }} 
                alt={property.title} 
              />
            )}
          </div>
          
          {/* Sağ Sütun: Teknik Veriler & Analiz */}
          <div style={{ background: 'rgba(13,34,63,0.5)', padding: '40px', border: '1px solid rgba(212,175,55,0.1)', backdropFilter: 'blur(10px)' }}>
            <h2 style={{ color: '#d4af37', fontSize: '1.4rem', marginBottom: '20px', borderBottom: '2px solid #d4af37', paddingBottom: '10px', letterSpacing: '1px' }}>TEKNİK VERİLER</h2>
            
            <div style={{ marginBottom: '30px' }}>
              <InfoRow label="Satış Fiyatı" value={property.price ? `${property.price} ₺` : null} />
              <InfoRow label="Metrekare (Brüt)" value={property.sqm ? `${property.sqm} m²` : null} />
              <InfoRow label="Oda Sayısı" value={property.rooms} />
              <InfoRow label="Bulunduğu Kat" value={property.floor} />
              <InfoRow label="Bina Yaşı" value={property.age} />
              <InfoRow label="Isınma Tipi" value={property.heating} />
              <InfoRow label="Kira Getirisi (Tahmini)" value={property.rentalIncome ? `${property.rentalIncome} ₺` : null} />
              <InfoRow label="Takyidat Durumu" value={property.encumbrance || "Temiz"} />
            </div>

            <h2 style={{ color: '#d4af37', fontSize: '1.4rem', marginBottom: '20px', borderBottom: '1px solid rgba(212,175,55,0.2)', paddingBottom: '10px', letterSpacing: '1px' }}>EKSPERTİZ ANALİZİ</h2>
            <div style={{ color: '#ccc', lineHeight: '1.8', fontSize: '1.05rem', whiteSpace: 'pre-wrap' }}>
              {property.description || property.excerpt}
            </div>
            
            <div style={{ marginTop: '40px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <a href="https://wa.me/905326466909" target="_blank" rel="noreferrer" style={{ background: '#d4af37', color: '#0a192f', padding: '18px 35px', textDecoration: 'none', fontWeight: 'bold', letterSpacing: '1px' }}>DETAYLI SUNUM AL</a>
              <a href="/portfolio" style={{ color: '#8e8e8e', textDecoration: 'underline', alignSelf: 'center' }}>PORTFÖYE DÖN</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const paths = await client.fetch(`*[_type == "property" && defined(slug.current)][].slug.current`);
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const property = await client.fetch(`*[_type == "property" && slug.current == $slug][0]`, { slug: params.slug });
  if (!property) return { notFound: true };
  return { props: { property }, revalidate: 10 };
}
