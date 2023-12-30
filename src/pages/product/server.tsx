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

// dipanggil setiap melakukan request
export async function getServerSideProps() {
  // fetch data
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product`);
  const response = await res.json();
  console.log(response);

  return {
    props: {
      products: response.data,
    },
  };
}
