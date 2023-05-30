import { Favorite } from "@/components/Favorite";
import { Hero } from "@/components/Hero";
import { Seo } from "@/components/Seo";
import { Story } from "@/components/Story";
import { NextSeo } from "next-seo";

export default function Example() {
  return (
    <>
      <Seo
        title={`Kayon Decor`}
        description="Welcome to our homepage, the gateway to an exclusive collection of handcrafted teak wood items from Indonesia. Each piece reflects the rich heritage, skill, and craftsmanship of local artisans. Explore our range to find unique, quality teak products that add a touch of warmth and authenticity to your space."
        url={`https://kayon-decor.com/`}
      />
      <main>
        <Hero />
        <Favorite />
        <Story />
      </main>
    </>
  );
}
