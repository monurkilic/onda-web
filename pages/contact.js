import Head from 'next/head';

export default function Contact() {
  return (
    <div style={{backgroundColor: '#0a192f', color: '#fff', minHeight: '100vh', fontFamily: 'serif'}}>
      <Head><title>İletişim | Onda Yatırım</title></Head>
      <nav style={{padding: '20px', textAlign: 'center', borderBottom: '1px solid rgba(212,175,55,0.1)'}}>
        <a href="/" style={{color: '#d4af37', textDecoration: 'none', letterSpacing: '2px'}}>← ANA SAYFAYA DÖN</a>
      </nav>
      <div style={{maxWidth: '600px', margin: '80px auto', padding: '0 20px'}}>
        <h1 style={{color: '#d4af37', textAlign: 'center', letterSpacing: '5px', marginBottom: '40px'}}>BİZE ULAŞIN</h1>
        {/* https://formspree.io/f/xvzvooyy */}
        <form action="https://formspree.io/f/BURAYA_KODUNU_YAZ" method="POST" style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
          <input type="text" name="name" placeholder="Adınız Soyadınız" required style={{padding: '15px', background: '#0d223f', border: '1px solid #d4af3733', color: '#fff'}} />
          <input type="email" name="email" placeholder="E-posta Adresiniz" required style={{padding: '15px', background: '#0d223f', border: '1px solid #d4af3733', color: '#fff'}} />
          <textarea name="message" rows="6" placeholder="Mesajınız veya satmak istediğiniz mülk detayları..." required style={{padding: '15px', background: '#0d223f', border: '1px solid #d4af3733', color: '#fff'}}></textarea>
          <button type="submit" style={{padding: '20px', background: '#d4af37', color: '#0a192f', fontWeight: 'bold', border: 'none', cursor: 'pointer', letterSpacing: '2px'}}>GÖNDER</button>
        </form>
      </div>
    </div>
  );
}
