import { createClient } from "next-sanity";
import Head from 'next/head';
import imageUrlBuilder from "@sanity/image-url";

const client = createClient({
  projectId: 'k8cd67dp',
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: false
});

const builder = imageUrlBuilder(client);
const urlFor = (source) => (source ? builder.image(source) : null);

export default function RegionsList({ regions }) {
  return (
    <>
      <Head>
        <title>Bölge Analizleri | M. Onur Kılıç - Keller Williams</title>
        <meta name="description" content="Ege Bölgesi ve Ankara'nın en değerli bölgelerine dair rasyonel veriler ve piyasa projeksiyonları." />
      </Head>

      <style dangerouslySetInnerHTML={{ __html: `
        .regions-container { max-width: 1200px; margin: 120px auto; padding: 0 20px; font-family: 'Inter', sans-serif; }
        .regions-title { color: #bd1e24; font-size: 3rem; font-weight: 800; letter-spacing: 6px; text-transform: uppercase; text-align: center; margin-bottom: 20px; }
        .regions-subtitle { text-align: center; color: #fff; opacity: 0.8; margin-bottom: 80px; font-size: 1.1rem; letter-spacing: 1px; font-weight: 500; }

        .regions-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 40px; }
        
        .region-card { 
          background: #1a1a1a; 
          border: 1px solid rgba(189, 30, 36, 0.15); 
          transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
          text-decoration: none;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }
        .region-card:hover { border-color: #bd1e24; transform: translateY(-10px); }

        .region-img-box { width: 100%; height: 200px; overflow: hidden; background: #000; }
        .region-img-box img { width: 100%; height: 100%; object-fit: cover; opacity: 0.7; transition: 0.5s; }
        .region-card:hover .region-img-box img { opacity: 1; transform: scale(1.1); }

        .region-info { padding: 30px; }
        .region-name { color: #bd1e24; font-size: 1.4rem; font-weight: 800; letter-spacing: 1px; margin-bottom: 20px; text-transform: uppercase; }
        
        .stat-line { display: flex; justify-content: space-between; margin-bottom: 15px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 8px; }
        .stat-label { color: #8e8e8e; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; }
        .stat-value { color: #fff; font-size: 1rem; font-weight: 800; }
        
        .growth-badge { 
          background: #bd1e24; 
          color: #ffffff; 
          padding: 12px; 
          margin-top: 20px; 
          text-align: center; 
          font-weight: 900; 
          font-size: 0.85rem;
          letter-spacing: 1px;
        }

        @media (max-width: 768px) { .regions-container { margin: 60px auto; } .regions-title { font-size: 2rem; } }
      `}} />

          <main className="regions-container">
            <h1 className="regions-title">BÖLGE ANALİZLERİ</h1>
            <p className="regions-subtitle">Geleceğin değerini bugünden rasyonel verilerle okuyun.</p>

            <div className="regions-grid">
              {regions?.map((region) => (
                <a key={region._id} href={`/regions/${region.slug.current}`} className="region-card">
                  <div className="region-img-box">
                    {region.mainImage && <img src={urlFor(region.mainImage).width(600).url()} alt={region.name} />}
                  </div>
                  <div className="region-info">
                    <h2 className="region-name">{region.name}</h2>
                    
                    <div className="stat-line">
                      <span className="stat-label">Ort. m² Fiyatı</span>
                      <span className="stat-value">₺{region.avgPrice}</span>
                    </div>
                    
                    <div className="stat-line">
                      <span className="stat-label">ROI (Amortisman)</span>
                      <span className="stat-value">{region.roi} Yıl</span>
                    </div>

                    <div className="growth-badge">
                      YILLIK DEĞER ARTIŞI: %{region.annualGrowth}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </main>
        </>
      );
    }

    export async function getStaticProps() {
      const regions = await client.fetch(`*[_type == "region"] | order(name asc)`);
      return { props: { regions }, revalidate: 60 };
    }