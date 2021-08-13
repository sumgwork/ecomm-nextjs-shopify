import { Product, ProductConnection } from "shopify-storefront-api-typings";
import fetchApi from "../utils/fetch-api";
import getAllProductsQuery from "../utils/queries/get-all-products";

type ReturnType = { products: ProductConnection };

const getAllProducts = async (): Promise<any> => {
  const { data } = await fetchApi<ReturnType>({
    query: getAllProductsQuery,
  });

  // TODO:  normalize and return new data

  return data;
};

export default getAllProducts;
