import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { GlobalCartContextProvider } from "@/lib/cart";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Playfair_Display } from "next/font/google";
import { DefaultSeo } from "next-seo";
import firstPagePhoto from "@/images/1stpage-photo.jpeg";
import firstPagePhoto2 from "@/images/1stpage-photo2.jpeg";

const playfairDisplay = Playfair_Display({
  weight: ["400", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${playfairDisplay.style.fontFamily};
        }
      `}</style>
      <div className="bg-white">
        <DefaultSeo
          openGraph={{
            type: "website",
            locale: "en_GB",
            url: "https://kayon-decor.com/",
            siteName: "Kayon Decor",
            images: [
              {
                url: firstPagePhoto2.src,
              },
              {
                url: firstPagePhoto.src,
              },
            ],
          }}
          twitter={{
            cardType: "summary_large_image",
          }}
        />
        <GlobalCartContextProvider>
          <Navigation />
          <Component {...pageProps} />
          <Footer />
        </GlobalCartContextProvider>
      </div>
    </>
  );
}
