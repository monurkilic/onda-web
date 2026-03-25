import Head from 'next/head';

export default function Contact() {
  return (
    <div style={{backgroundColor: '#0a192f', color: '#fff', minHeight: '100vh', fontFamily: 'serif', display: 'flex', flexDirection: 'column', overflowX: 'hidden'}}>
      <Head>
        <title>İletişim | Onda Yatırım</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>

      <style dangerouslySetInnerHTML={{ __html: `
        .contact-container { max-width: 1200px; margin: 0 auto; padding: 60px 20px; flex: 1; }
        .grid-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; }
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .grid-layout { grid-template-columns: 1fr !important; gap: 50px !important; }
          .contact-container { padding: 40px 15px !important; }
        }
      `}} />

      {/* HEADER */}
      <nav style={{position: 'sticky', top: 0, zIndex: 100, background: 'rgba(10, 25, 47, 0.95)', borderBottom: '1px solid rgba(212,175,55,0.1)', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backdropFilter: 'blur(10px)'}}>
        <a href="/" style={{display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none'}}>
          <img src="/logo.png" style={{height: '35px'}} alt="Logo" />
          <span style={{color: '#d4af37', fontWeight: 'bold', letterSpacing: '2px'}}>ONDA</span>
        </a>
        <div className="nav-links" style={{display: 'flex', gap: '25px', fontSize: '0.8rem', letterSpacing: '1px'}}>
          <a href="/" style={{color: '#fff', textDecoration: 'none'}}>GİRİŞ</a>
          <a href="/portfolio" style={{color: '#fff', textDecoration: 'none'}}>PORTFÖY</a>
          <a href="/about" style={{color: '#fff', textDecoration: 'none'}}>HAKKIMIZDA</a>
        </div>
      </nav>

      <main className="contact-container">
        <div className="grid-layout">
          
          {/* FORM BÖLÜMÜ */}
          <div>
            <h2 style={{color: '#d4af37', fontSize: '2rem', fontWeight: '300', marginBottom: '30px', letterSpacing: '4px'}}>BİZE YAZIN</h2>
            <p style={{color: '#8e8e8e', marginBottom: '30px', lineHeight: '1.6'}}>Düşüncelerinizi veya değerlendirmek istediğiniz mülk detaylarını bizimle paylaşabilirsiniz.</p>
            
            <form action="https://formspree.io/f/xvzvooyy" method="POST" style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
              <input type="text" name="name" placeholder="Adınız Soyadınız" required style={{padding: '18px', background: '#0d223f', border: '1px solid rgba(212, 175, 55, 0.2)', color: '#fff', outline: 'none'}} />
              <input type="email" name="email" placeholder="E-posta Adresiniz" required style={{padding: '18px', background: '#0d223f', border: '1px solid rgba(212, 175, 55, 0.2)', color: '#fff', outline: 'none'}} />
              <textarea name="message" rows="6" placeholder="Mesajınız..." required style={{padding: '18px', background: '#0d223f', border: '1px solid rgba(212, 175, 55, 0.2)', color: '#fff', outline: 'none', resize: 'vertical'}}></textarea>
              <button type="submit" style={{padding: '18px', background: '#d4af37', color: '#0a192f', fontWeight: 'bold', border: 'none', cursor: 'pointer', letterSpacing: '2px', textTransform: 'uppercase'}}>MESAJI GÖNDER</button>
            </form>
          </div>

          {/* BİLGİ & HARİTA */}
          <div>
            <h2 style={{color: '#d4af37', fontSize: '2rem', fontWeight: '300', marginBottom: '30px', letterSpacing: '4px'}}>MERKEZ OFİS</h2>
            <div style={{color: '#ccc', lineHeight: '2', marginBottom: '30px'}}>
              <p><strong>M. Onur Kılıç | Onda Yatırım</strong></p>
              <p>m.onur.kilic@gmail.com</p>
              <p>+90 532 646 69 09</p>
              <p>İzmir - Ankara</p>
            </div>
            <div style={{width: '100%', height: '350px', background: '#0d223f', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(212, 175, 55, 0.1)'}}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100010.123456789!2d27.138!3d38.423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bbd862a7621dbf%3A0x123456789!2zScm6bWly!5e0!3m2!1str!2str!4v123456789" 
                width="100%" height="100%" style={{border:0}} allowFullScreen="" loading="lazy">
              </iframe>
            </div>
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer style={{padding: '60px 20px', borderTop: '1px solid rgba(212,175,55,0.1)', textAlign: 'center', background: '#0a192f'}}>
        <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '30px', marginBottom: '30px', fontSize: '0.8rem', letterSpacing: '1px'}}>
          <a href="/" style={{color: '#8e8e8e', textDecoration: 'none'}}>ANA SAYFA</a>
          <a href="/portfolio" style={{color: '#8e8e8e', textDecoration: 'none'}}>PORTFÖY</a>
          <a href="/about" style={{color: '#8e8e8e', textDecoration: 'none'}}>HAKKIMIZDA</a>
          <a href="/contact" style={{color: '#fff', textDecoration: 'none', borderBottom: '1px solid #d4af37'}}>İLETİŞİM</a>
        </div>
        <p style={{fontSize: '0.7rem', opacity: 0.4}}>© 2026 ONDA YATIRIM | Aradığınız her şey ONDA</p>
      </footer>
    </div>
  );
}
