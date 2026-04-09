import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import Head from 'next/head';
import { PortableText } from '@portabletext/react';

const client = createClient({
  projectId: 'k8cd67dp',
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: false
});

const builder = imageUrlBuilder(client);
const urlFor = (source) => (source ? builder.image(source) : null);

export default function RegionDetail({ region }) {
  if (!region) return <div style={{ color: '#fff', textAlign: 'center', padding: '100px' }}>Analiz yükleniyor...</div>;

  return (
    <>
      <Head>
        <title>{region.name} Bölge Analizi | Onda Yatırım</title>
        <meta name="description" content={`${region.name} bölgesi için rasyonel yatırım verileri, m2 fiyatları ve gelecek projeksiyonu.`} />
      </Head>

      <style dangerouslySetInnerHTML={{ __html: `
        .region-detail-page { 
          max-width: 1100px; 
          margin: 100px auto; 
          padding: 0 20px; 
          font-family: 'Inter', sans-serif;
          color: #ffffff;
          -webkit-font-smoothing: antialiased;
        }

        /* Hero Alanı */
        .region-hero { 
          position: relative; 
          width: 100%; 
          height: 450px; 
          overflow: hidden; 
          margin-bottom: 60px;
          border: 1px solid rgba(212,175,55,0.2);
        }
        .region-hero img { width: 100%; height: 100%; object-fit: cover; }
        .hero-overlay { 
          position: absolute; bottom: 0; left: 0; width: 100%; 
          padding: 40px; background: linear-gradient(transparent, #0a192f); 
        }
        .hero-title { 
          color: #d4af37; font-size: 3.5rem; font-weight: 900; 
          letter-spacing: 4px; text-transform: uppercase; margin: 0;
        }

        /* Rasyonel Veri Paneli */
        .stats-panel { 
          display: grid; 
          grid-template-columns: repeat(4, 1fr); 
          gap: 20px; 
          margin-bottom: 80px;
        }
        .stat-box { 
          background: rgba(13, 34, 63, 0.8); 
          border: 1px solid #d4af37; 
          padding: 30px 20px; 
          text-align: center;
        }
        .stat-label { 
          display: block; color: #d4af37; font-size: 0.7rem; 
          font-weight: 800; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 10px;
        }
        .stat-big-value { font-size: 1.6rem; font-weight: 900; color: #fff; }

        /* İçerik Alanı */
        .content-section { 
          font-size: 1.2rem; line-height: 1.9; font-weight: 500; color: #f8f8f8; 
          max-width: 850px; margin: 0 auto;
        }
        .content-section h2 { 
          color: #d4af37; font-size: 2.2rem; font-weight: 800; 
          margin: 60px 0 30px 0; border-left: 6px solid #d4af37; padding-left: 20px;
        }
        .content-section p { margin-bottom: 30px; }

        /* CTA Bölümü */
        .report-cta {
          background: #d4af37;
          color: #0a192f;
          padding: 60px;
          text-align: center;
          margin-top: 100px;
        }
        .report-cta h3 { font-size: 2rem; font-weight: 900; margin-bottom: 20px; text-transform: uppercase; }
        .report-cta p { font-size: 1.1rem; font-weight: 600; margin-bottom: 35px; }
        .cta-btn { 
          display: inline-block; padding: 20px 50px; background: #0a192f; color: #d4af37; 
          text-decoration: none; font-weight: 900; letter-spacing: 2px; text-transform: uppercase;
        }

        @media (max-width: 768px) {
          .stats-panel { grid-template-columns: 1fr 1fr; }
          .hero-title { font-size: 2rem; }
          .hero-active { height: 300px; }
          .content-section { font-size: 1.1rem; }
        }
      `}} />

      <main className="region-detail-page">
        <section className="region-hero">
          {region.mainImage && <img src={urlFor(region.mainImage).url()} alt={region.name} />}
          <div className="hero-overlay">
            <h1 className="hero-title">{region.name}</h1>
          </div>
        </section>

        {/* 4'lü Rasyonel Veri Paneli */}
        <section className="stats-panel">
          <div className="stat-box">
            <span className="stat-label">m² Birim Fiyatı</span>
            <span className="stat-big-value">₺{region.avgPrice}</span>
          </div>
          <div className="stat-box" style={{ background: '#d4af37' }}>
            <span className="stat-label" style={{ color: '#0a192f' }}>Yıllık Artış</span>
            <span className="stat-big-value" style={{ color: '#0a192f' }}>%{region.annualGrowth}</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">ROI (Amortisman)</span>
            <span className="stat-big-value">{region.roi} Yıl</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">Nüfus Artışı</span>
            <span className="stat-big-value">%{region.popGrowth}</span>
          </div>
        </section>

        <article className="content-section">
          <PortableText value={region.body} />
        </article>

        <section className="report-cta">
          <h3>DERİNLEMESİNE ANALİZ İSTER MİSİNİZ?</h3>
          <p>{region.name} bölgesindeki yatırım fırsatlarını rasyonel verilerle masaya yatıralım.</p>
          <a href={`https://wa.me/905326466909?text=Merhaba, ${region.name} bölge analizi hakkında detaylı görüşmek istiyorum.`} className="cta-btn" target="_blank" rel="noreferrer">
            BİZE ULAŞIN
          </a>
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const region = await client.fetch(`
    *[_type == "region" && slug.current == $slug][0]{
      name,
      avgPrice,
      annualGrowth,
      roi,
      popGrowth,
      mainImage,
      body
    }
  `, { slug });

  return { props: { region } };
}
