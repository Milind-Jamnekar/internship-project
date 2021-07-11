import { CartProvider } from "./../Contexts/store";
import "../styles/globals.css";
import { Provider } from "next-auth/client";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <CartProvider>
        <Component {...pageProps} />;
      </CartProvider>
    </Provider>
  );
}

export default MyApp;
