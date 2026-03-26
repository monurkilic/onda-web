import { useState } from 'react';
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import Head from 'next/head';

const client = createClient({ projectId: 'k8cd67dp', dataset: "production", apiVersion: "2023-01-01", useCdn: false });
const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

export default function Portfolio({ properties }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div style={{backgroundColor: '#0a192f', color: '#fff', minHeight: '100vh', fontFamily: 'serif', display: 'flex', flexDirection: 'column'}}>
      <Head><title>Portföy | Onda Yatırım</title></Head>
      <style dangerouslySetInnerHTML={{ __html: `
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 30px; padding: 40px 20px; max-width: 1200px; margin: 0 auto; }
        .hamburger { display: none; cursor: pointer; flex-direction: column; gap: 5px; z-index: 9999; }
        .hamburger div { width: 25px; height: 3px; background: #d4af37; transition: 0.3s; }
        .mobile-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #0a192f; z-index: 9000; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 30px; transform: translateX(100%); transition: 0.4s; }
        .mobile-overlay.active { transform: translateX(0); }
        @media (max-width: 768px) { .desktop-links { display: none !important; } .hamburger { display: flex !important; } .grid { grid-template-columns: 1fr !important; } }
      `}} />

      <nav style={{padding: '20px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(212,175,55,0.1)', background: '#0a192f', position: 'sticky', top: 0, zIndex: 1000}}>
        <a href="/" style={{display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none'}}><img src="/logo.png" style={{height: '35px'}} alt="L" /><span style={{color: '#d4af37', fontWeight: 'bold'}}>ONDA</span></a>
        <div className="desktop-links" style={{display: 'flex', gap: '25px', fontSize: '0.8rem'}}>
          <a href="/" style={{color: '#fff', textDecoration: 'none'}}>GİRİŞ</a>
          <a href="/about" style={{color: '#fff', textDecoration: 'none'}}>HAKKIMIZDA</a>
          <a href="/contact" style={{color: '#fff', textDecoration: 'none'}}>İLETİŞİM</a>
        </div>
        <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div style={{transform: isMenuOpen ? 'rotate(45deg) translate(5px, 6px)' : 'none'}}></div>
          <div style={{opacity: isMenuOpen ? 0 : 1}}></div>
          <div style={{transform: isMenuOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'none'}}></div>
        </div>
      </nav>

      <div className={`mobile-overlay ${isMenuOpen ? 'active' : ''}`}>
        <a href="/" style={{color: '#fff', fontSize: '1.8rem', textDecoration: 'none'}}>GİRİŞ</a>
        <a href="/portfolio" style={{color: '#d4af37', fontSize: '1.8rem', textDecoration: 'none'}}>PORTFÖY</a>
        <a href="/contact" style={{color: '#fff', fontSize: '1.8rem', textDecoration: 'none'}}>İLETİŞİM</a>
      </div>

      <main style={{flex: 1}}>
        <h1 style={{textAlign: 'center', color: '#d4af37', margin: '60px 0 20px 0', fontSize: '2rem', letterSpacing: '4px'}}>SEÇKİN PORTFÖYÜMÜZ</h1>
        <div className="grid">
          {properties && properties.map((item) => (
            <div key={item._id} style={{background: '#0d223f', border: '1px solid rgba(212, 175, 55, 0.1)'}}>
              <a href={`/portfolio/${item.slug?.current}`} style={{textDecoration: 'none', color: 'inherit'}}>
                <div style={{height: '240px'}}><img src={urlFor(item.mainImage).width(600).url()} style={{width: '100%', height: '100%', objectFit: 'cover'}} alt="m" /></div>
                <div style={{padding: '25px'}}>
                  <h3 style={{fontSize: '1.1rem', marginBottom: '10px', color: '#fff'}}>{item.title}</h3>
                  <p style={{color: '#d4af37', fontSize: '1.3rem', fontWeight: 'bold'}}>{item.price} {item.currency}</p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </main>

      <footer style={{padding: '60px 20px', borderTop: '1px solid rgba(212,175,55,0.1)', textAlign: 'center', background: '#0a192f'}}>
        <p style={{fontSize: '0.7rem', opacity: 0.4}}>© 2026 ONDA YATIRIM</p>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const properties = await client.fetch(`*[_type == "property"] | order(_createdAt desc)`);
  return { props: { properties }, revalidate: 10 };
}
