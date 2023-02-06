/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.tntsupermarket.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets.shop.loblaws.ca",
        pathname: "/**",
      },
    ],
  },
};
