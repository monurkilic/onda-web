import { useState, useEffect } from 'react';
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import Head from 'next/head';

// Sanity kurulumu (useCdn düzeltilmiş hali)
const client = createClient({ projectId: 'k8cd67dp', dataset: "production", apiVersion: "2023-01-01", useCdn: false });
const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

const heroImages = ["/hero1.jpg", "/hero2.jpg", "/hero3.jpg"];

export default function Home({ posts, igPosts, properties }) {
  const [currentImg, setCurrentImg] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => { setCurrentImg((prev) => (prev + 1) % heroImages.length); }, 5500);
    return () => clearInterval(timer);
  }, []);

  // Animasyonlu Scroll Reveal (Aşağı kaydırdıkça zarifçe beliren bölümler)
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15 }); // Bölümün %15'i göründüğü an animasyon tetiklenir

    const elements = document.querySelectorAll('.reveal-sec');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, [properties, posts, igPosts]); // Dinamik veriler yüklendiğinde observer'ı güncel tutar

  return (
    <>
      <Head>
        <title>M. Onur Kılıç | Keller Williams Gayrimenkul Danışmanı</title>
        <meta name="description" content="Ege Bölgesi ve Ankara merkezli nitelikli arsa, arazi ve lüks gayrimenkul yatırımında Keller Williams güvencesi ve rasyonel analiz." />
        
        {/* WhatsApp, Facebook ve Sosyal Medya Ön İzleme (Open Graph) Ayarları */}
        <meta property="og:title" content="M. Onur Kılıç | Keller Williams Gayrimenkul Danışmanı" />
        <meta property="og:description" content="Ege Bölgesi ve Ankara merkezli nitelikli arsa, arazi ve lüks gayrimenkul yatırımında Keller Williams güvencesi ve rasyonel analiz." />
        <meta property="og:url" content="https://www.monurkilic.com" />
        <meta property="og:type" content="website" />
        
        {/* Imgur Doğrudan CDN Linki */}
        <meta property="og:image" content="https://i.imgur.com/1RQcqPW.jpeg" />
        <meta property="og:image:secure_url" content="https://i.imgur.com/1RQcqPW.jpeg" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="900" />
      </Head>

      <style dangerouslySetInnerHTML={{ __html: `
        body { background: #111111; color: #fff; font-family: 'Inter', sans-serif; margin: 0; -webkit-font-smoothing: antialiased; }

        .kw-style-title {
          color: #bd1e24 !important;
          font-weight: 800 !important;
          letter-spacing: 4px !important;
          text-transform: uppercase;
          text-align: center;
        }

        /* Premium Scroll Reveal Alt Yapısı */
        .reveal-sec {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 1.2s cubic-bezier(0.25, 1, 0.5, 1), transform 1.2s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .reveal-sec.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Giriş Efektleri (Hero Animations) */
        @keyframes heroFadeIn {
          0% { opacity: 0; transform: translateY(30px); letter-spacing: 2px; }
          100% { opacity: 1; transform: translateY(0); letter-spacing: 6px; }
        }
        @keyframes subtitleFadeIn {
          0% { opacity: 0; transform: translateY(15px); letter-spacing: 6px; }
          100% { opacity: 1; transform: translateY(0); letter-spacing: 12px; }
        }

        /* Hero */
        .hero-container { position: relative; height: 85vh; width: 100%; display: flex; align-items: center; justify-content: center; overflow: hidden; }
        .hero-slide { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-size: cover; background-position: center; transition: opacity 2.5s ease-in-out; opacity: 0; }
        .hero-slide.active { opacity: 1; }
        .hero-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(17, 17, 17, 0.6); z-index: 2; }
        .hero-content { position: relative; z-index: 3; padding: 0 20px; text-align: center; }
        
        .hero-t { 
          font-size: 3.5rem; 
          font-weight: 800; 
          line-height: 1.2; 
          text-transform: uppercase; 
          margin: 0;
          color: #fff;
          opacity: 0;
          animation: heroFadeIn 1.6s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        .hero-t span { 
          color: #bd1e24; 
          display: block; 
          font-size: 1.4rem; 
          margin-top: 20px; 
          font-weight: 900;
          opacity: 0;
          animation: subtitleFadeIn 2s cubic-bezier(0.25, 1, 0.5, 1) 0.4s forwards;
        }

        /* Kişisel Profil Bölümü */
        .profile-section { display: grid; grid-template-columns: 1fr 1.2fr; gap: 60px; align-items: center; margin: 120px auto; padding: 0 20px; max-width: 1200px; }
        .profile-img-box { width: 100%; height: 500px; overflow: hidden; border: 1px solid rgba(189,30,36,0.15); border-radius: 4px; background: #1a1a1a; position: relative; }
        .profile-img { width: 100%; height: 100%; object-fit: cover; transition: transform 1s cubic-bezier(0.25, 1, 0.5, 1); }
        .profile-img-box:hover .profile-img { transform: scale(1.04); }
        .profile-content { text-align: left; }
        .profile-content h2 { color: #bd1e24; font-size: 2.2rem; font-weight: 800; margin-bottom: 25px; letter-spacing: 2px; text-transform: uppercase; }
        .profile-content p { color: #ccc; font-size: 1.1rem; line-height: 1.8; font-weight: 500; margin-bottom: 30px; }

        /* Ortak Kart Yapıları ve Sinematik Hover */
        .window-section { margin: 120px auto; padding: 0 20px; max-width: 1200px; text-align: center; }
        .window-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 24px; }
        
        .window-card { 
          width: 300px; 
          background: #1a1a1a; 
          border: 1px solid rgba(189,30,36,0.1); 
          transition: border-color 0.6s cubic-bezier(0.25, 1, 0.5, 1), transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.6s cubic-bezier(0.25, 1, 0.5, 1); 
          display: flex; 
          flex-direction: column; 
          text-decoration: none;
          overflow: hidden;
          border-radius: 4px;
        }
        .window-card:hover { 
          border-color: rgba(189,30,36,0.4); 
          transform: translateY(-5px); 
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6);
        }
        
        .window-media { width: 100%; background: #000; display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative; }
        
        .window-media img, .window-media video { 
          width: 100%; 
          height: 100%; 
          object-fit: cover; 
          display: block; 
          transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
        }
        /* İlanın üzerine gelindiğinde resmi kendi içinde yavaşça büyütür */
        .window-card:hover .window-media img, .window-card:hover .window-media video { 
          transform: scale(1.06); 
        }
        
        .window-info { padding: 20px; text-align: left; }
        .window-card-title { color: #fff; font-size: 0.95rem; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px; transition: color 0.3s ease; line-height: 1.4; }
        .window-card:hover .window-card-title { color: #bd1e24; }
        .window-card-meta { color: #fff; font-size: 0.8rem; font-weight: 600; margin-bottom: 5px; opacity: 0.8; }
        
        .view-all-btn { 
          display: inline-block; 
          margin-top: 50px; 
          padding: 15px 40px; 
          border: 1px solid #bd1e24; 
          color: #bd1e24; 
          text-decoration: none; 
          font-weight: 800; 
          letter-spacing: 3px; 
          font-size: 0.8rem; 
          transition: background 0.4s cubic-bezier(0.25, 1, 0.5, 1), color 0.4s cubic-bezier(0.25, 1, 0.5, 1), transform 0.4s cubic-bezier(0.25, 1, 0.5, 1); 
          border-radius: 4px;
        }
        .view-all-btn:hover { background: #bd1e24; color: #fff; transform: scale(1.02); }

        /* Değerleme Kutusu (CTA) */
        .cta-box { border: 1px solid rgba(189,30,36,0.2); padding: 70px 40px; background: #1a1a1a; width: 100%; max-width: 1200px; margin: 0 auto; text-align: center; border-radius: 4px; }
        .cta-btn { display: inline-block; padding: 20px 50px; background: #bd1e24; color: #fff; text-decoration: none; font-weight: 900; letter-spacing: 2px; border-radius: 4px; transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.4s cubic-bezier(0.25, 1, 0.5, 1); }
        .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 25px rgba(189,30,36,0.4); }

        @media (max-width: 768px) { 
          .profile-section { grid-template-columns: 1fr; gap: 30px; margin: 60px auto; }
          .profile-img-box { height: 350px; }
          .profile-content { text-align: center; }
          .profile-content h2 { font-size: 1.8rem; }
          .window-card { width: 100%; } 
          .window-info { padding: 20px; }
          .hero-t { font-size: 2.2rem !important; }
          .hero-t span { font-size: 1.1rem; letter-spacing: 6px; }
          .cta-box { padding: 40px 20px; }
        }
      `}} />

      {/* HERO SECTION */}
      <section className="hero-container">
        {heroImages.map((img, index) => (
          <div key={index} className={`hero-slide ${index === currentImg ? 'active' : ''}`} style={{ backgroundImage: `url(${img})` }} />
        ))}
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1 className="hero-t">M. ONUR KILIÇ <span>KELLER WILLIAMS GAYRİMENKUL</span></h1>
        </div>
      </section>

      {/* PROFESYONEL PROFİL BÖLÜMÜ */}
      <section className="profile-section reveal-sec">
        <div className="profile-img-box">
          <img src="/onur-kilic.jpg" className="profile-img" alt="M. Onur Kılıç" onError={(e) => { e.target.src = "/hero1.jpg"; }} />
        </div>
        <div className="profile-content">
          <h2>Rasyonel Yatırım Ortaklığı</h2>
          <p>
            Gayrimenkul ve toprak yatırımlarını geleneksel ezberlerden arındırarak; tamamen teknik verilere, rasyonel pazar analizlerine og bölge projeksiyonlarına dayandırıyorum. Keller Williams güvencesiyle, Ege Bölgesi ve Ankara pazarlarında sermayenizi en doğru mülk ve konumlarda büyütecek nitelikli danışmanlık süreçleri yürütüyorum.
          </p>
          <a href="/about" className="view-all-btn" style={{ marginTop: 0 }}>HAKKIMIZDA DAHA FAZLASI</a>
        </div>
      </section>

      {/* PORTFÖYLERİMİZ */}
      {properties && properties.length > 0 && (
        <section className="window-section reveal-sec" style={{ borderTop: '1px solid rgba(189,30,36,0.1)', paddingTop: '100px' }}>
          <h3 className="kw-style-title" style={{ fontSize: '1.6rem', marginBottom: '40px' }}>GÜNCEL PORTFÖYLERİMİZ</h3>
          <div className="window-grid">
            {properties.slice(0, 3).map((prop) => (
              <a key={prop._id} href={`/portfolio/${prop.slug.current}`} className="window-card">
                <div className="window-media" style={{ height: '220px' }}>
                  <img src={urlFor(prop.mainImage).width(600).url()} alt={prop.title} />
                </div>
                <div className="window-info">
                  <h4 className="window-card-title">{prop.title}</h4>
                  <p className="window-card-meta">{prop.location}</p>
                  <p className="window-card-meta" style={{color: '#bd1e24', fontWeight: '800'}}>{prop.price} {prop.currency}</p>
                </div>
              </a>
            ))}
          </div>
          <a href="/portfolio" className="view-all-btn">TÜM PORTFÖYÜ İNCELE</a>
        </section>
      )}

      {/* MÜLK DEĞERLEME (CTA) */}
      <section className="reveal-sec" style={{ padding: '0 20px', margin: '120px 0' }}>
        <div className="cta-box">
          <h2 className="kw-style-title" style={{fontSize: '1.4rem', marginBottom: '25px'}}>MÜLKÜNÜZÜN GERÇEK DEĞERİNİ RAPORLAYALIM</h2>
          <p style={{color: '#ccc', marginBottom: '40px', fontWeight: '500', maxWidth: '600px', margin: '0 auto 40px auto'}}>Ege Bölgesi ve Ankara bölgelerindeki arsa, arazi ve konut yatırımlarınızın gerçek pazar değerini rasyonel tekniklerle analiz edelim.</p>
          <a href="/valuation" className="cta-btn">ÜCRETSİZ ANALİZ TALEBİ OLUŞTUR</a>
        </div>
      </section>

      {/* INSTAGRAM FEED */}
      {igPosts && igPosts.length > 0 && (
        <section className="window-section reveal-sec" style={{ borderTop: '1px solid rgba(189,30,36,0.1)', paddingTop: '100px' }}>
          <h3 className="kw-style-title" style={{ fontSize: '1.4rem', marginBottom: '40px' }}>INSTAGRAM'DA BİZ</h3>
          <div className="window-grid">
            {igPosts.slice(0, 3).map((post) => (
              <a key={post.id} href={post.permalink} target="_blank" rel="noreferrer" className="window-card">
                <div className="window-media" style={{aspectRatio: '1/1', height: '300px'}}>
                  {post.media_type === "VIDEO" ? (
                    <video src={post.media_url} autoPlay muted loop playsInline />
                  ) : (
                    <img src={post.media_url} alt="M. Onur Kılıç" />
                  )}
                </div>
                <div className="window-info">
                  <p style={{ color: '#ccc', fontSize: '0.75rem', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', margin: 0, fontWeight: '500' }}>
                    {post.caption || "Gayrimenkul yatırım süreçlerinde profesyonel analizler..."}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* PERSPEKTİF & GÜNDEM */}
      {posts && posts.length > 0 && (
        <section className="window-section reveal-sec" style={{ borderTop: '1px solid rgba(189,30,36,0.1)', paddingTop: '100px', marginBottom: '120px' }}>
          <h3 className="kw-style-title" style={{ fontSize: '1.5rem', marginBottom: '40px' }}>GÜNCEL YATIRIM PERSPEKTİFİ</h3>
          <div className="window-grid">
            {posts.slice(0, 3).map((post) => (
              <a key={post._id} href={`/blog/${post.slug.current}`} className="window-card">
                <div className="window-media" style={{ height: '200px' }}>
                  <img src={urlFor(post.mainImage).width(600).url()} alt={post.title} />
                </div>
                <div className="window-info">
                  <h4 className="window-card-title">{post.title}</h4>
                  <p style={{ color: '#ccc', fontSize: '0.75rem', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', margin: 0, fontWeight: '500' }}>
                    {post.excerpt}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export async function getStaticProps() {
  const posts = await client.fetch(`*[_type == "post"] | order(publishedAt desc)[0...3]`);
  const properties = await client.fetch(`*[_type == "property"] | order(_createdAt desc)[0...3]`);
  
  let igPosts = [];
  try {
    const igId = process.env.NEXT_PUBLIC_IG_ID;
    const token = process.env.IG_ACCESS_TOKEN;
    const response = await fetch(`https://graph.facebook.com/v20.0/${igId}/media?fields=id,media_url,permalink,media_type,caption&limit=3&access_token=${token}`);
    const igData = await response.json();
    igPosts = igData.data || [];
  } catch (err) { console.error(err); }

  return { props: { posts, igPosts, properties }, revalidate: 60 };
}
