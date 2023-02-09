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
      },
      {
        protocol: "https",
        hostname: "assets.shop.loblaws.ca",
      },
      {
        protocol: "https",
        hostname: "em-content.zobj.net",
      },
    ],
  },
});
