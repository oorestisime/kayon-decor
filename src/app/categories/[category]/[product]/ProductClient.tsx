"use client";

import { useState } from "react";
import { RadioGroup, Tab } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";

import {
  CategoryType,
  ProductType,
  products as allProducts,
  categoryMap,
} from "@/data/store";
import { Favorite } from "@/components/Favorite";
import { AddToBag } from "@/components/AddToBag";
import { Breadcrumb } from "@/components/Breadcrumb";
import { getProductUrl } from "@/utils";
import { Story } from "@/components/Story";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function ProductClient({
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
          <Breadcrumb category={category} product={product} />
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <Tab.Group as="div" className="flex flex-col-reverse">
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

              <div className="mt-6">
                <h3 className="sr-only">Product variants</h3>
                {product.variants.length > 1 && (
                  <RadioGroup
                    value={selectedVariant}
                    onChange={setSelectedVariant}
                    className="mt-4"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a variant
                    </RadioGroup.Label>
                    <div className="grid grid-cols-2 gap-4">
                      {product.variants.map((variant, index) => (
                        <RadioGroup.Option
                          key={index}
                          value={variant}
                          className={({ checked }) =>
                            classNames(
                              checked
                                ? "ring-2 ring-brown-primary"
                                : "ring-1 ring-gray-300",
                              "relative flex cursor-pointer rounded-lg p-4 focus:outline-none"
                            )
                          }
                        >
                          {({ checked }) => (
                            <>
                              <div className="flex flex-col">
                                <RadioGroup.Label
                                  as="span"
                                  className="block text-sm font-medium text-gray-900"
                                >
                                  {variant.size ||
                                    variant.dimensions ||
                                    `Option ${index + 1}`}
                                </RadioGroup.Label>
                                {variant.price && (
                                  <RadioGroup.Description
                                    as="span"
                                    className="mt-1 flex items-center text-sm text-gray-500"
                                  >
                                    ${variant.price}
                                  </RadioGroup.Description>
                                )}
                              </div>
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                )}
              </div>

              <div className="mt-6">
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">
                      <strong>Material</strong> : {selectedVariant.material}
                    </h3>
                  </div>
                  {selectedVariant.finishing && (
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
                </div>
              </div>

              <div className="mt-8">
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
