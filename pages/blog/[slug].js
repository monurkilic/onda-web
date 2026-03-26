import { createClient } from "next-sanity";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import Head from 'next/head';

const client = createClient({ projectId: 'k8cd67dp', dataset: "production", apiVersion: "2023-01-01", useCdn: false });
const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

export default function BlogPost({ post }) {
  if (!post) return null;

  return (
    <>
      <Head>
        <title>{post.title} | Onda Yatırım Blog</title>
      </Head>

      <main style={{ flex: 1, maxWidth: '800px', margin: '0 auto', padding: '40px 20px', width: '100%' }}>
        <a href="/blog" style={{ color: '#d4af37', textDecoration: 'none', fontSize: '0.9rem', display: 'block', marginBottom: '30px', fontWeight: 'bold' }}>← TÜM ANALİZLERE DÖN</a>
        
        <img src={urlFor(post.mainImage).url()} style={{ width: '100%', height: 'auto', maxHeight: '500px', objectFit: 'cover', marginBottom: '30px', border: '1px solid rgba(212,175,55,0.1)' }} alt={post.title} />
        
        <h1 style={{ color: '#d4af37', fontSize: '2.5rem', marginBottom: '15px', fontWeight: '300', lineHeight: '1.2' }}>{post.title}</h1>
        <p style={{ color: '#8e8e8e', fontSize: '0.8rem', marginBottom: '40px' }}>{new Date(post.publishedAt).toLocaleDateString('tr-TR')}</p>
        
        <div style={{ color: '#ccc', lineHeight: '2.1', fontSize: '1.1rem', textAlign: 'justify' }}>
          <PortableText value={post.body} />
        </div>
      </main>
    </>
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
