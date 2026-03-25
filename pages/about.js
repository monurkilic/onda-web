import Head from 'next/head';

export default function About() {
  return (
    <div style={{backgroundColor: '#0a192f', color: '#fff', minHeight: '100vh', fontFamily: 'serif', display: 'flex', flexDirection: 'column'}}>
      <Head>
        <title>Hakkımızda | Onda Yatırım</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* HEADER / NAV */}
      <nav style={{padding: '20px 40px', textAlign: 'center', borderBottom: '1px solid rgba(212,175,55,0.1)', background: 'rgba(10, 25, 47, 0.95)', position: 'sticky', top: 0, zIndex: 100}}>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', marginBottom: '10px'}}>
           <img src="/logo.png" alt="Onda Logo" style={{height: '30px'}} onError={(e) => e.target.style.display = 'none'} />
           <span style={{color: '#d4af37', fontWeight: 'bold', letterSpacing: '2px'}}>ONDA</span>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase'}}>
          <a href="/" style={{color: '#fff', textDecoration: 'none'}}>GİRİŞ</a>
          <a href="/portfolio" style={{color: '#fff', textDecoration: 'none'}}>PORTFÖY</a>
          <a href="/contact" style={{color: '#fff', textDecoration: 'none'}}>İLETİŞİM</a>
        </div>
      </nav>

      {/* İÇERİK ALANI */}
      <main style={{maxWidth: '800px', margin: '80px auto', padding: '0 20px', flex: 1, textAlign: 'center'}}>
        <h1 style={{color: '#d4af37', fontSize: '2.5rem', fontWeight: '300', marginBottom: '40px', letterSpacing: '5px'}}>BİZ KİMİZ?</h1>
        <div style={{width: '60px', height: '1px', background: '#d4af37', margin: '0 auto 40px auto'}}></div>
        
        <p style={{fontSize: '1.2rem', lineHeight: '2.2', color: '#ccc', textAlign: 'justify', marginBottom: '30px'}}>
          <strong>Onda Yatırım</strong>, emlak dünyasına rasyonel bir analiz ve insan odaklı bir perspektif getirmek amacıyla kuruldu. 
          Psikoloji ve insan kaynakları kökenli kurumsal tecrübemizi, gayrimenkulün teknik dünyasıyla harmanlıyoruz.
        </p>
        
        <p style={{fontSize: '1.2rem', lineHeight: '2.2', color: '#ccc', textAlign: 'justify', marginBottom: '30px'}}>
          Bizim için her mülk bir "taşınmaz"dan fazlasıdır; o, doğru analiz edildiğinde hayat değiştiren bir yatırımdır. 
          <strong>"Onda Analizi"</strong> süzgecinden geçmeyen hiçbir portföyü size sunmuyor, İzmir ve Ankara merkezli vizyonumuzla 
          sadece mülk değil, güven inşa ediyoruz.
        </p>
        
        <div style={{marginTop: '60px'}}>
          <a href="/portfolio" style={{padding: '15px 40px', border: '1px solid #d4af37', color: '#d4af37', textDecoration: 'none', letterSpacing: '2px', fontSize: '0.9rem'}}>PORTFÖYÜMÜZE GÖZ ATIN</a>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{padding: '60px 20px', borderTop: '1px solid rgba(212,175,55,0.1)', textAlign: 'center', background: '#0d223f'}}>
        <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '30px', marginBottom: '30px', fontSize: '0.8rem', letterSpacing: '1px'}}>
          <a href="/" style={{color: '#8e8e8e', textDecoration: 'none'}}>ANA SAYFA</a>
          <a href="/portfolio" style={{color: '#8e8e8e', textDecoration: 'none'}}>PORTFÖY</a>
          <a href="/about" style={{color: '#fff', textDecoration: 'none', borderBottom: '1px solid #d4af37'}}>HAKKIMIZDA</a>
          <a href="/contact" style={{color: '#8e8e8e', textDecoration: 'none'}}>İLETİŞİM</a>
        </div>
        <p style={{fontSize: '0.7rem', opacity: 0.5, letterSpacing: '2px'}}>© 2026 ONDA YATIRIM | İzmir - Ankara | Aradığınız her şey ONDA</p>
      </footer>
    </div>
  );
}
