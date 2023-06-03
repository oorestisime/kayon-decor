import { useState } from "react";
import { RadioGroup, Tab } from "@headlessui/react";

import {
  CategoryType,
  ProductType,
  products as allProducts,
  categoryMap,
} from "@/data/store";
import { Favorite } from "@/components/Favorite";
import Image from "next/image";
import { NextSeo } from "next-seo";
import { AddToBag } from "@/components/AddToBag";
import { Breadcrumb } from "@/components/Breadcrumb";
import { getProductUrl } from "@/utils";
import { Seo } from "@/components/Seo";
import { Story } from "@/components/Story";
import Link from "next/link";

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
      <Seo
        title={`${product.name} | Kayon Decor`}
        description={product.description}
        url={`https://kayon-decor.com/${getProductUrl(product, category)}`}
        images={product.images}
      />
      <main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8 pb-6">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          {/* Product */}
          <Breadcrumb category={category} product={product} />
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Image gallery */}
            <Tab.Group as="div" className="flex flex-col-reverse">
              {/* Image selector */}
              <div className="mx-auto mt-6 w-full max-w-2xl block lg:max-w-none">
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
                              className="h-full w-full object-contain object-center"
                              alt="product image"
                              priority
                            />
                          </span>
                          <span
                            className={classNames(
                              selected
                                ? "ring-brown-primary"
                                : "ring-transparent",
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
                      className="h-full w-full object-contain object-center"
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
              <div className="mt-2 space-y-6 text-sm text-gray-700">
                <p>SKU: {product.SKU}</p>
              </div>
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
              {product.sub_category === "Baskets" && (
                <div className="flex items-center justify-between mt-1">
                  <Link
                    href="/contact"
                    className="text-sm font-medium text-brown-primary hover:underline hover:text-brown-dark"
                  >
                    <strong>
                      Contact us for further information about different colors
                      and availability
                    </strong>
                  </Link>
                </div>
              )}
              {product.slug === "wooden-utensils" && (
                <div className="flex items-center justify-between mt-1">
                  <Link
                    href="/contact"
                    className="text-sm font-medium text-brown-primary hover:underline hover:text-brown-dark"
                  >
                    <strong>
                      Contact us for further information in different variants
                    </strong>
                  </Link>
                </div>
              )}
              {product.slug === "lounge-arm-chair" && (
                <div>
                  <div className="flex items-center justify-between mt-1">
                    <h3 className="text-sm font-medium text-brown-dark">
                      {" "}
                      <em>The bench is sold seperatly</em>
                    </h3>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <Link
                      href="/contact"
                      className="text-sm font-medium text-brown-primary hover:underline hover:text-brown-dark"
                    >
                      <strong>
                        Contact us for a bundle price for both items
                      </strong>
                    </Link>
                  </div>
                </div>
              )}
              {product.slug === "mini-bench" && (
                <div>
                  <div className="flex items-center justify-between mt-1">
                    <h3 className="text-sm font-medium text-brown-dark">
                      {" "}
                      <em>The chair is sold seperatly</em>
                    </h3>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <Link
                      href="/contact"
                      className="text-sm font-medium text-brown-primary hover:underline hover:text-brown-dark"
                    >
                      <strong>
                        Contact us for a bundle price for both items
                      </strong>
                    </Link>
                  </div>
                </div>
              )}
              <div className="mt-6">
                {/* Sizes */}{" "}
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">
                      <strong>Material</strong> : {selectedVariant.material}
                    </h3>
                  </div>
                  {selectedVariant.finishing !== "" && (
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900">
                        <strong>Finishing</strong> : {selectedVariant.finishing}
                      </h3>
                    </div>
                  )}
                  <div className="flex items-center justify-between mt-3">
                    <h3 className="text-sm font-medium text-gray-900">
                      <strong>Dimensions</strong> : {selectedVariant.dimensions}
                    </h3>
                  </div>

                  {product.variants.length > 1 && (
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
                                active ? "ring-2 ring-brown-primary" : "",
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
                                      ? "border-brown-primary"
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
                  )}
                </div>
                <AddToBag product={product} variant={selectedVariant} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Favorite />
      <Story />
    </>
  );
}

export default Product;

export async function getStaticPaths() {
  return {
    paths: allProducts.map((product) => ({
      params: {
        category: categoryMap[product.category].slug,
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
  const category = categoryMap[product.category];

  return {
    props: {
      key: product.slug,
      category,
      product,
    },
  };
}
