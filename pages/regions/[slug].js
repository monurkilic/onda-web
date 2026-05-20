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

  // WhatsApp numarası güncel iş telefonun olan 905416406909 ile revize edildi
  const whatsappUrl = `https://wa.me/905416406909?text=${encodeURIComponent(`Merhaba Onur Bey, ${region.name} bölge analizi hakkında detaylı görüşmek istiyorum.`)}`;

  return (
    <>
      <Head>
        <title>{region.name} Bölge Analizi | M. Onur Kılıç - Keller Williams</title>
        <meta name="description" content={`${region.name} bölgesi için rasyonel yatırım verileri, m2 fiyatları ve gelecek projeksiyonu.`} />
      </Head>

      <style dangerouslySetInnerHTML={{ __html: `
        .region-detail-page { 
          max-width: 1100px; 
          margin: 120px auto; 
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
          border: 1px solid rgba(189, 30, 36, 0.2);
        }
        .region-hero img { width: 100%; height: 100%; object-fit: cover; }
        .hero-overlay { 
          position: absolute; bottom: 0; left: 0; width: 100%; 
          padding: 40px; background: linear-gradient(transparent, #111111); 
        }
        .hero-title { 
          color: #bd1e24; font-size: 3.5rem; font-weight: 800; 
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
          background: #1a1a1a; 
          border: 1px solid rgba(189, 30, 36, 0.2); 
          padding: 30px 20px; 
          text-align: center;
        }
        .stat-label { 
          display: block; color: #bd1e24; font-size: 0.7rem; 
          font-weight: 800; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 10px;
        }
        .stat-big-value { font-size: 1.6rem; font-weight: 900; color: #fff; }

        /* İçerik Alanı */
        .content-section { 
          font-size: 1.2rem; line-height: 1.9; font-weight: 500; color: #f8f8f8; 
          max-width: 850px; margin: 0 auto;
        }
        .content-section h2 { 
          color: #bd1e24; font-size: 2.2rem; font-weight: 800; 
          margin: 60px 0 30px 0; border-left: 6px solid #bd1e24; padding-left: 20px;
        }
        .content-section p { margin-bottom: 30px; }

        /* CTA Bölümü - KW Kırmızısı */
        .report-cta {
          background: #bd1e24;
          color: #ffffff;
          padding: 60px;
          text-align: center;
          margin-top: 100px;
        }
        .report-cta h3 { font-size: 2rem; font-weight: 800; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px; }
        .report-cta p { font-size: 1.1rem; font-weight: 600; margin-bottom: 35px; opacity: 0.9; }
        .cta-btn { 
          display: inline-block; padding: 20px 50px; background: #111111; color: #ffffff; 
          text-decoration: none; font-weight: 900; letter-spacing: 2px; text-transform: uppercase;
          transition: 0.3s;
        }
        .cta-btn:hover { background: #ffffff; color: #bd1e24; }

        @media (max-width: 768px) {
          .region-detail-page { margin: 60px auto; }
          .stats-panel { grid-template-columns: 1fr 1fr; }
          .hero-title { font-size: 2rem; }
          .region-hero { height: 300px; }
          .content-section { font-size: 1.1rem; }
          .report-cta { padding: 40px 20px; }
          .report-cta h3 { font-size: 1.5rem; }
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
          <div className="stat-box" style={{ background: '#bd1e24', borderColor: '#bd1e24' }}>
            <span className="stat-label" style={{ color: '#ffffff' }}>Yıllık Artış</span>
            <span className="stat-big-value" style={{ color: '#ffffff' }}>%{region.annualGrowth}</span>
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
          <a href={whatsappUrl} className="cta-btn" target="_blank" rel="noreferrer">
            WHATSAPP İLE GÖRÜŞÜN
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