import { useState } from 'react';
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import Head from 'next/head';

const client = createClient({ projectId: 'k8cd67dp', dataset: "production", apiVersion: "2023-01-01", useCdn: false });
const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

export default function Home({ properties }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div style={{backgroundColor: '#0a192f', color: '#fff', minHeight: '100vh', fontFamily: 'serif', display: 'flex', flexDirection: 'column'}}>
      <Head>
        <title>Onda Yatırım | Aradığınız her şey ONDA</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <style dangerouslySetInnerHTML={{ __html: `
        .nav-link { color: #fff; text-decoration: none; font-size: 0.8rem; letter-spacing: 2px; transition: 0.3s; }
        .nav-link:hover { color: #d4af37; }
        .hamburger { display: none; cursor: pointer; flex-direction: column; gap: 5px; z-index: 9999; }
        .hamburger div { width: 25px; height: 3px; background: #d4af37; transition: 0.3s; }
        .mobile-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #0a192f; z-index: 9000; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 30px; transform: translateX(100%); transition: 0.4s ease-in-out; }
        .mobile-overlay.active { transform: translateX(0); }
        @media (max-width: 768px) {
          .desktop-links { display: none !important; }
          .hamburger { display: flex !important; }
          .hero-title { font-size: 2.2rem !important; }
        }
      `}} />

      {/* HEADER */}
      <nav style={{padding: '20px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(212,175,55,0.1)', background: '#0a192f', position: 'sticky', top: 0, zIndex: 1000}}>
        <a href="/" style={{display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none'}}>
          <img src="/logo.png" style={{height: '35px'}} alt="Logo" />
          <span style={{color: '#d4af37', fontWeight: 'bold', letterSpacing: '2px'}}>ONDA</span>
        </a>
        <div className="desktop-links" style={{display: 'flex', gap: '25px'}}>
          <a href="/portfolio" className="nav-link">PORTFÖY</a>
          <a href="/about" className="nav-link">HAKKIMIZDA</a>
          <a href="/contact" className="nav-link">İLETİŞİM</a>
        </div>
        <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div style={{transform: isMenuOpen ? 'rotate(45deg) translate(5px, 6px)' : 'none'}}></div>
          <div style={{opacity: isMenuOpen ? 0 : 1}}></div>
          <div style={{transform: isMenuOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'none'}}></div>
        </div>
      </nav>

      {/* MOBILE OVERLAY */}
      <div className={`mobile-overlay ${isMenuOpen ? 'active' : ''}`}>
        <a href="/" style={{color: '#d4af37', fontSize: '1.8rem', textDecoration: 'none'}} onClick={() => setIsMenuOpen(false)}>GİRİŞ</a>
        <a href="/portfolio" style={{color: '#fff', fontSize: '1.8rem', textDecoration: 'none'}} onClick={() => setIsMenuOpen(false)}>PORTFÖY</a>
        <a href="/about" style={{color: '#fff', fontSize: '1.8rem', textDecoration: 'none'}} onClick={() => setIsMenuOpen(false)}>HAKKIMIZDA</a>
        <a href="/contact" style={{color: '#fff', fontSize: '1.8rem', textDecoration: 'none'}} onClick={() => setIsMenuOpen(false)}>İLETİŞİM</a>
      </div>

      <main style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '80px 20px', textAlign: 'center'}}>
        <h1 className="hero-title" style={{fontSize: '3.5rem', color: '#d4af37', fontWeight: '300', letterSpacing: '8px', marginBottom: '20px'}}>ARADIĞINIZ HER ŞEY ONDA</h1>
        <p style={{maxWidth: '600px', color: '#8e8e8e', lineHeight: '1.8', marginBottom: '40px'}}>İzmir ve Ankara merkezli gayrimenkul yatırımında rasyonel analiz ve psikolojik derinlik.</p>
        <a href="/portfolio" style={{padding: '15px 40px', background: '#d4af37', color: '#0a192f', textDecoration: 'none', fontWeight: 'bold', letterSpacing: '2px'}}>PORTFÖYÜ İNCELE</a>
      </main>

      {/* FOOTER */}
      <footer style={{padding: '60px 20px', borderTop: '1px solid rgba(212,175,55,0.1)', textAlign: 'center', background: '#0a192f'}}>
        <div style={{display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '20px', fontSize: '0.8rem'}}>
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
