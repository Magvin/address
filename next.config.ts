import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    if (Array.isArray(config.externals)) {
      // noinspection JSUnresolvedReference
      config.externals.push("pino-pretty", "lokijs", "encoding");
    }
    return config;
  },
};

export default nextConfig;
