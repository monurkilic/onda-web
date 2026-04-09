import { useState } from 'react';
import Head from 'next/head';

export default function Valuation() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    propertyType: 'Daire',
    purpose: 'Satış',
    location: '',
    size: '',
    roomCount: '',
    age: '',
    floor: '',
    heating: 'Doğalgaz',
    features: '',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `*ONDA ANALİZ TALEBİ*%0A
*Müşteri:* ${formData.name}%0A
*Tel:* ${formData.phone}%0A
*Analiz Amacı:* ${formData.purpose}%0A%0A
*MÜLK BİLGİLERİ*%0A
*Tip:* ${formData.propertyType}%0A
*Konum:* ${formData.location}%0A
*m2 (Brüt):* ${formData.size}%0A
*Oda:* ${formData.roomCount}%0A
*Bina Yaşı:* ${formData.age}%0A
*Bulunduğu Kat:* ${formData.floor}%0A
*Isınma:* ${formData.heating}%0A
*Ek Özellikler:* ${formData.features}%0A
*Notlar:* ${formData.notes}`;

    window.open(`https://wa.me/905326466909?text=${message}`, '_blank');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Head>
        <title>Mülk Değerleme ONDA | Rasyonel Analiz</title>
        <meta name="description" content="Mülkünüzün gerçek piyasa değerini rasyonel veriler ve teknik analizlerle keşfedin." />
      </Head>

      <style dangerouslySetInnerHTML={{ __html: `
        .val-page { 
          max-width: 900px; 
          margin: 100px auto; 
          padding: 0 20px; 
          font-family: 'Inter', sans-serif;
          color: #ffffff;
          -webkit-font-smoothing: antialiased;
        }

        .onda-title {
          color: #d4af37 !important;
          font-size: 3rem;
          font-weight: 800;
          letter-spacing: 6px;
          text-align: center;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .val-subtitle {
          text-align: center;
          color: #ffffff;
          font-size: 1.1rem;
          font-weight: 500;
          margin-bottom: 50px;
          letter-spacing: 1px;
          opacity: 0.9;
        }

        .val-card { 
          background: rgba(13, 34, 63, 0.8); 
          border: 2px solid #d4af37; 
          padding: 50px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }

        .section-label {
          color: #d4af37;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin: 30px 0 20px 0;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .section-label::after { content: ""; flex: 1; height: 1px; background: rgba(212,175,55,0.2); }

        .form-group { margin-bottom: 25px; text-align: left; }
        .form-group label { 
          display: block; 
          color: #ffffff; 
          font-size: 0.85rem; 
          font-weight: 700;
          letter-spacing: 1px; 
          margin-bottom: 10px; 
        }

        .form-group input, .form-group select, .form-group textarea { 
          width: 100%; 
          padding: 15px; 
          background: #0a192f; 
          border: 1px solid rgba(212,175,55,0.3); 
          color: #ffffff; 
          font-size: 1rem;
          font-weight: 500;
          outline: none;
          transition: 0.3s;
        }

        .form-group input:focus, .form-group select:focus { 
          border-color: #d4af37;
          background: #0d223f;
        }

        .grid-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

        .submit-btn { 
          width: 100%; 
          padding: 22px; 
          background: #d4af37; 
          color: #0a192f; 
          border: none; 
          font-size: 1.1rem;
          font-weight: 900; 
          cursor: pointer; 
          letter-spacing: 3px; 
          transition: 0.4s; 
          margin-top: 30px;
          text-transform: uppercase;
        }

        .submit-btn:hover { 
          background: #ffffff; 
          transform: translateY(-3px);
        }

        @media (max-width: 768px) { 
          .onda-title { font-size: 2rem; }
          .val-card { padding: 30px 20px; }
          .grid-row { grid-template-columns: 1fr; gap: 0; }
        }
      `}} />

      <main className="val-page">
        <h1 className="onda-title">MÜLK DEĞERLEME ONDA</h1>
        <p className="val-subtitle">Rasyonel Analiz Raporu İçin Ön Bilgi Formu</p>

        <div className="val-card">
          <form onSubmit={handleSubmit}>
            
            <div className="section-label">İletişim Bilgileri</div>
            <div className="grid-row">
              <div className="form-group">
                <label>AD SOYAD</label>
                <input type="text" name="name" required placeholder="Onur Kılıç" onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>TELEFON</label>
                <input type="tel" name="phone" required placeholder="0532..." onChange={handleChange} />
              </div>
            </div>

            <div className="section-label">Mülk Temel Bilgileri</div>
            <div className="grid-row">
              <div className="form-group">
                <label>MÜLK TİPİ</label>
                <select name="propertyType" onChange={handleChange}>
                  <option>Daire</option>
                  <option>Villa / Müstakil</option>
                  <option>Arsa / Arazi</option>
                  <option>Ticari / Ofis</option>
                  <option>Fabrika / Sanayi</option>
                </select>
              </div>
              <div className="form-group">
                <label>ANALİZ AMACI</label>
                <select name="purpose" onChange={handleChange}>
                  <option>Satış Amaçlı</option>
                  <option>Kiralama Amaçlı</option>
                  <option>Yatırım Değerlemesi</option>
                  <option>Sadece Bilgi Edinme</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>KONUM (İLÇE / MAHALLE / SİTE ADI)</label>
              <input type="text" name="location" required placeholder="Örn: İzmir, Güzelbahçe, Çelebi Mah." onChange={handleChange} />
            </div>

            <div className="grid-row">
              <div className="form-group">
                <label>BRÜT METREKARE</label>
                <input type="number" name="size" required placeholder="250" onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>ODA SAYISI</label>
                <input type="text" name="roomCount" placeholder="Örn: 4+1" onChange={handleChange} />
              </div>
            </div>

            <div className="section-label">Teknik Detaylar</div>
            <div className="grid-row">
              <div className="form-group">
                <label>BİNA YAŞI</label>
                <input type="number" name="age" placeholder="0" onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>BULUNDUĞU KAT / TOPLAM KAT</label>
                <input type="text" name="floor" placeholder="Örn: 3. Kat / 5" onChange={handleChange} />
              </div>
            </div>

            <div className="grid-row">
              <div className="form-group">
                <label>ISINMA TİPİ</label>
                <select name="heating" onChange={handleChange}>
                  <option>Doğalgaz (Kombi)</option>
                  <option>Merkezi Pay Ölçer</option>
                  <option>Yerden Isıtma</option>
                  <option>Isı Pompası</option>
                  <option>Klima / Yok</option>
                </select>
              </div>
              <div className="form-group">
                <label>ÖNE ÇIKAN ÖZELLİKLER</label>
                <input type="text" name="features" placeholder="Havuz, Akıllı Ev, Deniz Manzarası vb." onChange={handleChange} />
              </div>
            </div>

            <div className="form-group">
              <label>EKLEMEK İSTEDİĞİNİZ NOTLAR</label>
              <textarea name="notes" rows="3" placeholder="Mülkünüzle ilgili rasyonel analize dahil edilmesini istediğiniz ek bilgiler..." onChange={handleChange}></textarea>
            </div>

            <button type="submit" className="submit-btn">ANALİZ RAPORU TALEBİNİ GÖNDER</button>
          </form>
        </div>
      </main>
    </>
  );
}
