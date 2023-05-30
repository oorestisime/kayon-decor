import { Story } from "@/components/Story";
import {
  ProductType,
  VariantType,
  categoryMap,
  productMap,
} from "@/data/store";
import { GlobalCartContext } from "@/lib/cart";
import { getProductUrl } from "@/utils";
import { NextSeo } from "next-seo";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState, FormEvent } from "react";
import { XMarkIcon as XMarkIconMini } from "@heroicons/react/20/solid";

const Product = ({
  product,
  variant,
  quantity,
  removeItem,
  changeQuantity,
}: {
  product: ProductType;
  variant: VariantType;
  quantity: number;
  removeItem: any;
  changeQuantity: any;
}) => {
  return (
    <li className="flex py-6 sm:py-10">
      <div className="flex-shrink-0">
        <Link href={getProductUrl(product, categoryMap[product.category])}>
          <Image
            src={product.images[0]}
            alt={`${product.name} image`}
            className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
          />
        </Link>
      </div>

      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div>
            <div className="flex justify-between">
              <h3 className="text-sm">
                <Link
                  href={getProductUrl(product, categoryMap[product.category])}
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
              className="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:brown-primary focus:outline-none focus:ring-1 focus:ring-brown-500 sm:text-sm"
              value={quantity}
              onChange={(e) =>
                changeQuantity(product.slug, variant, e.target.value)
              }
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
                onClick={() => removeItem(product.slug, variant)}
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
  const { removeItem, cart, changeQuantity, editEmail, editName, reset } =
    useContext(GlobalCartContext);
  const [isClient, setIsClient] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(cart, null, 2);
    const endpoint = "/api/get-quote";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };
    const response = await fetch(endpoint, options);
    const result = await response.json();
    if (result.message !== "Email sent successfully") {
      alert("Something went wrong, please try again");
    }
    setSubmitted(true);
    reset();
  };

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
        <h1 className="text-3xl pb-4 font-bold tracking-tight text-gray-900 sm:text-4xl">
          {submitted ? "Thank you!" : "Shopping Cart"}
        </h1>

        {isClient && submitted ? (
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6 lg:p-8">
            <h4 className="sr-only">Thank you!</h4>
            <p className="text-sm font-medium text-gray-900">
              We will get back to you as soon as possible quote to discuss your
              order
            </p>
            <div className="mt-6" aria-hidden="true">
              <div className="overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-brown-primary"
                  style={{
                    width: `calc((0 * 2 + 1) / 8 * 100%)`,
                  }}
                />
              </div>
              <div className="mt-6 hidden grid-cols-4 text-sm font-medium text-gray-600 sm:grid">
                <div className="text-brown-primary">Interest received!</div>
                <div className="text-center">Processing</div>
                <div className="text-center">Shipped</div>
                <div className="text-right">Delivered</div>
              </div>
            </div>
          </div>
        ) : null}
        {isClient && !submitted && (cart?.items?.length || 0) > 0 ? (
          <form
            onSubmit={handleSubmit}
            className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16"
          >
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
                    quantity={item.quantity}
                    removeItem={removeItem}
                    changeQuantity={changeQuantity}
                  />
                ))}
              </ul>
            </section>

            {/* Order summary */}
            <section
              aria-labelledby="summary-heading"
              className="mt-16 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
            >
              <div className="bg-gray-50 rounded-lg mb-6 px-4 py-6">
                <h2
                  id="summary-heading"
                  className="text-lg font-medium text-gray-900"
                >
                  Personal Details{" "}
                </h2>

                <dl className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-600">Name</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      <input
                        required
                        value={cart?.name}
                        id="name"
                        name="name"
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brown-primary sm:text-sm sm:leading-6"
                        onChange={(e) => editName(e.target.value)}
                      />
                    </dd>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="flex text-sm text-gray-600">
                      <span>Email</span>
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">
                      <input
                        required
                        value={cart?.email}
                        id="email"
                        name="email"
                        type="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brown-primary sm:text-sm sm:leading-6"
                        onChange={(e) => editEmail(e.target.value)}
                      />
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="bg-gray-50 rounded-lg px-4 py-6">
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
                      {(total * 0.8).toFixed(2)}€
                    </dd>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="flex text-sm text-gray-600">
                      <span>Tax estimate</span>
                    </dt>
                    {/* 20 % tax */}
                    <dd className="text-sm font-medium text-gray-900">
                      {(total * 0.2).toFixed(2)}€
                    </dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="text-base font-medium text-gray-900">
                      Order total
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      {total.toFixed(2)}€
                    </dd>
                  </div>
                </dl>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full rounded-md border border-transparent bg-brown-primary px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-brown-dark focus:outline-none focus:ring-2 focus:ring-brown-primary focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                  >
                    Get a Personalized Quote!
                  </button>
                </div>
              </div>
            </section>
          </form>
        ) : null}
      </main>
      <Story />
    </>
  );
}

export default Cart;
