import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

const client = createClient({
  projectId: "PROJECT_ID_KODUN", // Kendi Project ID'ni buraya yaz
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: false,
});

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

export default function Home({ properties }) {
  return (
    <div style={{backgroundColor: '#0a192f', color: '#fff', minHeight: '100vh', fontFamily: 'serif'}}>
      {/* Header */}
      <nav style={{padding: '50px 20px', textAlign: 'center', borderBottom: '1px solid #d4af3711'}}>
        <h1 style={{fontSize: '2.5rem', color: '#d4af37', fontStyle: 'italic', margin: 0, letterSpacing: '5px'}}>ONDA YATIRIM</h1>
        <p style={{color: '#8e8e8e', fontSize: '0.8rem', letterSpacing: '3px', marginTop: '10px'}}>GÜVENİN YENİ DALGASI</p>
      </nav>

      <main style={{maxWidth: '1200px', margin: '0 auto', padding: '60px 20px'}}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px'}}>
          {properties.map((item) => (
            <div key={item._id} style={{background: '#0d223f', border: '1px solid #d4af3722', overflow: 'hidden', borderRadius: '2px'}}>
              {/* Fotoğraf Alanı */}
              {item.mainImage ? (
                <img 
                  src={urlFor(item.mainImage).width(800).url()} 
                  alt={item.title}
                  style={{width: '100%', height: '250px', objectFit: 'cover'}}
                />
              ) : (
                <div style={{width: '100%', height: '250px', background: '#162d4a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d4af3733'}}>Fotoğraf Bekleniyor</div>
              )}

              {/* Detaylar */}
              <div style={{padding: '30px'}}>
                <span style={{color: '#d4af37', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '2px'}}>{item.location}</span>
                <h2 style={{fontSize: '1.6rem', margin: '10px 0', fontWeight: 'normal'}}>{item.title}</h2>
                <div style={{fontSize: '1.3rem', color: '#d4af37', fontWeight: 'bold', marginBottom: '20px'}}>
                   {/* Fiyat Formatı Düzeldi */}
                   {Number(item.price).toLocaleString('tr-TR')} {item.currency || 'TL'}
                </div>
                
                <div style={{padding: '20px', background: 'rgba(212, 175, 55, 0.03)', borderLeft: '2px solid #d4af37', marginTop: '20px'}}>
                  <p style={{fontStyle: 'italic', fontSize: '0.9rem', color: '#ccc', lineHeight: '1.6', margin: 0}}>
                    "{item.analysis}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const properties = await client.fetch(`*[_type == "property"]`);
  return { props: { properties }, revalidate: 10 };
}
