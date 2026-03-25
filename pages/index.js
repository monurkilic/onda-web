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
  // WhatsApp mesajını hazırlayan yardımcı fonksiyon
  const getWhatsAppLink = (title) => {
    const message = encodeURIComponent(`Merhaba Onur Bey, ondayatirim.com'daki "${title}" ilanı hakkında bilgi alabilir miyim?`);
    return `https://wa.me/905XXXXXXXXX?text=${message}`; // Buraya kendi numaranı yazmalısın (Örn: 905321234567)
  };

  return (
    <div style={{backgroundColor: '#0a192f', color: '#fff', minHeight: '100vh', fontFamily: "'Playfair Display', serif", paddingBottom: '100px'}}>
      
      {/* Şık ve Minimal Header */}
      <header style={{padding: '80px 20px', textAlign: 'center', borderBottom: '1px solid rgba(212, 175, 55, 0.1)'}}>
        <h1 style={{fontSize: '3.5rem', color: '#d4af37', fontWeight: '300', margin: 0, letterSpacing: '8px', textTransform: 'uppercase'}}>ONDA</h1>
        <div style={{width: '40px', height: '1px', background: '#d4af37', margin: '20px auto'}}></div>
        <p style={{color: '#8e8e8e', fontSize: '0.9rem', letterSpacing: '4px', textTransform: 'uppercase'}}>Yatırım & Gayrimenkul</p>
      </header>

      <main style={{maxWidth: '1200px', margin: '0 auto', padding: '80px 20px'}}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '50px'}}>
          {properties.map((item) => (
            <div key={item._id} style={{background: '#0d223f', border: '1px solid rgba(212, 175, 55, 0.1)', borderRadius: '2px', transition: 'transform 0.3s ease'}}>
              
              {/* Görsel Alanı */}
              <div style={{position: 'relative', height: '300px', overflow: 'hidden'}}>
                <img 
                  src={urlFor(item.mainImage).width(800).url()} 
                  style={{width: '100%', height: '100%', objectFit: 'cover'}} 
                  alt={item.title}
                />
                <div style={{position: 'absolute', top: '20px', right: '20px', background: 'rgba(10, 25, 47, 0.8)', padding: '8px 15px', color: '#d4af37', fontSize: '0.8rem', letterSpacing: '1px', border: '1px solid #d4af37'}}>
                  {item.location}
                </div>
              </div>

              {/* İçerik Alanı */}
              <div style={{padding: '40px'}}>
                <h2 style={{fontSize: '1.8rem', fontWeight: '400', margin: '0 0 15px 0', color: '#fff', lineHeight: '1.2'}}>{item.title}</h2>
                <div style={{fontSize: '1.5rem', color: '#d4af37', marginBottom: '30px', fontWeight: '3
