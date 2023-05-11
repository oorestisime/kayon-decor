import Image from "next/image";
import firstPageImage from "@/images/1stpage-photo.jpeg";
import firstPageImage2 from "@/images/1stpage-photo2.jpeg";

export const Story = () => {
  return (
    <section aria-labelledby="cause-heading">
      <div className="relative bg-gray-800 px-6 py-32 sm:px-12 sm:py-40 lg:px-16">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={firstPageImage2}
            alt="first Page Image"
            className="h-full w-full object-cover object-costum-position"
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
          <a
            href="#"
            className="mt-8 block w-full rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
          >
            Read our story
          </a>
        </div>
      </div>
    </section>
  );
};
