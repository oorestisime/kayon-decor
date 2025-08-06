"use client";

import { Fragment, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { navigation } from "@/data/navigation";
import Link from "next/link";
import { getProductUrl } from "@/utils";
import Image from "next/image";
import KayonLogo from "@/images/Logo/Brown_Logo.png";
import { CartMenu } from "./CartMenu";
import { usePathname } from "next/navigation";

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const path = usePathname();

  const getNavItemStyle = (active: Boolean, open: Boolean) => {
    const navStyles = [
      "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm transition-colors duration-200 ease-out  hover:text-brown-primary hover:border-brown-primary",
    ];

    if (active) {
      navStyles.push("outline-none text-brown-primary border-transparent");
    } else if (open) {
      navStyles.push(
        "border-brown-primary text-brown-primary outline-none font-medium"
      );
    } else if (!active && !open) {
      navStyles.push("font-medium text-gray-700 border-transparent");
    }

    return classNames(...navStyles);
  };
  return (
    <>
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setMobileMenuOpen}
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
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.categories.map((category) => (
                    <Link
                      key={category.id}
                      onClick={() => setMobileMenuOpen(false)}
                      href={`/categories/${category.slug}`}
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      {category.name}
                    </Link>
                  ))}
                  {navigation.pages.map((page) => (
                    <Link
                      key={page.name}
                      onClick={() => setMobileMenuOpen(false)}
                      href={page.slug}
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      {page.name}
                    </Link>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      {/* Navigation */}

      <header className="sticky h-16 top-0 bg-white z-10">
        <nav aria-label="Top">
          <div className="bg-white bg-opacity-10 backdrop-blur-md backdrop-filter">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div>
                <div className="flex h-16 items-center justify-between">
                  {/* Logo (lg+) */}
                  <div className="hidden lg:flex lg:items-center">
                    <Link href="/" className="flex items-center gap-6">
                      <Image className="h-12 w-auto" src={KayonLogo} alt="" />
                      <span className="font-light text-xs text-brown-primary">
                        From artisans hands to your home
                      </span>
                    </Link>
                  </div>

                  <div className="hidden h-full lg:flex">
                    {/* Flyout menus */}
                    <Popover.Group className="inset-x-0 bottom-0 px-4">
                      <div className="flex h-full justify-center space-x-8">
                        {navigation.categories.map((category) => (
                          <Popover key={category.name} className="flex">
                            {({ open }) => (
                              <>
                                <div className="relative flex">
                                  <Popover.Button
                                    className={getNavItemStyle(
                                      path === `/categories/${category.slug}`,
                                      open
                                    )}
                                  >
                                    {category.name}
                                  </Popover.Button>
                                </div>

                                <Transition
                                  as={Fragment}
                                  enter="transition ease-out duration-200"
                                  enterFrom="opacity-0"
                                  enterTo="opacity-100"
                                  leave="transition ease-in duration-150"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                                    {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                    <div
                                      className="absolute inset-0 top-1/2 bg-white shadow"
                                      aria-hidden="true"
                                    />

                                    <div className="relative bg-white">
                                      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                        <Popover.Button
                                          as={Link}
                                          href={`/categories/${category.slug}`}
                                          className="hidden text-sm font-semibold pt-4 text-brown-primary hover:text-brown-dark sm:block"
                                        >
                                          Browse all the {category.name}
                                          <span aria-hidden="true">
                                            {" "}
                                            &rarr;
                                          </span>
                                        </Popover.Button>
                                        <div className="grid grid-cols-4 gap-x-8 gap-y-10 pt-8 pb-12">
                                          {category.featured.map((item) => (
                                            <div
                                              key={item.name}
                                              className="group relative"
                                            >
                                              <div className="relative aspect-square overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75">
                                                <Image
                                                  placeholder="blur"
                                                  quality={50}
                                                  src={item.images[0]}
                                                  className="h-full w-full object-cover object-center"
                                                  alt={item.name}
                                                  fill
                                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                                />
                                              </div>
                                              <Popover.Button
                                                as={Link}
                                                href={getProductUrl(
                                                  item,
                                                  category
                                                )}
                                                className="mt-4 block font-medium text-gray-900"
                                              >
                                                <span
                                                  className="absolute inset-0 z-10"
                                                  aria-hidden="true"
                                                />
                                                {item.name}
                                              </Popover.Button>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </Popover.Panel>
                                </Transition>
                              </>
                            )}
                          </Popover>
                        ))}

                        {navigation.pages.map((page) => (
                          <Link
                            key={page.name}
                            href={page.slug}
                            className={classNames(
                              path === `${page.slug}`
                                ? "text-brown-primary outline-none border-none"
                                : "font-medium  text-gray-700  border-transparent",
                              "flex items-center text-sm hover:text-brown-primary hover:border-brown-primary border-b-2 transition-colors duration-200 ease-out"
                            )}
                          >
                            {page.name}
                          </Link>
                        ))}
                        {/* Cart */}
                        <CartMenu />
                      </div>
                    </Popover.Group>
                  </div>
                  <div className="flex w-full items-center justify-between lg:hidden">
                    <button
                      type="button"
                      className="-ml-2 p-2 text-gray-400"
                      onClick={() => setMobileMenuOpen(true)}
                    >
                      <span className="sr-only">Open menu</span>
                      <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    <Link href="/">
                      <Image className="h-12 w-auto" src={KayonLogo} alt="" />
                    </Link>
                    <CartMenu
                      justify={false}
                      onClick={() => setMobileMenuOpen(false)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};
