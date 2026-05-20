import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import Head from 'next/head';
import { PortableText } from '@portabletext/react';

const client = createClient({
  projectId: 'k8cd67dp',
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: false
});

const builder = imageUrlBuilder(client);
const urlFor = (source) => (source ? builder.image(source) : null);

export default function PostDetail({ post }) {
  if (!post) return <div style={{ color: '#fff', textAlign: 'center', padding: '100px' }}>Yazı yükleniyor...</div>;

  return (
    <>
      <Head>
        <title>{post.title} | M. Onur Kılıç - Keller Williams</title>
        <meta name="description" content={post.excerpt} />
        {/* Open Graph / Sosyal Medya Paylaşımları İçin */}
        <meta property="og:title" content={post.title} />
        <meta property="og:image" content={urlFor(post.mainImage).url()} />
      </Head>

      <style dangerouslySetInnerHTML={{ __html: `
        .blog-post-page { 
          max-width: 900px; 
          margin: 120px auto; 
          padding: 0 20px; 
          color: #ffffff; 
          font-family: 'Inter', sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        .post-header { margin-bottom: 50px; text-align: left; }
        .post-category { color: #bd1e24; font-size: 0.8rem; letter-spacing: 3px; text-transform: uppercase; font-weight: 700; margin-bottom: 15px; display: block; }
        .post-title { font-size: 3rem; font-weight: 800; line-height: 1.2; letter-spacing: -1px; margin-bottom: 20px; }
        .post-date { color: #8e8e8e; font-size: 0.9rem; font-weight: 500; }

        .main-hero-img { width: 100%; height: auto; border-radius: 4px; margin-bottom: 60px; border: 1px solid rgba(189, 30, 36, 0.2); }

        /* Blog İçerik Fontları */
        .post-content { 
          font-size: 1.25rem; 
          line-height: 1.9; 
          font-weight: 500; 
          color: #f8f8f8; 
        }
        
        .post-content p { margin-bottom: 30px; }
        
        .post-content h2 { 
          color: #bd1e24; 
          font-size: 2rem; 
          font-weight: 800; 
          margin: 60px 0 30px 0; 
          border-left: 5px solid #bd1e24;
          padding-left: 20px;
        }

        .post-content h3 { 
          color: #ffffff; 
          font-size: 1.5rem; 
          font-weight: 700; 
          margin-bottom: 20px; 
          text-decoration: underline;
          text-underline-offset: 8px;
          text-decoration-color: rgba(189, 30, 36, 0.5);
        }

        .post-content ul, .post-content ol { margin-bottom: 30px; padding-left: 20px; }
        .post-content li { margin-bottom: 15px; }

        .post-content img { width: 100%; height: auto; margin: 40px 0; border: 1px solid rgba(189, 30, 36, 0.15); }

        /* Alt Bölüm */
        .post-footer { 
          margin-top: 80px; 
          padding-top: 40px; 
          border-top: 1px solid rgba(255,255,255,0.1); 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
        }
        .back-btn { color: #bd1e24; text-decoration: none; font-weight: 700; font-size: 0.9rem; letter-spacing: 1px; transition: 0.3s; }
        .back-btn:hover { color: #ffffff; }

        @media (max-width: 768px) {
          .post-title { font-size: 2rem; }
          .post-content { font-size: 1.1rem; }
          .blog-post-page { margin: 80px auto; }
        }
      `}} />

      <main className="blog-post-page">
        <header className="post-header">
          <span className="post-category">{post.category || 'ANALİZ'}</span>
          <h1 className="post-title">{post.title}</h1>
          <p className="post-date">{new Date(post.publishedAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </header>

        {post.mainImage && (
          <img src={urlFor(post.mainImage).url()} className="main-hero-img" alt={post.title} />
        )}

        <article className="post-content">
          <PortableText value={post.body} />
        </article>

        <footer className="post-footer">
          <a href="/blog" className="back-btn">← GÜNDEME GERİ DÖN</a>
          <div style={{ color: '#bd1e24', fontWeight: '800', letterSpacing: '2px', fontSize: '0.9rem' }}>M. ONUR KILIÇ</div>
        </footer>
      </main>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const post = await client.fetch(`
    *[_type == "post" && slug.current == $slug][0]{
      title,
      publishedAt,
      category,
      mainImage,
      excerpt,
      body
    }
  `, { slug });

  return {
    props: { post }
  };
}