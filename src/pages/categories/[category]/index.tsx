import { Fragment, useState } from "react";
import { Favorite } from "@/components/Favorite";
import { Story } from "@/components/Story";
import {
  categories,
  CategoryType,
  products as allProducts,
  ProductType,
} from "@/data/store";
import { Products } from "@/components/Products";
import { getProductUrl } from "@/utils";

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
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Seo } from "@/components/Seo";

export type SubCategoryType = {
  [key: string]: boolean;
};

function Category({
  category,
  products,
  subCategories,
}: {
  category: CategoryType;
  products: ProductType[];
  subCategories: string[];
}) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const subCategoriesMap: SubCategoryType = subCategories.reduce((acc, cur) => {
    acc[cur] = false;
    return acc;
  }, Object.assign({}));
  const [checkedSubCategories, setCheckedSubCategories] =
    useState<SubCategoryType>(subCategoriesMap);

  const handleOnChange = (category: string) => {
    setCheckedSubCategories({
      ...checkedSubCategories,
      [category]: !checkedSubCategories[category],
    });
  };

  const filteredProducts = products.filter(
    (product) => checkedSubCategories[product.sub_category] === true
  );
  const renderedProducts =
    filteredProducts.length > 0 ? filteredProducts : products;

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <Seo
        title={`${category.name} | Kayon Decor`}
        description={category.description}
        url={`https://kayon-decor.com/categories/${category.slug}`}
      />
      {/* Mobile filter dialog */}
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setMobileFiltersOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">
                    Categories
                  </h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4">
                  <fieldset>
                    <div className="px-4 pb-2 pt-4">
                      <div className="space-y-6">
                        {subCategories.map((subCategory, index) => (
                          <div key={subCategory} className="flex items-center">
                            <input
                              id={subCategory}
                              name={`${subCategory}`}
                              //@ts-ignore
                              checked={checkedSubCategories[subCategory]}
                              onChange={() => handleOnChange(subCategory)}
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-brown-primary focus:ring-brown-primary"
                            />
                            <label
                              htmlFor={`${subCategory}`}
                              className="ml-3 text-sm text-gray-500"
                            >
                              {subCategory}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </fieldset>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      <main className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
        <div className="mt-6">
          <Breadcrumb category={category} />
        </div>
        <div className="pb-24 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
          <aside>
            <h2 className="sr-only">Categories</h2>
            <button
              type="button"
              className="inline-flex items-center lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span className="text-sm font-medium text-gray-700">
                Categories
              </span>
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

          <Products products={renderedProducts} />
        </div>
      </main>
      <Story />
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

  return {
    props: {
      key: category.slug,
      category,
      products,
      subCategories,
    },
  };
}
