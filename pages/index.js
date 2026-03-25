import { createClient } from "next-sanity";

const client = createClient({
  projectId: "k8cd67dp", // Sanity panelindeki Project ID
  dataset: "production",
  useCdn: false,
});

export default function Home({ properties }) {
  return (
    <div style={{backgroundColor: '#0a192f', color: '#fff', minHeight: '100vh', fontFamily: 'serif'}}>
      <nav style={{padding: '40px', textAlign: 'center', borderBottom: '1px solid #d4af3722'}}>
        <h1 style={{fontSize: '3rem', color: '#d4af37', fontStyle: 'italic', margin: 0}}>ONDA YATIRIM</h1>
        <p style={{color: '#8e8e8e', letterSpacing: '2px'}}>GÜVENİN YENİ DALGASI</p>
      </nav>

      <main style={{padding: '50px 20px', maxWidth: '1200px', margin: '0 auto'}}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px'}}>
          {properties.map((item) => (
            <div key={item._id} style={{border: '1px solid #d4af3733', padding: '20px', borderRadius: '4px', background: '#0d223f'}}>
              <h2 style={{color: '#d4af37', fontSize: '1.5rem'}}>{item.title}</h2>
              <p style={{color: '#ccc'}}>{item.location}</p>
              <p style={{fontSize: '1.2rem', fontWeight: 'bold'}}>{item.price} GBP</p>
              <hr style={{borderColor: '#d4af3711'}} />
              <p style={{fontStyle: 'italic', fontSize: '0.9rem', color: '#8e8e8e'}}>
                <strong>Onda Analizi:</strong> {item.analysis}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const properties = await client.fetch(`*[_type == "property"]`);
  return { props: { properties } };
}
