import { useState } from 'react';
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import Head from 'next/head';

const client = createClient({ projectId: 'k8cd67dp', dataset: "production", apiVersion: "2023-01-01", useCdn: false });
const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

export default function Home({ properties }) {
  const [lightboxImg, setLightboxImg] = useState(null);

  return (
    <div style={{backgroundColor: '#0a192f', color: '#fff', minHeight: '100vh', fontFamily: 'serif'}}>
      <Head><title>Onda Yatırım | Portföy</title></Head>

      {/* LIGHTBOX MODAL */}
      {lightboxImg && (
        <div onClick={() => setLightboxImg(null)} style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.9)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out'}}>
          <img src={lightboxImg} style={{maxWidth: '90% textDecoration', maxHeight: '90%', border: '2px solid #d4af37'}} />
          <span style={{position: 'absolute', top: 20, right: 30, color: '#fff', fontSize: '30px'}}>×</span>
        </div>
      )}

      {/* NAVİGASYON */}
      <nav style={{position: 'sticky', top: 0, zIndex: 100, background: 'rgba(10, 25, 47, 0.95)', borderBottom: '1px solid rgba(212, 175, 55, 0.1)', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
          <img src="/logo.png" style={{height: '40px'}} />
          <span style={{color: '#d4af37', fontWeight: 'bold', fontSize: '1.2rem'}}>ONDA</span>
        </div>
        <div style={{display: 'flex', gap: '30px', fontSize: '0.8rem', letterSpacing: '2px'}}>
          <a href="#portfolio" style={{color: '#fff', textDecoration: 'none'}}>İLANLAR</a>
          <a href="/contact" style={{color: '#fff', textDecoration: 'none'}}>İLETİŞİM</a>
        </div>
      </nav>

      {/* İLANLAR GRİDİ */}
      <main id="portfolio" style={{maxWidth: '1300px', margin: '0 auto', padding: '80px 20px'}}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '50px'}}>
          {properties.map((item) => (
            <div key={item._id} style={{background: '#0d223f', border: '1px solid rgba(212, 175, 55, 0.1)', borderRadius: '2px', overflow: 'hidden'}}>
              {/* RESME TIKLAYINCA BÜYÜR */}
              <div onClick={() => setLightboxImg(urlFor(item.mainImage).width(1200).url())} style={{height: '300px', cursor: 'zoom-in', overflow: 'hidden'}}>
                <img src={urlFor(item.mainImage).width(800).url()} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
              </div>
              <div style={{padding: '35px'}}>
                {/* BAŞLIĞA TIKLAYINCA DETAY SAYFASI AÇILIR */}
                <a href={`/portfolio/${item.slug.current}`} target="_blank" rel="noreferrer" style={{textDecoration: 'none'}}>
                   <h2 style={{fontSize: '1.6rem', color: '#fff', margin: '0 0 15px 0', cursor: 'pointer'}}>{item.title}</h2>
                </a>
                <p style={{fontSize: '1.5rem', color: '#d4af37', marginBottom: '25px'}}>{item.price} {item.currency}</p>
                <a href={`/portfolio/${item.slug.current}`} target="_blank" rel="noreferrer" style={{display: 'block', textAlign: 'center', padding: '15px', background: '#d4af37', color: '#0a192f', textDecoration: 'none', fontWeight: 'bold'}}>DETAYLARI GÖR</a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const properties = await client.fetch(`*[_type == "property"]`);
  return { props: { properties }, revalidate: 10 };
}
