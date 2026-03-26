import Head from 'next/head';

export default function Contact() {
  return (
    <>
      <Head>
        <title>İletişim | Onda Yatırım</title>
        <meta name="description" content="İzmir ve Ankara gayrimenkul yatırım süreçleriniz için bizimle iletişime geçin. Onda Yatırım iletişim bilgileri." />
      </Head>

      <style dangerouslySetInnerHTML={{ __html: `
        .contact-container { max-width: 1000px; margin: 60px auto; padding: 0 20px; }
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; margin-top: 50px; }
        .contact-info h2 { color: #d4af37; font-size: 2rem; font-weight: 300; letter-spacing: 3px; margin-bottom: 30px; }
        .info-item { margin-bottom: 30px; }
        .info-item h3 { color: #fff; font-size: 0.9rem; letter-spacing: 1px; margin-bottom: 10px; opacity: 0.7; }
        .info-item p, .info-item a { color: #d4af37; font-size: 1.2rem; text-decoration: none; display: block; }
        .contact-form-box { background: rgba(13,34,63,0.5); border: 1px solid rgba(212,175,55,0.1); padding: 40px; text-align: center; display: flex; flex-direction: column; justify-content: center; }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr; gap: 40px; }
          .contact-info h2 { font-size: 1.5rem; }
          .contact-container { margin: 30px auto; }
        }
      `}} />

      <main className="contact-container" style={{ flex: 1 }}>
        <div className="contact-grid">
          
          {/* İletişim Bilgileri */}
          <div className="contact-info">
            <h2>BİZİMLE BAĞ KURUN</h2>
            <p style={{ color: '#ccc', lineHeight: '1.6', marginBottom: '40px' }}>
              Gayrimenkul yatırım süreçlerinizi rasyonel bir düzleme taşımak için İzmir ve Ankara ofislerimizde sizi bekliyoruz.
            </p>

            <div className="info-item">
              <h3>TELEFON & WHATSAPP</h3>
              <a href="tel:+905436681023">+90 543 668 10 23</a>
            </div>

            <div className="info-item">
              <h3>E-POSTA</h3>
              <a href="mailto:info@ondayatirim.com">info@ondayatirim.com</a>
            </div>

            <div className="info-item">
              <h3>BÖLGELER</h3>
              <p style={{ color: '#d4af37' }}>İzmir & Ankara</p>
            </div>
          </div>

          {/* Hızlı Aksiyon Kutusu */}
          <div className="contact-form-box">
            <h3 style={{ color: '#fff', fontWeight: '300', marginBottom: '20px' }}>Hızlı İletişim</h3>
            <p style={{ color: '#8e8e8e', fontSize: '0.9rem', marginBottom: '30px' }}>
              Mülkünüzle ilgili bir sorunuz mu var? Hemen WhatsApp üzerinden detayları paylaşın.
            </p>
            <a href="https://wa.me/905436681023" target="_blank" rel="noreferrer" style={{ 
              display: 'inline-block', 
              padding: '15px 30px', 
              background: '#d4af37', 
              color: '#0a192f', 
              textDecoration: 'none', 
              fontWeight: 'bold',
              letterSpacing: '1px'
            }}>
              WHATSAPP MESAJI GÖNDER
            </a>
          </div>

        </div>
      </main>
    </>
  );
}
