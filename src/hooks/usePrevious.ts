import { ProductItemProps } from "@/types/types";
import { MutableRefObject, useEffect, useRef } from "react";

export default function usePrevious(
  value: Array<ProductItemProps>
): MutableRefObject<Array<ProductItemProps>>["current"] {
  const ref = useRef<Array<ProductItemProps>>();
  useEffect(() => {
    if (value.length !== 0) ref.current = value;
  }, [value]);
  return ref.current;
}
