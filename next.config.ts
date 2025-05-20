import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standard config that works with cdk-nextjs-standalone
  // Don't use 'output: export' as we want server-side features
  images: {
    domains: ['*'], // Configure domains as needed for your images
  },
};

export default nextConfig;
