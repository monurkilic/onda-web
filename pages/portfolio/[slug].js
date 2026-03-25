import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import Head from 'next/head';

const client = createClient({ projectId: 'k8cd67dp', dataset: "production", apiVersion: "2023-01-01", useCdn: false });
const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

export default function PropertyDetail({ property }) {
  if (!property) return null;
  const waLink = `https://wa.me/905326466909?text=${encodeURIComponent(`Merhaba, "${property.title}" ilanı hakkında bilgi alabilir miyim?`)}`;

  return (
    <div style={{backgroundColor: '#0a192f', color: '#fff', minHeight: '100vh', fontFamily: 'serif'}}>
      <Head><title>{property.title} | Onda Yatırım</title></Head>
      <nav style={{padding: '20px', borderBottom: '1px solid rgba(212,175,55,0.1)', textAlign: 'center'}}>
        <a href="/" style={{color: '#d4af37', textDecoration: 'none'}}>← ANA SAYFA</a>
      </nav>
      <main style={{maxWidth: '1000px', margin: '0 auto', padding: '60px 20px'}}>
        <img src={urlFor(property.mainImage).width(1200).url()} style={{width: '100%', borderRadius: '4px', marginBottom: '30px'}} />
        <h1 style={{fontSize: '2.5rem', color: '#d4af37', marginBottom: '10px'}}>{property.title}</h1>
        <p style={{fontSize: '1.5rem', color: '#8e8e8e', marginBottom: '40px'}}>{property.location} | {property.price} {property.currency}</p>
        
        <div style={{display: 'flex', gap: '15px', marginBottom: '50px'}}>
          <a href={waLink} target="_blank" style={{flex: 1, textAlign: 'center', padding: '18px', background: '#25D366', color: '#fff', textDecoration: 'none', fontWeight: 'bold'}}>WHATSAPP İLE SOR</a>
          {property.googleMapsUrl && (
            <a href={property.googleMapsUrl} target="_blank" style={{flex: 1, textAlign: 'center', padding: '18px', border: '1px solid #d4af37', color: '#d4af37', textDecoration: 'none'}}>KONUMU GÖR</a>
          )}
        </div>

        <div style={{padding: '40px', background: 'rgba(212, 175, 55, 0.03)', borderLeft: '4px solid #d4af37', marginBottom: '50px'}}>
          <h3 style={{color: '#d4af37', marginTop: 0}}>ONDA ANALİZİ</h3>
          <p style={{lineHeight: '1.9', color: '#ccc', fontStyle: 'italic'}}>"{property.analysis}"</p>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '10px'}}>
          {property.gallery && property.gallery.map((img, i) => (
            <img key={i} src={urlFor(img).width(800).url()} style={{width: '100%', borderRadius: '2px'}} />
          ))}
        </div>
      </main>
      <footer style={{textAlign: 'center', padding: '60px', borderTop: '1px solid rgba(212,175,55,0.1)', opacity: 0.5}}>© 2026 ONDA YATIRIM</footer>
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
