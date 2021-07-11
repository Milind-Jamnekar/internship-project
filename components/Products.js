import p from "./../styles/Products.module.css";
import Card from "./Card";
import { useSession } from "next-auth/client";
import React, { useContext } from "react";
// import { CartContext } from "../Contexts/store";

function Products({ products }) {
  const [session, loading] = useSession();
  // const [cart, getTota] = useContext(CartContext);

  let total = 0;
  return (
    <React.Fragment>
      <h1 className={p.username}>
        Welcome {session && session.user.name} To{" "}
        <span className={p.brandname}>Amazon 2.0</span>
      </h1>

      {/* No Need  */}
      {/* <button
        onClick={() => {
          
          console.log(total);
        }}
      >
        button
      </button>
      {<pre>{JSON.stringify(cart, null, 2)}</pre>} */}
      <div className={p.container}>
        {/***********************
        
        Each Individual Card goes here 📑
          
        ********************** */}
        {products.map(({ id, title, price, description, category, image }) => (
          <Card
            key={id}
            id={id}
            title={title}
            price={price}
            description={description}
            category={category}
            image={image}
          />
        ))}
      </div>
    </React.Fragment>
  );
}

export default Products;
