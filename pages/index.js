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
    <div style={{backgroundColor: '#0a192f', color: '#fff', minHeight: '100vh', fontFamily: 'serif', overflowX: 'hidden'}}>
      <Head>
        <title>Onda Yatırım | Aradığınız her şey ONDA</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Onda Yatırım | Aradığınız her şey ONDA" />
        <meta property="og:image" content="https://ondayatirim.com/logo.png" />
      </Head>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .hero-title { font-size: 2.2rem !important; letter-spacing: 4px !important; }
          .grid-container { grid-template-columns: 1fr !important; padding: 20px !important; }
        }
      `}} />
      {lightboxImg && (
        <div onClick={() => setLightboxImg(null)} style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.95)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <img src={lightboxImg} style={{maxWidth: '90%', maxHeight: '90%', border: '1px solid #d4af37'}} alt="Büyük" />
        </div>
      )}
      <nav style={{position: 'sticky', top: 0, zIndex: 100, background: 'rgba(10, 25, 47, 0.95)', borderBottom: '1px solid rgba(212,175,55,0.1)', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <a href="/" style={{display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none'}}>
          <img src="/logo.png" style={{height: '35px'}} alt="Logo" />
          <span style={{color: '#d4af37', fontWeight: 'bold', letterSpacing: '2px'}}>ONDA</span>
        </a>
        <div className="nav-links" style={{display: 'flex', gap: '20px', fontSize: '0.8rem'}}>
          <a href="/portfolio" style={{color: '#fff', textDecoration: 'none'}}>PORTFÖY</a>
          <a href="/about" style={{color: '#fff', textDecoration: 'none'}}>HAKKIMIZDA</a>
          <a href="/contact" style={{color: '#fff', textDecoration: 'none'}}>İLETİŞİM</a>
        </div>
      </nav>
      <section style={{padding: '100px 20px', textAlign: 'center', background: 'radial-gradient(circle, #102a43 0%, #0a192f 100%)'}}>
        <h1 className="hero-title" style={{fontSize: '3.5rem', color: '#d4af37', fontWeight: '300', letterSpacing: '8px', textTransform: 'uppercase'}}>ARADIĞINIZ HER ŞEY ONDA</h1>
        <p style={{maxWidth: '700px', margin: '20px auto', color: '#8e8e8e'}}>Gayrimenkulde rasyonel analiz ve kurumsal güvenin adresi.</p>
        <a href="/portfolio" style={{display: 'inline-block', marginTop: '30px', padding: '15px 40px', background: '#d4af37', color: '#0a192f', textDecoration: 'none', fontWeight: 'bold'}}>İLANLARI GÖR</a>
      </section>
      <section className="grid-container" style={{padding: '60px 20px', maxWidth: '1300px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px'}}>
        {properties && properties.slice(0, 3).map((item) => (
          <div key={item._id} style={{background: '#0d223f', border: '1px solid rgba(212, 175, 55, 0.1)', borderRadius: '2px', overflow: 'hidden'}}>
            <div onClick={() => setLightboxImg(urlFor(item.mainImage).url())} style={{height: '280px', cursor: 'zoom-in'}}>
              <img src={urlFor(item.mainImage).width(800).url()} style={{width: '100%', height: '100%', objectFit: 'cover'}} alt={item.title} />
            </div>
            <div style={{padding: '25px'}}>
              <h3 style={{fontSize: '1.3rem', margin: '0 0 10px 0'}}>{item.title}</h3>
              <p style={{color: '#d4af37', fontSize: '1.4rem', fontWeight: 'bold'}}>{item.price} {item.currency}</p>
              <a href={`/portfolio/${item.slug?.current}`} style={{display: 'block', textAlign: 'center', padding: '12px', border: '1px solid #d4af37', color: '#d4af37', textDecoration: 'none', marginTop: '20px', fontSize: '0.8rem'}}>DETAYI GÖR</a>
            </div>
          </div>
        ))}
      </section>
      <footer style={{padding: '60px 20px', borderTop: '1px solid rgba(212,175,55,0.1)', textAlign: 'center', background: '#0a192f'}}>
        <div style={{display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px', fontSize: '0.8rem'}}>
          <a href="/portfolio" style={{color: '#8e8e8e', textDecoration: 'none'}}>PORTFÖY</a>
          <a href="/about" style={{color: '#8e8e8e', textDecoration: 'none'}}>HAKKIMIZDA</a>
          <a href="/contact" style={{color: '#8e8e8e', textDecoration: 'none'}}>İLETİŞİM</a>
        </div>
        <p style={{fontSize: '0.7rem', opacity: 0.4}}>© 2026 ONDA YATIRIM | Aradığınız her şey ONDA</p>
      </footer>
    </div>
  );
}
export async function getStaticProps() {
  const properties = await client.fetch(`*[_type == "property"]`);
  return { props: { properties }, revalidate: 10 };
}
