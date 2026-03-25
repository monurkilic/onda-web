import Head from 'next/head';

export default function Contact() {
  return (
    <div style={{backgroundColor: '#0a192f', color: '#fff', minHeight: '100vh', fontFamily: 'serif', display: 'flex', flexDirection: 'column'}}>
      <Head>
        <title>İletişim | Onda Yatırım</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      {/* HEADER / NAV */}
      <nav style={{padding: '20px 40px', textAlign: 'center', borderBottom: '1px solid rgba(212,175,55,0.1)', background: 'rgba(10, 25, 47, 0.95)', position: 'sticky', top: 0, zIndex: 100}}>
        <a href="/" style={{color: '#d4af37', textDecoration: 'none', letterSpacing: '2px', fontSize: '0.9rem'}}>← ANA SAYFAYA DÖN</a>
      </nav>

      <main style={{maxWidth: '1200px', margin: '60px auto', padding: '0 20px', flex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '60px'}}>
        
        {/* FORM BÖLÜMÜ */}
        <div>
          <h2 style={{color: '#d4af37', marginBottom: '30px', letterSpacing: '3px', fontWeight: '300'}}>BİZE YAZIN</h2>
          <p style={{color: '#8e8e8e', marginBottom: '30px', lineHeight: '1.6'}}>Düşüncelerinizi, yatırım hedeflerinizi veya satmak istediğiniz mülk detaylarını bizimle paylaşabilirsiniz.</p>
          
          <form action="https://formspree.io/f/xvzvooyy" method="POST" style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
            <input type="text" name="name" placeholder="Adınız Soyadınız" required style={{padding: '18px', background: '#0d223f', border: '1px solid rgba(212, 175, 55, 0.2)', color: '#fff', borderRadius: '2px', outline: 'none'}} />
            <input type="email" name="_replyto" placeholder="E-posta Adresiniz" required style={{padding: '18px', background: '#0d223f', border: '1px solid rgba(212, 175, 55, 0.2)', color: '#fff', borderRadius: '2px', outline: 'none'}} />
            <textarea name="message" rows="6" placeholder="Mesajınız veya Mülk Detayları..." required style={{padding: '18px', background: '#0d223f', border: '1px solid rgba(212, 175, 55, 0.2)', color: '#fff', borderRadius: '2px', outline: 'none', resize: 'vertical'}}></textarea>
            <button type="submit" style={{padding: '20px', background: '#d4af37', color: '#0a192f', fontWeight: 'bold', border: 'none', cursor: 'pointer', letterSpacing: '3px', textTransform: 'uppercase', transition: 'opacity 0.2s'}}>MESAJI GÖNDER</button>
          </form>
        </div>

        {/* BİLGİ & HARİTA BÖLÜMÜ */}
        <div>
          <h2 style={{color: '#d4af37', marginBottom: '30px', letterSpacing: '3px', fontWeight: '300'}}>MERKEZ OFİS</h2>
          <div style={{color: '#ccc', marginBottom: '30px', lineHeight: '2', fontSize: '1rem'}}>
            <p><strong>M. Onur Kılıç | Onda Yatırım</strong></p>
            <p style={{opacity: 0.8}}>m.onur.kilic@gmail.com</p>
            <p style={{opacity: 0.8}}>+90 532 646 69 09</p>
            <p style={{opacity: 0.8}}>İzmir - Ankara</p>
          </div>
          
          <div style={{width: '100%', height: '350px', background: '#0d223f', border: '1px solid rgba(212, 175, 55, 0.1)', borderRadius: '2px', overflow: 'hidden'}}>
            {/* Google Maps Standart Görünüm */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3127.356263546734!2d27.1384!3d38.4237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bbd8e285d0387d%3A0x7d3a0e67606e100!2sIzmir!5e0!3m2!1sen!2str!4v1710000000000!5m2!1sen!2str" 
              width="100%" height="100%" style={{border:0}} allowFullScreen="" loading="lazy">
            </iframe>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{padding: '80px 20px', borderTop: '1px solid rgba(212, 175, 55, 0.1)', textAlign: 'center', background: '#0d223f'}}>
        <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '30px', marginBottom: '40px', fontSize: '0.8rem', letterSpacing: '2px'}}>
          <a href="/" style={{color: '#8e8e8e', textDecoration: 'none'}}>ANA SAYFA</a>
          <a href="/portfolio" style={{color: '#8e8e8e', textDecoration: 'none'}}>PORTFÖY</a>
          <a href="/about" style={{color: '#8e8e8e', textDecoration: 'none'}}>HAKKIMIZDA</a>
          <a href="/contact" style={{color: '#fff', textDecoration: 'none', borderBottom: '1px solid #d4af37'}}>İLETİŞİM</a>
        </div>
        <p style={{fontSize: '0.7rem', opacity: 0.5, letterSpacing: '3px'}}>© 2026 ONDA YATIRIM | ARADIĞINIZ HER ŞEY ONDA</p>
      </footer>
    </div>
  );
}
