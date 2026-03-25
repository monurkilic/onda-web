import Head from 'next/head';
export default function About() {
  return (
    <div style={{backgroundColor: '#0a192f', color: '#fff', minHeight: '100vh', fontFamily: 'serif', display: 'flex', flexDirection: 'column'}}>
      <Head><title>Hakkımızda | Onda Yatırım</title></Head>
      <nav style={{padding: '20px', textAlign: 'center', borderBottom: '1px solid rgba(212,175,55,0.1)'}}>
        <a href="/" style={{color: '#d4af37', textDecoration: 'none'}}>← ANA SAYFA</a>
      </nav>
      <main style={{maxWidth: '800px', margin: '60px auto', padding: '0 20px', flex: 1, textAlign: 'center'}}>
        <h1 style={{color: '#d4af37', fontSize: '2.5rem', fontWeight: '300', letterSpacing: '5px'}}>BİZ KİMİZ?</h1>
        <div style={{width: '60px', height: '1px', background: '#d4af37', margin: '30px auto'}}></div>
        <p style={{fontSize: '1.2rem', lineHeight: '2', color: '#ccc', textAlign: 'justify'}}>
          Onda Yatırım, psikoloji ve insan kaynakları kökenli tecrübeyi gayrimenkulün rasyonel dünyasıyla birleştirir. İzmir ve Ankara merkezli vizyonumuzla güven inşa ediyoruz.
        </p>
      </main>
      <footer style={{padding: '60px 20px', textAlign: 'center', borderTop: '1px solid rgba(212,175,55,0.1)', background: '#0a192f'}}>
         <p style={{fontSize: '0.7rem', opacity: 0.5}}>© 2026 ONDA YATIRIM | Aradığınız her şey ONDA</p>
      </footer>
    </div>
  );
}
