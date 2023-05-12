import { Favorite } from "@/components/Favorite";
import { Story } from "@/components/Story";
import { ProductType, VariantType, productMap } from "@/data/store";
import { useCart } from "@/lib/cart";
import { getProductUrl } from "@/utils";
import { NextSeo } from "next-seo";
import Image from "next/image";
import Link from "next/link";

import {
  CheckIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  XMarkIcon as XMarkIconMini,
} from "@heroicons/react/20/solid";

const Product = ({
  product,
  variant,
  removeItem,
  changeQuantity,
}: {
  product: ProductType;
  variant: VariantType;
  removeItem: any;
  changeQuantity: any;
}) => {
  return (
    <li className="flex py-6 sm:py-10">
      <div className="flex-shrink-0">
        <Image
          src={product.images[0]}
          alt={`${product.name} image`}
          className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div>
            <div className="flex justify-between">
              <h3 className="text-sm">
                <Link
                  href={"#"}
                  className="font-medium text-gray-700 hover:text-gray-800"
                >
                  {product.name}
                </Link>
              </h3>
            </div>
            <div className="mt-1 flex text-sm">
              <p className="text-gray-500">{variant.size}</p>
            </div>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {variant.price}€
            </p>
          </div>

          <div className="mt-4 sm:mt-0 sm:pr-9">
            <label
              htmlFor={`quantity-${product.name}-${variant.size}`}
              className="sr-only"
            >
              Quantity, {product.name}
            </label>
            <select
              id={`quantity-${product.name}-${variant.size}`}
              name={`quantity-${product.name}-${variant.size}`}
              className="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
            </select>

            <div className="absolute right-0 top-0">
              <button
                type="button"
                className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Remove</span>
                <XMarkIconMini className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

function Cart() {
  const { addItem, cartHasProduct, removeItem, cart, changeQuantity } =
    useCart();

  const total =
    cart?.items.reduce((acc, item) => {
      const variant = item.variant;
      return acc + parseInt(variant.price) * item.quantity;
    }, 0) || 0;

  return (
    <>
      <NextSeo
        title={`Get a Quote | Kayon Decor`}
        description={"Get a quote for your selected items"}
      />

      <main className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>

        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul
              role="list"
              className="divide-y divide-gray-200 border-b border-t border-gray-200"
            >
              {cart?.items.map((item) => (
                <Product
                  key={`${item.product}-${item.variant.size}`}
                  variant={item.variant}
                  product={productMap[item.product]}
                  removeItem={removeItem}
                  changeQuantity={changeQuantity}
                />
              ))}
            </ul>
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2
              id="summary-heading"
              className="text-lg font-medium text-gray-900"
            >
              Order summary
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {total * 0.8}€
                </dd>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex text-sm text-gray-600">
                  <span>Tax estimate</span>
                </dt>
                {/* 20 % tax */}
                <dd className="text-sm font-medium text-gray-900">
                  {total * 0.2}€
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">
                  Order total
                </dt>
                <dd className="text-base font-medium text-gray-900">
                  {total}€
                </dd>
              </div>
            </dl>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Get a Quote!
              </button>
            </div>
          </section>
        </form>
      </main>
      <Story />
      <Favorite />
    </>
  );
}

export default Cart;
