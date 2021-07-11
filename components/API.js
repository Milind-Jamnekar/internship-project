import { useSession } from "next-auth/client";
import React from "react";
import useSWR from "swr";

function API({ displayRazorPay, total }) {
  const [session] = useSession();
  const fetcher = (url) =>
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        amount: total,
      }),
      headers: { "Content-type": "application/json" },
    }).then((res) => res.json());

  const { data, error } = useSWR("/api/razorpay", fetcher);
  return (
    <React.Fragment>
      {session && (
        <button
          style={{
            padding: "10px 20px",
            color: "white",
            background: "blue",
            fontSize: "2rem",
          }}
          onClick={() => displayRazorPay(data)}
        >
          Razorpay
        </button>
      )}
    </React.Fragment>
  );
}

export default API;
