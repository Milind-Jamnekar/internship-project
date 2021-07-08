import Head from "next/head";
import styles from "../styles/Home.module.css";
import Toolbar from "../components/Toolbar";
import Header from "../components/Header";
import Products from "./../components/Products";
import dynamic from "next/dynamic";
import { CartProvider } from "./../Contexts/store";

// It is code splittin for sign in component
const DynamicSign = dynamic(() => import("./Signin"));

export default function Home({ products }) {
  return (
    <CartProvider>
      <Head>
        <title>Auth and Payment Gateway</title>
      </Head>
      <div className={styles.app}>
        <Toolbar />
        <div className={styles.app__inner}>
          <Header />
          <Products products={products} />
          {/* <Signin /> */}
          {/* <DynamicSign /> */}
        </div>
      </div>
    </CartProvider>
  );
}

export async function getServerSideProps(context) {
  // const session = await getSession(context);
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );

  return {
    props: {
      products,
    },
  };
}
