export default function Home() {
  return (
    <div style={{backgroundColor: '#0a192f', color: '#d4af37', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', fontFamily: 'serif'}}>
      <h1 style={{fontSize: '4rem', fontStyle: 'italic', marginBottom: '10px'}}>ONDA YATIRIM</h1>
      <p style={{color: '#8e8e8e', fontSize: '1.5rem', marginBottom: '30px'}}>Güvenin Yeni Dalgası</p>
      <a href="/studio" style={{padding: '12px 24px', border: '1px solid #d4af37', color: '#d4af37', textDecoration: 'none', borderRadius: '4px'}}>Yönetim Paneline Git</a>
    </div>
  )
}
