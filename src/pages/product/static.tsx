import ProductViews from "@/views/product";
import React from "react";
import { ProductType } from "@/types/product.type";

const ProductPage = (props: { products: ProductType[] }) => {
  const { products } = props;
  return (
    <div>
      <ProductViews products={products} />
    </div>
  );
};

export default ProductPage;

export async function getStaticProps() {
  // fetch data
  const res = await fetch("http://localhost:3000/api/product");
  const response = await res.json();
  console.log(response);

  return {
    props: {
      products: response.data,
    },
    // revalidate: 10,
  };
}
