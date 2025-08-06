import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { GlobalCartContextProvider } from "@/lib/cart";
import "@/styles/globals.css";
import { Lora } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BackToTop } from "@/components/BackToTop";
import { Metadata } from "next";

const playfairDisplay = Lora({
  weight: ["400", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kayon Decor",
  description: "Premium furniture and home decor",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={playfairDisplay.className}>
      <body>
        <div className="bg-white">
          <GlobalCartContextProvider>
            <Navigation />
            {children}
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
          <BackToTop />
        </div>
      </body>
    </html>
  );
}