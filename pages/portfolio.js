import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import Head from 'next/head';

const client = createClient({
  projectId: 'k8cd67dp',
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: false,
});

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

export default function Portfolio({ properties }) {
  return (
    <div style={{backgroundColor: '#0a192f', color: '#fff', minHeight: '100vh', fontFamily: 'serif'}}>
      <Head>
        <title>Portföy | Onda Yatırım</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* HEADER / NAV */}
      <nav style={{position: 'sticky', top: 0, zIndex: 100, background: 'rgba(10, 25, 47, 0.95)', borderBottom: '1px solid rgba(212, 175, 55, 0.1)', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backdropFilter: 'blur(10px)'}}>
        <a href="/" style={{display: 'flex', alignItems: 'center', gap: '15px', textDecoration: 'none'}}>
          <img src="/logo.png" alt="Onda Logo" style={{height: '40px'}} onError={(e) => e.target.style.display = 'none'} />
          <span style={{color: '#d4af37', letterSpacing: '3px', fontWeight: 'bold', fontSize: '1.2rem'}}>ONDA</span>
        </a>
        <div style={{display: 'flex', gap: '25px', fontSize: '0.8rem', letterSpacing: '1px'}}>
          <a href="/" style={{color: '#fff', textDecoration: 'none'}}>GİRİŞ</a>
          <a href="/about" style={{color: '#fff', textDecoration: 'none'}}>HAKKIMIZDA</a>
          <a href="/contact" style={{color: '#fff', textDecoration: 'none'}}>İLETİŞİM</a>
        </div>
      </nav>

      <main style={{maxWidth: '1300px', margin: '0 auto', padding: '60px 20px'}}>
        <header style={{textAlign: 'center', marginBottom: '60px'}}>
          <h1 style={{fontSize: '2.5rem', color: '#d4af37', fontWeight: '300', letterSpacing: '5px', textTransform: 'uppercase'}}>SEÇKİN PORTFÖY</h1>
          <div style={{width: '50px', height: '1px', background: '#d4af37', margin: '20px auto'}}></div>
          <p style={{color: '#8e8e8e', letterSpacing: '2px'}}>Aradığınız her şey ONDA.</p>
        </header>
        
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px'}}>
          {properties && properties.map((item) => (
            <div key={item._id} style={{background: '#0d223f', border: '1px solid rgba(212, 175, 55, 0.1)', borderRadius: '2px', overflow: 'hidden', display: 'flex', flexDirection: 'column'}}>
              <a href={`/portfolio/${item.slug.current}`} target="_blank" rel="noreferrer" style={{textDecoration: 'none', color: 'inherit'}}>
                <div style={{height: '280px', overflow: 'hidden'}}>
                  {item.mainImage ? (
                    <img src={urlFor(item.mainImage).width(800).url()} style={{width: '100%', height: '100%', objectFit: 'cover'}} alt={item.title} />
                  ) : (
                    <div style={{width: '100%', height: '100%', background: '#162d4a'}} />
                  )}
                </div>
                <div style={{padding: '30px'}}>
                  <span style={{color: '#d4af37', fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase'}}>{item.location}</span>
                  <h3 style={{fontSize: '1.4rem', fontWeight: '400', margin: '10px 0', lineHeight: '1.4'}}>{item.title}</h3>
                  <div style={{fontSize: '1.5rem', color: '#d4af37', fontWeight: '300'}}>
                    {item.price} <span style={{fontSize: '0.8rem', opacity: 0.8}}>{item.currency}</span>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{padding: '80px 20px', borderTop: '1px solid rgba(212,175,55,0.1)', textAlign: 'center', background: '#0d223f', marginTop: '60px'}}>
        <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '30px', marginBottom: '30px', fontSize: '0.8rem', letterSpacing: '1px'}}>
          <a href="/" style={{color: '#8e8e8e', textDecoration: 'none'}}>ANA SAYFA</a>
          <a href="/portfolio" style={{color: '#fff', textDecoration: 'none', borderBottom: '1px solid #d4af37'}}>PORTFÖY</a>
          <a href="/about" style={{color: '#8e8e8e', textDecoration: 'none'}}>HAKKIMIZDA</a>
          <a href="/contact" style={{color: '#8e8e8e', textDecoration: 'none'}}>İLETİŞİM</a>
        </div>
        <p style={{fontSize: '0.7rem', opacity: 0.5, letterSpacing: '2px'}}>© 2026 ONDA YATIRIM | Aradığınız her şey ONDA</p>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const properties = await client.fetch(`*[_type == "property"]`);
  return { props: { properties }, revalidate: 10 };
}
