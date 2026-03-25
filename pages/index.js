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
      <Head><title>Onda Yatırım | Aradığınız her şey ONDA</title></Head>

      {lightboxImg && (
        <div onClick={() => setLightboxImg(null)} style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.9)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out'}}>
          <img src={lightboxImg} style={{maxWidth: '90%', maxHeight: '90%', border: '2px solid #d4af37'}} />
        </div>
      )}

      {/* HEADER */}
      <nav style={{position: 'sticky', top: 0, zIndex: 100, background: 'rgba(10, 25, 47, 0.95)', borderBottom: '1px solid rgba(212,175,55,0.1)', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <a href="/" style={{display: 'flex', alignItems: 'center', gap: '15px', textDecoration: 'none'}}>
          <img src="/logo.png" style={{height: '40px'}} />
          <span style={{color: '#d4af37', fontWeight: 'bold', fontSize: '1.2rem', letterSpacing: '2px'}}>ONDA</span>
        </a>
        <div style={{display: 'flex', gap: '25px', fontSize: '0.8rem', letterSpacing: '1px'}}>
          <a href="/portfolio" style={{color: '#fff', textDecoration: 'none'}}>PORTFÖY</a>
          <a href="/about" style={{color: '#fff', textDecoration: 'none'}}>HAKKIMIZDA</a>
          <a href="/contact" style={{color: '#fff', textDecoration: 'none'}}>İLETİŞİM</a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section style={{padding: '120px 20px', textAlign: 'center', background: 'radial-gradient(circle, #102a43 0%, #0a192f 100%)'}}>
        <h1 style={{fontSize: '3.5rem', color: '#d4af37', fontWeight: '300', letterSpacing: '8px', marginBottom: '20px'}}>ARADIĞINIZ HER ŞEY ONDA</h1>
        <p style={{maxWidth: '700px', margin: '0 auto', color: '#8e8e8e', fontSize: '1.1rem', lineHeight: '1.8'}}>Gayrimenkulde rasyonel analiz ve kurumsal güvenin buluşma noktası.</p>
      </section>

      {/* ÖNE ÇIKAN İLANLAR */}
      <section style={{padding: '80px 20px', maxWidth: '1300px', margin: '0 auto'}}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '40px'}}>
          {properties.slice(0, 3).map((item) => (
            <div key={item._id} style={{background: '#0d223f', border: '1px solid rgba(212, 175, 55, 0.1)', borderRadius: '2px', overflow: 'hidden'}}>
              <div onClick={() => setLightboxImg(urlFor(item.mainImage).width(1200).url())} style={{height: '280px', cursor: 'zoom-in'}}>
                <img src={urlFor(item.mainImage).width(800).url()} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
              </div>
              <div style={{padding: '30px'}}>
                <h3 style={{fontSize: '1.4rem', margin: '0 0 10px 0'}}>{item.title}</h3>
                <p style={{color: '#d4af37', fontSize: '1.3rem', marginBottom: '20px'}}>{item.price} {item.currency}</p>
                <a href={`/portfolio/${item.slug.current}`} style={{display: 'block', textAlign: 'center', padding: '15px', background: '#d4af37', color: '#0a192f', textDecoration: 'none', fontWeight: 'bold'}}>DETAYI GÖR</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{padding: '60px 20px', borderTop: '1px solid rgba(212,175,55,0.1)', textAlign: 'center', background: '#0d223f'}}>
        <div style={{display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '30px', fontSize: '0.8rem'}}>
          <a href="/" style={{color: '#8e8e8e', textDecoration: 'none'}}>ANA SAYFA</a>
          <a href="/portfolio" style={{color: '#8e8e8e', textDecoration: 'none'}}>PORTFÖY</a>
          <a href="/about" style={{color: '#8e8e8e', textDecoration: 'none'}}>HAKKIMIZDA</a>
          <a href="/contact" style={{color: '#8e8e8e', textDecoration: 'none'}}>İLETİŞİM</a>
        </div>
        <p style={{fontSize: '0.7rem', opacity: 0.5}}>© 2026 ONDA YATIRIM | İzmir - Ankara | Aradığınız her şey ONDA</p>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const properties = await client.fetch(`*[_type == "property"]`);
  return { props: { properties }, revalidate: 10 };
}
