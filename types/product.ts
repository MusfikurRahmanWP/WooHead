export interface ProductImage {
  id: number;
  src: string;
  alt?: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  regular_price: string;
  sale_price?: string;
  on_sale?: boolean;
  images?: ProductImage[];
  description?: string;
  short_description?: string;
}
