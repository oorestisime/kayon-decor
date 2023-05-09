import { products } from "@/data/store";
import Link from "next/link";
import Image from "next/image";

export const Favorite = () => {
  const favoriteProducts = products.filter((product) => product.favorite);

  return (
    <section aria-labelledby="category-heading" className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="sm:flex sm:items-baseline sm:justify-between">
          <h2
            id="category-heading"
            className="text-2xl font-bold tracking-tight text-gray-900"
          >
            Our Favorite Creations
          </h2>
          <Link
            href="/products"
            className="hidden text-sm font-semibold text-brown hover:text-amber-500 sm:block"
          >
            Browse all
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
          <div className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-1 sm:row-span-2">
            <Image
              src={favoriteProducts[2].images[4]}
              className="object-cover object-center group-hover:opacity-75"
              alt="favorite product image"
            />
            <div
              aria-hidden="true"
              className="bg-gradient-to-b from-transparent to-black opacity-50"
            />
            <div className="flex items-end p-6">
              <div>
                <h3 className="font-semibold text-white">
                  <a href="#">
                    <span className="absolute inset-0" />
                    {favoriteProducts[2].name}
                  </a>
                </h3>
              </div>
            </div>
          </div>
          <div className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full">
            <Image
              src={favoriteProducts[0].images[0]}
              className="object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full"
              alt="favorite product image"
            />
            <div
              aria-hidden="true"
              className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
            />
            <div className="flex items-end p-6 sm:absolute sm:inset-0">
              <div>
                <h3 className="font-semibold text-white">
                  <a href="#">
                    <span className="absolute inset-0" />
                    {favoriteProducts[0].name}
                  </a>
                </h3>
              </div>
            </div>
          </div>
          <div className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full">
            <Image
              src={favoriteProducts[1].images[0]}
              className="object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full"
              alt="favorite product image"
            />
            <div
              aria-hidden="true"
              className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
            />
            <div className="flex items-end p-6 sm:absolute sm:inset-0">
              <div>
                <h3 className="font-semibold text-white">
                  <a href="#">
                    <span className="absolute inset-0" />
                    {favoriteProducts[1].name}
                  </a>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
