"use client";

import { ProductType, VariantType } from "@/data/store";
import { GlobalCartContext } from "@/lib/cart";
import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";

export const AddToBag = ({
  product,
  variant,
}: {
  product: ProductType;
  variant: VariantType;
}) => {
  const { addItem, cartHasProduct, removeItem } = useContext(GlobalCartContext);
  const notifyAdd = () => toast.success("Added to bag");
  const notifyRemove = () => toast.error("Removed from bag");

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
          Remove from bag
        </button>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          transition={Slide}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        transition={Slide}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};
