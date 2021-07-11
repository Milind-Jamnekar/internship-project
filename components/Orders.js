import { useContext, useState } from "react";
import s from "./../styles/Orders.module.css";
import { CartContext } from "./../Contexts/store";
import Image from "next/image";

function Orders({ success }) {
  const [cart] = useContext(CartContext);
  const [items, setItems] = useState(true);

  const content = () => {
    const el = [];

    if (cart.length === 0) {
      setItems(false);
    }

    for (const key in cart) {
      el.push(
        <div key={key}>
          <Image src={cart[key].image} height="100" width="100" alt="" />
          <h2>{cart[key].title}</h2>
          <p>Price: {cart[key].price}</p>
        </div>
      );
      // if (Object.hasOwnProperty.call(cart, key)) {
      // }
    }

    return el;
  };

  let total = 0;
  for (const key in cart) {
    total = total + cart[key].price;
  }

  return (
    <div>
      {items ? (
        content()
      ) : (
        <h1>Your Shopping Cart 🛒 Is empty 😔 please shop first 😊 </h1>
      )}
      <div>
        {items && (
          <h1>
            Total:{total}{" "}
            {success && (
              <h1 style={{ color: "green" }}>
                Horray 🎊🎉 Payment is Complete
              </h1>
            )}
          </h1>
        )}
      </div>
    </div>
  );
}

export default Orders;

// <h5>Order ID: {order.created}/h5>
// <p>
//   Payment Method: {order?.type === "cod" && "COD"}
//   {order?.type === "card" && "Card"}
// </p>
