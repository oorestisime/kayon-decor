import { Fragment, useState } from "react";
import { RadioGroup, Tab } from "@headlessui/react";

import {
  CategoryType,
  ProductType,
  products as allProducts,
  categories,
} from "@/data/store";
import { Favorite } from "@/components/Favorite";
import { Story } from "@/components/Story";
import Image from "next/image";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function Product({
  category,
  product,
}: {
  category: CategoryType;
  product: ProductType;
}) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  return (
    <>
      <main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8 pb-6">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          {/* Product */}
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Image gallery */}
            <Tab.Group as="div" className="flex flex-col-reverse">
              {/* Image selector */}
              <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                <Tab.List className="grid grid-cols-4 gap-6">
                  {product.images.map((image, index) => (
                    <Tab
                      key={index}
                      className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                    >
                      {({ selected }) => (
                        <>
                          <span className="absolute inset-0 overflow-hidden rounded-md">
                            <Image
                              src={image}
                              className="h-full w-full object-cover object-center"
                              alt="product image"
                            />
                          </span>
                          <span
                            className={classNames(
                              selected ? "ring-amber-500" : "ring-transparent",
                              "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </Tab>
                  ))}
                </Tab.List>
              </div>

              <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
                {product.images.map((image, index) => (
                  <Tab.Panel key={index}>
                    <Image
                      src={image}
                      className="h-full w-full object-cover object-center"
                      alt="product image"
                    />
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>

            {/* Product info */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {product.name}
              </h1>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900">
                  {selectedVariant.price}€
                </p>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6 text-base text-gray-700">
                  {product.description}
                </div>
              </div>

              <form className="mt-6">
                {/* Sizes */}
                {product.variants.length > 1 && (
                  <div className="mt-10">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900">
                        Size - {selectedVariant.specification}
                      </h3>
                    </div>
                    <RadioGroup
                      value={selectedVariant}
                      onChange={setSelectedVariant}
                      className="mt-4"
                    >
                      <RadioGroup.Label className="sr-only">
                        Choose a size
                      </RadioGroup.Label>
                      <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                        {product.variants.map((variant) => (
                          <RadioGroup.Option
                            key={variant.size}
                            value={variant}
                            className={({ active }) =>
                              classNames(
                                "cursor-pointer bg-white text-gray-900 shadow-sm",
                                active ? "ring-2 ring-amber-500" : "",
                                "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                              )
                            }
                          >
                            {({ active, checked }) => (
                              <>
                                <RadioGroup.Label as="span">
                                  {variant.size}
                                </RadioGroup.Label>

                                <span
                                  className={classNames(
                                    active ? "border" : "border-2",
                                    checked
                                      ? "border-amber-500"
                                      : "border-transparent",
                                    "pointer-events-none absolute -inset-px rounded-md"
                                  )}
                                  aria-hidden="true"
                                />
                              </>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                )}

                <div className="mt-10 flex">
                  <button
                    type="submit"
                    className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-amber-600 px-8 py-3 text-base font-medium text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                  >
                    Add to bag
                  </button>
                </div>
              </form>

              <section aria-labelledby="details-heading" className="mt-12">
                <h2 id="details-heading" className="sr-only">
                  Additional details
                </h2>

                {/* <div className="divide-y divide-gray-200 border-t">
                {product.details.map((detail) => (
                  <Disclosure as="div" key={detail.name}>
                    {({ open }) => (
                      <>
                        <h3>
                          <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                            <span
                              className={classNames(
                                open ? "text-amber-600" : "text-gray-900",
                                "text-sm font-medium"
                              )}
                            >
                              {detail.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="block h-6 w-6 text-amber-400 group-hover:text-amber-500"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel
                          as="div"
                          className="prose prose-sm pb-6"
                        >
                          <ul role="list">
                            {detail.items.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </div> */}
              </section>
            </div>
          </div>
        </div>
      </main>
      <Favorite />
    </>
  );
}

export default Product;

export async function getStaticPaths() {
  const categorySlugs: Record<string, string> = categories.reduce(
    (acc, category) => {
      // @ts-ignore
      acc[category.id] = category.slug;
      return acc;
    },
    {}
  );
  return {
    paths: allProducts.map((product) => ({
      params: {
        category: categorySlugs[product.category],
        product: product.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: {
  params: { category: string; product: string };
}) {
  const product = allProducts.find(
    (product) => product.slug === params.product
  );
  if (!product) {
    return {
      notFound: true,
    };
  }
  const category = categories.find(
    (category) => category.slug === params.category
  );

  return {
    props: {
      category,
      product,
    },
  };
}
