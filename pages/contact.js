import { useState } from 'react';
import Head from 'next/head';

const SocialIcons = ({ size = 20 }) => (
  <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
    <a href="https://www.instagram.com/ondayatirim" target="_blank" rel="noreferrer" style={{ color: '#d4af37' }}><svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
    <a href="https://www.facebook.com/profile.php?id=61579458574677" target="_blank" rel="noreferrer" style={{ color: '#d4af37' }}><svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg></a>
  </div>
);

export default function Contact() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div style={{backgroundColor: '#0a192f', color: '#fff', minHeight: '100vh', fontFamily: 'serif', display: 'flex', flexDirection: 'column'}}>
      <Head><title>İletişim | Onda Yatırım</title><meta name="viewport" content="width=device-width, initial-scale=1" /></Head>
      <style dangerouslySetInnerHTML={{ __html: `
        .hamburger { display: none; cursor: pointer; flex-direction: column; gap: 5px; z-index: 9999; }
        .hamburger div { width: 25px; height: 3px; background: #d4af37; transition: 0.3s; }
        .mobile-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #0a192f; z-index: 9000; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 30px; transform: translateX(100%); transition: 0.4s; }
        .mobile-overlay.active { transform: translateX(0); }
        @media (max-width: 768px) { .desktop-nav { display: none !important; } .hamburger { display: flex !important; .map-c { height: 300px !important; } }
      `}} />

      <nav style={{padding: '20px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(212,175,55,0.1)', background: '#0a192f', position: 'sticky', top: 0, zIndex: 1000}}>
        <a href="/" style={{display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none'}}><img src="/logo.png" style={{height: '35px'}} alt="L" /><span style={{color: '#d4af37', fontWeight: 'bold'}}>ONDA</span></a>
        <div className="desktop-nav" style={{display: 'flex', gap: '20px', fontSize: '0.75rem'}}>
          <a href="/portfolio" style={{color: '#fff', textDecoration: 'none'}}>PORTFÖY</a>
          <a href="/valuation" style={{color: '#fff', textDecoration: 'none'}}>MÜLK DEĞERLEME</a>
          <a href="/about" style={{color: '#fff', textDecoration: 'none'}}>HAKKIMIZDA</a>
          <a href="/contact" style={{color: '#d4af37', textDecoration: 'none'}}>İLETİŞİM</a>
        </div>
        <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div style={{transform: isMenuOpen ? 'rotate(45deg) translate(5px, 6px)' : 'none'}}></div>
          <div style={{opacity: isMenuOpen ? 0 : 1}}></div>
          <div style={{transform: isMenuOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'none'}}></div>
        </div>
      </nav>

      <div className={`mobile-overlay ${isMenuOpen ? 'active' : ''}`}>
        <a href="/portfolio" style={{color: '#fff', fontSize: '1.5rem', textDecoration: 'none'}} onClick={() => setIsMenuOpen(false)}>PORTFÖY</a>
        <a href="/valuation" style={{color: '#fff', fontSize: '1.5rem', textDecoration: 'none'}} onClick={() => setIsMenuOpen(false)}>MÜLK DEĞERLEME</a>
        <a href="/about" style={{color: '#fff', fontSize: '1.5rem', textDecoration: 'none'}} onClick={() => setIsMenuOpen(false)}>HAKKIMIZDA</a>
        <a href="/contact" style={{color: '#d4af37', fontSize: '1.5rem', textDecoration: 'none'}} onClick={() => setIsMenuOpen(false)}>İLETİŞİM</a>
      </div>

      <main style={{flex: 1, padding: '40px 20px', maxWidth: '1100px', margin: '0 auto', width: '100%'}}>
        <h2 style={{color: '#d4af37', textAlign: 'center', marginBottom: '40px', letterSpacing: '3px'}}>İLETİŞİM</h2>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', marginBottom: '60px'}}>
           <div><h4 style={{color: '#d4af37', marginBottom: '20px'}}>BİZE ULAŞIN</h4><p style={{color: '#ccc', lineHeight: '2'}}>İzmir - Ankara<br/>m.onur.kilic@gmail.com<br/>+90 532 646 69 09</p></div>
           <form action="https://formspree.io/f/xvzvooyy" method="POST" style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
             <input type="text" name="name" placeholder="Adınız" required style={{padding: '12px', background: '#0d223f', border: '1px solid rgba(212,175,55,0.3)', color: '#fff'}} />
             <input type="email" name="email" placeholder="E-posta" required style={{padding: '12px', background: '#0d223f', border: '1px solid rgba(212,175,55,0.3)', color: '#fff'}} />
             <textarea name="message" placeholder="Mesajınız" rows="4" required style={{padding: '12px', background: '#0d223f', border: '1px solid rgba(212,175,55,0.3)', color: '#fff'}}></textarea>
             <button type="submit" style={{padding: '15px', background: '#d4af37', color: '#0a192f', fontWeight: 'bold', border: 'none'}}>GÖNDER</button>
           </form>
        </div>
        <div className="map-c" style={{height: '450px', width: '100%', border: '1px solid rgba(212,175,55,0.1)'}}>
          <iframe src="http://googleusercontent.com/maps.google.com/2" width="100%" height="100%" style={{border:0}} loading="lazy"></iframe>
        </div>
      </main>

      <footer style={{padding: '60px 20px', borderTop: '1px solid rgba(212,175,55,0.1)', textAlign: 'center', background: '#0a192f'}}>
        <div style={{marginBottom: '30px'}}><SocialIcons size={24} /></div>
        <div style={{display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '0.8rem', flexWrap: 'wrap'}}>
          <a href="/portfolio" style={{color: '#8e8e8e', textDecoration: 'none'}}>PORTFÖY</a>
          <a href="/valuation" style={{color: '#fff', textDecoration: 'none'}}>MÜLK DEĞERLEME</a>
          <a href="/contact" style={{color: '#8e8e8e', textDecoration: 'none'}}>İLETİŞİM</a>
        </div>
        <p style={{fontSize: '0.7rem', opacity: 0.4, marginTop: '20px'}}>© 2026 ONDA YATIRIM</p>
      </footer>
    </div>
  );
}
