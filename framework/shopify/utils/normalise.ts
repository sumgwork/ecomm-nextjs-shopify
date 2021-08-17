import {
  ImageConnection,
  ImageEdge,
  MoneyV2,
  Product as ShopifyProduct,
  ProductOption,
  ProductVariantConnection,
  SelectedOption,
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
    options,
    variants,
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
    options: options
      ? options
          .filter((o) => o.name !== "Title")
          .map((o) => normaliseProductOption(o))
      : [],
    variants: variants ? normaliseProductVariants(variants) : [],
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

const normaliseProductOption = ({
  id,
  values,
  name: displayName,
}: ProductOption) => {
  const normalized = {
    id,
    displayName,
    values: values.map((value) => {
      let output: any = {
        label: value,
      };

      if (displayName.match(/colou?r/gi)) {
        output = {
          ...output,
          hexColor: value,
        };
      }

      return output;
    }),
  };

  return normalized;
};

const normaliseProductVariants = ({ edges }: ProductVariantConnection) => {
  return edges.map(({ node }) => {
    const { id, selectedOptions, sku, title, priceV2, compareAtPriceV2 } = node;

    return {
      id,
      name: title,
      sku: sku || id,
      price: +priceV2.amount,
      listPrice: +compareAtPriceV2?.amount,
      requiresShipping: true,
      options: selectedOptions.map(({ name, value }: SelectedOption) => {
        const option = normaliseProductOption({
          id,
          name,
          values: [value],
        });

        return option;
      }),
    };
  });
};
