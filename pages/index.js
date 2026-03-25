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
    // Numaranı buraya 905324545558 olarak güncelledim
    const message = encodeURIComponent(`Merhaba Onur Bey, ondayatirim.com'daki "${title}" ilanı hakkında bilgi alabilir miyim?`);
    return `https://wa.me/905326466909?text=${message}`; 
  };

  return (
    <div style={{backgroundColor: '#0a192f', color: '#fff', minHeight: '100vh', fontFamily: 'serif', paddingBottom: '100px'}}>
      
      {/* Header */}
      <header style={{padding: '80px 20px', textAlign: 'center', borderBottom: '1px solid rgba(212, 175, 55, 0.1)'}}>
        <h1 style={{fontSize: '3.5rem', color: '#d4af37', fontWeight: '300', margin: 0, letterSpacing: '10px', textTransform: 'uppercase'}}>ONDA</h1>
        <div style={{width: '60px', height: '1px', background: '#d4af37', margin: '25px auto'}}></div>
        <p style={{color: '#8e8e8e', fontSize: '0.8rem', letterSpacing: '5px', textTransform: 'uppercase', marginTop: '15px'}}>Yatırım & Gayrimenkul</p>
      </header>

      <main style={{maxWidth: '1200px', margin: '0 auto', padding: '80px 20px'}}>
        <div style={{display: 'grid', gridTemplateColumns: '1fr', gap: '80px'}}>
          {properties && properties.map((item) => (
            <div key={item._id} style={{background: '#0d223f', border: '1px solid rgba(212, 175, 55, 0.1)', borderRadius: '2px', overflow: 'hidden'}}>
              
              {/* Medya Alanı: Ana Resim + Yan Galeri */}
              <div style={{display: 'flex', flexWrap: 'wrap', borderBottom: '1px solid rgba(212, 175, 55, 0.1)'}}>
                <div style={{flex: '3', minWidth: '350px', height: '450px', position: 'relative'}}>
                  {item.mainImage ? (
                    <img src={urlFor(item.mainImage).width(1200).url()} style={{width: '100%', height: '100%', objectFit: 'cover'}} alt={item.title} />
                  ) : (
                    <div style={{width: '100%', height: '100%', background: '#162d4a'}} />
                  )}
                  <div style={{position: 'absolute', top: '25px', left: '25px', background: 'rgba(10, 25, 47, 0.9)', padding: '10px 20px', color: '#d4af37', fontSize: '0.75rem', letterSpacing: '2px', border: '1px solid #d4af37'}}>
                    {item.location}
                  </div>
                </div>

                {/* Yan Galeri Kutuları */}
                {item.gallery && item.gallery.length > 0 && (
                  <div style={{flex: '1', minWidth: '150px', display: 'grid', gridTemplateColumns: '1fr', gap: '2px', background: '#0a192f'}}>
                    {item.gallery.slice(0, 4).map((img, idx) => (
                      <img key={idx} src={urlFor(img).width(200).height(200).url()} style={{width: '100%', height: '111px', objectFit: 'cover', opacity: 0.6}} />
                    ))}
                  </div>
                )}
              </div>

              {/* İçerik Alanı */}
              <div style={{padding: '50px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px'}}>
                  <div style={{flex: '2'}}>
                    <h2 style={{fontSize: '2.2rem', fontWeight: '400', margin: '0 0 15px 0', color: '#fff', lineHeight: '1.2'}}>{item.title}</h2>
                    <div style={{fontSize: '1.8rem', color: '#d4af37', fontWeight: '300', marginBottom: '30px'}}>
                      {item.price} <span style={{fontSize: '0.9rem', opacity: 0.8}}>{item.currency}</span>
                    </div>
                  </div>

                  <div style={{flex: '1', display: 'flex', flexDirection: 'column', gap: '15px', minWidth: '200px'}}>
                    <a href={getWhatsAppLink(item.title)} target="_blank" rel="noreferrer" style={{textAlign: 'center', padding: '18px', background: '#d4af37', color: '#0a192f', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.85rem', letterSpacing: '1px'}}>
                      BİLGİ AL (WHATSAPP)
                    </a>
                    {item.googleMapsUrl && (
                      <a href={item.googleMapsUrl} target="_blank" rel="noreferrer" style={{textAlign: 'center', padding: '18px', border: '1px solid #d4af37', color: '#d4af37', textDecoration: 'none', fontSize: '0.85rem', letterSpacing: '1px'}}>
                        KONUMU GÖR
                      </a>
                    )}
                  </div>
                </div>

                {/* Onda Analizi */}
                <div style={{marginTop: '50px', padding: '35px', background: 'rgba(212, 175, 55, 0.02)', borderLeft: '1px solid #d4af37'}}>
                  <h4 style={{margin: '0 0 15px 0', color: '#d4af37', fontSize: '0.75rem', letterSpacing: '3px', fontWeight: '600'}}>ONDA ANALİZİ</h4>
                  <p style={{fontStyle: 'italic', color: '#ccc', fontSize: '1rem', lineHeight: '1.8', margin: 0}}>
                    "{item.analysis}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer style={{textAlign: 'center', padding: '100px 20px', opacity: 0.4, fontSize: '0.75rem', letterSpacing: '4px'}}>
        © 2026 ONDA YATIRIM | <a href="/studio" style={{color: '#fff', textDecoration: 'none'}}>YÖNETİM</a>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const properties = await client.fetch(`*[_type == "property"]`);
  return { props: { properties }, revalidate: 10 };
}
