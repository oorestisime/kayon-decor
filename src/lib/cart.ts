import { useLocalStorage } from "react-use";

const cartKey = "kayon-cart";
type CartItemType = {
  product: string;
  size: string;
  quantity: number;
};
type CartType = {
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

  const removeItem = (product: string) => {
    if (!value) {
      return;
    }
    const newItems = (value || defaultCart).items.filter(
      (item) => item.product !== product
    );
    setValue({ ...value, items: newItems });
  };

  const cartHasProduct = (product: string) => {
    if (!value) {
      return false;
    }
    return value.items.some((item) => item.product === product);
  };

  return { value, addItem, removeItem, reset, cartHasProduct };
};
