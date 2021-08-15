import {
  ImageConnection,
  ImageEdge,
  MoneyV2,
  Product as ShopifyProduct,
} from "shopify-storefront-api-typings";
import { Product, ProductPrice } from "@common/types/productTypes";

export const normaliseProduct = (productNode: ShopifyProduct): Product => {
  const {
    id,
    title: name,
    vendor,
    handle,
    description,
    images,
    priceRange,
    ...rest
  } = productNode;

  const product = {
    id,
    name,
    vendor,
    description,
    handle,
    path: `/${handle}`,
    images: normaliseProductImages(images),
    slug: handle.replace(/^\/+|\/+$/g, ""), // remove all leading and trailing slash,
    price: normaliseProductPrice(priceRange.minVariantPrice),
  };

  return product;
};

const normaliseProductImages = ({ edges }: { edges: Array<ImageEdge> }) =>
  edges.map(({ node: { originalSrc: url, altText: alt } }) => ({
    url: `/images/${url}`,
    alt,
  }));

const normaliseProductPrice = (price: MoneyV2): ProductPrice => {
  const { currencyCode, amount } = price;
  return {
    price: +amount,
    currencyCode,
  };
};
