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

export default function Home({ properties, posts }) {
  return (
    <>
      <Head>
        <title>Onda Yatırım | Aradığınız her şey ONDA</title>
        <meta name="google-site-verification" content="fNf4nfB1gCy8OW-VxDDD4fIa0rzdCEPOoLazxRLEOx4" />
        <meta name="description" content="İzmir ve Ankara merkezli lüks gayrimenkul yatırımında rasyonel analiz ve kurumsal güven." />
        <meta property="og:title" content="Onda Yatırım | Aradığınız her şey ONDA" />
        <meta property="og:description" content="Doğru yatırımcı, doğru mülk. Rasyonel analiz ve kurumsal güvenin adresi." />
        <meta property="og:image" content="https://ondayatirim.com/logo.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ondayatirim.com" />
      </Head>

      <style dangerouslySetInnerHTML={{ __html: `
        .cta-box { border: 1px solid rgba(212,175,55,0.3); padding: 40px; background: rgba(13,34,63,0.5); width: 100%; max-width: 900px; margin: 40px auto; }
        .blog-preview-card { background: #0d223f; border: 1px solid rgba(212,175,55,0.1); padding: 20px; text-decoration: none; display: block; transition: 0.3s; margin-top: 20px; }
        .blog-preview-card:hover { border-color: #d4af37; }
        @media (max-width: 768px) {
          .hero-t { font-size: 1.8rem !important; letter-spacing: 4px !important; line-height: 1.4; }
          .cta-box { padding: 30px 20px !important; margin: 20px auto !important; width: 90% !important; }
        }
      `}} />

      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        {/* HERO SECTION */}
        <h1 className="hero-t" style={{fontSize: '3.5rem', color: '#d4af37', fontWeight: '300', letterSpacing: '8px', marginBottom: '20px'}}>ARADIĞINIZ HER ŞEY ONDA</h1>
        <p style={{maxWidth: '650px', margin: '0 auto 40px auto', color: '#8e8e8e', lineHeight: '1.8', fontSize: '0.95rem'}}>İzmir ve Ankara merkezli lüks gayrimenkul danışmanlığında rasyonel analiz süreci.</p>
        
        {/* CTA BOX */}
        <div className="cta-box">
          <h2 className="cta-title" style={{color: '#d4af37', fontSize: '1.5rem', fontWeight: '300', marginBottom: '20px', letterSpacing: '2px'}}>ONDA ANALİZİ İLE MÜLKÜNÜZÜN DEĞERİNİ KEŞFEDİN</h2>
          <p style={{color: '#ccc', fontSize: '0.9rem', marginBottom: '30px', lineHeight: '1.6'}}>Mülkünüzün gerçek piyasa değerini psikolojik derinlik ve teknik verilerle raporlayalım.</p>
          <a href="/valuation" style={{display: 'inline-block', padding: '15px 35px', background: '#d4af37', color: '#0a192f', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.9rem'}}>ÜCRETSİZ ANALİZ TALEBİ</a>
        </div>

        {/* SON BLOG YAZISI (Yeni Bölüm) */}
        {posts && posts.length > 0 && (
          <div style={{ maxWidth: '900px', margin: '80px auto 40px auto' }}>
            <h3 style={{ color: '#d4af37', fontWeight: '300', letterSpacing: '3px', fontSize: '1.2rem' }}>SON ANALİZLER</h3>
            <a href={`/blog/${posts[0].slug.current}`} className="blog-preview-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', textAlign: 'left', flexWrap: 'wrap' }}>
                <img src={urlFor(posts[0].mainImage).width(200).url()} style={{ width: '150px', height: '100px', objectFit: 'cover' }} alt="Blog" />
                <div style={{ flex: 1 }}>
                  <h4 style={{ color: '#fff', margin: '0 0 10px 0' }}>{posts[0].title}</h4>
                  <p style={{ color: '#8e8e8e', fontSize: '0.8rem', margin: 0 }}>{posts[0].excerpt}</p>
                </div>
              </div>
            </a>
          </div>
        )}

        <div style={{marginTop: '40px'}}>
          <a href="/portfolio" style={{color: '#8e8e8e', textDecoration: 'underline', fontSize: '0.9rem'}}>Veya güncel portföyü inceleyin</a>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const properties = await client.fetch(`*[_type == "property"]`);
  // En son yayınlanan 1 adet blog yazısını da çekiyoruz
  const posts = await client.fetch(`*[_type == "post"] | order(publishedAt desc)[0...1]`);
  return { props: { properties, posts }, revalidate: 10 };
}
