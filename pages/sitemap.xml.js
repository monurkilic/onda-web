import { createClient } from "next-sanity";

const client = createClient({
  projectId: 'k8cd67dp',
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: false
});

const EXTERNAL_DATA_URL = 'https://ondayatirim.com/portfolio';

function generateSiteMap(properties) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://ondayatirim.com</loc>
     </url>
     <url>
       <loc>https://ondayatirim.com/about</loc>
     </url>
     <url>
       <loc>https://ondayatirim.com/contact</loc>
     </url>
     <url>
       <loc>https://ondayatirim.com/portfolio</loc>
     </url>
     ${properties
       .map(({ slug }) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/${slug.current}`}</loc>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps her şeyi halledecek
}

export async function getServerSideProps({ res }) {
  // Sanity'den tüm ilanların slug'larını çekiyoruz
  const properties = await client.fetch(`*[_type == "property" && defined(slug.current)]{slug}`);

  // XML haritasını oluşturuyoruz
  const sitemap = generateSiteMap(properties);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
