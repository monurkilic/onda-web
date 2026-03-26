import Layout from '../components/Layout'; // Büyük 'L' ile çağırıyoruz

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;