import { createClient } from "next-sanity";

// Sanity Bağlantısı
const client = createClient({
  projectId: "k8cd67dp", 
  dataset: "production",
  apiVersion: "2023-05-03",
  useCdn: false,
});

export default function Home({ properties }) {
  return (
    <div style={{backgroundColor: '#0a192f', color: '#fff', minHeight: '100vh', fontFamily: 'serif'}}>
      {/* Şık Header */}
      <header style={{padding: '60px 20px', textAlign: 'center', borderBottom: '1px solid #d4af3722'}}>
        <h1 style={{fontSize: '3.5rem', color: '#d4af37', fontStyle: 'italic', margin: 0, letterSpacing: '6px'}}>ONDA YATIRIM</h1>
        <p style={{color: '#8e8e8e', letterSpacing: '4px', fontSize: '0.9rem', marginTop: '15px', textTransform: 'uppercase'}}>Güvenin Yeni Dalgası</p>
      </header>

      <main style={{maxWidth: '1100px', margin: '0 auto', padding: '60px 20px'}}>
        <h2 style={{color: '#d4af37', fontWeight: 'normal', marginBottom: '40px', borderLeft: '2px solid #d4af37', paddingLeft: '15px'}}>Seçkin Portföy</h2>
        
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px'}}>
          {properties && properties.length > 0 ? properties.map((item) => (
            <div key={item._id} style={{border: '1px solid #d4af3733', padding: '35px', background: '#0d223f', borderRadius: '2px'}}>
              <span style={{color: '#d4af37', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px'}}>{item.location}</span>
              <h3 style={{fontSize: '1.8rem', margin: '15px 0', color: '#fff'}}>{item.title}</h3>
              <p style={{fontSize: '1.4rem', color: '#d4af37', fontWeight: 'bold'}}>{item.price} <span style={{fontSize: '0.8rem'}}>GBP</span></p>
              
              <div style={{marginTop: '25px', padding: '20px', background: 'rgba(212, 175, 55, 0.03)', border: '1px dashed #d4af3744'}}>
                <strong style={{color: '#d4af37', display: 'block', fontSize: '0.7rem', marginBottom: '8px', textTransform: 'uppercase'}}>Onda Analizi</strong>
                <p style={{fontStyle: 'italic', fontSize: '0.95rem', color: '#ccc', lineHeight: '1.6', margin: 0}}>
                  "{item.analysis}"
                </p>
              </div>
            </div>
          )) : (
            <p style={{color: '#8e8e8e'}}>Şu an yayında ilan bulunmuyor. Lütfen yönetim panelinden ilan ekleyip 'Publish' yapın.</p>
          )}
        </div>
      </main>

      <footer style={{textAlign: 'center', padding: '60px', opacity: 0.4}}>
        <a href="/studio" style={{color: '#fff', fontSize: '0.7rem', textDecoration: 'none'}}>Yönetim Paneli Girişi</a>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const properties = await client.fetch(`*[_type == "property"]`);
    return { props: { properties }, revalidate: 10 };
  } catch (error) {
    return { props: { properties: [] } };
  }
}
