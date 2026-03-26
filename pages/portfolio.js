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

export default function Portfolio({ properties }) {
  return (
    <>
      <Head>
        <title>Portföy | ONDA YATIRIM</title>
        <meta name="description" content="İzmir ve Ankara merkezli lüks gayrimenkul portföyü." />
      </Head>

      <style dangerouslySetInnerHTML={{ __html: `
        .p-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 40px; max-width: 1200px; margin: 60px auto; padding: 0 20px; }
        .p-card { background: #0d223f; border: 1px solid rgba(212,175,55,0.1); text-decoration: none; transition: 0.4s; position: relative; overflow: hidden; }
        .p-card:hover { border-color: #d4af37; transform: translateY(-10px); }
        .p-img { width: 100%; height: 250px; object-fit: cover; }
        .p-info { padding: 30px; }
        .p-tag { position: absolute; top: 20px; right: 20px; background: #d4af37; color: #0a192f; padding: 5px 15px; font-weight: bold; font-size: 0.7rem; letter-spacing: 1px; }
        @media (max-width: 768px) { .p-grid { grid-template-columns: 1fr; } }
      `}} />

      <h1 style={{ textAlign: 'center', color: '#d4af37', fontSize: '3rem', fontWeight: '300', margin: '60px 0 20px 0', letterSpacing: '5px' }}>PORTFÖY</h1>
      <p style={{ textAlign: 'center', color: '#8e8e8e', marginBottom: '40px', letterSpacing: '1px' }}>Rasyonel analizlerle seçilmiş seçkin mülkler.</p>

      <div className="p-grid">
        {properties && properties.map((prop) => (
          <a href={`/portfolio/${prop.slug?.current}`} key={prop._id} className="p-card">
            <div className="p-tag">İNCELE</div>
            {prop.mainImage && <img src={urlFor(prop.mainImage).width(600).url()} className="p-img" alt={prop.title} />}
            <div className="p-info">
              <h3 style={{ color: '#fff', fontSize: '1.4rem', marginBottom: '10px' }}>{prop.title}</h3>
              <p style={{ color: '#8e8e8e', fontSize: '0.9rem', lineHeight: '1.6' }}>{prop.excerpt}</p>
              <div style={{ marginTop: '20px', color: '#d4af37', fontWeight: 'bold', fontSize: '0.8rem' }}>DETAYLARI GÖR →</div>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const properties = await client.fetch(`*[_type == "property"] | order(_createdAt desc)`);
  return { props: { properties }, revalidate: 10 };
}
