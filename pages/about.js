import Head from 'next/head';

export default function About() {
  return (
    <div style={{backgroundColor: '#0a192f', color: '#fff', minHeight: '100vh', fontFamily: 'serif', display: 'flex', flexDirection: 'column', overflowX: 'hidden'}}>
      <Head>
        <title>Hakkımızda | Onda Yatırım</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <style dangerouslySetInnerHTML={{ __html: `
        .content-container { max-width: 850px; margin: 0 auto; padding: 60px 20px; text-align: center; flex: 1; }
        .about-text { font-size: 1.15rem; lineHeight: 2.2; color: #ccc; text-align: justify; margin-bottom: 30px; }
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .hero-logo { width: 120px !important; }
          .about-text { font-size: 1rem; line-height: 1.8; text-align: left; }
        }
      `}} />

      {/* HEADER */}
      <nav style={{position: 'sticky', top: 0, z_index: 100, background: 'rgba(10, 25, 47, 0.95)', borderBottom: '1px solid rgba(212,175,55,0.1)', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backdropFilter: 'blur(10px)'}}>
        <a href="/" style={{display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none'}}>
          <img src="/logo.png" style={{height: '35px'}} alt="Logo" />
          <span style={{color: '#d4af37', fontWeight: 'bold', letterSpacing: '2px'}}>ONDA</span>
        </a>
        <div className="nav-links" style={{display: 'flex', gap: '25px', fontSize: '0.8rem', letterSpacing: '1px'}}>
          <a href="/" style={{color: '#fff', textDecoration: 'none'}}>GİRİŞ</a>
          <a href="/portfolio" style={{color: '#fff', textDecoration: 'none'}}>PORTFÖY</a>
          <a href="/contact" style={{color: '#fff', textDecoration: 'none'}}>İLETİŞİM</a>
        </div>
      </nav>

      <main className="content-container">
        {/* ORTALI LOGO */}
        <div style={{marginBottom: '40px'}}>
          <img src="/logo.png" className="hero-logo" style={{width: '180px', margin: '0 auto'}} alt="Onda Logo" />
        </div>

        <h1 style={{color: '#d4af37', fontSize: '2.5rem', fontWeight: '300', letterSpacing: '6px', marginBottom: '40px', textTransform: 'uppercase'}}>BİZ KİMİZ?</h1>
        <div style={{width: '60px', height: '1px', background: '#d4af37', margin: '0 auto 50px auto'}}></div>
        
        <div className="about-text">
          <p>
            <strong>Onda Yatırım</strong>, gayrimenkul dünyasına sadece bir mülk alım-satım aracısı olarak değil, bir danışmanlık ve analiz merkezi olarak adım attı. Temellerimiz, insanı anlamanın ve doğru eşleştirmenin en kritik olduğu alanlardan biri olan psikoloji ve üst düzey insan kaynakları yönetimine dayanmaktadır.
          </p>
          <p>
            Yıllarca kurumsal işe alım ve danışmanlık süreçlerinde edindiğimiz "doğru aday-doğru pozisyon" prensibini, gayrimenkul sektörüne <strong>"doğru yatırımcı-doğru mülk"</strong> felsefesiyle taşıyoruz. Bizim için bir mülk sadece beton ve metrekareden ibaret değildir; o, verilerle analiz edilmesi gereken rasyonel bir yatırım ve hayat boyu sürecek bir güvendir.
          </p>
          <p>
            <strong>"Onda Analizi"</strong> adını verdiğimiz özel süzgecimizle, İzmir ve Ankara başta olmak üzere Türkiye'nin ve dünyanın en seçkin noktalarındaki portföyleri rasyonel verilerle inceliyoruz. Kendi süzgecimizden geçmeyen, yatırım potansiyeli görmediğimiz hiçbir mülkü size sunmuyoruz.
          </p>
          <p>
            Onda Yatırım olarak hedefimiz, gayrimenkul süreçlerindeki karmaşıklığı ortadan kaldırarak size şeffaf, veriye dayalı ve kurumsal bir deneyim sunmaktır. Aradığınız o güveni ve profesyonelliği <strong>Onda</strong> bulacaksınız.
          </p>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{padding: '60px 20px', borderTop: '1px solid rgba(212,175,55,0.1)', textAlign: 'center', background: '#0a192f'}}>
        <div style={{display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '30px', fontSize: '0.8rem', letterSpacing: '1px'}}>
          <a href="/" style={{color: '#8e8e8e', textDecoration: 'none'}}>ANA SAYFA</a>
          <a href="/portfolio" style={{color: '#8e8e8e', textDecoration: 'none'}}>PORTFÖY</a>
          <a href="/contact" style={{color: '#8e8e8e', textDecoration: 'none'}}>İLETİŞİM</a>
        </div>
        <p style={{fontSize: '0.7rem', opacity: 0.4, letterSpacing: '2px'}}>© 2026 ONDA YATIRIM | Aradığınız her şey ONDA</p>
      </footer>
    </div>
  );
}
