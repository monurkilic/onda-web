import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import Head from 'next/head';

const client = createClient({ projectId: 'k8cd67dp', dataset: "production", apiVersion: "2023-01-01", useCdn: false });
const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

export default function BlogIndex({ posts }) {
  return (
    <>
      <Head>
        <title>Perspektif & Gündem | M. Onur Kılıç - Keller Williams</title>
        <meta name="description" content="Gayrimenkul ve toprak yatırımlarına dair rasyonel, teknik ve piyasa odaklı analizler." />
      </Head>

      <style dangerouslySetInnerHTML={{ __html: `
        .blog-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 30px; max-width: 1200px; margin: 60px auto 120px auto; padding: 0 20px; width: 100%; }
        .blog-card { text-decoration: none; background: #1a1a1a; border: 1px solid rgba(189, 30, 36, 0.15); overflow: hidden; display: flex; flex-direction: column; transition: 0.3s; }
        .blog-card:hover { border-color: #bd1e24; transform: translateY(-5px); }
        @media (max-width: 768px) { .blog-grid { grid-template-columns: 1fr; margin-top: 40px; } }
      `}} />

      <main style={{ flex: 1 }}>
        <h1 style={{ textAlign: 'center', color: '#bd1e24', margin: '120px 0 20px 0', letterSpacing: '4px', fontWeight: '800', fontSize: '2.5rem' }}>PERSPEKTİF & GÜNDEM</h1>
        <p style={{ textAlign: 'center', color: '#f8f8f8', marginBottom: '40px', padding: '0 20px', letterSpacing: '1px', opacity: 0.8, fontWeight: '500' }}>Gayrimenkul ve arsa yatırımlarına dair analitik yaklaşımlar, rasyonel veriler.</p>
        
        <div className="blog-grid">
          {posts && posts.map((post) => (
            <a href={`/blog/${post.slug?.current}`} key={post._id} className="blog-card">
              <img src={urlFor(post.mainImage).width(600).url()} style={{ width: '100%', height: '220px', objectFit: 'cover' }} alt={post.title} />
              <div style={{ padding: '25px', flex: 1 }}>
                <h3 style={{ color: '#ffffff', marginBottom: '15px', fontSize: '1.4rem', lineHeight: '1.4', fontWeight: '700' }}>{post.title}</h3>
                <p style={{ color: '#ccc', fontSize: '1rem', lineHeight: '1.6', marginBottom: '20px', fontWeight: '500' }}>{post.excerpt}</p>
                <span style={{ color: '#bd1e24', fontSize: '0.9rem', fontWeight: 'bold', letterSpacing: '1px' }}>DEVAMINI OKU →</span>
              </div>
            </a>
          ))}
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const posts = await client.fetch(`*[_type == "post"] | order(publishedAt desc)`);
  return { props: { posts }, revalidate: 10 };
}