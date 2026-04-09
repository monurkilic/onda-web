export async function getInstagramPosts() {
  const igId = process.env.NEXT_PUBLIC_IG_ID;
  const token = process.env.IG_ACCESS_TOKEN;
  
  const url = `https://graph.facebook.com/v20.0/${igId}/media?fields=id,caption,media_url,permalink,timestamp,media_type&limit=6&access_token=${token}`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } }); // Saatte bir veriyi tazeler
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Instagram verisi alınamadı:", error);
    return [];
  }
}
