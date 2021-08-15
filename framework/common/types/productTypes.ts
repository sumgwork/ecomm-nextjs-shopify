export interface ProductImages {
  url: string;
  alt?: string;
}

export interface ProductPrice {
  price: number;
  currencyCode: "USD" | "AUD" | string;
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
}
