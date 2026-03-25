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
  return (
    <div style={{backgroundColor: '#0a192f', color: '#fff', minHeight: '100vh', fontFamily: 'serif', paddingBottom: '100px'}}>
      <nav style={{padding: '50px 20px', textAlign: 'center', borderBottom: '1px solid #d4af3711'}}>
        <h1 style={{fontSize: '2.5rem', color: '#d4af37', fontStyle: 'italic', margin: 0, letterSpacing: '5px'}}>ONDA YATIRIM</h1>
        <p style={{color: '#8e8e8e', fontSize: '0.8rem', letterSpacing: '3px', marginTop: '10px'}}>GÜVENİN YENİ DALGASI</p>
      </nav>

      <main style={{maxWidth: '1200px', margin: '0 auto', padding: '60px 20px'}}>
        <div style={{display: 'grid', gridTemplateColumns: '1fr', gap: '60px'}}>
          {properties.map((item) => (
            <div key={item._id} style={{background: '#0d223f', border: '1px solid #d4af3722', borderRadius: '4px', overflow: 'hidden'}}>
              
              {/* Üst Kısım: Ana Resim ve Galeri Özeti */}
              <div style={{display: 'flex', flexWrap: 'wrap'}}>
                <div style={{flex: '1', minWidth: '300px'}}>
                  <img src={urlFor(item.mainImage).width(800).url()} style={{width: '100%', height: '400px', objectFit: 'cover'}} />
                </div>
                {item.gallery && (
                  <div style={{width: '200px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px', padding: '5px', background: '#0a192f'}}>
                    {item.gallery.slice(0, 4).map((img, idx) => (
                      <img key={idx} src={urlFor(img).width(100).height(100).url()} style={{width: '100%', height: '95px', objectFit: 'cover', opacity: 0.7}} />
                    ))}
                  </div>
                )}
              </div>

              {/* Alt Kısım: Detaylar */}
              <div style={{padding: '40px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap'}}>
                  <div>
                    <span style={{color: '#d4af37', fontSize: '0.8rem', letterSpacing: '2px'}}>{item.location}</span>
                    <h2 style={{fontSize: '2rem', margin: '10px 0'}}>{item.title}</h2>
                    <p style={{fontSize: '1.5rem', color: '#d4af37', fontWeight: 'bold'}}>{item.price} {item.currency}</p>
                  </div>
                  {item.googleMapsUrl && (
                    <a href={item.googleMapsUrl} target="_blank" style={{padding: '12px 20px', border: '1px solid #d4af37', color: '#d4af37', textDecoration: 'none', borderRadius: '4px', fontSize: '0.9rem'}}>Konumu Gör</a>
                  )}
                </div>

                <div style={{marginTop: '30px', padding: '25px', background: 'rgba(212, 175, 55, 0.03)', borderLeft: '3px solid #d4af37'}}>
                  <h4 style={{margin: '0 0 10px 0', color: '#d4af37', fontSize: '0.8rem'}}>ONDA ANALİZİ</h4>
                  <p style={{fontStyle: 'italic', color: '#ccc', lineHeight: '1.8', margin: 0}}>{item.analysis}</p>
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
