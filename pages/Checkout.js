import Head from "next/head";
import Orders from "../components/Orders";
import { motion } from "framer-motion";
import { pageTransition, pageSlide } from "../utils/util";
import Toolbar from "../components/Toolbar";
import React, { useContext, useEffect } from "react";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import Payment from "../components/Payment";

function Checkout() {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    !session && router.push("/Signin");
  }, [router, session]);

  // !session && router.push("/Signin");

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageSlide}
      transition={pageTransition}
    >
      <Head>
        <title>Checkout</title>
      </Head>
      <Toolbar />
      <div
        style={{
          maxHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {session && (
          <React.Fragment>
            <Orders />
            <Payment />
          </React.Fragment>
        )}
      </div>
    </motion.div>
  );
}

export default Checkout;
