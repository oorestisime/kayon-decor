import { Favorite } from "@/components/Favorite";
import { Hero } from "@/components/Hero";
import { Story } from "@/components/Story";
import { NextSeo } from "next-seo";

export default function Example() {
  return (
    <>
      <NextSeo title="Kayon Decor" description="TODO add description here" />
      <main>
        <Hero />
        <Favorite />
        <Story />
      </main>
    </>
  );
}
