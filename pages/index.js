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
        body { background: #0a192f; color: #fff; font-family: 'Inter', sans-serif; margin: 0; }

        /* ONDA İmza Fontu */
        .onda-style-title {
          color: #d4af37 !important;
          font-weight: 800 !important;
          letter-spacing: 6px !important;
          text-transform: uppercase;
        }

        .hero-container { position: relative; height: 85vh; width: 100%; display: flex; align-items: center; justify-content: center; overflow: hidden; text-align: center; }
        .hero-slide { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-size: cover; background-position: center; transition: opacity 2.5s ease-in-out; opacity: 0; }
        .hero-slide.active { opacity: 1; }
        .hero-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(10, 25, 47, 0.45); z-index: 2; }
        .hero-content { position: relative; z-index: 3; padding: 0 20px; }
        .hero-t { font-size: 3.8rem; font-weight: 300; letter-spacing: 12px; color: #fff; line-height: 1.1; }
        .hero-t span { color: #d4af37; display: block; font-size: 1.5em; letter-spacing: 20px; margin-top: 25px; font-weight: bold; }
        
        .cta-box { border: 1px solid rgba(212,175,55,0.3); padding: 60px 40px; background: rgba(13,34,63,0.92); width: 100%; max-width: 900px; margin: -80px auto 60px auto; backdrop-filter: blur(12px); position: relative; z-index: 10; }

        /* Kompakt Vitrin Düzeni (Hem Blog Hem Instagram İçin) */
        .window-section { margin: 100px auto; padding: 0 20px; text-align: center; }
        .window-grid { 
          display: flex; 
          flex-wrap: wrap; 
          justify-content: center; 
          gap: 20px; 
        }

        .window-card { 
          width: 300px; /* SABİT 300PX */
          background: #0d223f; 
          border: 1px solid rgba(212,175,55,0.15); 
          overflow: hidden; 
          transition: 0.3s;
          display: flex;
          flex-direction: column;
          text-decoration: none;
        }
        .window-card:hover { border-color: #d4af37; transform: translateY(-5px); }

        .window-media { 
          width: 100%; 
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .window-media img, .window-media video { 
          width: 100%; 
          height: auto; 
          object-fit: contain; /* KIRPMAYI ENGELLER */
          display: block;
        }

        .window-info { padding: 20px; text-align: left; }
        .window-title { 
          color: #d4af37; 
          font-size: 0.9rem; 
          font-weight: 800; 
          letter-spacing: 1px; 
          text-transform: uppercase; 
          margin-bottom: 10px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .window-text { 
          color: #ccc; 
          font-size: 0.8rem; 
          line-height: 1.5; 
          display: -webkit-box;
          -webkit-line-clamp: 2; /* 2 SATIR SINIRI */
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @media (max-width: 768px) { 
          .window-card { width: 145px; } 
          .window-info { padding: 10px; }
          .window-title { font-size: 0.7rem; letter-spacing: 0; }
          .window-text { display: none; } /* Mobilde sadece başlık kalsın */
          .hero-t { font-size: 2.2rem !important; }
        }
      `}} />

      {/* Hero */}
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
          <h2 className="onda-style-title" style={{fontSize: '1.2rem', marginBottom: '25px'}}>MÜLKÜNÜZÜN DEĞERİNİ KEŞFEDİN</h2>
          <a href="/valuation" style={{display: 'inline-block', padding: '20px 50px', background: '#d4af37', color: '#0a192f', textDecoration: 'none', fontWeight: '900', letterSpacing: '2px'}}>ÜCRETSİZ ANALİZ TALEBİ</a>
        </div>

        {/* Blog Vitrini - Perspektif & Gündem */}
        {posts && posts.length > 0 && (
          <section className="window-section">
            <h3 className="onda-style-title" style={{ fontSize: '1.6rem', marginBottom: '40px' }}>PERSPEKTİF & GÜNDEM</h3>
            <div className="window-grid">
              {posts.map((post) => (
                <a key={post._id} href={`/blog/${post.slug.current}`} className="window-card">
                  <div className="window-media">
                    <img src={urlFor(post.mainImage).width(600).url()} alt={post.title} />
                  </div>
                  <div className="window-info">
                    <h4 className="window-title">{post.title}</h4>
                    <p className="window-text">{post.excerpt}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Instagram Vitrini - Onda Yaşam */}
        {igPosts && igPosts.length > 0 && (
          <section className="window-section">
            <h3 className="onda-style-title" style={{ fontSize: '1.2rem', marginBottom: '40px' }}>ONDA YAŞAM</h3>
            <div className="window-grid">
              {igPosts.slice(0, 3).map((post) => (
                <a key={post.id} href={post.permalink} target="_blank" rel="noreferrer" className="window-card">
                  <div className="window-media" style={{aspectRatio: '1/1'}}>
                    {post.media_type === "VIDEO" ? (
                      <video src={post.media_url} autoPlay muted loop playsInline />
                    ) : (
                      <img src={post.media_url} alt="Onda Yatırım" />
                    )}
                  </div>
                  <div className="window-info">
                    <p className="window-text" style={{WebkitLineClamp: 2}}>{post.caption || "Onda Yatırım ile rasyonel süreçler..."}</p>
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
