import { NextSeo } from "next-seo";
import Image from "next/image";
import Aboutus1 from "@/images/About-us/aboutus1.jpeg";
import Aboutus2 from "@/images/About-us/aboutus2.jpeg";
import Aboutus3 from "@/images/About-us/aboutus3.jpeg";
import Aboutus4 from "@/images/About-us/aboutus4.jpeg";
import Aboutus5 from "@/images/About-us/aboutus5.jpeg";
import AboutusEnd from "@/images/About-us/aboutus-endpage.jpeg";
import { Seo } from "@/components/Seo";
const stats = [
  { label: "distance from local artisans", value: "10.000 Km" },
  { label: "away from your home", value: "60-90 days" },
  // { label: "of-a-kind piece", value: "1" },
  { label: "product variations", value: "∞" },
];
export default function AboutUs() {
  return (
    <>
      <Seo
        title={`About Us | Kayon Decor`}
        description="Kayon Décor was founded by two passionate nomad friends, our company is dedicated to bringing you the finest handcrafted teak wood items from the heart of Indonesia. Journey with us as we unveil a world of unique, eco-friendly, and exquisite products that will enrich your home and embrace the beauty of Indonesian culture."
        url={`https://kayon-decor.com/about-us`}
      />
      <main className="isolate">
        {/* Hero section */}
        <div className="relative isolate -z-10">
          <svg
            className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
                width={200}
                height={200}
                x="50%"
                y={-1}
                patternUnits="userSpaceOnUse"
              >
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
              <path
                d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect
              width="100%"
              height="100%"
              strokeWidth={0}
              fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
            />
          </svg>
          <div
            className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
            aria-hidden="true"
          >
            <div
              className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
              style={{
                clipPath:
                  "polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)",
              }}
            />
          </div>
          <div className="overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
              <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    From artisans hands to your home
                  </h1>
                  <p className="relative mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                    Kayon Décor was founded by two passionate nomad friends, our
                    company is dedicated to bringing you the finest handcrafted
                    teak wood items from the heart of Indonesia. Journey with us
                    as we unveil a world of unique, eco-friendly, and exquisite
                    products that will enrich your home and embrace the beauty
                    of Indonesian culture.
                  </p>
                </div>
                <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                  <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                    <div className="relative">
                      <Image
                        src={Aboutus1}
                        alt=""
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </div>
                  <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                    <div className="relative">
                      <Image
                        src={Aboutus2}
                        alt=""
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                    <div className="relative">
                      <Image
                        src={Aboutus3}
                        alt=""
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </div>
                  <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                    <div className="relative">
                      <Image
                        src={Aboutus4}
                        alt=""
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                    <div className="relative">
                      <Image
                        src={Aboutus5}
                        alt=""
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content section */}
        <div className="mx-auto -mt-12 max-w-7xl px-6 sm:mt-0 lg:px-8 xl:-mt-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our mission
            </h2>
            <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
              <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
                <p className="text-xl leading-8 text-gray-600">
                  Our mission at Kayon Décor is to foster sustainable
                  relationships with local Indonesian artisans, whose skilful
                  hands have been shaping teak wood for generations. We curate a
                  diverse collection of furniture, home décor, and accessories
                  that embody the spirit of Indonesian craftsmanship while
                  celebrating the natural beauty and durability of teak wood.
                </p>
                <div className="mt-10 max-w-xl text-base leading-7 text-gray-700">
                  <p>
                    Explore our lovingly curated selection of products, from one
                    of a kind tables, chairs to enchanting handcrafted baskets,
                    decorative bowls, and exquisite cutting boards. Each piece
                    is carefully handpicked by our founders ensuring a genuine
                    connection with the artisans and their creations.
                  </p>
                  <p className="mt-10">
                    As a company committed to sustainability and ethical
                    sourcing, we take pride in our partnership with responsible
                    Indonesian suppliers who share our vision for preserving the
                    environment and supporting local communities. We believe in
                    empowering these artisans and creating a positive impact
                    through fair trade practices and eco-conscious business
                    decisions..
                  </p>
                  <p className="mt-10">
                    At Kayon Décor, we invite you to discover the charm and
                    sophistication of authentic Indonesian teak wood products.
                    Our passion for quality and design shines through in every
                    unique piece we bring to the shores of Cyprus. Join us on
                    this extraordinary journey as we bridge cultures and elevate
                    your living space with the timeless elegance of teak.
                  </p>
                </div>
              </div>
              <div className="lg:flex lg:flex-auto lg:justify-center">
                <dl className="w-64 space-y-8 xl:w-80">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="flex flex-col-reverse gap-y-4"
                    >
                      <dt className="text-base leading-7 text-gray-600">
                        {stat.label}
                      </dt>
                      <dd className="text-5xl font-semibold tracking-tight text-gray-900">
                        {stat.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Image section */}
        <div className="mt-32 sm:mt-40 xl:mx-auto xl:max-w-7xl xl:px-8">
          <Image
            src={AboutusEnd}
            alt=""
            className="aspect-[5/2] w-full object-cover xl:rounded-3xl"
          />
        </div>
      </main>
    </>
  );
}
