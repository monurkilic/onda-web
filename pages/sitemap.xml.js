import { createClient } from "next-sanity";

const client = createClient({
  projectId: 'k8cd67dp',
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: false
});

// Eski domaini sildik, yeni KW uyumlu domaini bıraktık
const BASE_URL = 'https://monurkilic.com';

function generateSiteMap(properties, posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    {/* Statik Sayfalar */}
    <url><loc>${BASE_URL}</loc></url>
    <url><loc>${BASE_URL}/about</loc></url>
    <url><loc>${BASE_URL}/contact</loc></url>
    <url><loc>${BASE_URL}/portfolio</loc></url>
    <url><loc>${BASE_URL}/blog</loc></url>

    {/* Dinamik İlanlar (Portfolio) */}
    ${properties.map(({ slug }) => `
      <url>
        <loc>${BASE_URL}/portfolio/${slug.current}</loc>
      </url>
    `).join('')}

     {/* Dinamik Blog Yazıları */}
    ${posts.map(({ slug }) => `
      <url>
        <loc>${BASE_URL}/blog/${slug.current}</loc>
      </url>
    `).join('')}
  </urlset>
`;
}

export async function getServerSideProps({ res }) {
  // Hem mülkleri hem de blog yazılarını aynı anda çekiyoruz
  const [properties, posts] = await Promise.all([
    client.fetch(`*[_type == "property" && defined(slug.current)]{slug}`),
    client.fetch(`*[_type == "post" && defined(slug.current)]{slug}`)
  ]);

  const sitemap = generateSiteMap(properties, posts);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return { props: {} };
}

// Çift olan fonksiyon teke düşürüldü
export default function SiteMap() {}