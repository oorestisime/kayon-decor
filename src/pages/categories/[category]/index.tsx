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

function Category({
  category,
  products,
}: {
  category: CategoryType;
  products: ProductType[];
}) {
  return (
    <>
      <NextSeo
        title={`${category.name} | Kayon Decor`}
        description={category.description}
      />
      <div className="mx-auto max-w-xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Explore the {category.name} collection
        </h2>
        <p className="mt-4 text-base text-gray-500">{category.description}</p>

        <div className="mt-10 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
          {products.map((product) => (
            <Link
              key={product.name}
              href={getProductUrl(product, category)}
              className="group block"
            >
              <div
                aria-hidden="true"
                className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg lg:aspect-h-6 lg:aspect-w-5 group-hover:opacity-75"
              >
                <Image
                  src={product.images[0]}
                  className="h-full w-full object-cover object-center"
                  alt="product image"
                />
              </div>
              <h3 className="mt-4 text-base font-semibold text-gray-900">
                {product.name}
              </h3>
              <p className="mt-2 text-sm text-gray-500"></p>
            </Link>
          ))}
        </div>
      </div>
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

  return {
    props: {
      key: category.slug,
      category,
      products,
    },
  };
}
