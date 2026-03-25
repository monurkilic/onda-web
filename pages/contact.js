import Head from 'next/head';

export default function Contact() {
  return (
    <div style={{backgroundColor: '#0a192f', color: '#fff', minHeight: '100vh', fontFamily: 'serif', display: 'flex', flexDirection: 'column'}}>
      <Head><title>İletişim | Onda Yatırım</title></Head>
      
      <nav style={{padding: '20px', textAlign: 'center', borderBottom: '1px solid rgba(212,175,55,0.1)'}}>
        <a href="/" style={{color: '#d4af37', textDecoration: 'none', letterSpacing: '2px'}}>← ANA SAYFAYA DÖN</a>
      </nav>

      <main style={{maxWidth: '1200px', margin: '60px auto', padding: '0 20px', flex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '60px'}}>
        
        {/* FORM BÖLÜMÜ */}
        <div>
          <h2 style={{color: '#d4af37', marginBottom: '30px', letterSpacing: '3px'}}>BİZE YAZIN</h2>
          <p style={{color: '#8e8e8e', marginBottom: '30px'}}>Düşüncelerinizi veya satmak istediğiniz mülkleri bizimle paylaşabilirsiniz.</p>
          <form action="https://formspree.io/f/xyzkody" method="POST" style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
            <input type="text" name="name" placeholder="Adınız Soyadınız" required style={{padding: '15px', background: '#0d223f', border: '1px solid #d4af3733', color: '#fff'}} />
            <input type="email" name="email" placeholder="E-posta Adresiniz" required style={{padding: '15px', background: '#0d223f', border: '1px solid #d4af3733', color: '#fff'}} />
            <textarea name="message" rows="5" placeholder="Mesajınız..." required style={{padding: '15px', background: '#0d223f', border: '1px solid #d4af3733', color: '#fff'}}></textarea>
            <button type="submit" style={{padding: '15px', background: '#d4af37', color: '#0a192f', fontWeight: 'bold', border: 'none', cursor: 'pointer', letterSpacing: '2px'}}>GÖNDER</button>
          </form>
        </div>

        {/* OFİS & HARİTA */}
        <div>
          <h2 style={{color: '#d4af37', marginBottom: '30px', letterSpacing: '3px'}}>MERKEZ OFİS</h2>
          <p style={{color: '#ccc', marginBottom: '20px', lineHeight: '1.8'}}>
            <strong>M. Onur Kılıç | Onda Yatırım</strong><br />
            m.onur.kilic@gmail.com<br />
            +90 532 646 69 09<br />
            İzmir - Ankara
          </p>
          <div style={{width: '100%', height: '300px', background: '#0d223f', border: '1px solid #d4af3733', borderRadius: '4px', overflow: 'hidden'}}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100030.0!2d27.1428!3d38.4237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bbd862a7621835%3A0x354583329410!2zSXptaXIsIFTDvHJraXll!5e0!3m2!1str!2s!4v1710000000000" 
              width="100%" height="100%" style={{border:0}} allowFullScreen="" loading="lazy">
            </iframe>
          </div>
          <a href="https://maps.google.com" target="_blank" rel="noreferrer" style={{display: 'block', marginTop: '20px', color: '#d4af37', textDecoration: 'none', fontWeight: 'bold'}}>YOL TARİFİ AL →</a>
        </div>
      </main>

      <footer style={{padding: '60px 20px', borderTop: '1px solid rgba(212,175,55,0.1)', textAlign: 'center', background: '#0d223f'}}>
        <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '30px', marginBottom: '30px', fontSize: '0.8rem', letterSpacing: '1px'}}>
          <a href="/" style={{color: '#8e8e8e', textDecoration: 'none'}}>ANA SAYFA</a>
          <a href="/portfolio" style={{color: '#8e8e8e', textDecoration: 'none'}}>PORTFÖY</a>
          <a href="/about" style={{color: '#8e8e8e', textDecoration: 'none'}}>HAKKIMIZDA</a>
          <a href="/contact" style={{color: '#8e8e8e', textDecoration: 'none'}}>İLETİŞİM</a>
        </div>
        <p style={{fontSize: '0.7rem', opacity: 0.5}}>© 2026 ONDA YATIRIM | Aradığınız her şey ONDA</p>
      </footer>
    </div>
  );
}
