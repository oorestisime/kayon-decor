import { categories } from "./store";

export const navigation = {
  categories: categories.filter((category) => category.featured?.length > 0),
  pages: [
    { name: "FAQ", href: "#" },
    { name: "Get In Touch", href: "#" },
  ],
};

export const offers = [
  {
    name: "Custom Made",
    description: "All our products are made to order",
  },
  {
    name: "Balinese Craftsmanship",
    description: "Made with love by local artisans in Bali",
  },
  {
    name: "Premium Quality",
    description: "From wood to ropes the quality is top notch",
  },
];
