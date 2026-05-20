import Head from 'next/head';

export default function Contact() {
  return (
    <>
      <Head>
        <title>İletişim | M. Onur Kılıç - Onda Yatırım</title>
        <meta name="description" content="M. Onur Kılıç ile iletişime geçin. İzmir ve Ankara gayrimenkul yatırım süreçleriniz için profesyonel destek." />
      </Head>

      <style dangerouslySetInnerHTML={{ __html: `
        .contact-container { max-width: 1100px; margin: 60px auto; padding: 0 20px; }
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; margin-top: 50px; align-items: start; }
        .contact-info h2 { color: #d4af37; font-size: 2.2rem; font-weight: 300; letter-spacing: 3px; margin-bottom: 30px; }
        .info-item { margin-bottom: 35px; }
        .info-item h3 { color: #fff; font-size: 0.85rem; letter-spacing: 2px; margin-bottom: 12px; opacity: 0.6; }
        .info-item p, .info-item a { color: #d4af37; font-size: 1.3rem; text-decoration: none; display: block; font-weight: 300; }
        
        .map-wrapper { 
          margin-top: 50px; 
          border: 1px solid rgba(212,175,55,0.2); 
          height: 450px; 
          overflow: hidden;
          filter: grayscale(1) invert(0.9) contrast(1.2); /* Karanlık tema uyumu */
        }
        .map-wrapper iframe { width: 100% !important; height: 100% !important; border: 0; }
        
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr; gap: 40px; }
          .contact-info h2 { font-size: 1.8rem; }
          .map-wrapper { height: 350px; margin-top: 20px; }
        }
      `}} />

      <main className="contact-container" style={{ flex: 1 }}>
        <div className="contact-grid">
          
          {/* İLETİŞİM BİLGİLERİ */}
          <div className="contact-info">
            <h2>İLETİŞİM</h2>
            <p style={{ color: '#ccc', lineHeight: '1.6', marginBottom: '40px', maxWidth: '450px' }}>
              Gayrimenkul yatırım süreçlerinizi rasyonel bir düzleme taşımak için İzmir ve Ankara bölgelerinde profesyonel danışmanlık sunuyorum.
            </p>
            
            <div className="info-item">
              <h3>DANIŞMAN</h3>
              <p>M. Onur Kılıç</p>
            </div>

            <div className="info-item">
              <h3>TELEFON</h3>
              <a href="tel:+905416406909">0541 640 69 09</a>
            </div>

            <div className="info-item">
              <h3>E-POSTA</h3>
              <a href="mailto:m.onur.kilic@gmail.com">m.onur.kilic@gmail.com</a>
            </div>

            <div style={{ marginTop: '40px' }}>
              <a href="https://wa.me/905416406909?text=Merhaba%20Onur%20Bey,%20bir%20mülk%20analizi%20için%20iletişime%20geçiyorum." 
                 target="_blank" 
                 rel="noreferrer" 
                 style={{ display: 'inline-block', padding: '15px 35px', background: '#d4af37', color: '#0a192f', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.9rem', letterSpacing: '1px' }}>
                WHATSAPP HATTI
              </a>
            </div>
          </div>

          {/* GOOGLE MAPS */}
          <div className="map-wrapper">
             <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d200065.48496980694!2d26.91490673767374!3d38.41782866471503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bbd862a762cacd%3A0x628cbba1a59ce8fe!2zxLB6bWly!5e0!3m2!1sen!2str!4v1774513376905!5m2!1sen!2str" 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
             </iframe>
          </div>

        </div>
      </main>
    </>
  );
}
