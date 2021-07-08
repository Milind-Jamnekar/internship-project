import p from "./../styles/Products.module.css";
import Card from "./Card";

function Products({ products }) {
  return (
    <div className={p.container}>
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
  );
}

export default Products;
