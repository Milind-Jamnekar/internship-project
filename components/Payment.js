import { useSession } from "next-auth/client";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../Contexts/store";
import API from "./API";
// Creating script tag on html document
function loadRazorPay(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

function Payment({ paymentSuccess }) {
  const [cart] = useContext(CartContext);
  const [session, loading] = useSession();
  const [show, setShow] = useState(false);

  let total = 0;
  for (const key in cart) {
    total = total + cart[key].price;
  }

  async function displayRazorPay(data) {
    // Calculating total of all items in cart
    // console.log(total.toString());

    // this lets us add script tag with razorpay sdk src in html document
    const res = await loadRazorPay(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    // Error Handling
    if (!res) {
      alert("razorpay sdk failed to load");
    }

    // Making Id from api which then use fron checkout
    // const data = await fetch("/api/razorpay", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     amount: total,
    //   }),
    //   headers: { "Content-type": "application/json" },
    // }).then((res) => res.json());

    // console.log(data);
    let options = {
      key: process.env.KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: data.amount ? data.amount : total, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: data.currency ? data.currency : "INR",
      name: "Amazon 2.0",
      description: "Test Transaction",
      image: session.user.image,
      order_id: data.id, //Passing the `id` obtained from the api /api/razorpay
      handler: function (response) {
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
        paymentSuccess();
      },
      prefill: {
        name: session.user.name,
        email: session.user.email,
      },
      notes: {
        address: "Amazon galli ",
      },
      theme: {
        color: "#F90",
      },
    };
    let razor = new window.Razorpay(options);
    razor.open();
    // razor.open("payment.failed", function (response) {
    //   alert(response.error.code);
    //   alert(response.error.description);
    //   alert(response.error.source);
    //   alert(response.error.step);
    //   alert(response.error.reason);
    //   alert(response.error.metadata.order_id);
    //   alert(response.error.metadata.payment_id);
    // });
  }

  return (
    <div>
      {!show && <button onClick={() => setShow(true)}>Pay</button>}
      {show ? <API displayRazorPay={displayRazorPay} total={total} /> : null}
    </div>
  );
}

export default Payment;
