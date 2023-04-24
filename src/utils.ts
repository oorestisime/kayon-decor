import { CategoryType, ProductType } from "./data/store";

export const getProductUrl = (product: ProductType, category: CategoryType) => {
  return `/categories/${category.slug}/${product.slug}`;
};
