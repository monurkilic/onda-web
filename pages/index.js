import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

const client = createClient({
  projectId: 'k8cd67dp',
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: false,
});

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

export default function Home({ properties }) {
  const getWhatsAppLink = (title) => {
    // Telefon numaranı buraya 905XXXXXXXXX formatında yazmayı unutma
    const message = encodeURIComponent(`Merhaba Onur Bey, ondayatirim.com'daki "${title}" ilanı hakkında bilgi alabilir miyim?`);
    return `https://wa.me/905326466909?text=${message}`; 
  };

  return (
    <div style={{backgroundColor: '#0a192f', color: '#fff', minHeight: '100vh', fontFamily: 'serif', paddingBottom: '100px'}}>
      
      {/* Lüks Header */}
      <header style={{padding: '80px 20px', textAlign: 'center', borderBottom: '1px solid rgba(212, 175, 55, 0.1)'}}>
        <h1 style={{fontSize: '3.5rem', color: '#d4af37', fontWeight: '300', margin: 0, letterSpacing: '10px', textTransform: 'uppercase'}}>ONDA</h1>
        <div style={{width: '60px', height: '1px', background: '#d4af37', margin: '25px auto'}}></div>
        <p style={{color: '#8e8e8e', fontSize: '0.8rem', letterSpacing: '5px', textTransform: 'uppercase'}}>Yatırım & Gayrimenkul</p>
      </header>

      <main style={{maxWidth: '1200px', margin: '0 auto', padding: '80px 20px'}}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '50px'}}>
          {properties && properties.map((item) => (
            <div key={item._id} style={{background: '#0d223f', border: '1px solid rgba(212, 175, 55, 0.1)', borderRadius: '2px'}}>
              
              {/* Görsel Alanı */}
              <div style={{position: 'relative', height: '350px', overflow: 'hidden'}}>
                {item.mainImage ? (
                  <img src={urlFor(item.mainImage).width(800).url()} style={{width: '100%', height: '100%', objectFit: 'cover'}} alt={item.title} />
                ) : (
                  <div style={{width: '100%', height: '100%', background: '#162d4a'}} />
                )}
                <div style={{position: 'absolute', top: '20px', right: '20px', background: 'rgba(10, 25, 47, 0.9)', padding: '10px 18px', color: '#d4af37', fontSize: '0.75rem', letterSpacing: '2px', border: '1px solid #d4af37'}}>
                  {item.location}
                </div>
              </div>

              {/* İçerik Alanı */}
              <div style={{padding: '40px'}}>
                <h2 style={{fontSize: '1.8rem', fontWeight: '400', margin: '0 0 15px 0', color: '#fff', lineHeight: '1.3'}}>{item.title}</h2>
                <div style={{fontSize: '1.6rem', color: '#d4af37', marginBottom: '35px', fontWeight: '300'}}>
                  {item.price} <span style={{fontSize: '0.9rem', opacity: 0.8}}>{item.currency}</span>
                </div>

                {/* Onda Analizi */}
                <div style={{marginBottom: '40px', padding: '25px', background: 'rgba(212, 175, 55, 0.03)', borderLeft: '1px solid #d4af37'}}>
                  <h4 style={{margin: '0 0 12px 0', color: '#d4af37', fontSize: '0.7rem', letterSpacing: '2px', fontWeight: '600'}}>ONDA ANALİZİ</h4>
                  <p style={{fontStyle: 'italic', color: '#ccc', fontSize: '0.95rem', lineHeight: '1.8', margin: 0}}>
                    "{item.analysis}"
                  </p>
                </div>

                {/* Aksiyonlar */}
                <div style={{display: 'flex', gap: '15px'}}>
                  <a href={getWhatsAppLink(item.title)} target="_blank" rel="noreferrer" style={{flex: 1, textAlign: 'center', padding: '18px', background: '#d4af37', color: '#0a192f', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.85rem', letterSpacing: '1px'}}>
                    BİLGİ AL (WHATSAPP)
                  </a>
                  {item.googleMapsUrl && (
                    <a href={item.googleMapsUrl} target="_blank" rel="noreferrer" style={{padding: '18px', border: '1px solid #d4af37', color: '#d4af37', textDecoration: 'none', fontSize: '0.85rem'}}>
                      KONUM
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer style={{textAlign: 'center', padding: '100px 20px', opacity: 0.4, fontSize: '0.75rem', letterSpacing: '3px'}}>
        © 2026 ONDA YATIRIM | <a href="/studio" style={{color: '#fff', textDecoration: 'none'}}>YÖNETİM</a>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const properties = await client.fetch(`*[_type == "property"]`);
  return { props: { properties }, revalidate: 10 };
}
