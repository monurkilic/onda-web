import { useState } from 'react';
import { createClient } from "next-sanity";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import Head from 'next/head';

const client = createClient({ projectId: 'k8cd67dp', dataset: "production", apiVersion: "2023-01-01", useCdn: false });
const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

const SocialIcons = ({ size = 20 }) => (
  <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
    <a href="https://www.instagram.com/ondayatirim" target="_blank" rel="noreferrer" style={{ color: '#d4af37' }}><svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
  </div>
);

export default function BlogPost({ post }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  if (!post) return null;

  return (
    <div style={{backgroundColor: '#0a192f', color: '#fff', minHeight: '100vh', fontFamily: 'serif', display: 'flex', flexDirection: 'column', overflowX: 'hidden'}}>
      <Head>
        <title>{post.title} | Onda Yatırım Blog</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </Head>
      <style dangerouslySetInnerHTML={{ __html: `* { box-sizing: border-box; }` }} />

      <nav style={{padding: '20px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(212,175,55,0.1)', background: '#0a192f', position: 'sticky', top: 0, zIndex: 1000}}>
        <a href="/" style={{display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none'}}><img src="/logo.png" style={{height: '35px'}} alt="L" /><span style={{color: '#d4af37', fontWeight: 'bold'}}>ONDA</span></a>
        <div style={{display: 'flex', gap: '20px', fontSize: '0.8rem'}}>
          <a href="/blog" style={{color: '#d4af37', textDecoration: 'none', letterSpacing: '1px'}}>← BLOG'A DÖN</a>
        </div>
      </nav>

      <main style={{flex: 1, maxWidth: '800px', margin: '0 auto', padding: '40px 20px', width: '100%'}}>
        <img src={urlFor(post.mainImage).url()} style={{width: '100%', height: 'auto', maxHeight: '500px', objectFit: 'cover', marginBottom: '30px', border: '1px solid rgba(212,175,55,0.1)'}} alt={post.title} />
        <h1 style={{color: '#d4af37', fontSize: '2.5rem', marginBottom: '15px', fontWeight: '300', lineHeight: '1.2'}}>{post.title}</h1>
        <p style={{color: '#8e8e8e', fontSize: '0.8rem', marginBottom: '40px'}}>{new Date(post.publishedAt).toLocaleDateString('tr-TR')}</p>
        
        <div style={{color: '#ccc', lineHeight: '2.1', fontSize: '1.1rem', textAlign: 'justify'}}>
          <PortableText value={post.body} />
        </div>
      </main>

      <footer style={{padding: '60px 20px', borderTop: '1px solid rgba(212,175,55,0.1)', textAlign: 'center', background: '#0a192f', marginTop: '60px'}}>
        <div style={{marginBottom: '30px'}}><SocialIcons size={24} /></div>
        <div style={{display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '0.8rem', flexWrap: 'wrap', marginBottom: '20px'}}>
           <a href="/" style={{color: '#fff', textDecoration: 'none'}}>GİRİŞ</a>
           <a href="/portfolio" style={{color: '#8e8e8e', textDecoration: 'none'}}>PORTFÖY</a>
           <a href="/valuation" style={{color: '#8e8e8e', textDecoration: 'none'}}>MÜLK DEĞERLEME</a>
        </div>
        <p style={{fontSize: '0.7rem', opacity: 0.4}}>© 2026 ONDA YATIRIM</p>
      </footer>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = await client.fetch(`*[_type == "post" && defined(slug.current)][].slug.current`);
  return { paths: paths.map((slug) => ({ params: { slug } })), fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0]`, { slug: params.slug });
  return { props: { post }, revalidate: 10 };
}
