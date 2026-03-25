import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import Head from 'next/head';

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
    const message = encodeURIComponent(`Merhaba Onur Bey, ondayatirim.com'daki "${title}" ilanı hakkında bilgi alabilir miyim?`);
    return `https://wa.me/905326466909?text=${message}`; 
  };

  return (
    <div style={{backgroundColor: '#0a192f', color: '#fff', minHeight: '100vh', fontFamily: 'serif'}}>
      <Head>
        <title>Onda Yatırım | Güvenin Yeni Dalgası</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* MOBİL UYUMLULUK İÇİN CSS KURALLARI */}
      <style dangerouslySetInnerHTML={{ __html: `
        html { scroll-behavior: smooth; }
        @media (max-width: 768px) {
          .nav-container { padding: 15px 20px !important; flex-direction: column !important; gap: 15px; }
          .nav-links { gap: 15px !important; font-size: 0.7rem !important; }
          .hero-title { font-size: 2rem !important; letter-spacing: 4px !important; }
          .hero-text { font-size: 0.9rem !important; padding: 0 10px; }
          .grid-container { grid-template-columns: 1fr !important; gap: 25px !important; padding: 20px !important; }
          .about-text { text-align: left !important; font-size: 1rem !important; line-height: 1.7 !important; }
          .header-logo { height: 70px !important; }
        }
      `}} />
      
      {/* 1. NAVİGASYON */}
      <nav className="nav-container" style={{position: 'sticky', top: 0, zIndex: 100, background: 'rgba(10, 25, 47, 0.95)', borderBottom: '1px solid rgba(212, 175, 55, 0.1)', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backdropFilter: 'blur(10px)'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
          <img src="/logo.png" alt="Onda Logo" style={{height: '40px'}} onError={(e) => e.target.style.display = 'none'} />
          <span style={{color: '#d4af37', letterSpacing: '3px', fontWeight: 'bold', fontSize: '1.2rem'}}>ONDA</span>
        </div>
        <div className="nav-links" style={{display: 'flex', gap: '30px', fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase'}}>
          <a href="#home" style={{color: '#fff', textDecoration: 'none'}}>Giriş</a>
          <a href="#portfolio" style={{color: '#fff', textDecoration: 'none'}}>Portföy</a>
          <a href="#about" style={{color: '#fff', textDecoration: 'none'}}>Hakkımızda</a>
          <a href="#contact" style={{color: '#fff', textDecoration: 'none'}}>İletişim</a>
        </div>
      </nav>

      {/* 2. GİRİŞ (HERO) */}
      <section id="home" style={{padding: '100px 20px', textAlign: 'center', background: 'radial-gradient(circle, #102a43 0%, #0a192f 100%)'}}>
        <div style={{marginBottom: '30px'}}>
           <img src="/logo.png" className="header-logo" style={{height: '100px', width: 'auto'}} onError={(e) => e.target.style.display = 'none'} />
        </div>
        <h2 className="hero-title" style={{fontSize: '3.5rem', color: '#d4af37', fontWeight: '300', margin: '0 0 20px 0', letterSpacing: '10px', textTransform: 'uppercase'}}>GÜVENİN YENİ DALGASI</h2>
        <p className="hero-text" style={{maxWidth: '800px', margin: '0 auto', color: '#8e8e8e', fontSize: '1.1rem', lineHeight: '1.8', letterSpacing: '1px'}}>
          Gayrimenkulde rakamların ötesine geçiyoruz. <br />
          <strong>Onda Analizi</strong> ile her mülkü geleceğe atılmış güvenli bir adım olarak değerlendiriyoruz.
        </p>
      </section>

      {/* 3. PORTFÖY */}
      <section id="portfolio" style={{padding: '60px 0', maxWidth: '1300px', margin: '0 auto'}}>
        <div style={{textAlign: 'center', marginBottom: '50px'}}>
          <h3 style={{fontSize: '2rem', color: '#d4af37', fontWeight: '300', letterSpacing: '5px'}}>SEÇKİN PORTFÖY</h3>
          <div style={{width: '50px', height: '1px', background: '#d4af37', margin: '20px auto'}}></div>
        </div>
        
        <div className="grid-container" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '40px', padding: '0 20px'}}>
          {properties && properties.map((item) => (
            <div key={item._id} style={{background: '#0d223f', border: '1px solid rgba(212, 175, 55, 0.1)', overflow: 'hidden', borderRadius: '2px', display: 'flex', flexDirection: 'column'}}>
              <div style={{position: 'relative', height: '300px'}}>
                {item.mainImage ? (
                  <img src={urlFor(item.mainImage).width(800).url()} style={{width: '100%', height: '100%', objectFit: 'cover'}} alt={item.title} />
                ) : (
                  <div style={{width: '100%', height: '100%', background: '#162d4a'}} />
                )}
                <div style={{position: 'absolute', top: '15px', right: '15px', background: 'rgba(10, 25, 47, 0.9)', padding: '8px 15px', color: '#d4af37', fontSize: '0.7rem', border: '1px solid #d4af37'}}>{item.location}</div>
              </div>
              <div style={{padding: '30px', flex: 1, display: 'flex', flexDirection: '
