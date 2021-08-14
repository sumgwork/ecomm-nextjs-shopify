import {
  ImageConnection,
  ImageEdge,
  Product as ShopifyProduct,
} from "shopify-storefront-api-typings";
import { Product } from "@common/types/productTypes";

export const normaliseProduct = (productNode: ShopifyProduct): Product => {
  const {
    id,
    title: name,
    vendor,
    handle,
    description,
    images,
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
  };

  return product;
};

const normaliseProductImages = ({ edges }: { edges: Array<ImageEdge> }) =>
  edges.map(({ node: { originalSrc: url, altText: alt } }) => ({
    url: `/images/${url}`,
    alt,
  }));
