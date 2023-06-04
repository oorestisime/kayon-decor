import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { GlobalCartContextProvider } from "@/lib/cart";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Lora } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import { ToastContainer } from "react-toastify";
import { Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const playfairDisplay = Lora({
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
          <Script
            strategy="lazyOnload"
            src="//code.jivosite.com/widget/mgE74Gh6AE"
          />
        </GlobalCartContextProvider>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          transition={Slide}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </>
  );
}
