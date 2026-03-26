export default {
  name: 'post',
  title: 'Blog Yazıları',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Blog Başlığı',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Blog Linki (Slug)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'mainImage',
      title: 'Kapak Görseli',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'publishedAt',
      title: 'Yayınlanma Tarihi',
      type: 'datetime',
    },
    {
      name: 'excerpt',
      title: 'Kısa Özet',
      type: 'text',
      description: 'Blog listesinde görünecek kısa açıklama (maksimum 3 satır).',
      rows: 3,
    },
    {
      name: 'body',
      title: 'İçerik',
      type: 'array',
      of: [
        { type: 'block' },
        { 
          type: 'image', 
          options: { hotspot: true } 
        }
      ],
    },
  ],
}
