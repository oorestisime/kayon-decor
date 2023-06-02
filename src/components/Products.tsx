import { ProductType, CategoryType } from "@/data/store";
import { categoryMap } from "@/data/store";
import Image from "next/image";
import Link from "next/link";
import { getProductUrl } from "@/utils";
export const Products = ({ products }: { products: ProductType[] }) => {
  const renderPrice = (product: ProductType) => {
    if (product.variants.length === 1) {
      return product.variants[0].price;
    }
    return `${product.variants[0].price} - ${
      product.variants[product.variants.length - 1].price
    }`;
  };

  return (
    <section
      aria-labelledby="product-heading"
      className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3"
    >
      <h2 id="product-heading" className="sr-only">
        Products
      </h2>
      <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-5 lg:gap-x-5 xl:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.slug}
            className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
          >
            <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
              <Image
                src={product.images[0]}
                alt="alt image"
                className=" h-full w-full object-cover object-center sm:h-full sm:w-full group-hover:object-contain"
              />
            </div>
            <div className="flex flex-1 flex-col space-y-2 p-4">
              <h3 className="text-sm font-medium text-gray-900">
                <Link
                  href={getProductUrl(product, categoryMap[product.category])}
                >
                  <span aria-hidden="true" className="absolute inset-0" />
                  {product.name}
                </Link>
              </h3>
              <p className="text-sm text-gray-500 line-clamp-4 ">
                {product.description}
              </p>
              <div className="flex flex-1 flex-col justify-end">
                {product.variants.length > 1 ? (
                  <p className="text-sm italic text-gray-500">
                    {product.variants.length} variants available
                  </p>
                ) : null}
                <p className="text-base font-medium text-gray-900">
                  {renderPrice(product)}€
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
