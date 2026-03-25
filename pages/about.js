import Head from 'next/head';

export default function About() {
  return (
    <div style={{backgroundColor: '#0a192f', color: '#fff', minHeight: '100vh', fontFamily: 'serif'}}>
      <Head><title>Hakkımızda | Onda Yatırım</title></Head>
      <nav style={{padding: '20px 40px', borderBottom: '1px solid rgba(212,175,55,0.1)', textAlign: 'center'}}>
        <a href="/" style={{color: '#d4af37', textDecoration: 'none', letterSpacing: '2px'}}>← ANA SAYFA</a>
      </nav>
      <main style={{maxWidth: '800px', margin: '80px auto', padding: '0 20px', textAlign: 'center'}}>
        <h1 style={{color: '#d4af37', fontSize: '2.5rem', marginBottom: '40px'}}>BİZ KİMİZ?</h1>
        <p style={{fontSize: '1.2rem', lineHeight: '2.2', color: '#ccc'}}>
          Onda Yatırım, psikoloji ve insan kaynakları kökenli kurumsal tecrübeyi gayrimenkulün rasyonel dünyasıyla birleştiren yeni nesil bir danışmanlık markasıdır. 
          Amacımız sadece mülk el değiştirmesini sağlamak değil; mülkün potansiyelini "Onda Analizi" süzgecinden geçirerek yatırımcımıza en doğru kararı aldırmaktır.
          İzmir ve Ankara merkezli operasyonlarımızla, Türkiye'nin ve dünyanın seçkin noktalarında yanınızdayız.
        </p>
      </main>
      <footer style={{textAlign: 'center', padding: '40px', opacity: 0.5, fontSize: '0.7rem'}}>© 2026 ONDA YATIRIM</footer>
    </div>
  );
}
