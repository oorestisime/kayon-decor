/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/categories/tablewares",
        destination: "/categories/tableware",
        permanent: true,
      },
      {
        source: "/categories/tablewares/:slug",
        destination: "/categories/tableware/:slug",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
