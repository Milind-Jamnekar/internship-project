import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});

  const addToCart = ({ id, title, price, image, amount }) => {
    if (!cart[id]) {
      const newItem = {
        title,
        price,
        image,
        amount,
      };
      setCart({ ...cart, [id]: newItem });
    }
  };

  const incItem = (id, amount) => {
    if (cart[id]) {
      let cartCopy = JSON.parse(JSON.stringify(cart));
      cartCopy[id].amount = cartCopy[id].amount + 1;
      setCart(cartCopy);
    }
  };

  return (
    <CartContext.Provider value={[cart, setCart, incItem, addToCart]}>
      {children}
    </CartContext.Provider>
  );
};
