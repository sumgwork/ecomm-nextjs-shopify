import { ApiConfig, Variables } from "@common/types/api";
import { Product } from "@common/types/productTypes";
import { getProductByHandleQuery, normaliseProduct } from "@framework/utils";
import { Product as ShopifyProduct } from "shopify-storefront-api-typings";

type FetchType = { productByHandle: ShopifyProduct };

const getProduct = async (options: {
  config: ApiConfig;
  variables: Variables;
}): Promise<{ product: Product | null }> => {
  const { config, variables } = options;

  const { data } = await config.fetch<FetchType>({
    url: config.apiUrl,
    query: getProductByHandleQuery,
    variables,
  });

  const { productByHandle } = data;

  return {
    product: productByHandle ? normaliseProduct(productByHandle) : null,
  };
};

export default getProduct;
