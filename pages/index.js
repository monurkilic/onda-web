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

        /* Yeni Optimize Edilmiş Instagram Vitrini */
        .ig-window { 
          max-width: 850px; /* Pencereyi 3 postun rahat sığacağı ideal genişliğe çektim */
          margin: 100px auto; 
          padding: 0 20px; 
        }
        .ig-header { margin-bottom: 25px; text-align: center; }
        .ig-title { color: #d4af37; font-size: 1.1rem; font-weight: 300; letter-spacing: 4px; text-transform: uppercase; }
        
        .ig-grid-window { 
          display: grid !important; 
          grid-template-cols: repeat(3, 1fr) !important; /* Masaüstünde zorunlu 3'lü dizilim */
          gap: 15px; 
          padding: 15px;
          background: rgba(13,34,63,0.2);
          border: 1px solid rgba(212,175,55,0.1);
        }
        
        .ig-post-item { 
          position: relative; 
          overflow: hidden; 
          display: block;
          background: #000;
        }
        
        .ig-post-item img, .ig-post-item video { 
          width: 100%; 
          height: auto; /* Orijinal boyutu koruması için */
          display: block;
          object-fit: contain; /* Kırpmayı engellemek için */
          transition: 0.4s ease;
        }
        
        .ig-post-item:hover img, .ig-post-item:hover video { 
          filter: brightness(1.1);
        }

        .ig-follow-link {
          display: inline-block;
          margin-top: 20px;
          color: #d4af37;
          text-decoration: none;
          font-size: 0.7rem;
          letter-spacing: 2px;
          opacity: 0.6;
        }

        @media (max-width: 768px) { 
          .ig-grid-window { grid-template-cols: repeat(2, 1fr) !important; gap: 8px; } /* Mobilde 2'li */
          .hero-t { font-size: 2.2rem !important; }
        }
      `}} />

      {/* Hero Section */}
      <section className="hero-container">
        {heroImages.map((img, index) => (
          <div key={index} className={`hero-slide ${index === currentImg ? 'active' : ''}`} style={{ backgroundImage: `url(${img})` }} />
        ))}
        <div className="hero-overlay" />
        <div className="hero-content"><h1 className="hero-t">ARADIĞINIZ HER ŞEY <span>ONDA</span></h1></div>
      </section>

      <div style={{ textAlign: 'center', padding: '0 20px 80px 20px' }}>
        {/* CTA Box */}
        <div className="cta-box">
          <h2 style={{color: '#d4af37', fontSize: '1.8rem', fontWeight: '300', marginBottom: '25px'}}>ONDA ANALİZİ İLE MÜLKÜNÜZÜN DEĞERİNİ KEŞFEDİN</h2>
          <a href="/valuation" style={{display: 'inline-block', padding: '20px 50px', background: '#d4af37', color: '#0a192f', textDecoration: 'none', fontWeight: 'bold'}}>ÜCRETSİZ ANALİZ TALEBİ</a>
        </div>

        {/* Blog Section */}
        {posts && posts.length > 0 && (
          <div style={{ maxWidth: '950px', margin: '120px auto 40px auto' }}>
            <h3 style={{ color: '#d4af37', fontWeight: '300', letterSpacing: '3px' }}>GÜNCEL ANALİZLER</h3>
            <a href={`/blog/${posts[0].slug.current}`} className="blog-preview-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '35px', textAlign: 'left', flexWrap: 'wrap' }}>
                <img src={urlFor(posts[0].mainImage).width(400).url()} style={{ width: '250px', height: '160px', objectFit: 'cover' }} alt="Blog" />
                <div style={{ flex: 1 }}>
                  <h4 style={{ color: '#fff', fontSize: '1.5rem' }}>{posts[0].title}</h4>
                  <p style={{ color: '#8e8e8e' }}>{posts[0].excerpt}</p>
                </div>
              </div>
            </a>
          </div>
        )}

        {/* Instagram Section */}
        {igPosts && igPosts.length > 0 && (
          <section className="ig-window">
            <div className="ig-header">
              <h3 className="ig-title">ONDA YAŞAM</h3>
            </div>
            
            <div className="ig-grid-window">
              {igPosts.slice(0, 3).map((post) => ( // Sadece en taze 3 postu yan yana gösteriyoruz
                <a key={post.id} href={post.permalink} target="_blank" rel="noreferrer" className="ig-post-item">
                  {post.media_type === "VIDEO" ? (
                    <video src={post.media_url} autoPlay muted loop playsInline />
                  ) : (
                    <img src={post.media_url} alt="Onda Yatırım" loading="lazy" />
                  )}
                </a>
              ))}
            </div>

            <a href="https://instagram.com/ondayatirim" target="_blank" rel="noreferrer" className="ig-follow-link">
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
    const response = await fetch(`https://graph.facebook.com/v20.0/${igId}/media?fields=id,media_url,permalink,media_type&limit=3&access_token=${token}`);
    const igData = await response.json();
    igPosts = igData.data || [];
  } catch (err) {
    console.error("Instagram verisi çekilemedi.");
  }
  return { props: { posts, igPosts }, revalidate: 60 };
}
