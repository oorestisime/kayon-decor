import { Favorite } from "@/components/Favorite";
import { Hero } from "@/components/Hero";
import { Story } from "@/components/Story";
import { NextSeo } from "next-seo";

export default function Example() {
  return (
    <>
      <NextSeo
        title="Kayon Decor"
        description="Kayon Décor was founded by two passionate nomad friends, our company is dedicated to bringing you the finest handcrafted teak wood items from the heart of Indonesia. Journey with us as we unveil a world of unique, eco-friendly, and exquisite products that will enrich your home and embrace the beauty of Indonesian culture."
      />
      <main>
        <Hero />
        <Favorite />
        <Story />
      </main>
    </>
  );
}
