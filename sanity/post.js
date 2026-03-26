export default {
  name: 'post',
  title: 'Blog Yazıları',
  type: 'document',
  fields: [
    { name: 'title', title: 'Başlık', type: 'string' },
    { name: 'slug', title: 'URL Uzantısı (Slug)', type: 'slug', options: { source: 'title' } },
    { name: 'mainImage', title: 'Kapak Görseli', type: 'image', options: { hotspot: true } },
    { name: 'publishedAt', title: 'Yayınlanma Tarihi', type: 'datetime' },
    { name: 'body', title: 'İçerik', type: 'array', of: [{ type: 'block' }, { type: 'image' }] },
    { name: 'excerpt', title: 'Kısa Özet', type: 'text', rows: 3 }
  ]
}
