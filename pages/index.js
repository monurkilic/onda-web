import { createClient } from "next-sanity";

const client = createClient({
  projectId: "k8cd67dp", // Sanity panelindeki o 8-10 haneli kod
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: false,
});

export default function Home({ properties }) {
  return (
    <div style={{backgroundColor: '#0a192f', color: '#fff', minHeight: '100vh', fontFamily: 'serif', paddingBottom: '100px'}}>
      {/* Header */}
      <nav style={{padding: '40px', textAlign: 'center', borderBottom: '1px solid #d4af3722', marginBottom: '40px'}}>
        <h1 style={{fontSize: '3rem', color: '#d4af37', fontStyle: 'italic', margin: 0, letterSpacing: '4px'}}>ONDA YATIRIM</h1>
        <p style={{color: '#8e8e8e', letterSpacing: '3px', fontSize: '0.8rem', marginTop: '10px'}}>GÜVENİN YENİ DALGASI</p>
      </nav>

      <main style={{maxWidth: '1200px', margin: '0 auto', padding: '0 20px'}}>
        {/* İlanlar Başlığı */}
        <h2 style={{color: '#d4af37', borderLeft: '3px solid #d4af37', paddingLeft: '15px', marginBottom: '40px', fontWeight: 'normal'}}>Güncel Portföy</h2>
        
        {/* İlan Kartları */}
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px'}}>
          {properties && properties.length > 0 ? (
            properties.map((item) => (
              <div key={item._id} style={{border: '1px solid #d4af3733', padding: '30px', borderRadius: '2px', background: '#0d223f', transition: '0.3s'}}>
                <span style={{color: '#d4af37', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px'}}>{item.location}</span>
                <h3 style={{color: '#fff', fontSize: '1.6rem', margin: '10px 0'}}>{item.title}</h3>
                <div style={{fontSize: '1.4rem', color: '#d4af37', fontWeight: 'bold', marginBottom: '20px'}}>{item.price} <span style={{fontSize: '0.9rem'}}>GBP</span></div>
                
                <div style={{padding: '15px', backgroundColor: 'rgba(212, 175, 55, 0.05)', borderRadius: '4px', border: '1px dashed #d4af3744'}}>
                  <strong style={{color: '#d4af37', display: 'block', marginBottom: '5px', fontSize: '0.8rem'}}>ONDA ANALİZİ:</strong>
                  <p style={{fontStyle: 'italic', fontSize: '0.9rem', color: '#ccc', margin: 0, lineHeight: '1.5'}}>
                    "{item.analysis}"
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p style={{color: '#8e8e8e'}}>Henüz yayınlanmış bir ilan bulunamadı. Lütfen yönetim panelinden bir ilan ekleyin ve 'Publish' butonuna basın.</p>
          )}
        </div>
      </main>

      {/* Admin Link (Alt Kısımda Şık Dursun) */}
      <footer style={{textAlign: 'center', marginTop: '100px'}}>
        <a href="/studio" style={{color: '#8e8e8e', fontSize: '0.7rem', textDecoration: 'none', opacity: 0.5}}>Panel Girişi</a>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const properties = await client.fetch(`*[_type == "property"]`);
  return { 
    props: { properties },
    revalidate: 10 // Her 10 saniyede bir yeni ilanları kontrol et
  };
}
