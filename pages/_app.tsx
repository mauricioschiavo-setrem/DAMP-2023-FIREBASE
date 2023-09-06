import Context from '../context/Context';
import '../styles/globals.css';

function SafeHydrate({ children }) {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : children}
    </div>
  );
}

function MyApp({ Component, pageProps }) {
  return (
    <Context>
      <SafeHydrate>
        <Component {...pageProps} />
      </SafeHydrate>
    </Context>
  );
}

export default MyApp;
