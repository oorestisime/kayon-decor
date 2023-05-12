"use client";

import { VariantType } from "@/data/store";
import { useLocalStorage } from "react-use";

const cartKey = "kayon-cart";
type CartItemType = {
  product: string;
  variant: VariantType;
  quantity: number;
};
export type CartType = {
  items: CartItemType[];
  email: string;
  name: string;
};
const defaultCart: CartType = {
  items: [],
  email: "",
  name: "",
};

export const useCart = () => {
  const [value, setValue] = useLocalStorage(cartKey, defaultCart);
  const addItem = (item: CartItemType) => {
    if (!value) {
    }
    const newItems = [...(value || defaultCart).items, item];
    setValue({ ...(value || defaultCart), items: newItems });
  };

  const reset = () => {
    setValue(defaultCart);
  };

  const removeItem = (product: string, variant: VariantType) => {
    if (!value) {
      return;
    }
    const newItems = (value || defaultCart).items.filter((item) => {
      if (item.product === product && item.variant.size === variant.size) {
        return false;
      }
      return true;
    });
    setValue({ ...value, items: newItems });
  };

  const changeQuantity = (
    product: string,
    variant: VariantType,
    quantity: number
  ) => {
    if (!value) {
      return;
    }
    if (quantity === 0) {
      removeItem(product, variant);
      return;
    }
    const newItems = value.items.map((item) => {
      if (item.product === product && item.variant.size === variant.size) {
        return { ...item, quantity };
      }
      return item;
    });
    setValue({ ...value, items: newItems });
  };

  const cartHasProduct = (product: string, variant: VariantType) => {
    if (!value) {
      return false;
    }
    return value.items.some(
      (item) => item.product === product && item.variant.size === variant.size
    );
  };

  return {
    cart: value,
    addItem,
    removeItem,
    reset,
    cartHasProduct,
    changeQuantity,
  };
};
