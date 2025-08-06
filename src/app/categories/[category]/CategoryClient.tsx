"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import { ChevronDownIcon, PlusIcon } from "@heroicons/react/24/outline";
import {
  Dialog,
  Disclosure,
  Popover,
  Tab,
  Transition,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import { CategoryType, ProductType } from "@/data/store";
import { Products } from "@/components/Products";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Story } from "@/components/Story";

export type SubCategoryType = {
  [key: string]: boolean;
};

export function CategoryClient({
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
        <Breadcrumb category={category} />
        
        <div className="pt-12 pb-24 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
          <aside>
            <h2 className="sr-only">Filters</h2>

            <button
              type="button"
              className="inline-flex items-center lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span className="text-sm font-medium text-gray-700">
                Filters
              </span>
              <PlusIcon
                className="ml-1 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
            </button>

            <div className="hidden lg:block">
              <form className="space-y-10 divide-y divide-gray-200">
                <fieldset>
                  <legend className="block text-sm font-medium text-gray-900">
                    Category
                  </legend>
                  <div className="space-y-3 pt-6">
                    {subCategories.map((subCategory, index) => (
                      <div key={subCategory} className="flex items-center">
                        <input
                          id={`${subCategory}-${index}`}
                          name={`${subCategory}`}
                          checked={checkedSubCategories[subCategory]}
                          onChange={() => handleOnChange(subCategory)}
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-brown-primary focus:ring-brown-primary"
                        />
                        <label
                          htmlFor={`${subCategory}-${index}`}
                          className="ml-3 text-sm text-gray-600"
                        >
                          {subCategory}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
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

            <Products products={renderedProducts} />
          </section>
        </div>

        <div className="my-8">
          <Story />
        </div>
      </main>
    </>
  );
}