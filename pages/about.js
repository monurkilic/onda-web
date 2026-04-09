import Head from 'next/head';

export default function About() {
  return (
    <>
      <Head>
        <title>Hakkımızda | Onda Yatırım</title>
        <meta name="description" content="Onda Yatırım'ın hikayesi: Yakın çevre güvenini, tüm yatırımcılarına sunan rasyonel gayrimenkul vizyonu." />
      </Head>

      <style dangerouslySetInnerHTML={{ __html: `
        .about-page { max-width: 1000px; margin: 100px auto; padding: 0 20px; line-height: 1.8; color: #fff; font-family: 'Inter', sans-serif; }
        .about-header { text-align: center; margin-bottom: 80px; }
        .about-title { color: #d4af37; font-size: 3rem; font-weight: 200; letter-spacing: 8px; margin-bottom: 20px; }
        .about-subtitle { color: #8e8e8e; font-size: 0.9rem; letter-spacing: 4px; text-transform: uppercase; }
        
        .content-block { margin-bottom: 60px; position: relative; }
        .quote-box { 
          background: rgba(212, 175, 55, 0.05); 
          border-left: 3px solid #d4af37; 
          padding: 40px; 
          margin: 60px 0; 
          font-style: italic; 
          font-size: 1.2rem;
          color: #e0e0e0;
        }

        .story-text { color: #ccc; font-size: 1.05rem; margin-bottom: 30px; text-align: justify; }
        .highlight { color: #d4af37; font-weight: bold; }

        .vision-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-top: 80px; }
        .vision-item { background: #0d223f; border: 1px solid rgba(212,175,55,0.1); padding: 40px; transition: 0.3s; }
        .vision-item:hover { border-color: #d4af37; transform: translateY(-5px); }
        .vision-item h3 { color: #d4af37; font-size: 1rem; letter-spacing: 2px; margin-bottom: 20px; text-transform: uppercase; }
        .vision-item p { color: #aaa; font-size: 0.9rem; margin: 0; line-height: 1.6; }

        .signature { margin-top: 60px; text-align: right; }
        .signature-name { color: #d4af37; font-size: 1.2rem; letter-spacing: 2px; display: block; }
        .signature-title { color: #666; font-size: 0.8rem; text-transform: uppercase; }

        @media (max-width: 768px) {
          .about-title { font-size: 2rem; }
          .vision-grid { grid-template-cols: 1fr; }
          .quote-box { padding: 25px; font-size: 1rem; }
        }
      `}} />

      <main className="about-page">
        <header className="about-header">
          <p className="about-subtitle">Vizyon & Hikaye</p>
          <h1 className="about-title">BİZ KİMİZ?</h1>
        </header>

        <section className="content-block">
          <p className="story-text">
            Onda Yatırım’ın temelleri, çok basit ama sarsılmaz bir prensip üzerine atıldı: <span className="highlight">Güven.</span> 
          </p>
          
          <div className="quote-box">
            "Kendi yakın çevreme, aileme ve dostlarıma en güvenilir, en karlı yatırımları sunmak amacıyla çıktığım bu yolda; bugün tüm danışanlarıma aynı özenle, 'kendi çevrem' muamelesi yapıyorum."
          </div>

          <p className="story-text">
            Gayrimenkul sektörü, maalesef zaman içerisinde güven erozyonuna uğramış bir alan haline geldi. Benim en büyük motivasyonum; piyasadaki "emlak danışmanı" algısını yeniden inşa etmek, korumak ve danışanlarımıza hak ettikleri rasyonel zemini sağlamaktır. 
          </p>

          <p className="story-text">
            Hem yerel piyasanın nabzını tutan derin tecrübemi hem de ulusal ölçekte edindiğim kurumsal birikimimi, sizin için en doğru karara dönüştürüyorum. Temel amacımız sadece bir mülk alım-satımı değil; <span className="highlight">malınızı en yüksek değerle satmanızı sağlamak</span> ve <span className="highlight">piyasadaki en iyi mülke en rasyonel şartlarla ulaşmanızı</span> garanti altına almaktır.
          </p>
        </section>

        <div className="vision-grid">
          <div className="vision-item">
            <h3>TECRÜBE KARMASI</h3>
            <p>Yerel piyasanın dinamiklerini, ulusal standartlardaki profesyonel tecrübemizle birleştirerek hata payını sıfıra indiriyoruz.</p>
          </div>
          <div className="vision-item">
            <h3>SADAKAT ODAKLI</h3>
            <p>Bizim için her yatırımcı bir aile ferdi gibidir. Kısa vadeli kazançlar yerine, ömür boyu sürecek bir güven ilişkisini tercih ediyoruz.</p>
          </div>
          <div className="vision-item">
            <h3>RASYONEL ANALİZ</h3>
            <p>Duygularla değil, verilerle hareket ediyoruz. Mülkünüzün değerini pazarın gerçek aynasında, teknik verilerle raporluyoruz.</p>
          </div>
          <div className="vision-item">
            <h3>KÜRESEL ERİŞİM</h3>
            <p>İzmir ve Ankara merkezli gücümüzü; Kıbrıs, Dubai ve Yunanistan gibi stratejik noktalardaki ağımızla birleştiriyoruz.</p>
          </div>
        </div>

        <div className="signature">
          <span className="signature-name">M. Onur Kılıç</span>
          <span className="signature-title">Kurucu, Onda Yatırım</span>
        </div>

        <div style={{ marginTop: '100px', textAlign: 'center' }}>
          <a href="/contact" style={{ display: 'inline-block', padding: '18px 50px', border: '1px solid #d4af37', color: '#d4af37', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '3px', transition: '0.3s' }}>
            BİZE ULAŞIN
          </a>
        </div>
      </main>
    </>
  );
}
