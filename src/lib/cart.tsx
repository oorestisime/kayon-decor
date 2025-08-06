"use client";

import { VariantType } from "@/data/store";
import { ReactNode, createContext } from "react";
import { useLocalStorage } from "react-use";

const cartKey = "kayon-cart";

export type CartItemType = {
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

interface IGlobalContextProps {
  cart?: CartType;
  addItem: (item: CartItemType) => void;
  reset: () => void;
  removeItem: (product: string, variant: VariantType) => void;
  changeQuantity: (
    product: string,
    variant: VariantType,
    quantity: number
  ) => void;
  cartHasProduct: (product: string, variant: VariantType) => boolean;
  editName: (name: string) => void;
  editEmail: (email: string) => void;
}

export const GlobalCartContext = createContext<IGlobalContextProps>({
  addItem: () => {},
  reset: () => {},
  removeItem: () => {},
  changeQuantity: () => {},
  cartHasProduct: () => false,
  editName: () => {},
  editEmail: () => {},
});

export const GlobalCartContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
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

  const editEmail = (email: string) => {
    if (!value) {
      return;
    }
    setValue({ ...value, email });
  };

  const editName = (name: string) => {
    if (!value) {
      return;
    }
    setValue({ ...value, name });
  };

  return (
    <GlobalCartContext.Provider
      value={{
        cart: value,
        addItem,
        removeItem,
        reset,
        cartHasProduct,
        changeQuantity,
        editEmail,
        editName,
      }}
    >
      {children}
    </GlobalCartContext.Provider>
  );
};
