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
        <title>Onda Analizleri | Blog</title>
        <meta name="description" content="Gayrimenkul dünyasına rasyonel ve psikolojik bir bakış." />
      </Head>

      <style dangerouslySetInnerHTML={{ __html: `
        .blog-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 30px; max-width: 1200px; margin: 40px auto; padding: 0 20px; width: 100%; }
        .blog-card { text-decoration: none; background: #0d223f; border: 1px solid rgba(212,175,55,0.1); overflow: hidden; display: flex; flex-direction: column; transition: 0.3s; }
        .blog-card:hover { border-color: #d4af37; transform: translateY(-5px); }
        @media (max-width: 768px) { .blog-grid { grid-template-columns: 1fr; } }
      `}} />

      <main style={{ flex: 1 }}>
        <h1 style={{ textAlign: 'center', color: '#d4af37', margin: '60px 0 20px 0', letterSpacing: '4px', fontWeight: '300' }}>ONDA ANALİZLERİ</h1>
        <p style={{ textAlign: 'center', color: '#8e8e8e', marginBottom: '40px', padding: '0 20px' }}>Rasyonel veriler ve piyasa psikolojisi.</p>
        
        <div className="blog-grid">
          {posts && posts.map((post) => (
            <a href={`/blog/${post.slug?.current}`} key={post._id} className="blog-card">
              <img src={urlFor(post.mainImage).width(600).url()} style={{ width: '100%', height: '220px', objectFit: 'cover' }} alt={post.title} />
              <div style={{ padding: '25px', flex: 1 }}>
                <h3 style={{ color: '#d4af37', marginBottom: '15px', fontSize: '1.2rem', lineHeight: '1.4' }}>{post.title}</h3>
                <p style={{ color: '#ccc', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '20px' }}>{post.excerpt}</p>
                <span style={{ color: '#d4af37', fontSize: '0.8rem', fontWeight: 'bold' }}>DEVAMINI OKU →</span>
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
