import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Tools() {
  // ROI Hesaplama State'leri
  const [price, setPrice] = useState(10000000);
  const [rent, setRent] = useState(45000);
  const [roi, setRoi] = useState(0);
  const [amortization, setAmortization] = useState(0);

  // Kredi Hesaplama State'leri
  const [loanAmount, setLoanAmount] = useState(2000000);
  const [annualInterest, setAnnualInterest] = useState(42); // Örn: %42 Yıllık
  const [term, setTerm] = useState(120);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  // ROI (Geri Dönüş) Hesapla
  useEffect(() => {
    const annualRent = rent * 12;
    if (price > 0 && annualRent > 0) {
      const calculatedRoi = (annualRent / price) * 100;
      const calculatedAmortization = price / annualRent;
      setRoi(calculatedRoi.toFixed(2));
      setAmortization(calculatedAmortization.toFixed(1));
    }
  }, [price, rent]);

  // Kredi Hesapla (Rasyonel Finans Formülü)
  useEffect(() => {
    const r = (annualInterest / 100) / 12; 
    const n = term;
    const P = loanAmount;

    if (r > 0) {
      const payment = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setMonthlyPayment(Math.round(payment));
    } else if (n > 0) {
      setMonthlyPayment(Math.round(P / n));
    }
  }, [loanAmount, annualInterest, term]);

  return (
    <>
      <Head>
        <title>Yatırım Analiz Araçları | M. Onur Kılıç - Keller Williams</title>
        <meta name="description" content="Mülkünüzün amortisman süresini og kredi maliyetlerini rasyonel verilerle hesaplayın." />
      </Head>

      <style dangerouslySetInnerHTML={{ __html: `
        .tools-page { 
          max-width: 1100px; 
          margin: 120px auto; 
          padding: 0 20px; 
          font-family: 'Inter', sans-serif; 
          color: #fff; 
          -webkit-font-smoothing: antialiased;
        }

        .onda-title { 
          color: #bd1e24; 
          font-size: 3rem; 
          font-weight: 800; 
          letter-spacing: 6px; 
          text-transform: uppercase; 
          text-align: center; 
          margin-bottom: 60px; 
        }
        
        .tools-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
        
        .tool-card { 
          background: #1a1a1a; 
          border: 2px solid rgba(189, 30, 36, 0.15); 
          padding: 45px; 
          box-shadow: 0 20px 50px rgba(0,0,0,0.5); 
          display: flex;
          flex-direction: column;
        }

        .tool-header { 
          color: #bd1e24; 
          font-size: 1.3rem; 
          font-weight: 800; 
          letter-spacing: 2px; 
          margin-bottom: 35px; 
          border-bottom: 1px solid rgba(189, 30, 36, 0.2); 
          padding-bottom: 15px; 
          text-transform: uppercase; 
        }
        
        .input-group { margin-bottom: 25px; }
        .input-group label { 
          display: block; 
          font-size: 0.75rem; 
          font-weight: 800; 
          color: #ffffff; 
          letter-spacing: 2px; 
          margin-bottom: 10px; 
          text-transform: uppercase;
        }
        .input-group input { 
          width: 100%; 
          padding: 15px; 
          background: #111111; 
          border: 1px solid rgba(189, 30, 36, 0.2); 
          color: #fff; 
          font-size: 1.1rem; 
          font-weight: 600;
          outline: none; 
          transition: 0.3s;
        }
        .input-group input:focus { border-color: #bd1e24; background: #1a1a1a; }

        /* Sonuç Paneli - KW Kırmızısı */
        .result-panel { 
          background: #bd1e24; 
          color: #ffffff; 
          padding: 30px; 
          margin-top: auto; 
          border-radius: 2px; 
        }
        .result-item { 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          margin-bottom: 15px; 
          border-bottom: 1px solid rgba(255,255,255,0.2); 
          padding-bottom: 10px; 
        }
        .result-item:last-child { border: none; margin: 0; padding: 0; }
        .result-label { font-size: 0.85rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; }
        .result-value { font-size: 1.6rem; font-weight: 900; }

        .info-text { 
          text-align: center; 
          margin-top: 60px; 
          color: #f8f8f8; 
          font-weight: 500; 
          font-size: 1.1rem;
        }

        .cta-button { 
          display: inline-block; 
          margin-top: 30px; 
          padding: 20px 60px; 
          background: #bd1e24; 
          color: #ffffff; 
          text-decoration: none; 
          font-weight: 900; 
          letter-spacing: 3px; 
          text-transform: uppercase;
          transition: 0.3s;
          border-radius: 4px;
        }
        .cta-button:hover { background: #fff; color: #bd1e24; transform: translateY(-3px); }

        .disclaimer { 
          font-size: 0.75rem; 
          color: #888; 
          margin-top: 50px; 
          text-align: center; 
          line-height: 1.8; 
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        @media (max-width: 768px) {
          .tools-page { margin: 60px auto; }
          .tools-grid { grid-template-columns: 1fr; gap: 30px; }
          .onda-title { font-size: 2rem; margin-bottom: 40px; }
          .tool-card { padding: 30px 20px; }
          .result-value { font-size: 1.3rem; }
        }
      `}} />

      <main className="tools-page">
        <h1 className="onda-title">YATIRIM ANALİZ ARAÇLARI</h1>

        <div className="tools-grid">
          {/* ROI Analizi */}
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

            <div className="result-panel">
              <div className="result-item">
                <span className="result-label">Yıllık Brüt Verim</span>
                <span className="result-value">%{roi}</span>
              </div>
              <div className="result-panel-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="result-label">Geri Dönüş Süresi</span>
                <span className="result-value">{amortization} Yıl</span>
              </div>
            </div>
          </section>

          {/* Kredi Analizi */}
          <section className="tool-card">
            <h2 className="tool-header">Kredi Maliyet Tablosu</h2>
            <div className="input-group">
              <label>KREDİ TUTARI (₺)</label>
              <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} />
            </div>
            <div className="input-group">
              <label>YILLIK FAİZ ORANI (%)</label>
              <input type="number" step="0.1" value={annualInterest} onChange={(e) => setAnnualInterest(e.target.value)} />
            </div>
            <div className="input-group">
              <label>VADE (AY)</label>
              <input type="number" value={term} onChange={(e) => setTerm(e.target.value)} />
            </div>

            <div className="result-panel">
              <div className="result-item">
                <span className="result-label">Aylık Taksit</span>
                <span className="result-value">₺{Number(monthlyPayment).toLocaleString('tr-TR')}</span>
              </div>
              <div className="result-panel-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="result-label">Toplam Geri Ödeme</span>
                <span className="result-value">₺{(monthlyPayment * term).toLocaleString('tr-TR')}</span>
              </div>
            </div>
          </section>
        </div>

        <div style={{ textAlign: 'center' }}>
          <p className="info-text">Rakamlar rasyonel bir gelecek projeksiyonudur.</p>
          <a href="https://wa.me/905416406909?text=Merhaba%20Onur%20Bey,%20yat%C4%B1r%C4%B1m%20analiz%20ara%C3%A7lar%C4%B1%20%C3%BCzerinden%20bir%20pazar%20analizi%20i%C3%A7in%20bilgi%20almak%20istiyorum." target="_blank" rel="noreferrer" className="cta-button">
            PROFESYONEL ANALİZ AL
          </a>
        </div>

        <p className="disclaimer">
          * Bu hesaplama tablosu genel bilgilendirme amaçlıdır. Vergi, tapu harcı, aidat artışları ve enflasyon gibi değişkenler hesaplamaya dahil edilmemiştir. <br />
          Gerçek bir yatırım kararı için mülk bazlı "Rasyonel Pazar Analizi" raporu almanız önerilir.
        </p>
      </main>
    </>
  );
}