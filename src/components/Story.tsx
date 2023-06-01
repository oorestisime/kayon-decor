import Image from "next/image";
import firstPagePhoto from "@/images/1stpage-photo.jpeg";
import firstPagePhoto2 from "@/images/1stpage-photo2.jpeg";
import Link from "next/link";
export const Story = () => {
  return (
    <section aria-labelledby="cause-heading">
      <div className="relative bg-gray-800 px-6 py-32 sm:px-12 sm:py-40 lg:px-16">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={firstPagePhoto2}
            alt="first Page Photo"
            className="h-full w-full object-cover object-story-photo"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gray-900 bg-opacity-50"
        />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2
            id="cause-heading"
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Balinese craftsmanship
          </h2>
          <p className="mt-3 text-xl text-white">
            We work with artisans in Bali to create beautiful, handcrafted
            pieces. Each one is unique and made with love. We hope you will love
            them as much as we do.
          </p>
          <Link
            href="/about-us"
            className="mt-8 block w-full rounded-md border border-transparent bg-white text-[#937a68] px-8 py-3 text-base font-medium  sm:w-auto hover:bg-brown-primary hover:text-white"
          >
            Read our story
          </Link>
        </div>
      </div>
    </section>
  );
};
