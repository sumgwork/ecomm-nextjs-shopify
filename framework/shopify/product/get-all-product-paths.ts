import { ApiConfig } from "@common/types/api";
import { Product } from "@common/types/productTypes";
import { getAllProductsPathsQuery } from "@framework/utils";
import { ProductConnection } from "shopify-storefront-api-typings";

type ReturnType = { products: Array<Pick<Product, "slug">> };
type ApiReturnType = { products: ProductConnection };

const getAllProductsPaths = async (config: ApiConfig): Promise<ReturnType> => {
  const { data } = await config.fetch<ApiReturnType>({
    url: config.apiUrl,
    query: getAllProductsPathsQuery,
  });

  const products = data.products.edges.map(({ node: { handle } }) => ({
    slug: handle,
  }));

  return {
    products,
  };
};

export default getAllProductsPaths;
