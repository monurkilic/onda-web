import { useState } from 'react';
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import Head from 'next/head';

const client = createClient({ projectId: 'k8cd67dp', dataset: "production", apiVersion: "2023-01-01", useCdn: false });
const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

// Sosyal Medya İkon Bileşeni (SVG)
const SocialIcons = ({ color = "#d4af37", size = 20 }) => (
  <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
    <a href="https://www.instagram.com/ondayatirim" target="_blank" rel="noreferrer" style={{ color: color }}>
      <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
    </a>
    <a href="https://www.facebook.com/profile.php?id=61579458574677" target="_blank" rel="noreferrer" style={{ color: color }}>
      <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
    </a>
    <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ color: color }}>
      <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
    </a>
  </div>
);

export default function Home({ properties }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div style={{backgroundColor: '#0a192f', color: '#fff', minHeight: '100vh', fontFamily: 'serif', display: 'flex', flexDirection: 'column', overflowX: 'hidden'}}>
      <Head>
        <title>Onda Yatırım | Aradığınız her şey ONDA</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="google-site-verification" content="fNf4nfB1gCy8OW-VxDDD4fIa0rzdCEPOoLazxRLEOx4" />
      </Head>

      <style dangerouslySetInnerHTML={{ __html: `
        .hamburger { display: none; cursor: pointer; flex-direction: column; gap: 5px; z-index: 9999; }
        .hamburger div { width: 25px; height: 3px; background: #d4af37; transition: 0.3s; }
        .mobile-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #0a192f; z-index: 9000; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 30px; transform: translateX(100%); transition: 0.4s ease-in-out; }
        .mobile-overlay.active { transform: translateX(0); }
        @media (max-width: 768px) {
          .desktop-links, .desktop-social { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}} />

      {/* HEADER */}
      <nav style={{padding: '20px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(212,175,55,0.1)', background: '#0a192f', position: 'sticky', top: 0, zIndex: 1000}}>
        <a href="/" style={{display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none'}}>
          <img src="/logo.png" style={{height: '35px'}} alt="Logo" />
          <span style={{color: '#d4af37', fontWeight: 'bold', letterSpacing: '2px'}}>ONDA</span>
        </a>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          <div className="desktop-links" style={{display: 'flex', gap: '25px'}}>
            <a href="/portfolio" style={{color: '#fff', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '1px'}}>PORTFÖY</a>
            <a href="/about" style={{color: '#fff', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '1px'}}>HAKKIMIZDA</a>
            <a href="/contact" style={{color: '#fff', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '1px'}}>İLETİŞİM</a>
          </div>
          <div className="desktop-social">
            <SocialIcons />
          </div>
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
        <div style={{ marginTop: '20px' }}>
          <SocialIcons size={28} />
        </div>
      </div>

      <main style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '100px 20px', textAlign: 'center'}}>
        <h1 style={{fontSize: '3.5rem', color: '#d4af37', fontWeight: '300', letterSpacing: '8px', marginBottom: '20px', textTransform: 'uppercase'}}>ARADIĞINIZ HER ŞEY ONDA</h1>
        <p style={{maxWidth: '650px', color: '#8e8e8e', lineHeight: '2', marginBottom: '40px'}}>İzmir ve Ankara'nın en seçkin portföyü ile rasyonel analiz ve psikolojik derinlik.</p>
        <a href="/portfolio" style={{padding: '15px 40px', background: '#d4af37', color: '#0a192f', textDecoration: 'none', fontWeight: 'bold', letterSpacing: '2px'}}>PORTFÖYÜ İNCELE</a>
      </main>

      {/* FOOTER */}
      <footer style={{padding: '60px 20px', borderTop: '1px solid rgba(212,175,55,0.1)', textAlign: 'center', background: '#0a192f'}}>
        <div style={{display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '30px', fontSize: '0.8rem'}}>
          <a href="/portfolio" style={{color: '#8e8e8e', textDecoration: 'none'}}>PORTFÖY</a>
          <a href="/about" style={{color: '#8e8e8e', textDecoration: 'none'}}>HAKKIMIZDA</a>
          <a href="/contact" style={{color: '#8e8e8e', textDecoration: 'none'}}>İLETİŞİM</a>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
          <SocialIcons size={24} />
        </div>
        <p style={{fontSize: '0.7rem', opacity: 0.4, letterSpacing: '2px'}}>© 2026 ONDA YATIRIM | Aradığınız her şey ONDA</p>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const properties = await client.fetch(`*[_type == "property"]`);
  return { props: { properties }, revalidate: 10 };
}
