import { fetcher } from "@/lib/swr/fetcher";
import { ProductType } from "@/types/product.type";
import DetailProduct from "@/views/detailProduct";
import { useRouter } from "next/router";
import useSWR from "swr";

const DetailProductPage = ({ product }: { product: ProductType }) => {
  const { query } = useRouter();

  // client side rendering
  // const { data, error, isLoading } = useSWR(
  //   `/api/product/${query.product}`,
  //   fetcher
  // );
  return (
    <div>
      {/* Server side & Static side  */}
      <DetailProduct product={product} />
      {/* client side rendering */}
      {/* <DetailProduct product={isLoading ? {} : data.data} /> */}
    </div>
  );
};

export default DetailProductPage;

// Server side rendering fetch data
export async function getServerSideProps({
  params,
}: {
  params: { product: string };
}) {
  // fetch data
  const res = await fetch(
    `http://localhost:3000/api/product/${params.product}`
  );
  const response = await res.json();
  console.log(response);

  return {
    props: {
      product: response.data,
    },
  };
}

// Static Site Generation (SSG)

// export async function getStaticPaths() {
//   const res = await fetch("http://localhost:3002/api/product");
//   const response = await res.json();

//   const paths = response.data.map((product: ProductType) => ({
//     params: {
//       product: product.id,
//     },
//   }));
//   return { paths, fallback: false };
// }

// export async function getStaticProps({
//   params,
// }: {
//   params: { product: string };
// }) {
//   const res = await fetch(
//     `http://localhost:3002/api/product/${params.product}`
//   );
//   const response = await res.json();
//   console.log(response);

//   return {
//     props: {
//       product: response.data,
//     },
//   };
// }
