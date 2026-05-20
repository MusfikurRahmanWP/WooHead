export interface ProductImage {
  id: number;
  src: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  regular_price: string;
  images: ProductImage[];
  on_sale: number;
  sale_price: number;
}
