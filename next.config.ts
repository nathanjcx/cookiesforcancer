import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  transpilePackages: ["@stripe/stripe-js"],
  async rewrites() {
    return [{ source: "/qr", destination: "/donate-qr.png" }];
  },
};

export default nextConfig;
