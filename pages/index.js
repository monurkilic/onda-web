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

const heroImages = [
  "/hero1.jpg",
  "/hero2.jpg",
  "/hero3.jpg"
];

export default function Home({ properties, posts }) {
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % heroImages.length);
    }, 5500); 
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
          transition: opacity 2.5s ease-in-out;
          opacity: 0;
        }
        .hero-slide.active { opacity: 1; }
        .hero-overlay {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(10, 25, 47, 0.45);
          z-index: 2;
        }
        .hero-content { position: relative; z-index: 3; padding: 0 20px; }
        
        .hero-t { 
          font-size: 3.8rem; 
          font-weight: 300; 
          letter-spacing: 12px; 
          margin-bottom: 25px; 
          text-shadow: 2px 2px 15px rgba(0,0,0,0.8); 
          color: #ffffff;
          line-height: 1.1;
        }
        .hero-t span { 
          color: #d4af37; 
          display: block; 
          font-size: 1.5em; 
          letter-spacing: 20px; 
          margin-top: 25px;
          font-weight: bold;
        }

        .cta-box { 
          border: 1px solid rgba(212,175,55,0.3); 
          padding: 60px 40px; 
          background: rgba(13,34,63,0.92); 
          width: 100%; 
          max-width: 900px; 
          margin: -80px auto 60px auto; 
          backdrop-filter: blur(12px);
          position: relative;
          z-index: 10;
        }

        .blog-preview-card { background: #0d223f; border: 1px solid rgba(212,175,55,0.1); padding: 25px; text-decoration: none; display: block; transition: 0.3s; margin-top: 25px; }
        .blog-preview-card:hover { border-color: #d4af37; }
        
        @media (max-width: 768px) {
          .hero-container { height: 75vh; }
          .hero-t { font-size: 2.2rem !important; letter-spacing: 6px !important; }
          .hero-t span { font-size: 1.4em !important; letter-spacing: 10px !important; }
          .cta-box { padding: 40px 20px !important; margin: -50px auto 40px auto !important; width: 92% !important; }
        }
      `}} />

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
          <h1 className="hero-t">
            ARADIĞINIZ HER ŞEY <span>ONDA</span>
          </h1>
          <p style={{maxWidth: '750px', margin: '0 auto', color: '#fff', lineHeight: '1.8', fontSize: '1.3rem', letterSpacing: '2px', textShadow: '1px 1px 6px rgba(0,0,0,1)', fontWeight: '300'}}>
            İzmir ve Ankara merkezli lüks gayrimenkul danışmanlığında rasyonel analiz süreci.
          </p>
        </div>
      </section>

      <div style={{ textAlign: 'center', padding: '0 20px 80px 20px' }}>
        <div className="cta-box">
          <h2 className="cta-title" style={{color: '#d4af37', fontSize: '1.8rem', fontWeight: '300', marginBottom: '25px', letterSpacing: '2px'}}>ONDA ANALİZİ İLE MÜLKÜNÜZÜN DEĞERİNİ KEŞFEDİN</h2>
          <p style={{color: '#ccc', fontSize: '1.1rem', marginBottom: '40px', lineHeight: '1.6'}}>Mülkünüzün gerçek piyasa değerini rasyonel analiz ve teknik verilerle raporlayalım.</p>
          <a href="/valuation" style={{display: 'inline-block', padding: '20px 50px', background: '#d4af37', color: '#0a192f', textDecoration: 'none', fontWeight: 'bold', fontSize: '1rem', letterSpacing: '2px'}}>ÜCRETSİZ ANALİZ TALEBİ</a>
        </div>

        {posts && posts.length > 0 && (
          <div style={{ maxWidth: '950px', margin: '120px auto 40px auto' }}>
            <h3 style={{ color: '#d4af37', fontWeight: '300', letterSpacing: '3px', fontSize: '1.3rem', marginBottom: '40px' }}>GÜNCEL ANALİZLER</h3>
            <a href={`/blog/${posts[0].slug.current}`} className="blog-preview-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '35px', textAlign: 'left', flexWrap: 'wrap' }}>
                <img src={urlFor(posts[0].mainImage).width(400).url()} style={{ width: '250px', height: '160px', objectFit: 'cover', border: '1px solid rgba(212,175,55,0.1)' }} alt="Blog" />
                <div style={{ flex: 1 }}>
                  <h4 style={{ color: '#fff', margin: '0 0 15px 0', fontSize: '1.5rem' }}>{posts[0].title}</h4>
                  <p style={{ color: '#8e8e8e', fontSize: '1rem', margin: 0, lineHeight: '1.6' }}>{posts[0].excerpt}</p>
                </div>
              </div>
            </a>
          </div>
        )}

        <div style={{marginTop: '100px'}}>
          <a href="/portfolio" style={{color: '#8e8e8e', textDecoration: 'underline', fontSize: '1rem', letterSpacing: '1px'}}>Veya güncel portföyü inceleyin</a>
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
