import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Tools() {
  // ROI Hesaplama State'leri
  const [price, setPrice] = useState(5000000);
  const [rent, setRent] = useState(25000);
  const [roi, setRoi] = useState(0);
  const [amortization, setAmortization] = useState(0);

  // Kredi Hesaplama State'leri
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interest, setInterest] = useState(3.5);
  const [term, setTerm] = useState(120);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  // ROI Hesapla
  useEffect(() => {
    const annualRent = rent * 12;
    const calculatedRoi = (annualRent / price) * 100;
    const calculatedAmortization = price / annualRent;
    setRoi(calculatedRoi.toFixed(2));
    setAmortization(calculatedAmortization.toFixed(1));
  }, [price, rent]);

  // Kredi Hesapla
  useEffect(() => {
    const monthlyInterest = interest / 100 / 12;
    const payment = (loanAmount * monthlyInterest * Math.pow(1 + monthlyInterest, term)) / (Math.pow(1 + monthlyInterest, term) - 1);
    setMonthlyPayment(payment.toFixed(0));
  }, [loanAmount, interest, term]);

  return (
    <>
      <Head>
        <title>Yatırım Analiz Araçları | Onda Yatırım</title>
        <meta name="description" content="Gayrimenkul yatırımınızın geri dönüş süresini ve kredi maliyetlerini rasyonel verilerle hesaplayın." />
      </Head>

      <style dangerouslySetInnerHTML={{ __html: `
        .tools-page { max-width: 1100px; margin: 120px auto; padding: 0 20px; font-family: 'Inter', sans-serif; color: #fff; }
        .onda-title { color: #d4af37; font-size: 2.8rem; font-weight: 800; letter-spacing: 6px; text-transform: uppercase; text-align: center; margin-bottom: 60px; }
        
        .tools-grid { display: grid; grid-template-cols: 1fr 1fr; gap: 40px; }
        .tool-card { background: rgba(13, 34, 63, 0.8); border: 2px solid #d4af37; padding: 40px; box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
        .tool-header { color: #d4af37; font-size: 1.2rem; font-weight: 800; letter-spacing: 2px; margin-bottom: 30px; border-bottom: 1px solid rgba(212,175,55,0.2); padding-bottom: 15px; text-transform: uppercase; }
        
        .input-group { margin-bottom: 20px; }
        .input-group label { display: block; font-size: 0.75rem; font-weight: 700; color: #8e8e8e; letter-spacing: 1px; margin-bottom: 8px; }
        .input-group input { width: 100%; padding: 12px; background: #0a192f; border: 1px solid rgba(212,175,55,0.3); color: #fff; font-size: 1rem; outline: none; }
        .input-group input:focus { border-color: #d4af37; }

        .result-box { background: #d4af37; color: #0a192f; padding: 25px; margin-top: 30px; border-radius: 4px; }
        .result-item { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 1px solid rgba(10,25,47,0.1); padding-bottom: 10px; }
        .result-item:last-child { border: none; margin: 0; padding: 0; }
        .result-label { font-size: 0.8rem; font-weight: 700; text-transform: uppercase; }
        .result-value { font-size: 1.4rem; font-weight: 900; }

        .disclaimer { font-size: 0.7rem; color: #666; margin-top: 40px; text-align: center; line-height: 1.5; }

        @media (max-width: 768px) {
          .tools-grid { grid-template-cols: 1fr; }
          .onda-title { font-size: 1.8rem; }
        }
      `}} />

      <main className="tools-page">
        <h1 className="onda-title">YATIRIM ANALİZ ARAÇLARI</h1>

        <div className="tools-grid">
          {/* ROI Hesaplayıcı */}
          <section className="tool-card">
            <h2 className="tool-header">Amortisman (ROI) Analizi</h2>
            <div className="input-group">
              <label>MÜLK SATIŞ BEDELİ (₺)</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div className="input-group">
              <label>BEKLENEN AYLIK KİRA (₺)</label>
              <input type="number" value={rent} onChange={(e) => setRent(e.target.value)} />
            </div>

            <div className="result-box">
              <div className="result-item">
                <span className="result-label">Yıllık Brüt Verim</span>
                <span className="result-value">%{roi}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Geri Dönüş Süresi</span>
                <span className="result-value">{amortization} Yıl</span>
              </div>
            </div>
          </section>

          {/* Kredi Hesaplayıcı */}
          <section className="tool-card">
            <h2 className="tool-header">Kredi Maliyet Tablosu</h2>
            <div className="input-group">
              <label>KREDİ TUTARI (₺)</label>
              <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} />
            </div>
            <div className="input-group">
              <label>AYLIK FAİZ ORANI (%)</label>
              <input type="number" step="0.01" value={interest} onChange={(e) => setInterest(e.target.value)} />
            </div>
            <div className="input-group">
              <label>VADE (AY)</label>
              <input type="number" value={term} onChange={(e) => setTerm(e.target.value)} />
            </div>

            <div className="result-box">
              <div className="result-item">
                <span className="result-label">Aylık Taksit</span>
                <span className="result-value">₺{Number(monthlyPayment).toLocaleString('tr-TR')}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Toplam Geri Ödeme</span>
                <span className="result-value">₺{(monthlyPayment * term).toLocaleString('tr-TR')}</span>
              </div>
            </div>
          </section>
        </div>

        <div style={{ marginTop: '60px', textAlign: 'center' }}>
          <p style={{ color: '#ccc', marginBottom: '30px', fontWeight: '500' }}>Bu rakamlar rasyonel birer projeksiyondur. Daha detaylı "Onda Analizi" için bize ulaşın.</p>
          <a href="https://wa.me/905326466909" target="_blank" rel="noreferrer" style={{ display: 'inline-block', padding: '18px 50px', background: '#d4af37', color: '#0a192f', textDecoration: 'none', fontWeight: '900', letterSpacing: '2px', borderRadius: '4px' }}>
            PROFESYONEL ANALİZ AL
          </a>
        </div>

        <p className="disclaimer">
          * Hesaplamalar genel bilgilendirme amaçlıdır. Vergi, harç, aidat ve enflasyon gibi değişkenler hesaplamaya dahil edilmemiştir. <br />
          Gerçek piyasa değerlemesi için saha verisi ve teknik analiz şarttır.
        </p>
      </main>
    </>
  );
}
