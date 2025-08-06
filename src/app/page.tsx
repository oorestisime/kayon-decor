import { Favorite } from "@/components/Favorite";
import { Hero } from "@/components/Hero";
import { Story } from "@/components/Story";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kayon Decor",
  description: "Welcome to our homepage, the gateway to an exclusive collection of handcrafted teak wood items from Indonesia. Each piece reflects the rich heritage, skill, and craftsmanship of local artisans. Explore our range to find unique, quality teak products that add a touch of warmth and authenticity to your space.",
  openGraph: {
    title: "Kayon Decor",
    description: "Welcome to our homepage, the gateway to an exclusive collection of handcrafted teak wood items from Indonesia.",
    url: "https://kayon-decor.com/",
  },
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Favorite />
      <Story />
    </main>
  );
}