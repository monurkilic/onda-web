import { useState, useEffect } from 'react';
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import Head from 'next/head';

const client = createClient({ 
  projectId: 'k8cd67dp', 
  dataset: "production", 
  apiVersion: "2023-01-01", 
  useCdn: false 
});

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

// ŞİMDİLİK SİTE BOŞ GÖRÜNMESİN DİYE PROFESYONEL GÖRSELLER EKLEDİM
// Kendi görsellerini yüklediğinde burayı ["/hero1.jpg", "/hero2.jpg", "/hero3.jpg"] yapabiliriz.
const heroImages = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1600607687940-4e5a994239b7?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&w=1920&q=80"
];

export default function Home({ properties, posts }) {
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % heroImages.length);
    }, 5000); 
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Head>
        <title>Onda Yatırım | Aradığınız her şey ONDA</title>
        <meta name="description" content="İzmir ve Ankara merkezli lüks gayrimenkul yatırımında rasyonel analiz ve kurumsal güven." />
        <meta property="og:title" content="Onda Yatırım | Aradığınız her şey ONDA" />
        <meta property="og:image" content="https://ondayatirim.com/logo.png" />
      </Head>

      <style dangerouslySetInnerHTML={{ __html: `
        .hero-container {
          position: relative;
          height: 85vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          text-align: center;
          background: #0a192f;
        }
        .hero-bg-layer {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          z-index: 1;
        }
        .hero-slide {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background-size: cover;
          background-position: center;
          transition: opacity 2s ease-in-out;
          opacity: 0;
        }
        .hero-slide.active { opacity: 1; }
        .hero-overlay {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(10, 25, 47, 0.5);
          z-index: 2;
        }
        .hero-content { position: relative; z-index: 3; padding: 0 20px; }
        
        .cta-box { 
          border: 1px solid rgba(212,175,55,0.3); 
          padding: 50px 40px; 
          background: rgba(13,34,63,0.9); 
          width: 100%; 
          max-width: 900px; 
          margin: -80px auto 60px auto; 
          backdrop-filter: blur(10px);
          position: relative;
          z-index: 10;
        }

        .blog-preview-card { background: #0d223f; border: 1px solid rgba(212,175,55,0.1); padding: 20px; text-decoration: none; display: block; transition: 0.3s; margin-top: 20px; }
        .blog-preview-card:hover { border-color: #d4af37; }
        
        @media (max-width: 768px) {
          .hero-container { height: 75vh; }
          .hero-t { font-size: 2.2rem !important; letter-spacing: 4px !important; line-height: 1.2; }
          .cta-box { padding: 35px 20px !important; margin: -40px auto 40px auto !important; width: 92% !important; }
        }
      `}} />

      {/* DİNAMİK GİRİŞ (HERO) BÖLÜMÜ */}
      <section className="hero-container">
        <div className="hero-bg-layer">
          {heroImages.map((img, index) => (
            <div 
              key={index} 
              className={`hero-slide ${index === currentImg ? 'active' : ''}`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
          <div className="hero-overlay" />
        </div>
        
        <div className="hero-content">
          <h1 className="hero-t" style={{fontSize: '4.5rem', color: '#d4af37', fontWeight: '300', letterSpacing: '12px', marginBottom: '25px', textShadow: '2px 2px 10px rgba(0,0,0,0.7)'}}>
            ARADIĞINIZ HER ŞEY ONDA
          </h1>
          <p style={{maxWidth: '750px', margin: '0 auto', color: '#fff', lineHeight: '1.8', fontSize: '1.2rem', letterSpacing: '1px', textShadow: '1px 1px 5px rgba(0,0,0,1)'}}>
            İzmir ve Ankara merkezli lüks gayrimenkul danışmanlığında rasyonel analiz süreci.
          </p>
        </div>
      </section>

      <div style={{ textAlign: 'center', padding: '0 20px 80px 20px' }}>
        {/* ANALİZ TALEBİ KUTUSU */}
        <div className="cta-box">
          <h2 className="cta-title" style={{color: '#d4af37', fontSize: '1.6rem', fontWeight: '300', marginBottom: '20px', letterSpacing: '2px'}}>ONDA ANALİZİ İLE MÜLKÜNÜZÜN DEĞERİNİ KEŞFEDİN</h2>
          <p style={{color: '#ccc', fontSize: '1rem', marginBottom: '35px', lineHeight: '1.6'}}>Mülkünüzün gerçek piyasa değerini rasyonel analiz ve teknik verilerle raporlayalım.</p>
          <a href="/valuation" style={{display: 'inline-block', padding: '18px 45px', background: '#d4af37', color: '#0a192f', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.9rem', letterSpacing: '2px'}}>ÜCRETSİZ ANALİZ TALEBİ</a>
        </div>

        {/* SON ANALİZ YAZISI */}
        {posts && posts.length > 0 && (
          <div style={{ maxWidth: '900px', margin: '100px auto 40px auto' }}>
            <h3 style={{ color: '#d4af37', fontWeight: '300', letterSpacing: '3px', fontSize: '1.1rem', marginBottom: '30px' }}>GÜNCEL ANALİZLER</h3>
            <a href={`/blog/${posts[0].slug.current}`} className="blog-preview-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '30px', textAlign: 'left', flexWrap: 'wrap' }}>
                <img src={urlFor(posts[0].mainImage).width(300).url()} style={{ width: '220px', height: '140px', objectFit: 'cover', border: '1px solid rgba(212,175,55,0.1)' }} alt="Blog" />
                <div style={{ flex: 1 }}>
                  <h4 style={{ color: '#fff', margin: '0 0 12px 0', fontSize: '1.3rem' }}>{posts[0].title}</h4>
                  <p style={{ color: '#8e8e8e', fontSize: '0.9rem', margin: 0, lineHeight: '1.5' }}>{posts[0].excerpt}</p>
                </div>
              </div>
            </a>
          </div>
        )}

        <div style={{marginTop: '80px'}}>
          <a href="/portfolio" style={{color: '#8e8e8e', textDecoration: 'underline', fontSize: '0.9rem', letterSpacing: '1px'}}>Veya güncel portföyü inceleyin</a>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const properties = await client.fetch(`*[_type == "property"]`);
  const posts = await client.fetch(`*[_type == "post"] | order(publishedAt desc)[0...1]`);
  return { props: { properties, posts }, revalidate: 10 };
}
