import { notFound } from "next/navigation";
import { Metadata } from "next";
import { categoryMap, products as allProducts } from "@/data/store";
import { CategoryClient } from "./CategoryClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = categoryMap[categorySlug];

  if (!category) {
    return {
      title: "Category Not Found | Kayon Decor",
    };
  }

  return {
    title: `${category.name} | Kayon Decor`,
    description: category.description,
    openGraph: {
      title: `${category.name} | Kayon Decor`,
      description: category.description,
      url: `https://kayon-decor.com/categories/${category.slug}`,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  
  const category = categoryMap[categorySlug];
  if (!category) {
    notFound();
  }

  const products = allProducts.filter((p) => p.category === category.id);
  const subCategories = [...new Set(products.map((p) => p.sub_category))];

  return (
    <CategoryClient
      category={category}
      products={products}
      subCategories={subCategories}
    />
  );
}