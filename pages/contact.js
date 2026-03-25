import Head from 'next/head';

export default function Contact() {
  return (
    <div style={{backgroundColor: '#0a192f', color: '#fff', minHeight: '100vh', fontFamily: 'serif'}}>
      <Head><title>İletişim | Onda Yatırım</title></Head>
      <nav style={{padding: '20px', textAlign: 'center', borderBottom: '1px solid rgba(212,175,55,0.1)'}}>
        <a href="/" style={{color: '#d4af37', textDecoration: 'none'}}>← ANA SAYFA</a>
      </nav>
      <main style={{maxWidth: '1200px', margin: '60px auto', padding: '0 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '60px'}}>
        
        {/* FORM BÖLÜMÜ */}
        <div>
          <h2 style={{color: '#d4af37', marginBottom: '30px'}}>BİZE YAZIN</h2>
          <form action="https://formspree.io/f/xyzkody" method="POST" style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
            <input type="text" name="name" placeholder="Ad Soyad" required style={{padding: '15px', background: '#0d223f', border: '1px solid #d4af3733', color: '#fff'}} />
            <textarea name="message" rows="5" placeholder="Mesajınız..." required style={{padding: '15px', background: '#0d223f', border: '1px solid #d4af3733', color: '#fff'}}></textarea>
            <button type="submit" style={{padding: '15px', background: '#d4af37', color: '#0a192f', fontWeight: 'bold', border: 'none'}}>GÖNDER</button>
          </form>
        </div>

        {/* OFİS & HARİTA */}
        <div>
          <h2 style={{color: '#d4af37', marginBottom: '30px'}}>MERKEZ OFİS</h2>
          <p style={{color: '#8e8e8e', marginBottom: '20px'}}>
            M. Onur Kılıç | Onda Yatırım<br />
            m.onur.kilic@gmail.com<br />
            +90 532 646 69 09
          </p>
          <div style={{width: '100%', height: '300px', background: '#0d223f', border: '1px solid #d4af3733'}}>
            {/* HARİTA GÖRÜNÜMÜ */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d27.138!3d38.423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDI1JzIyLjgiTiAyN8KwMDgnMTYuOCJF!5e0!3m2!1str!2str!4v1" 
              width="100%" height="100%" style={{border:0}} allowFullScreen="" loading="lazy">
            </img>
          </div>
          <a href="https://maps.google.com/?q=38.423,27.138" target="_blank" style={{display: 'block', marginTop: '15px', color: '#d4af37', textDecoration: 'none'}}>YOL TARİFİ AL →</a>
        </div>
      </main>
      <footer style={{textAlign: 'center', padding: '60px', borderTop: '1px solid rgba(212,175,55,0.1)', opacity: 0.5}}>© 2026 ONDA YATIRIM</footer>
    </div>
  );
}
