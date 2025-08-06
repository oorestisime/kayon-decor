import { notFound } from "next/navigation";
import { Metadata } from "next";

import {
  products as allProducts,
  categoryMap,
} from "@/data/store";
import { ProductClient } from "./ProductClient";
import { getProductUrl } from "@/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; product: string }>;
}): Promise<Metadata> {
  const { category: categorySlug, product: productSlug } = await params;
  
  const category = categoryMap[categorySlug];
  const product = category
    ? allProducts.find(
        (p) => p.category === category.id && p.slug === productSlug
      )
    : null;

  if (!product || !category) {
    return {
      title: "Product Not Found | Kayon Decor",
    };
  }

  return {
    title: `${product.name} | Kayon Decor`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Kayon Decor`,
      description: product.description,
      url: `https://kayon-decor.com${getProductUrl(product, category)}`,
      images: product.images?.map((img: any) => ({
        url: img.src || img,
      })),
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ category: string; product: string }>;
}) {
  const { category: categorySlug, product: productSlug } = await params;
  
  const category = categoryMap[categorySlug];
  if (!category) {
    notFound();
  }

  const product = allProducts.find(
    (p) =>
      p.category === category.id &&
      p.slug === productSlug
  );

  if (!product) {
    notFound();
  }

  return <ProductClient category={category} product={product} />;
}