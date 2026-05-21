// 1. İlanlar (Property) Şeması
const property = {
  name: 'property',
  title: 'İlanlar',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'İlan Başlığı',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'İlan Linki (Slug)',
      type: 'slug',
      description: 'Sağdaki "Generate" butonuna basarak başlıktan üretebilirsiniz.',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'isFeatured',
      title: 'Ana Sayfada Öne Çıkar',
      type: 'boolean',
      description: 'Bu seçenek işaretlenirse ilan ana sayfadaki vitrinde görünür.',
      initialValue: false,
    },
    {
      name: 'category',
      title: 'Portföy Kategorisi / Segment',
      type: 'string',
      description: 'Mülkün web sitesinde hangi segmentte listeleneceğini seçin.',
      options: {
        list: [
          { title: '🏖️ Yaşam & Yazlık (Lifestyle)', value: 'lifestyle' },
          { title: '🚜 Toprak & Arsa Yatırımı', value: 'land' },
          { title: '🏢 Kurumsal & Proje Pazarlama', value: 'project' }
        ],
        layout: 'dropdown'
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'status',
      title: 'İlan Durumu',
      type: 'string',
      options: {
        list: [
          { title: 'Satılık', value: 'satilik' },
          { title: 'Kiralık', value: 'kiralik' },
          { title: 'Satıldı', value: 'satildi' },
          { title: 'Fırsat', value: 'firsat' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'propertyType',
      title: 'Mülk Tipi',
      type: 'string',
      options: {
        list: [
          { title: 'Villa', value: 'villa' },
          { title: 'Daire', value: 'daire' },
          { title: 'Ofis', value: 'ofis' },
          { title: 'Arsa', value: 'arsa' },
          { title: 'Fabrika', value: 'fabrika' },
          { title: 'Malikane', value: 'malikane' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'location',
      title: 'Konum (Şehir/İlçe)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'price',
      title: 'Fiyat',
      type: 'string',
      description: 'Sadece rakam veya "Teklif Alınacaktır" yazabilirsiniz.',
    },
    {
      name: 'currency',
      title: 'Para Birimi',
      type: 'string',
      options: {
        list: ['TL', 'GBP', 'USD', 'EUR'],
      },
    },
    {
      name: 'area',
      title: 'Net Metrekare (m2)',
      type: 'number',
    },
    {
      name: 'rooms',
      title: 'Oda Sayısı',
      type: 'string',
      options: {
        list: ['1+1', '2+1', '3+1', '4+1', '5+2', '6+2', 'Stüdyo', 'Ticari'],
      },
    },
    {
      name: 'features',
      title: 'Mülk Özellikleri',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Örn: Deniz Manzaralı, Akıllı Ev, Yerden Isıtma, Havuzlu',
      options: { layout: 'tags' },
    },
    {
      name: 'mainImage',
      title: 'Ana Resim (Kapak)',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'gallery',
      title: 'Fotoğraf Galerisi',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'googleMapsUrl',
      title: 'Google Harita Linki',
      type: 'url',
    },
    {
      name: 'analysis',
      title: 'Onda Analizi',
      type: 'array',
      description: 'Bu mülke özel rasyonel analiz raporu içeriği.',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } }
      ],
    },
  ],
};

// 2. Blog Yazıları (Post) Şeması
const post = {
  name: 'post',
  title: 'Blog Yazıları',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Blog Başlığı',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Blog Linki (Slug)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          { title: 'Piyasa Analizi', value: 'piyasa' },
          { title: 'Yatırım Tavsiyeleri', value: 'yatirim' },
          { title: 'Bölge İncelemesi', value: 'bolge' },
          { title: 'Haberler', value: 'haber' },
        ],
      },
    },
    {
      name: 'mainImage',
      title: 'Kapak Görseli',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'publishedAt',
      title: 'Yayınlanma Tarihi',
      type: 'datetime',
      initialValue: (new Date()).toISOString(),
    },
    {
      name: 'excerpt',
      title: 'Kısa Özet',
      type: 'text',
      rows: 3,
      description: 'Listeleme sayfasında görünecek vurucu özet cümle.',
    },
    {
      name: 'body',
      title: 'İçerik',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } }
      ],
    },
  ],
};

// 3. Bölge Analizleri (Region) Şeması
const region = {
  name: 'region',
  title: 'Bölge Analizleri',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Bölge Adı',
      type: 'string',
      description: 'Örn: Mavişehir, İncek, Girne',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Bölge Linki (Slug)',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'avgPrice',
      title: 'Ortalama m² Birim Fiyatı',
      type: 'string',
      description: 'Örn: 85.000 TL',
    },
    {
      name: 'annualGrowth',
      title: 'Yıllık Değer Artışı (%)',
      type: 'number',
      description: 'Sadece rakam girin (Örn: 45)',
    },
    {
      name: 'roi',
      title: 'Amortisman Süresi (Yıl)',
      type: 'number',
      description: 'Örn: 18',
    },
    {
      name: 'popGrowth',
      title: 'Nüfus Artış Oranı (%)',
      type: 'number',
      description: 'Örn: 5.2',
    },
    {
      name: 'mainImage',
      title: 'Bölge Görseli',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'body',
      title: 'Detaylı Analiz Raporu',
      type: 'array',
      description: 'Bölgeye dair derinlemesine rasyonel analiz metni.',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } }
      ],
    },
  ],
};

// Şemaları dışa aktar
const schemaTypes = [property, post, region];
export default schemaTypes;
