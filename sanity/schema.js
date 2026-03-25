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
        hotspot: true, // Bu sayede resmi panelde kırpabilirsin
      },
    },
    {
      name: 'analysis',
      title: 'Onda Analizi',
      type: 'text',
    },
  ],
}
