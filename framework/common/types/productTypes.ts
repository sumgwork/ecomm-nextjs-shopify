export interface ProductImages {
  url: string;
  alt?: string;
}

export interface Product {
  id: string;
  name: string;
  vendor: string;
  handle: string;
  description: string;
  slug: string;
  images: Array<ProductImages>;
}
