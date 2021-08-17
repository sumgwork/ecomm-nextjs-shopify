import React, {
  FC,
  Children,
  isValidElement,
  cloneElement,
  useState,
} from "react";
import { useKeenSlider } from "keen-slider/react";
import s from "./ProductSlider.module.css";
import cn from "classnames";

const ProductSlider: FC = ({ children }) => {
  const [_currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, slider] = useKeenSlider({
    initial: 0,
    loop: true,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide);
    },
  });
  return (
    <div className={s.root}>
      <div
        ref={sliderRef as React.RefObject<HTMLDivElement>}
        className="keen-slider h-full transition-opacity"
      >
        <button
          onClick={slider?.prev}
          className={cn(s.leftControl, s.control)}
        />
        <button
          onClick={slider?.next}
          className={cn(s.rightControl, s.control)}
        />
        {Children.map(children, (child) => {
          if (isValidElement(child)) {
            return cloneElement(child, {
              className: `${
                child.props.className ? `${child.props.className} ` : ""
              }keen-slider__slide`,
            });
          }
          return child;
        })}
      </div>
    </div>
  );
};

export default ProductSlider;
