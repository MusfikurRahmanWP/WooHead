import { Product } from "@/types/product";
import Image from "next/image";

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  return (
    <div className="border p-4 rounded">
      <Image
        src={product.images?.[0]?.src}
        alt={product.name}
        width={300}
        height={300}
      />

      <h2>{product.name}</h2>

      <p>${product.price}</p>
    </div>
  );
}
