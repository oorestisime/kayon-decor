import { Fragment, useState } from "react";
import { Favorite } from "@/components/Favorite";
import { Story } from "@/components/Story";
import {
  categories,
  CategoryType,
  products as allProducts,
  ProductType,
} from "@/data/store";
import { getProductUrl } from "@/utils";
import Link from "next/link";
import Image from "next/image";
import { NextSeo } from "next-seo";
import { ChevronDownIcon, PlusIcon } from "@heroicons/react/24/outline";
import {
  Dialog,
  Disclosure,
  Popover,
  Tab,
  Transition,
} from "@headlessui/react";
import Product from "./[product]";

function Category({
  category,
  products,
  subCategories,
}: {
  category: CategoryType;
  products: ProductType[];
  subCategories: string[];
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [checkedSubCategories, setCheckedSubCategories] = useState(
    subCategories.reduce((acc, cur) => {
      //@ts-ignore
      acc[cur] = false;
      return acc;
    }, {})
  );

  const handleOnChange = (category: string) => {
    setCheckedSubCategories({
      ...checkedSubCategories,
      //@ts-ignore
      [category]: !checkedSubCategories[category],
    });
  };

  const filteredProducts = products.filter(
    //@ts-ignore
    (product) => checkedSubCategories[product.sub_category] === true
  );
  const renderedProducts =
    filteredProducts.length > 0 ? filteredProducts : products;
  return (
    <>
      <main className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
        <NextSeo
          title={`${category.name} | Kayon Decor`}
          description={category.description}
        />

        <div className="pb-24 pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
          <aside>
            <h2 className="sr-only">Filters</h2>

            <button
              type="button"
              className="inline-flex items-center lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span className="text-sm font-medium text-gray-700">Filters</span>
              <PlusIcon
                className="ml-1 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
            </button>

            <div className="hidden lg:block">
              <form className="space-y-10 divide-y divide-gray-200">
                <div key={category.name} className={"pt-10"}>
                  <fieldset>
                    <legend className="block text-lg font-bold text-gray-900">
                      Categories
                    </legend>
                    <div className="space-y-3 pt-6">
                      {subCategories.map((subCategory, index) => (
                        <div key={subCategory} className="flex items-center">
                          <input
                            id={subCategory}
                            name={`${subCategory}`}
                            type="checkbox"
                            //@ts-ignore
                            checked={checkedSubCategories[subCategory]}
                            onChange={() => handleOnChange(subCategory)}
                            className="h-4 w-4 rounded border-gray-300 text-brown-primary focus:ring-brown-primary"
                          />
                          <label
                            htmlFor={`${subCategory}`}
                            className="ml-3 text-sm text-gray-600"
                          >
                            {subCategory}
                          </label>
                        </div>
                      ))}
                    </div>
                  </fieldset>
                </div>
              </form>
            </div>
          </aside>

          <section
            aria-labelledby="product-heading"
            className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3"
          >
            <h2 id="product-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
              {renderedProducts.map((product) => (
                <div
                  key={product.slug}
                  className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
                >
                  <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
                    <Image
                      src={product.images[0]}
                      alt="alt image"
                      className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                    />
                  </div>
                  <div className="flex flex-1 flex-col space-y-2 p-4">
                    <h3 className="text-sm font-medium text-gray-900">
                      <a href={getProductUrl(product, category)}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                    {/* <p className="text-sm text-gray-500">
                      {product.description}
                    </p> */}
                    <div className="flex flex-1 flex-col justify-end">
                      {/* <p className="text-sm italic text-gray-500">
                        {product.options}
                      </p> */}
                      {/* <p className="text-base font-medium text-gray-900">
                        {product.varian}
                      </p> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Story />
      <Favorite />
    </>
  );
}

export default Category;

export async function getStaticPaths() {
  return {
    paths: categories.map((category) => ({
      params: { category: category.slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: {
  params: { category: string };
}) {
  const category = categories.find(
    (category) => category.slug === params.category
  );
  if (!category) {
    return {
      notFound: true,
    };
  }

  const products = allProducts.filter(
    (product) => product.category === category.id
  );
  const subCategories = [
    ...new Set(products.map((product) => product.sub_category)),
  ];

  console.log(subCategories);

  return {
    props: {
      key: category.slug,
      category,
      products,
      subCategories,
    },
  };
}
