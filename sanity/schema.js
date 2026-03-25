export default {
  name: 'property',
  title: 'İlanlar',
  type: 'document',
  fields: [
    { name: 'title', title: 'Başlık', type: 'string' },
    { name: 'location', title: 'Konum', type: 'string' },
    { name: 'price', title: 'Fiyat', type: 'string' },
    { name: 'analysis', title: 'Onda Analizi', type: 'text' }
  ]
}
