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
      </Head>

      <style dangerouslySetInnerHTML={{ __html: `
        .hero-container { position: relative; height: 85vh; width: 100%; display: flex; align-items: center; justify-content: center; overflow: hidden; text-align: center; background: #0a192f; }
        .hero-slide { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-size: cover; background-position: center; transition: opacity 2.5s ease-in-out; opacity: 0; }
        .hero-slide.active { opacity: 1; }
        .hero-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(10, 25, 47, 0.45); z-index: 2; }
        .hero-content { position: relative; z-index: 3; padding: 0 20px; }
        .hero-t { font-size: 3.8rem; font-weight: 300; letter-spacing: 12px; color: #fff; line-height: 1.1; text-shadow: 2px 2px 15px rgba(0,0,0,0.8); }
        .hero-t span { color: #d4af37; display: block; font-size: 1.5em; letter-spacing: 20px; margin-top: 25px; font-weight: bold; }
        .cta-box { border: 1px solid rgba(212,175,55,0.3); padding: 60px 40px; background: rgba(13,34,63,0.92); width: 100%; max-width: 900px; margin: -80px auto 60px auto; backdrop-filter: blur(12px); position: relative; z-index: 10; }
        .blog-preview-card { background: #0d223f; border: 1px solid rgba(212,175,55,0.1); padding: 25px; text-decoration: none; display: block; transition: 0.3s; margin-top: 25px; }
        .blog-preview-card:hover { border-color: #d4af37; }

        /* Yeni Instagram Tasarımı */
        .ig-container { max-width: 1200px; margin: 120px auto; padding: 0 20px; text-align: center; }
        .ig-title { color: #d4af37; font-size: 1.8rem; font-weight: 300; letter-spacing: 5px; margin-bottom: 10px; text-transform: uppercase; }
        .ig-subtitle { color: #8e8e8e; font-size: 0.9rem; margin-bottom: 50px; letter-spacing: 1px; }
        .ig-grid { display: grid; grid-template-cols: repeat(3, 1fr); gap: 20px; }
        .ig-card { position: relative; aspect-ratio: 1/1; overflow: hidden; background: #0d223f; border: 1px solid rgba(212,175,55,0.1); transition: 0.4s ease; }
        .ig-card:hover { border-color: #d4af37; transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
        .ig-card img, .ig-card video { width: 100%; height: 100%; object-fit: cover; transition: 0.6s ease; }
        .ig-card:hover img { transform: scale(1.08); filter: brightness(0.6); }
        .ig-overlay { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; opacity: 0; transition: 0.3s; background: rgba(212,175,55,0.1); }
        .ig-card:hover .ig-overlay { opacity: 1; }
        .ig-btn { display: inline-block; margin-top: 50px; padding: 15px 35px; border: 1px solid #d4af37; color: #d4af37; text-decoration: none; font-size: 0.8rem; letter-spacing: 2px; transition: 0.3s; }
        .ig-btn:hover { background: #d4af37; color: #0a192f; }

        @media (max-width: 768px) { 
          .hero-t { font-size: 2.2rem !important; letter-spacing: 6px !important; } 
          .hero-t span { font-size: 1.4em !important; } 
          .cta-box { width: 92% !important; margin: -40px auto 40px auto !important; }
          .ig-grid { grid-template-cols: repeat(2, 1fr); gap: 10px; }
          .ig-title { font-size: 1.4rem; }
        }
      `}} />

      <section className="hero-container">
        {heroImages.map((img, index) => (
          <div key={index} className={`hero-slide ${index === currentImg ? 'active' : ''}`} style={{ backgroundImage: `url(${img})` }} />
        ))}
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1 className="hero-t">ARADIĞINIZ HER ŞEY <span>ONDA</span></h1>
        </div>
      </section>

      <div style={{ textAlign: 'center', padding: '0 20px 80px 20px' }}>
        <div className="cta-box">
          <h2 style={{color: '#d4af37', fontSize: '1.8rem', fontWeight: '300', marginBottom: '25px'}}>ONDA ANALİZİ İLE MÜLKÜNÜZÜN DEĞERİNİ KEŞFEDİN</h2>
          <p style={{color: '#ccc', marginBottom: '40px'}}>Mülkünüzün gerçek piyasa değerini rasyonel analiz ve teknik verilerle raporlayalım.</p>
          <a href="/valuation" style={{display: 'inline-block', padding: '20px 50px', background: '#d4af37', color: '#0a192f', textDecoration: 'none', fontWeight: 'bold'}}>ÜCRETSİZ ANALİZ TALEBİ</a>
        </div>

        {/* Blog Bölümü */}
        {posts && posts.length > 0 && (
          <div style={{ maxWidth: '950px', margin: '120px auto 40px auto' }}>
            <h3 style={{ color: '#d4af37', fontWeight: '300', letterSpacing: '3px', marginBottom: '40px' }}>GÜNCEL ANALİZLER</h3>
            <a href={`/blog/${posts[0].slug.current}`} className="blog-preview-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '35px', textAlign: 'left', flexWrap: 'wrap' }}>
                <img src={urlFor(posts[0].mainImage).width(400).url()} style={{ width: '250px', height: '160px', objectFit: 'cover' }} alt="Blog" />
                <div style={{ flex: 1 }}>
                  <h4 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '15px' }}>{posts[0].title}</h4>
                  <p style={{ color: '#8e8e8e', lineHeight: '1.6' }}>{posts[0].excerpt}</p>
                </div>
              </div>
            </a>
          </div>
        )}

        {/* Yeni Şık Instagram Bölümü */}
        {igPosts && igPosts.length > 0 && (
          <section className="ig-container">
            <h3 className="ig-title">ONDA YAŞAM</h3>
            <p className="ig-subtitle">Gayrimenkul dünyasından güncel kareler ve fırsatlar</p>
            
            <div className="ig-grid">
              {igPosts.map((post) => (
                <a key={post.id} href={post.permalink} target="_blank" rel="noreferrer" className="ig-card">
                  <div className="ig-overlay">
                    <span style={{color: '#fff', fontSize: '0.8rem', letterSpacing: '1px'}}>YAKINDAN İNCELE</span>
                  </div>
                  {post.media_type === "VIDEO" ? (
                    <video src={post.media_url} autoPlay muted loop playsInline />
                  ) : (
                    <img src={post.media_url} alt="Onda Yatırım Instagram" loading="lazy" />
                  )}
                </a>
              ))}
            </div>

            <a href="https://instagram.com/ondayatirim" target="_blank" rel="noreferrer" className="ig-btn">
              INSTAGRAM'DA TAKİP ET
            </a>
          </section>
        )}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const posts = await client.fetch(`*[_type == "post"] | order(publishedAt desc)[0...1]`);

  let igPosts = [];
  try {
    const igId = process.env.NEXT_PUBLIC_IG_ID;
    const token = process.env.IG_ACCESS_TOKEN;
    // Limit 6 olarak ayarlandı, en şık 3x2 grid için idealdir
    const response = await fetch(`https://graph.facebook.com/v20.0/${igId}/media?fields=id,media_url,permalink,media_type&limit=6&access_token=${token}`);
    const igData = await response.json();
    igPosts = igData.data || [];
  } catch (err) {
    console.error("Instagram çekilemedi:", err);
  }

  return { 
    props: { posts, igPosts }, 
    revalidate: 60 // 60 saniyede bir kontrol etmesi yeterli
  };
}
