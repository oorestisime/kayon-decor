"use client";

import { ProductType, VariantType } from "@/data/store";
import { GlobalCartContext } from "@/lib/cart";
import { useContext } from "react";
import { toast } from "react-toastify";

export const AddToBag = ({
  product,
  variant,
}: {
  product: ProductType;
  variant: VariantType;
}) => {
  const { addItem, cartHasProduct, removeItem } = useContext(GlobalCartContext);
  const notifyAdd = () => toast.success("Item successfuly added!");
  const notifyRemove = () => toast.error("Item successfuly removed!");

  if (cartHasProduct(product.slug, variant)) {
    return (
      <div className="mt-10 flex">
        <button
          suppressHydrationWarning
          type="submit"
          className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-brown-primary px-8 py-3 text-base font-medium text-white hover:bg-brown-dark focus:outline-none focus:ring-2 focus:ring-brown-primary focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
          onClick={() => {
            removeItem(product.slug, variant);
            notifyRemove();
          }}
        >
          Remove from bag!
        </button>
      </div>
    );
  }
  return (
    <div className="mt-10 flex">
      <button
        suppressHydrationWarning
        type="submit"
        className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-brown-primary px-8 py-3 text-base font-medium text-white hover:bg-brown-dark focus:outline-none focus:ring-2 focus:ring-brown-primary focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
        onClick={() => {
          addItem({
            product: product.slug,
            variant,
            quantity: 1,
          });
          notifyAdd();
        }}
      >
        Pre-order now!
      </button>
    </div>
  );
};
