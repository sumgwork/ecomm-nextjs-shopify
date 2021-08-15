import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@common/types/productTypes";

interface Props {
  product: Product;
}

const placeholderImage = "/product-image-placeholder.svg";

const ProductCard: FC<Props> = ({ product }) => {
  return (
    <Link href={`/products/${product.slug}`}>
      <a>
        <div>
          <h3>
            <span>{product.name}</span>
          </h3>
          <span>$14</span>
          {product.images && (
            <Image
              alt={product.name ?? "Product image"}
              src={product.images[0].url ?? placeholderImage}
              height={540}
              width={540}
              quality="85"
              layout="responsive"
            />
          )}
        </div>
      </a>
    </Link>
  );
};

export default ProductCard;
