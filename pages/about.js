import Head from 'next/head';

export default function About() {
  return (
    <>
      <Head>
        <title>M. Onur Kılıç Kimdir? | Keller Williams</title>
        <meta name="description" content="M. Onur Kılıç'ın hikayesi: Keller Williams güvencesi, İzmir ve Ankara piyasasında rasyonel gayrimenkul ve yatırım vizyonu." />
      </Head>

      <style dangerouslySetInnerHTML={{ __html: `
        /* Ana Konteyner ve Font Ayarı */
        .about-page { 
          max-width: 1100px; 
          margin: 120px auto; 
          padding: 0 20px; 
          color: #ffffff; 
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        .about-header { text-align: center; margin-bottom: 100px; }
        
        /* Başlıklar */
        .about-title { 
          color: #bd1e24; 
          font-size: 3.5rem; 
          font-weight: 800; 
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

        /* Hikaye Metni */
        .story-text { 
          font-size: 1.25rem; 
          line-height: 1.8; 
          margin-bottom: 35px; 
          font-weight: 500; 
          text-align: left;
          color: #f8f8f8; 
        }

        .highlight { 
          color: #bd1e24; 
          font-weight: 800; 
        }

        /* Felsefe Kutusu - Keller Williams Kırmızısı */
        .philosophy-card {
          background: #bd1e24;
          color: #ffffff;
          padding: 60px;
          margin: 80px 0;
          border-radius: 4px;
          position: relative;
        }
        .philosophy-card p {
          font-size: 1.8rem;
          font-weight: 700;
          line-height: 1.5;
          margin: 0;
        }
        .philosophy-card::after {
          content: '"';
          position: absolute;
          top: 10px;
          left: 20px;
          font-size: 8rem;
          opacity: 0.15;
          font-family: serif;
          color: #fff;
        }

        /* Vizyon Kartları */
        .vision-grid { 
          display: grid; 
          grid-template-columns: 1fr 1fr; 
          gap: 40px; 
          margin-top: 100px; 
        }
        .vision-item { 
          background: #1a1a1a; 
          border: 2px solid rgba(189, 30, 36, 0.2); 
          padding: 45px; 
          transition: 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .vision-item:hover { 
          background: #bd1e24; 
          border-color: #bd1e24;
        }
        .vision-item:hover h3, .vision-item:hover p { 
          color: #ffffff; 
        }

        .vision-item h3 { 
          color: #bd1e24; 
          font-size: 1.3rem; 
          font-weight: 800; 
          margin-bottom: 20px; 
          letter-spacing: 2px;
          transition: 0.3s;
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
          border-top: 1px solid rgba(189, 30, 36, 0.2);
          padding-top: 40px;
        }
        .sig-name { color: #bd1e24; font-size: 1.8rem; font-weight: 800; display: block; }
        .sig-title { color: #ffffff; font-size: 0.9rem; letter-spacing: 3px; font-weight: 600; margin-top: 5px; display: block; }

        @media (max-width: 768px) {
          .about-title { font-size: 2.2rem; }
          .philosophy-card { padding: 30px; }
          .philosophy-card p { font-size: 1.3rem; }
          .vision-grid { grid-template-columns: 1fr; }
          .story-text { font-size: 1.1rem; }
        }
      `}} />

      <main className="about-page">
        <header className="about-header">
          <h1 className="about-title">M. Onur Kılıç</h1>
          <p className="about-subtitle">Rasyonel Analiz • Kurumsal Güven</p>
        </header>

        <section>
          <p className="story-text">
            Gayrimenkul sektöründeki danışmanlık vizyonum, çok basit ama sarsılmaz bir prensip üzerine inşa edildi: <span className="highlight">KOŞULSUZ GÜVEN.</span> Bugün bu vizyonu, küresel gayrimenkul sektörünün en büyük ağlarından biri olan <span className="highlight">Keller Williams</span> çatısı altında çok daha güçlü bir zemine taşıyorum.
          </p>
          
          <div className="philosophy-card">
            <p>
              "Kendi yakın çevreme, aileme ve dostlarıma en doğru, karlı arsa ve gayrimenkul yatırımlarını sunmak amacıyla çıktığım bu yolda; bugün tüm danışanlarıma aynı 'yakın çevre' titizliği ve sadakatiyle yaklaşıyorum."
            </p>
          </div>

          <p className="story-text">
            Gayrimenkul ve toprak yatırımları, güvenin en temel ihtiyaç olduğu ancak spekülasyonlar yüzünden rasyonel verilere ulaşmanın zorlaştığı bir alan. Benim en büyük motivasyonum; özellikle İzmir ve Ankara bölgelerinde piyasadaki klasik emlakçılık algısını tamamen <span className="highlight">profesyonel, analitik ve veri odaklı</span> bir boyuta taşımaktır.
          </p>

          <p className="story-text">
            Keller Williams'ın uluslararası teknolojik altyapısı ve kurumsal gücüyle, yerel piyasaya dair derin saha tecrübemi birleştiriyorum. Temel amacım; ticari, arsa veya konut portföylerinizi en yüksek değerle ve doğru pazarlama stratejileriyle eritebilmek, yeni alımlarınızda ise sizi piyasa dedikodularından uzak, tamamen matematiksel şartlarla <span className="highlight">en doğru yatırıma</span> ulaştırmaktır.
          </p>
        </section>

        <div className="vision-grid">
          <div className="vision-item">
            <h3>GLOBAL STANDARTLAR</h3>
            <p>Keller Williams'ın küresel bilgi birikimini yerel pazar dinamikleriyle harmanlayarak süreçlerdeki hata payını rasyonel zeminde sıfıra indiriyorum.</p>
          </div>
          <div className="vision-item">
            <h3>SADAKAT ODAKLI</h3>
            <p>Benim için her yatırımcı sadece tek bir işlem süreci değil, ömür boyu sürecek bir güven ve sadakat ortaklığı anlamına gelir.</p>
          </div>
          <div className="vision-item">
            <h3>RASYONEL ANALİZ</h3>
            <p>Duygularla veya piyasa tahminleriyle değil, tamamen veri ve matematiksel raporlarla hareket ederek mülkünüzün gerçek pazar değerini kanıtlıyorum.</p>
          </div>
          <div className="vision-item">
            <h3>PORTFÖY GÜCÜ</h3>
            <p>İzmir ve Ankara merkezli bölgesel odağımı, Keller Williams'ın devasa ulusal ve uluslararası network ağıyla birleştirerek portföyünüzü en elit kitlelere ulaştırıyorum.</p>
          </div>
        </div>

        <footer className="footer-sig">
          <span className="sig-name">M. Onur Kılıç</span>
          <span className="sig-title">Keller Williams Gayrimenkul Danışmanı</span>
        </footer>

        <div style={{ marginTop: '80px', textAlign: 'center' }}>
          <a href="/contact" style={{ 
            display: 'inline-block', 
            padding: '22px 60px', 
            background: '#bd1e24', 
            color: '#ffffff', 
            textDecoration: 'none', 
            fontSize: '1rem', 
            fontWeight: '900', 
            letterSpacing: '3px',
            borderRadius: '4px',
            transition: '0.3s'
          }}>
            İLETİŞİME GEÇİN
          </a>
        </div>
      </main>
    </>
  );
}