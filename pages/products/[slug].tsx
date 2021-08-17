import { Layout } from "@components/common";
import { ProductView } from "@components/product";
import { getConfig } from "@framework/api/config";
import getAllProductsPaths from "@framework/product/get-all-product-paths";
import getProduct from "@framework/product/get-product";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";

// fetch all product slugs
export const getStaticPaths: GetStaticPaths = async () => {
  const config = getConfig();
  const { products } = await getAllProductsPaths(config);

  return {
    paths: products.map((product) => ({ params: { slug: product.slug } })),
    fallback: false,
  };
};

// provides product specific data
export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ slug: string }>) => {
  const config = getConfig();
  const { product } = await getProduct({
    config,
    variables: { handle: params?.slug },
  });
  return {
    props: {
      product,
    },
  };
};

export default function ProductSlug({
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <>{product && <ProductView product={product} />}</>;
}

ProductSlug.Layout = Layout;
