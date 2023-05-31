import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { GlobalCartContextProvider } from "@/lib/cart";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

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
        <GlobalCartContextProvider>
          <Navigation />
          <Component {...pageProps} />
          <Analytics />
          <Footer />
        </GlobalCartContextProvider>
      </div>
    </>
  );
}
