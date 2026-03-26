import { useState } from 'react';
import Head from 'next/head';

export default function Valuation() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    propertyType: 'Daire',
    location: '',
    size: '',
    roomCount: '',
    age: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `Merhaba, mülküm için analiz istiyorum:%0A%0AAd Soyad: ${formData.name}%0ATel: ${formData.phone}%0AMülk Tipi: ${formData.propertyType}%0AKonum: ${formData.location}%0Am2: ${formData.size}%0AOda: ${formData.roomCount}%0AYaş: ${formData.age}`;
    window.open(`https://wa.me/905326466909?text=${message}`, '_blank');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Head>
        <title>Onda Analizi | Mülk Değerleme</title>
        <meta name="description" content="Mülkünüzün gerçek değerini rasyonel verilerle keşfedin." />
      </Head>

      <style dangerouslySetInnerHTML={{ __html: `
        .val-container { max-width: 800px; margin: 60px auto; padding: 0 20px; }
        .val-card { background: rgba(13,34,63,0.5); border: 1px solid rgba(212,175,55,0.2); padding: 40px; }
        .form-group { margin-bottom: 20px; text-align: left; }
        .form-group label { display: block; color: #d4af37; font-size: 0.8rem; letter-spacing: 1px; margin-bottom: 8px; }
        .form-group input, .form-group select { 
          width: 100%; padding: 12px; background: #0a192f; border: 1px solid rgba(212,175,55,0.1); 
          color: #fff; font-family: serif; outline: none;
        }
        .form-group input:focus { border-color: #d4af37; }
        .submit-btn { 
          width: 100%; padding: 18px; background: #d4af37; color: #0a192f; border: none; 
          font-weight: bold; cursor: pointer; letter-spacing: 2px; transition: 0.3s; margin-top: 20px;
        }
        .submit-btn:hover { background: #fff; }
        @media (max-width: 768px) { .val-card { padding: 25px 20px; } }
      `}} />

      <main className="val-container">
        <h1 style={{ textAlign: 'center', color: '#d4af37', fontSize: '2.5rem', fontWeight: '300', letterSpacing: '4px', marginBottom: '20px' }}>ONDA ANALİZİ</h1>
        <p style={{ textAlign: 'center', color: '#ccc', marginBottom: '40px', lineHeight: '1.6' }}>
          Mülkünüzün rasyonel değerini belirlemek için aşağıdaki bilgileri eksiksiz doldurun.
        </p>

        <div className="val-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>AD SOYAD</label>
              <input type="text" name="name" required onChange={handleChange} />
            </div>
            
            <div className="form-group">
              <label>TELEFON NUMARASI</label>
              <input type="tel" name="phone" required onChange={handleChange} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="form-group">
                <label>MÜLK TİPİ</label>
                <select name="propertyType" onChange={handleChange}>
                  <option>Daire</option>
                  <option>Villa / Müstakil</option>
                  <option>Arsa / Arazi</option>
                  <option>Ticari</option>
                </select>
              </div>
              <div className="form-group">
                <label>BRÜT METREKARE</label>
                <input type="number" name="size" required onChange={handleChange} />
              </div>
            </div>

            <div className="form-group">
              <label>KONUM (İLÇE / MAHALLE / SİTE)</label>
              <input type="text" name="location" required onChange={handleChange} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="form-group">
                <label>ODA SAYISI</label>
                <input type="text" name="roomCount" placeholder="Örn: 3+1" onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>BİNA YAŞI</label>
                <input type="number" name="age" onChange={handleChange} />
              </div>
            </div>

            <button type="submit" className="submit-btn">ANALİZ RAPORU OLUŞTUR</button>
          </form>
        </div>
      </main>
    </>
  );
}
