import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      resourceQuery: { not: /url/ }, // exclude if *.svg?url
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
