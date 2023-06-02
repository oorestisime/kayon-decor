"use client";

import { GlobalCartContext } from "@/lib/cart";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-use";
import { classNames } from "./Navigation";
export const CartMenu = ({
  justify = true,
  onClick,
}: {
  justify?: boolean;
  onClick?: () => void;
}) => {
  const { cart } = useContext(GlobalCartContext);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 1100); // Reset after the same time as transition

    return () => clearTimeout(timer); // Clean up on unmount or if cartItemCount changes
  }, [cart?.items?.length]);

  return (
    <div className={justify ? `flex flex-1 items-center justify-end` : ""}>
      <div
        className={`${
          animate ? "animate-bounce text-gray-900" : ""
        } ml-4 flow-root lg:ml-8`}
      >
        <Link
          href="/cart"
          onClick={onClick}
          className="group -m-2 flex items-center p-2"
        >
          <ShoppingBagIcon
            className={classNames(
              useLocation().pathname === "/cart"
                ? "text-brown-primary font-semibold"
                : "text-gray-400",
              "h-6 w-6 flex-shrink-0  group-hover:text-brown-primary"
            )}
            aria-hidden="true"
          />

          <span
            suppressHydrationWarning
            className={`ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800`}
          >
            {cart?.items?.length || 0}
          </span>
          <span className="sr-only">items in cart, view bag</span>
        </Link>
      </div>
    </div>
  );
};
