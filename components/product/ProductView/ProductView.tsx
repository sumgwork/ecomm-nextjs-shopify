import { FC, useState } from "react";
import { Container, Button } from "@components/ui";
import { Product } from "@common/types/productTypes";
import { ProductSlider, Swatch } from "@components/product";
import { useUI } from "@components/ui/context";
import Image from "next/image";
import cn from "classnames";
import s from "./ProductView.module.css";
import { Choices, getVariant } from "../helpers";
import { useAddItem } from "@common/cart";
import { useApiProvider } from "@framework";
interface Props {
  product: Product;
}

const ProductView: FC<Props> = ({ product }) => {
  const [choices, setChoices] = useState<Choices>({});
  const { hooks, fetcher } = useApiProvider();

  const { openSidebar } = useUI();
  const addItem = useAddItem();

  const variant = getVariant(product, choices);

  const addToCart = () => {
    try {
      const item = {
        productId: String(product.id),
        variantId: variant?.id,
        variantOptions: variant?.options,
      };
      const output = addItem(item);
      console.log(
        "🚀 ~ file: ProductView.tsx ~ line 34 ~ addToCart ~ output",
        output
      );

      openSidebar();
    } catch {}
  };

  return (
    <Container>
      <div className={cn(s.root, "fit", "mb-5")}>
        <div className={cn(s.productDisplay, "fit")}>
          <div className={s.nameBox}>
            <h1 className={s.name}>{product.name}</h1>
            <div className={s.price}>
              {product.price.price}
              {` `}
              {product.price.currencyCode}
            </div>
          </div>
          <ProductSlider>
            {product.images.map((image) => (
              <div key={image.url} className={s.imageContainer}>
                <Image
                  className={s.img}
                  src={image.url}
                  alt={image.alt}
                  width={1050}
                  height={1050}
                  quality="85"
                />
              </div>
            ))}
          </ProductSlider>
        </div>
        <div className={s.sidebar}>
          <section>
            {product.options.map((option) => (
              <div key={option.id} className="pb-4">
                <h2 className="uppercase font-medium">{option.displayName}</h2>
                <div className="flex flex-row py-4">
                  {option.values.map((optValue) => {
                    const activeChoice =
                      choices[option.displayName.toLowerCase()];
                    return (
                      <Swatch
                        key={`${option.id}-${optValue.label}`}
                        label={optValue.label}
                        color={optValue.hexColor}
                        variant={option.displayName}
                        active={optValue.label.toLowerCase() === activeChoice}
                        onClick={() => {
                          setChoices({
                            ...choices,
                            [option.displayName.toLowerCase()]:
                              optValue.label.toLowerCase(),
                          });
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
            <div className="pb-14 break-words w-full max-w-xl text-lg">
              {product.description}
            </div>
          </section>
          <div>
            <Button className={s.button} onClick={addToCart}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductView;
