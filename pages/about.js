import Head from 'next/head';

export default function About() {
  return (
    <>
      <Head>
        <title>Hakkımızda | Onda Yatırım</title>
        <meta name="description" content="Gayrimenkulde rasyonel analiz ve psikolojik derinlik. Onda Yatırım'ın hikayesi ve vizyonu." />
      </Head>

      <style dangerouslySetInnerHTML={{ __html: `
        .about-section { max-width: 900px; margin: 60px auto; padding: 0 20px; line-height: 1.8; }
        .about-title { color: #d4af37; font-size: 2.5rem; font-weight: 300; letter-spacing: 4px; margin-bottom: 40px; text-align: center; }
        .vision-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 60px; }
        .vision-box { background: rgba(13,34,63,0.5); border: 1px solid rgba(212,175,55,0.1); padding: 30px; }
        .vision-box h3 { color: #d4af37; font-size: 1.1rem; margin-bottom: 15px; letter-spacing: 1px; }
        .vision-box p { color: #ccc; fontSize: 0.9rem; margin: 0; }
        @media (max-width: 768px) {
          .vision-grid { grid-template-columns: 1fr; gap: 20px; }
          .about-title { font-size: 1.8rem; }
        }
      `}} />

      <main className="about-section" style={{ flex: 1 }}>
        <h1 className="about-title">BİZ KİMİZ?</h1>
        
        <div style={{ color: '#fff', fontSize: '1.1rem', textAlign: 'center', marginBottom: '40px', fontStyle: 'italic' }}>
          "Gayrimenkul, sadece taş ve topraktan ibaret değildir; rasyonel verilerin ve insan psikolojisinin birleştiği bir karardır."
        </div>

        <p style={{ color: '#ccc', marginBottom: '25px' }}>
          Onda Yatırım, geleneksel emlakçılık anlayışının ötesine geçerek, gayrimenkul süreçlerini bilimsel bir yaklaşımla ele alan bir danışmanlık markasıdır. İzmir ve Ankara merkezli faaliyetlerimizde, her mülkü kendi özelinde bir "vaka" olarak ele alıyoruz.
        </p>

        <p style={{ color: '#ccc', marginBottom: '25px' }}>
          Kurucumuzun psikoloji altyapısı ve rasyonel analiz yetkinliği, Onda Yatırım'ın temelini oluşturur. Yatırımcılarımıza sadece mülk satmıyor; piyasa dinamiklerini, gelecek projeksiyonlarını ve karar verme süreçlerini etkileyen tüm faktörleri kapsayan bir **Onda Analizi** sunuyoruz.
        </p>

        <div className="vision-grid">
          <div className="vision-box">
            <h3>RASYONEL YAKLAŞIM</h3>
            <p>Piyasa verilerini, bölgesel gelişim raporlarını ve yatırımın geri dönüş hızını (ROI) matematiksel netlikle analiz ediyoruz.</p>
          </div>
          <div className="vision-box">
            <h3>PSİKOLOJİK DERİNLİK</h3>
            <p>Alıcı ve satıcı arasındaki beklenti dengesini, mülkün duygusal değerini ve doğru iletişim stratejilerini yönetiyoruz.</p>
          </div>
        </div>

        <div style={{ marginTop: '80px', textAlign: 'center' }}>
          <h2 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: '300', marginBottom: '30px' }}>Aradığınız profesyonel bakış açısı Onda.</h2>
          <a href="/contact" style={{ display: 'inline-block', padding: '15px 40px', border: '1px solid #d4af37', color: '#d4af37', textDecoration: 'none', fontSize: '0.85rem', letterSpacing: '2px' }}>
            BİZE ULAŞIN
          </a>
        </div>
      </main>
    </>
  );
}
