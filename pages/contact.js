import Head from 'next/head';
export default function Contact() {
  return (
    <div style={{backgroundColor: '#0a192f', color: '#fff', minHeight: '100vh', fontFamily: 'serif'}}>
      <Head><title>İletişim | Onda Yatırım</title></Head>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) { .cont-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }
      `}} />
      <nav style={{padding: '20px', textAlign: 'center', borderBottom: '1px solid rgba(212,175,55,0.1)'}}>
        <a href="/" style={{color: '#d4af37', textDecoration: 'none'}}>← ANA SAYFA</a>
      </nav>
      <main className="cont-grid" style={{maxWidth: '1200px', margin: '60px auto', padding: '0 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px'}}>
        <div>
          <h2 style={{color: '#d4af37', marginBottom: '30px'}}>BİZE YAZIN</h2>
          <form action="https://formspree.io/f/xvzvooyy" method="POST" style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
            <input type="text" name="name" placeholder="Ad Soyad" required style={{padding: '15px', background: '#0d223f', border: '1px solid rgba(212,175,55,0.2)', color: '#fff'}} />
            <input type="email" name="email" placeholder="E-posta" required style={{padding: '15px', background: '#0d223f', border: '1px solid rgba(212,175,55,0.2)', color: '#fff'}} />
            <textarea name="message" rows="5" placeholder="Mesajınız..." required style={{padding: '15px', background: '#0d223f', border: '1px solid rgba(212,175,55,0.2)', color: '#fff'}}></textarea>
            <button type="submit" style={{padding: '15px', background: '#d4af37', color: '#0a192f', fontWeight: 'bold', border: 'none', cursor: 'pointer'}}>GÖNDER</button>
          </form>
        </div>
        <div>
          <h2 style={{color: '#d4af37', marginBottom: '30px'}}>MERKEZ OFİS</h2>
          <p style={{lineHeight: '2', color: '#ccc'}}>M. Onur Kılıç | m.onur.kilic@gmail.com | +90 532 646 69 09</p>
          <div style={{height: '300px', background: '#0d223f', marginTop: '20px', borderRadius: '4px', overflow: 'hidden'}}>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d199960.44390731733!2d26.939515569424872!3d38.41485605662719!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bbd862a762183f%3A0x8745500d0d9801eb!2zxLB6bWly!5e0!3m2!1str!2str!4v1710793600000" width="100%" height="100%" style={{border:0}} allowFullScreen="" loading="lazy"></iframe>
          </div>
        </div>
      </main>
      <footer style={{padding: '60px 20px', textAlign: 'center', borderTop: '1px solid rgba(212,175,55,0.1)', opacity: 0.5}}>© 2026 ONDA YATIRIM</footer>
    </div>
  );
}
