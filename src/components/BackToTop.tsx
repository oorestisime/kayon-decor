"use client";

import { useEffect, useState } from "react";

export const BackToTop = () => {
  const [backToTop, setBackToTop] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 1500 ? setBackToTop(true) : setBackToTop(false);
    });
    return () => {
      window.removeEventListener("scroll", () => {
        window.scrollY > 1500 ? setBackToTop(true) : setBackToTop(false);
      });
    };
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div>
      {backToTop && (
        <button
          onClick={scrollUp}
          id="topButton"
          className="fixed z-10 p-3 bg-brown-primary rounded-full shadow-md  bottom-10 left-10 text-white animate-bounce"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            ></path>
          </svg>
        </button>
      )}
    </div>
  );
};
