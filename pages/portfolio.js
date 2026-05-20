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
        <title>Güncel Portföyler | M. Onur Kılıç - Keller Williams</title>
        <meta name="description" content="Ege Bölgesi ve Ankara merkezli nitelikli arsa, arazi og lüks gayrimenkul portföyü." />
      </Head>

      <style dangerouslySetInnerHTML={{ __html: `
        .p-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 40px; max-width: 1200px; margin: 120px auto 60px auto; padding: 0 20px; }
        .p-card { background: #1a1a1a; border: 1px solid rgba(189, 30, 36, 0.15); text-decoration: none; transition: 0.4s; position: relative; overflow: hidden; }
        .p-card:hover { border-color: #bd1e24; transform: translateY(-10px); }
        .p-img { width: 100%; height: 250px; object-fit: cover; }
        .p-info { padding: 30px; }
        .p-tag { position: absolute; top: 20px; right: 20px; background: #bd1e24; color: #ffffff; padding: 5px 15px; font-weight: bold; font-size: 0.7rem; letter-spacing: 1px; text-transform: uppercase; }
        @media (max-width: 768px) { .p-grid { grid-template-columns: 1fr; margin-top: 60px; } }
      `}} />

      <h1 style={{ textAlign: 'center', color: '#bd1e24', fontSize: '3rem', fontWeight: '800', margin: '120px 0 20px 0', letterSpacing: '5px' }}>PORTFÖYÜMÜZ</h1>
      <p style={{ textAlign: 'center', color: '#f8f8f8', marginBottom: '40px', letterSpacing: '1px', opacity: 0.8, fontWeight: '500' }}>Rasyonel analizler ve teknik verilerle seçilmiş seçkin mülkler.</p>

      <div className="p-grid">
        {properties && properties.map((prop) => (
          <a href={`/portfolio/${prop.slug?.current}`} key={prop._id} className="p-card">
            <div className="p-tag">İNCELE</div>
            {prop.mainImage && <img src={urlFor(prop.mainImage).width(600).url()} className="p-img" alt={prop.title} />}
            <div className="p-info">
              <h3 style={{ color: '#fff', fontSize: '1.4rem', marginBottom: '10px', fontWeight: '700' }}>{prop.title}</h3>
              <p style={{ color: '#ccc', fontSize: '0.9rem', lineHeight: '1.6', fontWeight: '500' }}>{prop.excerpt}</p>
              <div style={{ marginTop: '20px', color: '#bd1e24', fontWeight: 'bold', fontSize: '0.8rem', letterSpacing: '1px' }}>DETAYLARI GÖR →</div>
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