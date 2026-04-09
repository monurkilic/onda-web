// sanity/region.js
export default {
  name: 'region',
  title: 'Bölge Analizleri',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Bölge Adı',
      type: 'string',
      description: 'Örn: Mavişehir, Karşıyaka'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 }
    },
    {
      name: 'avgPrice',
      title: 'Ortalama m² Birim Fiyatı',
      type: 'string',
      description: 'Örn: 85.000 TL'
    },
    {
      name: 'annualGrowth',
      title: 'Yıllık Değer Artışı (%)',
      type: 'number',
      description: 'Sadece rakam girin (Örn: 45)'
    },
    {
      name: 'roi',
      title: 'Amortisman Süresi (Yıl)',
      type: 'number',
      description: 'Örn: 18'
    },
    {
      name: 'popGrowth',
      title: 'Nüfus Artış Oranı (%)',
      type: 'number'
    },
    {
      name: 'mainImage',
      title: 'Kapak Görseli',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'body',
      title: 'Detaylı Analiz Metni',
      type: 'array', 
      of: [{type: 'block'}]
    }
  ]
}
