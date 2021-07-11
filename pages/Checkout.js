import Head from "next/head";
import Orders from "../components/Orders";
import { motion } from "framer-motion";
import { pageTransition, pageSlide } from "../utils/util";
import Toolbar from "../components/Toolbar";
import React, { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import Payment from "../components/Payment";

function Checkout() {
  const [session, loading] = useSession();
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    !session && router.push("/Signin");
  }, [session]);

  const paymentSuccess = () => setSuccess(true);

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
            <Orders success={success} />
            <Payment paymentSuccess={paymentSuccess} />
          </React.Fragment>
        )}
      </div>
    </motion.div>
  );
}

export default Checkout;
