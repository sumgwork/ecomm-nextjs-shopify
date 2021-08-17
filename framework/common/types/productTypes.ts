export interface ProductImages {
  url: string;
  alt?: string;
}

export interface ProductPrice {
  price: number;
  currencyCode: "USD" | "AUD" | string;
}

export interface ProductOptionValues {
  label: string;
  hexColor?: string;
}

export interface ProductOption {
  id: string;
  displayName: string;
  values: ProductOptionValues[];
}

export interface ProductVariant {
  id: string;
  name: string;
  options: ProductOption[];
}

export interface Product {
  id: string;
  name: string;
  vendor: string;
  handle: string;
  description: string;
  slug: string;
  images: Array<ProductImages>;
  price: ProductPrice;
  options: ProductOption[];
  variants: ProductVariant[];
}
