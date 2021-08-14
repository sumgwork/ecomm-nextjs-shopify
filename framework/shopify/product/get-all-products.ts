import { ProductConnection } from "shopify-storefront-api-typings";
import { Product } from "@common/types/productTypes";
import { fetchApi, normaliseProduct, getAllProductsQuery } from "../utils";

type ReturnType = { products: ProductConnection };

const getAllProducts = async (): Promise<Product[]> => {
  const { data } = await fetchApi<ReturnType>({
    query: getAllProductsQuery,
  });

  const products =
    data.products.edges.map(({ node: product }) => normaliseProduct(product)) ??
    [];

  return products;
};

export default getAllProducts;
