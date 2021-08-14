import { ProductConnection } from "shopify-storefront-api-typings";
import { Product } from "@common/types/productTypes";
import { ApiConfig } from "@common/types/api";
import { normaliseProduct, getAllProductsQuery } from "../utils";

type ReturnType = { products: ProductConnection };

const getAllProducts = async (config: ApiConfig): Promise<Product[]> => {
  const { data } = await config.fetch<ReturnType>({
    url: config.apiUrl,
    query: getAllProductsQuery,
  });

  const products =
    data.products.edges.map(({ node: product }) => normaliseProduct(product)) ??
    [];

  return products;
};

export default getAllProducts;
