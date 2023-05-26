import { HomeIcon } from "@heroicons/react/20/solid";
import { CategoryType, ProductType } from "@/data/store";
import { getProductUrl } from "@/utils";

export const Breadcrumb = ({
  category,
  product,
}: {
  category: CategoryType;
  product?: ProductType;
}) => {
  return (
    <nav className="flex lg:hidden px-4 pb-4" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center">
        <li>
          <div>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </a>
          </div>
        </li>
        <li key={category.name}>
          <div className="flex items-center">
            <svg
              className="h-3 w-3 flex-shrink-0 text-gray-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
            </svg>
            <a
              href={`/categories/${category.slug}`}
              className="text-xs font-medium text-gray-500 hover:text-gray-700"
            >
              {category.name}
            </a>
          </div>
        </li>
        {product && (
          <li key={product.name}>
            <div className="flex items-center">
              <svg
                className="h-3 w-3 flex-shrink-0 text-gray-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
              <a
                href={getProductUrl(product, category)}
                className="text-xs font-medium text-gray-500 hover:text-gray-700"
              >
                {product.name}
              </a>
            </div>
          </li>
        )}
      </ol>
    </nav>
  );
};
