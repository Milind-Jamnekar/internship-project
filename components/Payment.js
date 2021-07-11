import { useSession } from "next-auth/client";
import { useContext, useEffect } from "react";
import { CartContext } from "../Contexts/store";
import useSWR from "swr";
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

function Payment({ getTotal }) {
  const [cart] = useContext(CartContext);
  const [session, loading] = useSession();

  let total = 0;
  for (const key in cart) {
    total = total + cart[key].price;
  }

  const fetcher = (url) =>
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        amount: total,
      }),
      headers: { "Content-type": "application/json" },
    }).then((res) => res.json());

  const { data, error } = useSWR("/api/razorpay", fetcher);
  async function displayRazorPay() {
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

    let options = {
      key: process.env.KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: data.currency,
      name: "Amazon 2.0",
      description: "Test Transaction",
      image: session.user.image,
      order_id: data.id, //Passing the `id` obtained from the api /api/razorpay
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
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
      {session && <button onClick={() => displayRazorPay()}>Button</button>}
    </div>
  );
}

export default Payment;
