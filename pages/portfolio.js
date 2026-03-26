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
        <title>Portföy | Onda Yatırım</title>
        <meta name="description" content="Onda Yatırım güncel gayrimenkul portföyü. İzmir ve Ankara'da rasyonel yatırım fırsatları." />
      </Head>

      <style dangerouslySetInnerHTML={{ __html: `
        .prop-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 30px; padding: 40px 20px; max-width: 1200px; margin: 0 auto; }
        .prop-card { background: #0d223f; border: 1px solid rgba(212,175,55,0.1); overflow: hidden; transition: 0.3s; text-decoration: none; display: flex; flex-direction: column; }
        .prop-card:hover { border-color: #d4af37; transform: translateY(-5px); }
        @media (max-width: 768px) { .prop-grid { grid-template-columns: 1fr; } }
      `}} />

      <main style={{ flex: 1 }}>
        <h1 style={{ textAlign: 'center', color: '#d4af37', margin: '60px 0 20px 0', letterSpacing: '4px', fontWeight: '300' }}>GÜNCEL PORTFÖY</h1>
        <p style={{ textAlign: 'center', color: '#8e8e8e', marginBottom: '40px' }}>Rasyonel analizlerle seçilmiş yatırım fırsatları.</p>
        
        <div className="prop-grid">
          {properties && properties.map((prop) => (
            <a href={`/property/${prop.slug?.current}`} key={prop._id} className="prop-card">
              <img src={urlFor(prop.mainImage).width(600).url()} style={{ width: '100%', height: '220px', objectFit: 'cover' }} alt={prop.title} />
              <div style={{ padding: '25px', flex: 1 }}>
                <h3 style={{ color: '#d4af37', marginBottom: '10px', fontSize: '1.1rem' }}>{prop.title}</h3>
                <p style={{ color: '#ccc', fontSize: '0.85rem' }}>{prop.location}</p>
                <p style={{ color: '#fff', fontWeight: 'bold', marginTop: '15px' }}>{prop.price} {prop.currency}</p>
              </div>
            </a>
          ))}
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const properties = await client.fetch(`*[_type == "property"]`);
  return { props: { properties }, revalidate: 10 };
}
