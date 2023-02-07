/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = withPWA({
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
});
