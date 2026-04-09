import { useState, useEffect } from 'react';
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import Head from 'next/head';

const client = createClient({ projectId: 'k8cd67dp', dataset: "production", apiVersion: "2023-01-01", useCdn: false });
const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

const heroImages = ["/hero1.jpg", "/hero2.jpg", "/hero3.jpg"];

export default function Home({ posts, igPosts }) {
  const [currentImg, setCurrentImg] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => { setCurrentImg((prev) => (prev + 1) % heroImages.length); }, 5500);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Head>
        <title>Onda Yatırım | Aradığınız her şey ONDA</title>
        <meta name="description" content="İzmir ve Ankara merkezli lüks gayrimenkul yatırımında rasyonel analiz ve kurumsal güven." />
        <meta property="og:image" content="https://ondayatirim.com/logo.png" />
      </Head>

      <style dangerouslySetInnerHTML={{ __html: `
        /* Global Font ve ONDA Stili Entegrasyonu */
        body { 
          background: #0a192f; 
          color: #fff; 
          font-family: 'Inter', sans-serif; 
          margin: 0; 
          -webkit-font-smoothing: antialiased;
        }

        /* Hero'daki 'ONDA' font karakteristiği */
        .onda-style-title {
          color: #d4af37 !important;
          font-weight: 800 !important;
          letter-spacing: 8px !important;
          text-transform: uppercase;
        }

        .hero-container { position: relative; height: 85vh; width: 100%; display: flex; align-items: center; justify-content: center; overflow: hidden; text-align: center; background: #0a192f; }
        .hero-slide { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-size: cover; background-position: center; transition: opacity 2.5s ease-in-out; opacity: 0; }
        .hero-slide.active { opacity: 1; }
        .hero-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(10, 25, 47, 0.45); z-index: 2; }
        .hero-content { position: relative; z-index: 3; padding: 0 20px; }
        .hero-t { font-size: 3.8rem; font-weight: 300; letter-spacing: 12px; color: #fff; line-height: 1.1; text-shadow: 2px 2px 15px rgba(0,0,0,0.8); }
        .hero-t span { color: #d4af37; display: block; font-size: 1.5em; letter-spacing: 20px; margin-top: 25px; font-weight: bold; }
        
        .cta-box { border: 1px solid rgba(212,175,55,0.3); padding: 60px 40px; background: rgba(13,34,63,0.92); width: 100%; max-width: 900px; margin: -80px auto 60px auto; backdrop-filter: blur(12px); position: relative; z-index: 10; }
        
        /* 3'lü Blog Grid Tasarımı */
        .section-title { margin: 100px 0 50px 0; text-align: center; }
        .blog-grid { 
          display: grid; 
          grid-template-cols: repeat(3, 1fr); 
          gap: 30px; 
          max-width: 1200px; 
          margin: 0 auto; 
          padding: 0 20px;
        }
        .blog-card { 
          background: #0d223f; 
          border: 1px solid rgba(212,175,55,0.1); 
          transition: 0.4s; 
          text-decoration: none;
          display: flex;
          flex-direction: column;
        }
        .blog-card:hover { border-color: #d4af37; transform: translateY(-10px); }
        .blog-card-img { width: 100%; height: 220px; object-fit: cover; border-bottom: 1px solid rgba(212,175,55,0.1); }
        .blog-card-content { padding: 25px; }
        .blog-card-title { color: #fff; font-size: 1.2rem; font-weight: 700; margin-bottom: 15px; line-height: 1.4; }
        .blog-card-excerpt { color: #8e8e8e; font-size: 0.9rem; line-height: 1.6; }

        /* Instagram Bölümü */
        .ig-outer-container { margin: 120px auto; padding: 0 20px; text-align: center; }
        .ig-fixed-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; }
        .ig-post-wrapper { width: 300px; background: #0d223f; border: 1px solid rgba(212,175,55,0.15); overflow: hidden; transition: 0.3s; display: flex; flex-direction: column; }
        .ig-post-wrapper:hover { border-color: #d4af37; }
        .ig-media-box { width: 100%; aspect-ratio: 1/1; overflow: hidden; }
        .ig-caption-container { padding: 15px; text-align: left; }
        .ig-caption-text { color: #ccc; font-size: 0.8rem; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

        @media (max-width: 1024px) { .blog-grid { grid-template-cols: repeat(2, 1fr); } }
        @media (max-width: 768px) { 
          .hero-t { font-size: 2.2rem !important; } 
          .blog-grid { grid-template-cols: 1fr; } 
          .ig-post-wrapper { width: 140px; }
          .about-title { font-size: 2.5rem !important; }
        }
      `}} />

      {/* Hero */}
      <section className="hero-container">
        {heroImages.map((img, index) => (
          <div key={index} className={`hero-slide ${index === currentImg ? 'active' : ''}`} style={{ backgroundImage: `url(${img})` }} />
        ))}
        <div className="hero-overlay" />
        <div className="hero-content"><h1 className="hero-t">ARADIĞINIZ HER ŞEY <span>ONDA</span></h1></div>
      </section>

      <div style={{ textAlign: 'center', padding: '0 20px 80px 20px' }}>
        <div className="cta-box">
          <h2 className="onda-style-title" style={{fontSize: '1.4rem', marginBottom: '25px'}}>MÜLKÜNÜZÜN DEĞERİNİ KEŞFEDİN</h2>
          <p style={{color: '#ccc', marginBottom: '40px', fontWeight: '500'}}>Mülkünüzün gerçek piyasa değerini rasyonel analiz ve teknik verilerle raporlayalım.</p>
          <a href="/valuation" style={{display: 'inline-block', padding: '20px 50px', background: '#d4af37', color: '#0a192f', textDecoration: 'none', fontWeight: '900', letterSpacing: '2px'}}>ÜCRETSİZ ANALİZ TALEBİ</a>
        </div>

        {/* 3'lü Blog Listesi (Perspektif & Gündem) */}
        {posts && posts.length > 0 && (
          <section style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="section-title">
              <h3 className="onda-style-title" style={{ fontSize: '1.8rem' }}>PERSPEKTİF & GÜNDEM</h3>
            </div>
            <div className="blog-grid">
              {posts.map((post) => (
                <a key={post._id} href={`/blog/${post.slug.current}`} className="blog-card">
                  <img src={urlFor(post.mainImage).width(600).url()} className="blog-card-img" alt={post.title} />
                  <div className="blog-card-content">
                    <h4 className="blog-card-title">{post.title}</h4>
                    <p className="blog-card-excerpt">{post.excerpt}</p>
                    <span style={{ color: '#d4af37', fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '2px', marginTop: '20px', display: 'block' }}>DEVAMINI OKU →</span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Instagram Vitrini */}
        {igPosts && igPosts.length > 0 && (
          <section className="ig-outer-container">
            <h3 className="onda-style-title" style={{ fontSize: '1.2rem', marginBottom: '40px' }}>ONDA YAŞAM</h3>
            <div className="ig-fixed-grid">
              {igPosts.slice(0, 3).map((post) => (
                <a key={post.id} href={post.permalink} target="_blank" rel="noreferrer" className="ig-post-wrapper">
                  <div className="ig-media-box">
                    {post.media_type === "VIDEO" ? <video src={post.media_url} autoPlay muted loop playsInline style={{width: '100%', height:'100%', objectFit: 'cover'}} /> : <img src={post.media_url} alt="Onda Yatırım" style={{width: '100%', height:'100%', objectFit: 'cover'}} />}
                  </div>
                  <div className="ig-caption-container">
                    <p className="ig-caption-text">{post.caption || "Onda Yatırım ile rasyonel analizler..."}</p>
                  </div>
                </a>
              ))}
            </div>
            <a href="https://instagram.com/ondayatirim" target="_blank" rel="noreferrer" style={{display: 'inline-block', marginTop: '40px', color: '#666', textDecoration: 'none', fontSize: '0.7rem', letterSpacing: '3px'}}>@ondayatirim →</a>
          </section>
        )}
      </div>
    </>
  );
}

export async function getStaticProps() {
  // Sorguyu 3 yazı çekecek şekilde güncelledik
  const posts = await client.fetch(`*[_type == "post"] | order(publishedAt desc)[0...3]`);
  
  let igPosts = [];
  try {
    const igId = process.env.NEXT_PUBLIC_IG_ID;
    const token = process.env.IG_ACCESS_TOKEN;
    const response = await fetch(`https://graph.facebook.com/v20.0/${igId}/media?fields=id,media_url,permalink,media_type,caption&limit=3&access_token=${token}`);
    const igData = await response.json();
    igPosts = igData.data || [];
  } catch (err) { console.error(err); }

  return { props: { posts, igPosts }, revalidate: 60 };
}
