import Head from "next/head";
import Orders from "../components/Orders";
import { motion } from "framer-motion";
import { pageTransition, pageSlide } from "../utils/util";
import Toolbar from "../components/Toolbar";
import React, { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import Payment from "../components/Payment";
import Script from "next/script";

function Checkout() {
  const [session, loading] = useSession();
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  // useEffect(() => {
  //   !session && router.push("/Signin");
  // }, [session]);

  const paymentSuccess = () => setSuccess(true);

  (function () {
    var d = document;
    var x = !d.getElementById("razorpay-embed-btn-js");
    if (x) {
      var s = d.createElement("script");
      s.defer = !0;
      s.id = "razorpay-embed-btn-js";
      s.src = "https://cdn.razorpay.com/static/embed_btn/bundle.js";
      d.body.appendChild(s);
    } else {
      var rzp = window["__rzp__"];
      rzp && rzp.init && rzp.init();
    }
  })();

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
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
            <Orders success={success} />
            <div
              className="razorpay-embed-btn"
              data-url="https://rzp.io/l/nHaxcW1L"
              data-text="Donation"
              data-color="#FF9900"
              data-size="medium"
            ></div>

            {/* <Payment paymentSuccess={paymentSuccess} /> */}
          </React.Fragment>
        )}
      </div>
    </motion.div>
  );
}

export default Checkout;
