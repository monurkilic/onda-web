import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

const client = createClient({
  projectId: 'k8cd67dp',
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: false,
});

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

export default function Home({ properties }) {
  const getWhatsAppLink = (title) => {
    // Numaran 905326466909 olarak güncellendi
    const message = encodeURIComponent(`Merhaba Onur Bey, ondayatirim.com'daki "${title}" ilanı hakkında bilgi alabilir miyim?`);
    return `https://wa.me/905326466909?text=${message}`; 
  };

  return (
    <div style={{backgroundColor: '#0a192f', color: '#fff', minHeight: '100vh', fontFamily: 'serif', paddingBottom: '100px'}}>
      
      {/* Logo ve Kurumsal Header */}
      <header style={{padding: '60px 20px', textAlign: 'center', borderBottom: '1px solid rgba(212, 175, 55, 0.1)'}}>
        <div style={{marginBottom: '20px'}}>
          <img 
            src="/logo.png" 
            alt="Onda Yatırım" 
            style={{height: '100px', width: 'auto', marginBottom: '10px'}}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>
        <h1 style={{fontSize: '2.8rem', color: '#d4af37', fontWeight: '300', margin: 0, letterSpacing: '8px', textTransform: 'uppercase'}}>ONDA</h1>
        <p style={{color: '#8e8e8e', fontSize: '0.8rem', letterSpacing: '4px', textTransform: 'uppercase', marginTop: '12px'}}>Yatırım & Gayrimenkul</p>
      </header>

      <main style={{maxWidth: '1300px', margin: '0 auto', padding: '60px 20px'}}>
        {/* İlanlar Izgarası: Modern 3'lü Dizilim */}
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '40px'}}>
          {properties && properties.map((item) => (
            <div key={item._id} style={{background: '#0d223f', border: '1px solid rgba(212, 175, 55, 0.1)', borderRadius: '2px', overflow: 'hidden', display: 'flex', flexDirection: 'column'}}>
              
              {/* Görsel Alanı */}
              <div style={{position: 'relative', height: '300px', overflow: 'hidden'}}>
                {item.mainImage ? (
                  <img src={urlFor(item.mainImage).width(800).url()} style={{width: '100%', height: '100%', objectFit: 'cover'}} alt={item.title} />
                ) : (
                  <div style={{width: '100%', height: '100%', background: '#162d4a'}} />
                )}
                <div style={{position: 'absolute', top: '15px', right: '15px', background: 'rgba(10, 25, 47, 0.9)', padding: '8px 15px', color: '#d4af37', fontSize: '0.7rem', letterSpacing: '2px', border: '1px solid #d4af37'}}>
                  {item.location}
                </div>
              </div>

              {/* Detaylar */}
              <div style={{padding: '35px', flex: 1, display: 'flex', flexDirection: 'column'}}>
                <h2 style={{fontSize: '1.6rem', fontWeight: '400', margin: '0 0 10px 0', color: '#fff', lineHeight: '1.3'}}>{item.title}</h2>
                <div style={{fontSize: '1.7rem', color: '#d4af37', marginBottom: '25px', fontWeight: '300'}}>
                  {item.price} <span style={{fontSize: '0.9rem', opacity: 0.8}}>{item.currency}</span>
                </div>

                {/* Onda Analizi Özeti */}
                <div style={{padding: '20px', background: 'rgba(212, 175, 55, 0.02)', borderLeft: '1px solid #d4af37', marginBottom: '30px'}}>
                  <h4 style={{margin: '0 0 10px 0', color: '#d4af37', fontSize: '0.65rem', letterSpacing: '2px', fontWeight: '600'}}>ONDA ANALİZİ</h4>
                  <p style={{fontStyle: 'italic', color: '#ccc', fontSize: '0.9rem', lineHeight: '1.7', margin: 0}}>
                    "{item.analysis ? (item.analysis.length > 160 ? item.analysis.substring(0, 160) + '...' : item.analysis) : ''}"
                  </p>
                </div>

                {/* Aksiyon Butonları */}
                <div style={{marginTop: 'auto', display: 'flex', gap: '10px'}}>
                  <a href={getWhatsAppLink(item.title)} target="_blank" rel="noreferrer" style={{flex: 2, textAlign: 'center', padding: '16px', background: '#d4af37', color: '#0a192f', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.85rem', letterSpacing: '1px'}}>
                    BİLGİ AL
                  </a>
                  {item.googleMapsUrl && (
                    <a href={item.googleMapsUrl} target="_blank" rel="noreferrer" style={{flex: 1, textAlign: 'center', padding: '16px', border: '1px solid #d4af37', color: '#d4af3
