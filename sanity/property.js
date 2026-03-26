export default {
  name: 'property',
  title: 'İlanlar',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'İlan Başlığı',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'İlanın İnternet Linki (Slug)',
      type: 'slug',
      description: 'Bu ilanın web adresindeki uzantısıdır. Sağdaki "Generate" butonuna basarak başlıktan otomatik üretebilirsiniz.',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'location',
      title: 'Konum (Şehir/İlçe)',
      type: 'string',
    },
    {
      name: 'price',
      title: 'Fiyat',
      type: 'string',
    },
    {
      name: 'currency',
      title: 'Para Birimi',
      type: 'string',
      options: {
        list: [
          { title: 'TL', value: 'TL' },
          { title: 'GBP', value: 'GBP' },
          { title: 'USD', value: 'USD' },
          { title: 'EUR', value: 'EUR' },
        ],
      },
    },
    {
      name: 'mainImage',
      title: 'Ana Resim (Kapak)',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'gallery',
      title: 'Fotoğraf Galerisi',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: 'googleMapsUrl',
      title: 'Google Harita Linki',
      type: 'url',
    },
    {
      name: 'analysis',
      title: 'Onda Analizi',
      type: 'text',
    },
  ],
}
