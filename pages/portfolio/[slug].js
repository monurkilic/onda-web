import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import Head from 'next/head';

const client = createClient({ projectId: 'k8cd67dp', dataset: "production", apiVersion: "2023-01-01", useCdn: false });
const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

export default function PropertyDetail({ property }) {
  if (!property) return null;
  return (
    <div style={{backgroundColor: '#0a192f', color: '#fff', minHeight: '100vh', fontFamily: 'serif'}}>
      <Head><title>{property.title} | Onda Yatırım</title></Head>
      <nav style={{padding: '20px', textAlign: 'center', borderBottom: '1px solid rgba(212,175,55,0.1)'}}>
        <a href="/" style={{color: '#d4af37', textDecoration: 'none', letterSpacing: '2px'}}>← TÜM İLANLARA DÖN</a>
      </nav>
      <main style={{maxWidth: '1000px', margin: '0 auto', padding: '60px 20px'}}>
        <img src={urlFor(property.mainImage).width(1200).url()} style={{width: '100%', borderRadius: '4px', marginBottom: '30px'}} />
        <h1 style={{fontSize: '2.5rem', color: '#d4af37', margin: '0 0 10px 0'}}>{property.title}</h1>
        <p style={{fontSize: '1.8rem', fontWeight: '300', marginBottom: '40px'}}>{property.price} {property.currency}</p>
        
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px', marginBottom: '50px'}}>
          {property.gallery && property.gallery.map((img, i) => (
            <img key={i} src={urlFor(img).width(600).url()} style={{width: '100%', height: '200px', objectFit: 'cover', borderRadius: '2px'}} />
          ))}
        </div>

        <div style={{padding: '40px', background: 'rgba(212, 175, 55, 0.03)', borderLeft: '4px solid #d4af37'}}>
          <h3 style={{color: '#d4af37', marginTop: 0, letterSpacing: '2px'}}>ONDA ANALİZİ</h3>
          <p style={{lineHeight: '1.9', fontSize: '1.1rem', color: '#ccc', fontStyle: 'italic'}}>"{property.analysis}"</p>
        </div>
      </main>
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
