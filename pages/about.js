import Head from 'next/head';

export default function About() {
  return (
    <>
      <Head>
        <title>Hakkımızda | Onda Yatırım</title>
        <meta name="description" content="Onda Yatırım'ın hikayesi: Yakın çevre güvenini, tüm yatırımcılarına sunan rasyonel gayrimenkul vizyonu." />
      </Head>

      <style dangerouslySetInnerHTML={{ __html: `
        /* Ana Konteyner ve Font Ayarı */
        .about-page { 
          max-width: 1100px; 
          margin: 120px auto; 
          padding: 0 20px; 
          color: #ffffff; /* Tam parlak beyaz */
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        .about-header { text-align: center; margin-bottom: 100px; }
        
        /* Başlıklar: Daha kalın ve parlak */
        .about-title { 
          color: #d4af37; 
          font-size: 3.5rem; 
          font-weight: 800; /* Çok kalın */
          letter-spacing: 6px; 
          margin-bottom: 15px;
          text-transform: uppercase;
        }
        
        .about-subtitle { 
          color: #ffffff; 
          font-size: 1rem; 
          letter-spacing: 5px; 
          font-weight: 400;
          opacity: 0.9;
        }

        /* Hikaye Metni: Griyi bırakıp parlak beyaza geçtik */
        .story-text { 
          font-size: 1.25rem; /* Yazıyı büyüttük */
          line-height: 1.8; 
          margin-bottom: 35px; 
          font-weight: 500; /* Orta kalınlıkta, daha okunaklı */
          text-align: left;
          color: #f8f8f8; /* Göz yormayan ama çok parlak bir beyaz */
        }

        .highlight { 
          color: #d4af37; 
          font-weight: 800; 
        }

        /* Felsefe Kutusu: Sayfanın en çarpıcı yeri */
        .philosophy-card {
          background: #d4af37;
          color: #0a192f;
          padding: 60px;
          margin: 80px 0;
          border-radius: 4px;
          position: relative;
        }
        .philosophy-card p {
          font-size: 1.8rem;
          font-weight: 700;
          line-height: 1.4;
          margin: 0;
        }
        .philosophy-card::after {
          content: '"';
          position: absolute;
          top: 10px;
          left: 20px;
          font-size: 8rem;
          opacity: 0.2;
          font-family: serif;
        }

        /* Vizyon Kartları */
        .vision-grid { 
          display: grid; 
          grid-template-cols: 1fr 1fr; 
          gap: 40px; 
          margin-top: 100px; 
        }
        .vision-item { 
          background: rgba(13, 34, 63, 0.8); 
          border: 2px solid #d4af37; /* Çerçeveler daha belirgin */
          padding: 45px; 
          transition: 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .vision-item:hover { 
          background: #d4af37; 
        }
        .vision-item:hover h3, .vision-item:hover p { 
          color: #0a192f; 
        }

        .vision-item h3 { 
          color: #d4af37; 
          font-size: 1.3rem; 
          font-weight: 800; 
          margin-bottom: 20px; 
          letter-spacing: 2px;
        }
        .vision-item p { 
          color: #ffffff; 
          font-size: 1.05rem; 
          font-weight: 600; 
          line-height: 1.6;
        }

        /* İmza Alanı */
        .footer-sig { 
          margin-top: 100px; 
          text-align: right; 
          border-top: 1px solid rgba(212,175,55,0.3);
          padding-top: 40px;
        }
        .sig-name { color: #d4af37; font-size: 1.8rem; font-weight: 800; display: block; }
        .sig-title { color: #ffffff; font-size: 0.9rem; letter-spacing: 3px; font-weight: 600; margin-top: 5px; display: block; }

        @media (max-width: 768px) {
          .about-title { font-size: 2.2rem; }
          .philosophy-card { padding: 30px; }
          .philosophy-card p { font-size: 1.3rem; }
          .vision-grid { grid-template-cols: 1fr; }
          .story-text { font-size: 1.1rem; }
        }
      `}} />

      <main className="about-page">
        <header className="about-header">
          <h1 className="about-title">BİZ KİMİZ?</h1>
          <p className="about-subtitle">Rasyonel Analiz • Kurumsal Güven</p>
        </header>

        <section>
          <p className="story-text">
            Onda Yatırım’ın temelleri, çok basit ama sarsılmaz bir prensip üzerine atıldı: <span className="highlight">KOŞULSUZ GÜVEN.</span> 
          </p>
          
          <div className="philosophy-card">
            <p>
              "Kendi yakın çevreme, aileme ve dostlarıma en karlı yatırımları sunmak amacıyla çıktığım bu yolda; bugün tüm danışanlarıma 'yakın çevrem' muamelesi yapıyorum."
            </p>
          </div>

          <p className="story-text">
            Gayrimenkul sektörü, güvenin en temel ihtiyaç olduğu ancak en çok sarsıldığı alanlardan biri. Bizim en büyük motivasyonumuz; piyasadaki <span className="highlight">"emlak danışmanı"</span> algısını yeniden inşa etmek ve korumaktır. 
          </p>

          <p className="story-text">
            Yerel piyasanın nabzını tutan derin tecrübemiz ile ulusal ölçekteki profesyonel birikimimizi birleştiriyoruz. Temel amacımız sadece bir işlem gerçekleştirmek değil; <span className="highlight">mülkünüzü en yüksek değerle satmanızı sağlamak</span> ve <span className="highlight">piyasadaki en iyi fırsata en rasyonel şartlarla ulaşmanızı</span> garanti altına almaktır.
          </p>
        </section>

        <div className="vision-grid">
          <div className="vision-item">
            <h3>TECRÜBE KARMASI</h3>
            <p>Yerel dinamikleri ulusal standartlarla harmanlayarak hata payını rasyonel zeminde sıfıra indiriyoruz.</p>
          </div>
          <div className="vision-item">
            <h3>SADAKAT ODAKLI</h3>
            <p>Bizim için her yatırımcı bir aile ferdi gibidir. Ömür boyu sürecek bir güven ilişkisini her şeyin üzerinde tutuyoruz.</p>
          </div>
          <div className="vision-item">
            <h3>RASYONEL ANALİZ</h3>
            <p>Duygularla değil, verilerle hareket ediyoruz. Mülkünüzün gerçek değerini teknik raporlarla kanıtlıyoruz.</p>
          </div>
          <div className="vision-item">
            <h3>KÜRESEL VİZYON</h3>
            <p>İzmir ve Ankara merkezli gücümüzü; Kıbrıs, Dubai ve Yunanistan ağımızla global bir fırsata dönüştürüyoruz.</p>
          </div>
        </div>

        <footer className="footer-sig">
          <span className="sig-name">M. Onur Kılıç</span>
          <span className="sig-title">Kurucu, Onda Yatırım</span>
        </footer>

        <div style={{ marginTop: '80px', textAlign: 'center' }}>
          <a href="/contact" style={{ 
            display: 'inline-block', 
            padding: '22px 60px', 
            background: '#d4af37', 
            color: '#0a192f', 
            textDecoration: 'none', 
            fontSize: '1rem', 
            fontWeight: '900', 
            letterSpacing: '3px',
            borderRadius: '4px'
          }}>
            BİZE ULAŞIN
          </a>
        </div>
      </main>
    </>
  );
}
