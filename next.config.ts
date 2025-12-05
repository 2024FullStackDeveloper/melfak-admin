import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    LOCALE: "NEXT_LOCALE",
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "7036",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "localhost",
        port: "7036",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "apiwebsite.rakiza-sa.com",
        pathname: "/**",
      },
    ],
    unoptimized: process.env.NODE_ENV === "development",
  },
  webpack: (config, { isServer }) => {
    config.cache = false;
    return config;
  },
};

export default withNextIntl(nextConfig);
