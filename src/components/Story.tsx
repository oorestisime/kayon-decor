import Image from "next/image";
import firstPagePhoto from "@/images/1stpage-photo.jpg";
import firstPagePhoto2 from "@/images/1stpage-photo2.jpg";
import Link from "next/link";
export const Story = () => {
  return (
    <section aria-labelledby="cause-heading">
      <div 
        className="relative bg-gray-800 px-6 py-32 sm:px-12 sm:py-40 lg:px-16"
        style={{
          backgroundImage: `url(${firstPagePhoto2.src})`,
          backgroundSize: 'cover',
          backgroundPosition: '100% 85%',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 z-10"
          style={{ backgroundColor: 'rgba(17, 24, 39, 0.5)' }}
        />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center z-20">
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
