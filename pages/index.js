import { useState } from 'react';
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import Head from 'next/head';

const client = createClient({ 
  projectId: 'k8cd67dp', 
  dataset: "production", 
  apiVersion: "2023-01-01", 
  useCdn: false 
});

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

export default function Home({ properties }) {
  const [lightboxImg, setLightboxImg] = useState(null);

  return (
    <div style={{backgroundColor: '#0a192f', color: '#fff', minHeight: '100vh', fontFamily: 'serif', overflowX: 'hidden'}}>
      <Head>
        <title>Onda Yatırım | Aradığınız her şey ONDA</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="description" content="Gayrimenkulde rasyonel analiz ve kurumsal güvenin buluşma noktası. İzmir ve Ankara merkezli seçkin portföyümüzü inceleyin." />
        
        {/* Sosyal Medya Önizleme */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ondayatirim.com/" />
        <meta property="og:title" content="Onda Yatırım | Aradığınız her şey ONDA" />
        <meta property="og:description" content="Gayrimenkulde rasyonel analiz ve kurumsal güvenin buluşma noktası." />
        <meta property="og:image" content="https://ondayatirim.com/logo.png" />
      </Head>

      {/* GELİŞMİŞ MOBİL VE GENEL STİLLER */}
      <style dangerouslySetInnerHTML={{ __html: `
        html { scroll-behavior: smooth; }
        body { margin: 0; padding: 0; }
        
        /* Mobil Özel Ayarlar */
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .hero-section { padding: 80px 15px !important; }
          .hero-title { font-size: 2rem !important; letter-spacing: 4px !important; line-height: 1.2 !important; }
          .hero-desc { font-size: 0.95rem !important; }
          .grid-container { 
            grid-template-columns: 1fr !important; 
            gap: 25px !important; 
            padding: 20px 15px !important; 
          }
          .property-card-image { height: 240px !important; }
          .footer-links { gap: 20px !important; flex-direction: column !important; }
        }

        /* Hover Efektleri (Masaüstü için) */
        .property-card { transition: transform 0.3s ease, border-color 0.3s ease; }
        .property-card:hover { transform: translateY(-5); border-color: #d4af37 !important; }
        .btn-hover:hover { background-color: #c4a030 !important; }
      `}} />

      {/* LIGHTBOX MODAL */}
      {lightboxImg && (
        <div onClick={() => setLightboxImg(null)} style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.95)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out'}}>
          <img src={lightboxImg} style={{maxWidth: '90%', maxHeight: '85%', border: '1px solid #d4af37', borderRadius: '2px'}} alt="Büyük Görünüm" />
          <span style={{position: 'absolute', top: 20, right: 30, color: '#d4af37', fontSize: '35px', fontWeight: 'bold'}}>×</span>
        </div>
      )}

      {/* 1. ÜST MENÜ */}
      <nav style={{position: 'sticky', top: 0, zIndex: 100, background: 'rgba(10, 25, 47, 0.95)', borderBottom: '1px solid rgba(212,175,55,0.1)', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backdropFilter: 'blur(10px)'}}>
        <a href="/" style={{display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none'}}>
          <img src="/logo.png" alt="Onda Logo" style={{height: '35px'}} onError={(e) => e.target.style.display = 'none'} />
          <span style={{color: '#d4af37', fontWeight: 'bold', fontSize: '1.1rem', letterSpacing: '2px'}}>ONDA</span>
        </a>
        <div className="nav-links" style={{display: 'flex', gap: '25px', fontSize: '0.75rem', letterSpacing: '2px'}}>
          <a href="/portfolio" style={{color: '#fff', textDecoration: 'none'}}>PORTFÖY</a>
          <a href="/about" style={{color: '#fff', textDecoration: 'none'}}>HAKKIMIZDA</a>
          <a href="/contact" style={{color: '#fff', textDecoration: 'none'}}>İ
