import { Fragment, useState } from "react";
import {
  Dialog,
  Disclosure,
  Popover,
  Tab,
  Transition,
} from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon, PlusIcon } from "@heroicons/react/20/solid";
import { Products } from "@/components/Products";
import { products as allProducts, categories } from "@/data/store";
import { SubCategoryType } from "./categories/[category]";

export default function Example() {
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }
  const subCategories = [
    ...new Set(allProducts.map((product) => product.sub_category)),
  ];
  const subCategoriesMap: SubCategoryType = subCategories.reduce((acc, cur) => {
    acc[cur] = false;
    return acc;
  }, Object.assign({}));
  const [checkedSubCategories, setCheckedSubCategories] =
    useState<SubCategoryType>(subCategoriesMap);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const handleOnChange = (category: string) => {
    setCheckedSubCategories({
      ...checkedSubCategories,
      [category]: !checkedSubCategories[category],
    });
  };
  const filteredProducts = allProducts.filter(
    (product) => checkedSubCategories[product.sub_category] === true
  );
  const renderedProducts =
    filteredProducts.length > 0 ? filteredProducts : allProducts;
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
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
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
                  {categories.map((category) => (
                    <Disclosure
                      as="div"
                      key={category.name}
                      className="border-t border-gray-200 pb-4 pt-4"
                    >
                      {({ open }) => (
                        <fieldset>
                          <legend className="w-full px-2">
                            <Disclosure.Button className="flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500">
                              <span className="text-sm font-medium text-gray-900">
                                {category.name}
                              </span>
                              <span className="ml-6 flex h-7 items-center">
                                <ChevronDownIcon
                                  className={classNames(
                                    open ? "-rotate-180" : "rotate-0",
                                    "h-5 w-5 transform"
                                  )}
                                  aria-hidden="true"
                                />
                              </span>
                            </Disclosure.Button>
                          </legend>
                          <Disclosure.Panel className="px-4 pb-2 pt-4">
                            <div className="space-y-6">
                              {category.subCategory.map((subCategory) => (
                                <div
                                  key={subCategory}
                                  className="flex items-center"
                                >
                                  <input
                                    id={subCategory}
                                    name={subCategory}
                                    checked={checkedSubCategories[subCategory]}
                                    onChange={() => handleOnChange(subCategory)}
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-brown-primary focus:ring-brown-primary"
                                  />
                                  <label
                                    htmlFor={subCategory}
                                    className="ml-3 text-sm text-gray-500"
                                  >
                                    {subCategory}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </fieldset>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      <main className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
        <div className="border-b border-gray-200 pb-10 pt-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            All Products
          </h1>
          <p className="mt-4 text-base text-gray-500">
            Checkout out the latest release of Basic Tees, new and improved with
            four openings!
          </p>
        </div>

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
                {categories.map((category) => (
                  <div key={category.name} className="pt-10">
                    <fieldset>
                      <legend className="block text-sm font-medium text-gray-900">
                        {category.name}
                      </legend>
                      <div className="space-y-3 pt-6">
                        {category.subCategory.map((subCategory, optionIdx) => (
                          <div key={subCategory} className="flex items-center">
                            <input
                              id={subCategory}
                              name={subCategory}
                              type="checkbox"
                              checked={checkedSubCategories[subCategory]}
                              onChange={() => handleOnChange(subCategory)}
                              className="h-4 w-4 rounded border-gray-300 text-brown-primary focus:ring-brown-primary"
                            />
                            <label
                              htmlFor={subCategory}
                              className="ml-3 text-sm text-gray-600"
                            >
                              {subCategory}
                            </label>
                          </div>
                        ))}
                      </div>
                    </fieldset>
                  </div>
                ))}
              </form>
            </div>
          </aside>

          <Products products={renderedProducts} />
        </div>
      </main>
    </>
  );
}
