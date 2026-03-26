import { useState } from 'react';
import Head from 'next/head';

export default function About() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div style={{backgroundColor: '#0a192f', color: '#fff', minHeight: '100vh', fontFamily: 'serif', display: 'flex', flexDirection: 'column', overflowX: 'hidden'}}>
      <Head>
        <title>Hakkımızda | Onda Yatırım</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>

      <style dangerouslySetInnerHTML={{ __html: `
        .content-container { max-width: 850px; margin: 0 auto; padding: 60px 20px; flex: 1; }
        .about-text { font-size: 1.15rem; line-height: 2.2; color: #ccc; text-align: justify; margin-bottom: 30px; }
        .hamburger { display: none; cursor: pointer; flex-direction: column; gap: 5px; z-index: 9999; padding: 10px; }
        .hamburger div { width: 25px; height: 3px; background: #d4af37; transition: 0.3s; }
        .mobile-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #0a192f; z-index: 9000; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 30px; transform: translateX(100%); transition: 0.4s ease-in-out; }
        .mobile-overlay.active { transform: translateX(0); }
        
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .hamburger { display: flex !important; }
          .hero-logo { width: 120px !important; }
          .about-text { font-size: 1rem; line-height: 1.8; text-align: left; }
          .content-container { padding: 40px 15px !important; }
        }
      `}} />

      {/* HEADER */}
      <nav style={{padding: '20px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(212,175,55,0.1)', background: '#0a192f', position: 'sticky', top: 0, zIndex: 1000}}>
        <a href="/" style={{display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none'}}>
          <img src="/logo.png" style={{height: '35px'}} alt="Logo" />
          <span style={{color: '#d4af37', fontWeight: 'bold', letterSpacing: '2px'}}>ONDA</span>
        </a>
        
        <div className="nav-links" style={{display: 'flex', gap: '25px', fontSize: '0.8rem'}}>
          <a href="/portfolio" style={{color: '#fff', textDecoration: 'none', letterSpacing: '1px'}}>PORTFÖY</a>
          <a href="/about" style={{color: '#d4af37', textDecoration: 'none', letterSpacing: '1px'}}>HAKKIMIZDA</a>
          <a href="/contact" style={{color: '#fff', textDecoration: 'none', letterSpacing: '1px'}}>İLETİŞİM</a>
        </div>

        <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div style={{transform: isMenuOpen ? 'rotate(45deg) translate(5px, 6px)' : 'none'}}></div>
          <div style={{opacity: isMenuOpen ? 0 : 1}}></div>
          <div style={{transform: isMenuOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'none'}}></div>
        </div>
      </nav>

      {/* MOBILE OVERLAY */}
      <div className={`mobile-overlay ${isMenuOpen ? 'active' : ''}`}>
        <a href="/" style={{color: '#fff', fontSize: '1.8rem', textDecoration: 'none'}} onClick={() => setIsMenuOpen(false)}>GİRİŞ</a>
        <a href="/portfolio" style={{color: '#fff', fontSize: '1.8rem', textDecoration: 'none'}} onClick={() => setIsMenuOpen(false)}>PORTFÖY</a>
        <a href="/about" style={{color: '#d4af37', fontSize: '1.8rem', textDecoration: 'none'}} onClick={() => setIsMenuOpen(false)}>HAKKIMIZDA</a>
        <a href="/contact" style={{color: '#fff', fontSize: '1.8rem', textDecoration: 'none'}} onClick={() => setIsMenuOpen(false)}>İLETİŞİM</a>
      </div>

      <main className="content-container">
        {/* ORTALI LOGO */}
        <div style={{marginBottom: '40px', textAlign: 'center'}}>
          <img src="/logo.png" className="hero-logo" style={{width: '180px', margin: '0 auto'}} alt="Onda Logo" />
        </div>

        <h1 style={{color: '#d4af37', fontSize: '2.5rem', fontWeight: '300', letterSpacing: '6px', marginBottom: '40px', textTransform: 'uppercase', textAlign: 'center'}}>BİZ KİMİZ?</h1>
        <div style={{width: '60px', height: '1px', background: '#d4af37', margin: '0 auto 50px auto'}}></div>
        
        <div className="about-text">
          <p>
            <strong>Onda Yatırım</strong>, gayrimenkul dünyasına sadece bir mülk alım-satım aracısı olarak değil, bir danışmanlık ve analiz merkezi olarak adım attı. Temellerimiz, insanı anlamanın ve doğru eşleştirmenin en kritik olduğu alanlardan biri olan psikoloji ve üst düzey insan kaynakları yönetimine dayanmaktadır.
          </p>
          <p>
            Yıllarca kurumsal işe alım ve danışmanlık süreçlerinde edindiğimiz "doğru aday-doğru pozisyon" prensibini, gayrimenkul sektörüne <strong>"doğru yatırımcı-doğru mülk"</strong> felsefesiyle taşıyoruz. Bizim için bir mülk sadece beton ve metrekareden ibaret değildir; o, verilerle analiz edilmesi gereken rasyonel bir yatırım ve hayat boyu sürecek bir güvendir.
          </p>
          <p>
            <strong>"Onda Analizi"</strong> adını verdiğimiz özel süzgecimizle, İzmir ve Ankara başta olmak üzere Türkiye'nin ve dünyanın en seçkin noktalarındaki portföyleri rasyonel verilerle inceliyoruz. Kendi süzgecimizden geçmeyen, yatırım potansiyeli görmediğimiz hiçbir mülkü size sunmuyoruz.
          </p>
          <p>
            Onda Yatırım olarak hedefimiz, gayrimenkul süreçlerindeki karmaşıklığı ortadan kaldırarak size şeffaf, veriye dayalı ve kurumsal bir deneyim sunmaktır. Aradığınız o güveni ve profesyonelliği <strong>Onda</strong> bulacaksınız.
          </p>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{padding: '60px 20px', borderTop: '1px solid rgba(212,175,55,0.1)', textAlign: 'center', background: '#0a192f'}}>
        <div style={{display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '30px', fontSize: '0.8rem', letterSpacing: '1px'}}>
          <a href="/portfolio" style={{color: '#8e8e8e', textDecoration: 'none'}}>PORTFÖY</a>
          <a href="/about" style={{color: '#8e8e8e', textDecoration: 'none'}}>HAKKIMIZDA</a>
          <a href="/contact" style={{color: '#8e8e8e', textDecoration: 'none'}}>İLETİŞİM</a>
        </div>
        <p style={{fontSize: '0.7rem', opacity: 0.4, letterSpacing: '2px'}}>© 2026 ONDA YATIRIM | Aradığınız her şey ONDA</p>
      </footer>
    </div>
  );
}
