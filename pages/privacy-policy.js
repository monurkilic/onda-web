import Head from 'next/head';

export default function PrivacyPolicy() {
  return (
    <div style={{ padding: '50px', color: '#fff', backgroundColor: '#0d223f', minHeight: '100vh', fontFamily: 'sans-serif', lineHeight: '1.6' }}>
      <Head>
        <title>Gizlilik Politikası | Onda Yatırım</title>
      </Head>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ color: '#d4af37' }}>Gizlilik Politikası</h1>
        <p>Son Güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
        
        <h2 style={{ color: '#d4af37' }}>1. Veri Toplama</h2>
        <p>Onda Yatırım ("biz"), web sitemizde Instagram Graph API kullanarak sadece kendi sosyal medya içeriklerimizi sergilemekteyiz. Ziyaretçilerimizden bu süreçte herhangi bir kişisel veri toplamıyoruz.</p>

        <h2 style={{ color: '#d4af37' }}>2. Veri Kullanımı</h2>
        <p>Toplanan teknik veriler (çerezler vb.), sadece site performansını artırmak ve kullanıcı deneyimini iyileştirmek amacıyla kullanılır. Meta (Facebook/Instagram) üzerinden çekilen veriler sadece görüntüleme amaçlıdır.</p>

        <h2 style={{ color: '#d4af37' }}>3. Üçüncü Taraf Paylaşımı</h2>
        <p>Verileriniz hiçbir şekilde üçüncü şahıslarla paylaşılmaz veya satılmaz. KVKK (Kişisel Verilerin Korunması Kanunu) kapsamında verilerinizin güvenliği birincil önceliğimizdir.</p>

        <h2 style={{ color: '#d4af37' }}>4. Veri Silme Talebi</h2>
        <p>Kullanıcılar, verilerinin silinmesini veya işlenmemesini her zaman talep edebilirler. Bu tür talepleriniz için <strong>info@ondayatirim.com</strong> adresi üzerinden bizimle iletişime geçebilirsiniz.</p>
        
        <p style={{ marginTop: '50px', fontSize: '0.9rem', color: '#8e8e8e' }}>Onda Yatırım - Rasyonel Gayrimenkul Çözümleri</p>
      </div>
    </div>
  );
}
