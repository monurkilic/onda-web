import Head from 'next/head';

export default function Valuation() {
  return (
    <>
      <Head>
        <title>Ücretsiz Mülk Değerleme | Onda Yatırım</title>
        <meta name="description" content="Mülkünüzün gerçek değerini rasyonel analiz ve psikolojik derinlikle keşfedin. Ücretsiz Onda Analizi talebi oluşturun." />
      </Head>

      <style dangerouslySetInnerHTML={{ __html: `
        .val-container { max-width: 800px; margin: 60px auto; padding: 0 20px; text-align: center; }
        .val-card { background: #0d223f; border: 1px solid rgba(212,175,55,0.2); padding: 50px 30px; }
        .val-btn { display: inline-block; padding: 18px 45px; background: #d4af37; color: #0a192f; text-decoration: none; fontWeight: bold; fontSize: 1rem; transition: 0.3s; margin-top: 30px; }
        .val-btn:hover { background: #fff; transform: scale(1.02); }
      `}} />

      <main className="val-container" style={{ flex: 1 }}>
        <h1 style={{ color: '#d4af37', fontSize: '2.5rem', fontWeight: '300', letterSpacing: '4px', marginBottom: '20px' }}>ONDA ANALİZİ</h1>
        <p style={{ color: '#ccc', lineHeight: '1.8', marginBottom: '40px' }}>
          Mülkünüzün değerini sadece rakamlarla değil, piyasa psikolojisi ve rasyonel verilerin kesiştiği noktada analiz ediyoruz.
        </p>

        <div className="val-card">
          <h2 style={{ color: '#fff', fontSize: '1.4rem', fontWeight: '300', marginBottom: '20px' }}>Analiz Süreci Başlatın</h2>
          <p style={{ color: '#8e8e8e', fontSize: '0.9rem' }}>
            Aşağıdaki butona tıklayarak WhatsApp üzerinden mülk bilgilerinizi iletebilir ve size özel hazırlayacağımız **Onda Analiz Raporu** için ilk adımı atabilirsiniz.
          </p>
          
          <a href="https://wa.me/905436681023?text=Merhaba,%20mülküm%20için%20Onda%20Analizi%20yaptırmak%20istiyorum." 
             target="_blank" 
             rel="noreferrer" 
             className="val-btn">
            WHATSAPP İLE ANALİZ TALEP ET
          </a>
        </div>

        <div style={{ marginTop: '50px', borderTop: '1px solid rgba(212,175,55,0.1)', paddingTop: '40px' }}>
          <p style={{ color: '#8e8e8e', fontSize: '0.85rem', fontStyle: 'italic' }}>
            *Analiz raporumuz mülkünüzün konumu, teknik özellikleri ve güncel piyasa dinamikleri göz önüne alınarak tamamen size özel hazırlanır.
          </p>
        </div>
      </main>
    </>
  );
}
