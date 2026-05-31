import type { NextConfig } from "next";

const wooUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;

let hostname = "";

if (wooUrl) {
  hostname = new URL(wooUrl).hostname;
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname,
      },
    ],
  },
};

export default nextConfig;
