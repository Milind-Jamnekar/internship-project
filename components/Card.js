import Image from "next/image";
import s from "./../styles/Card.module.css";
import { FiShoppingCart, FiMinusCircle } from "react-icons/fi";
import { useContext } from "react";
import { CartContext } from "./../Contexts/store";
import { motion } from "framer-motion";
import { pageZoom, pageTransition } from "./../utils/util";

function Card({ id, title, price, amount = 1, description, category, image }) {
  //   const localelang = () =>
  //     navigator.languages && navigator.languages.length
  //       ? navigator.languages[0]
  //       : navigator.language;

  //   const rigionalPrice = price.toLocaleString(localelang(), {
  //     style: "currency",
  //     currency: "JPY",
  //   });
  const [cart, addToCart] = useContext(CartContext);

  const add = () => {
    addToCart({ id, title, price, amount, image });
  };

  const increment = () => {
    incItem(id, 1);
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageZoom}
      transition={pageTransition}
      layout
      className={s.card__container}
    >
      <div className={s.card__image}>
        <Image
          src={image}
          alt=""
          height="250"
          width="200"
          layout="responsive"
        />
      </div>
      <div className={s.card__contents}>
        <span className={s.card__badge}>{category}</span>
        <h1>{title}</h1>
        <p>{description.slice(0, 50)}</p>
        <h2 className={s.card__price}>
          ${price}{" "}
          <span className={s.card__OgPrice}>
            ${Math.round(price * 1.2 * 100) / 100}
          </span>
        </h2>
        <a className={s.card__add} onClick={add}>
          <FiShoppingCart size="2rem" />
        </a>
        {/* <a onClick={increment}>
          {cart[id] ? cart[id].amount : null}
          <FiMinusCircle size="2rem" />
        </a> */}
      </div>
    </motion.div>
  );
}

export default Card;
