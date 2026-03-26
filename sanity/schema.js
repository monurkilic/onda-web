const property = {
  name: 'property',
  title: 'İlanlar',
  type: 'document',
  fields: [
    { name: 'title', title: 'İlan Başlığı', type: 'string' },
    { name: 'slug', title: 'İlan Linki', type: 'slug', options: { source: 'title', maxLength: 96 } },
    { name: 'location', title: 'Konum', type: 'string' },
    { name: 'price', title: 'Fiyat', type: 'string' },
    { name: 'currency', title: 'Para Birimi', type: 'string', options: { list: ['TL', 'GBP', 'USD', 'EUR'] } },
    { name: 'mainImage', title: 'Ana Resim', type: 'image', options: { hotspot: true } },
    { name: 'gallery', title: 'Fotoğraf Galerisi', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] },
    { name: 'googleMapsUrl', title: 'Harita Linki', type: 'url' },
    { name: 'analysis', title: 'Onda Analizi', type: 'text' }
  ]
};

const post = {
  name: 'post',
  title: 'Blog Yazıları',
  type: 'document',
  fields: [
    { name: 'title', title: 'Blog Başlığı', type: 'string' },
    { name: 'slug', title: 'Blog Linki', type: 'slug', options: { source: 'title', maxLength: 96 } },
    { name: 'mainImage', title: 'Kapak Görseli', type: 'image', options: { hotspot: true } },
    { name: 'publishedAt', title: 'Yayınlanma Tarihi', type: 'datetime' },
    { name: 'excerpt', title: 'Kısa Özet', type: 'text', rows: 3 },
    { name: 'body', title: 'İçerik', type: 'array', of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }] }
  ]
};

const schemaTypes = [property, post];
export default schemaTypes;
