import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "shopbbfashion.com",
      },
    ],
  },
};

export default nextConfig;
