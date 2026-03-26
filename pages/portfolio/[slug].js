import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import Head from 'next/head';

const client = createClient({ 
  projectId: 'k8cd67dp', 
  dataset: "production", 
  apiVersion: "2023-01-01", 
  useCdn: false 
});
const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

export default function PropertyDetail({ property }) {
  if (!property) return <div style={{textAlign: 'center', padding: '100px', color: '#fff'}}>Yükleniyor...</div>;

  return (
    <>
      <Head>
        <title>{property.title} | ONDA YATIRIM</title>
        <meta name="description" content={property.excerpt || "Lüks gayrimenkul portföyü."} />
      </Head>

      <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px' }}>
        <h1 style={{ color: '#d4af37', fontSize: '2.5rem', marginBottom: '30px', fontWeight: '300' }}>{property.title}</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }}>
          {property.mainImage && (
            <img 
              src={urlFor(property.mainImage).width(1200).url()} 
              style={{ width: '100%', borderRadius: '4px', border: '1px solid rgba(212,175,55,0.2)' }} 
              alt={property.title} 
            />
          )}
          
          <div style={{ background: 'rgba(13,34,63,0.5)', padding: '40px', border: '1px solid rgba(212,175,55,0.1)' }}>
            <h2 style={{ color: '#d4af37', fontSize: '1.4rem', marginBottom: '20px', borderBottom: '1px solid rgba(212,175,55,0.2)', paddingBottom: '10px' }}>TEKNİK ANALİZ VE DETAYLAR</h2>
            <div style={{ color: '#fff', lineHeight: '1.8', fontSize: '1.1rem' }}>
              {/* Sanity'den gelen açıklamayı burada gösteriyoruz */}
              <p style={{ whiteSpace: 'pre-wrap' }}>{property.description || property.excerpt}</p>
            </div>
            
            <div style={{ marginTop: '40px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <a href="https://wa.me/905326466909" target="_blank" style={{ background: '#d4af37', color: '#0a192f', padding: '15px 30px', textDecoration: 'none', fontWeight: 'bold' }}>DETAYLI BİLGİ AL</a>
              <a href="/portfolio" style={{ color: '#8e8e8e', padding: '15px 0', textDecoration: 'underline' }}>PORTFÖYE DÖN</a>
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
  return { props: { property }, revalidate: 10 };
}
