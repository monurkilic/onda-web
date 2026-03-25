import Head from 'next/head';

export default function Contact() {
  return (
    <div style={{backgroundColor: '#0a192f', color: '#fff', minHeight: '100vh', fontFamily: 'serif'}}>
      <Head><title>İletişim | Onda Yatırım</title></Head>
      <nav style={{padding: '20px', textAlign: 'center', borderBottom: '1px solid rgba(212,175,55,0.1)'}}>
        <a href="/" style={{color: '#d4af37', textDecoration: 'none', letterSpacing: '2px'}}>← ANA SAYFAYA DÖN</a>
      </nav>
      <main style={{maxWidth: '1200px', margin: '60px auto', padding: '0 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '60px'}}>
        
        <div>
          <h2 style={{color: '#d4af37', marginBottom: '30px', letterSpacing: '3px'}}>BİZE YAZIN</h2>
          <p style={{color: '#8e8e8e', marginBottom: '30px'}}>Düşüncelerinizi veya değerlendirmek istediğiniz mülk detaylarını bizimle paylaşabilirsiniz.</p>
          {/* https://formspree.io/f/xvzvooyy */}
          <form action="https://formspree.io/f/xyzkody" method="POST" style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
            <input type="text" name="name" placeholder="Adınız Soyadınız" required style={{padding: '15px', background: '#0d223f', border: '1px solid #d4af3733', color: '#fff'}} />
            <input type="email" name="email" placeholder="E-posta Adresiniz" required style={{padding: '15px', background: '#0d223f', border: '1px solid #d4af3733', color: '#fff'}} />
            <textarea name="message" rows="5" placeholder="Mesajınız..." required style={{padding: '15px', background: '#0d223f', border: '1px solid #d4af3733', color: '#fff'}}></textarea>
            <button type="submit" style={{padding: '15px', background: '#d4af37', color: '#0a192f', fontWeight: 'bold', border: 'none', cursor: 'pointer', letterSpacing: '2px'}}>GÖNDER</button>
          </form>
        </div>

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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100030.123456789!2d27.1!3d38.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bbd8ec2717c85d%3A0x10203040506070!2zSXptaXIsIFTDvHJraXll!5e0!3m2!1str!2str!4v1710000000000" 
              width="100%" height="100%" style={{border:0}} allowFullScreen="" loading="lazy">
            </iframe>
          </div>
          <a href="https://maps
