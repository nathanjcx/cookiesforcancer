import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  transpilePackages: ["@stripe/stripe-js"],
};

export default nextConfig;
