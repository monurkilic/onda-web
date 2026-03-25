import { useState } from 'react';
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import Head from 'next/head'; // Hata buradaydı, düzeltildi.

const client = createClient({ 
  projectId: 'k8cd67dp', 
  dataset: "production", 
  apiVersion: "2023-01-01", 
  useCdn: false 
});

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

export default function Home({ properties }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div style={{backgroundColor: '#0a192f', color: '#fff', minHeight: '100vh', fontFamily: 'serif', overflowX: 'hidden'}}>
      <Head>
        <title>Onda Yatırım | Aradığınız her şey ONDA</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta property="og:title" content="Onda Yatırım | Aradığınız her şey ONDA" />
        <meta property="og:image" content="https://ondayatirim.com/logo.png" />
      </Head>

      <style dangerouslySetInnerHTML={{ __html: `
        .hamburger { display: none; cursor: pointer; flex-direction: column; gap: 5px; z-index: 2100; padding: 10px; }
        .hamburger div { width: 25px; height: 3px; background: #d4af37; transition: 0.3s; }
        .mobile-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #0a192f; z-index: 2000; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 30px; transform: translateX(100%); transition: 0.4s; }
        .mobile-overlay.active { transform: translateX(0); }
        @media (max-width: 768px) { 
          .hamburger { display: flex !important; } 
          .desktop-links { display: none !important; }
          .hero-title { font-size: 2.2rem !important; letter-spacing: 4px !important; }
        }
      `}} />

      {/* HEADER */}
      <nav style={{padding: '20px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(212,175,55,0.1)', background: '#0a192f', position: 'sticky', top: 0, zIndex: 100}}>
        <a href="/" style={{display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none'}}>
          <img src="/logo.png" style={{height: '35px'}} alt="Logo" />
          <span style={{color: '#d4af37', fontWeight: 'bold', letterSpacing: '2px'}}>ONDA</span>
        </a>
        <div className="desktop-links" style={{display: 'flex', gap: '25px', fontSize: '0.8rem'}}>
          <a href="/portfolio" style={{color: '#fff', textDecoration: 'none'}}>PORTFÖY</a>
          <a href="/about" style={{color: '#fff', textDecoration: 'none'}}>HAKKIMIZDA</a>
          <a href="/contact" style={{color: '#fff', textDecoration: 'none'}}>İLETİŞİM</a>
        </div>
        <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div style={{transform: isMenuOpen ? 'rotate(45deg) translate(5px, 6px)' : 'none'}}></div>
          <div style={{opacity: isMenuOpen ? 0 : 1}}></div>
          <div style={{transform: isMenuOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'none'}}></div>
        </div>
      </nav>

      {/* MOBİL MENÜ KATMANI */}
      <div className={`mobile-overlay ${isMenuOpen ? 'active' : ''}`}>
        <a href="/" style={{color: '#d4af37', fontSize: '1.5rem', textDecoration: 'none'}} onClick={() => setIsMenuOpen(false)}>GİRİŞ</a>
        <a href="/portfolio" style={{color: '#fff', fontSize: '1.5rem', textDecoration: 'none'}} onClick={() => setIsMenuOpen(false)}>PORTFÖY</a>
        <a href="/about" style={{color: '#fff', fontSize: '1.5rem', textDecoration: 'none'}} onClick={() => setIsMenuOpen(false)}>HAKKIMIZDA</a>
        <a href="/contact" style={{color: '#fff', fontSize: '1.5rem', textDecoration: 'none'}} onClick={() => setIsMenuOpen(false)}>İLETİŞİM</a>
      </div>

      {/* HERO SECTION */}
      <section style={{padding: '120px 20px', textAlign: 'center', background: 'radial-gradient(circle, #102a43 0%, #0a192f 100%)'}}>
        <h1 className="hero-title" style={{fontSize: '3.5rem', color: '#d4af37', fontWeight: '300', margin: '0 0 20px 0', letterSpacing: '8px'}}>ARADIĞINIZ HER ŞEY ONDA</h1>
        <p style={{maxWidth: '700px', margin: '0 auto', color: '#8e8e8e', fontSize: '1.1rem', lineHeight: '1.8'}}>
          İzmir ve Ankara merkezli seçkin portföyümüzle gayrimenkulde rasyonel analiz ve kurumsal güvenin adresi.
        </p>
        <div style={{marginTop: '40px'}}>
          <a href="/portfolio" style={{padding: '15px 40px', background: '#d4af37', color: '#0a192f', textDecoration: 'none', fontWeight: 'bold', letterSpacing: '2px'}}>İLANLARI İNCELE</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{padding: '80px 20px', borderTop: '1px solid rgba(212,175,55,0.1)', textAlign: 'center', background: '#0a192f'}}>
        <div style={{display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '30px', fontSize: '0.8rem'}}>
          <a href="/portfolio" style={{color: '#8e8e8e', textDecoration: 'none'}}>PORTFÖY</a>
          <a href="/about" style={{color: '#8e8e8e', textDecoration: 'none'}}>HAKKIMIZDA</a>
          <a href="/contact" style={{color: '#8e8e8e', textDecoration: 'none'}}>İLETİŞİM</a>
        </div>
        <p style={{fontSize: '0.7rem', opacity: 0.4, letterSpacing: '2px'}}>© 2026 ONDA YATIRIM | İzmir - Ankara</p>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const properties = await client.fetch(`*[_type == "property"]`);
  return { props: { properties }, revalidate: 10 };
}
