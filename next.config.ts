import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors during build
  },
  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint during build
  },
  images: {
    domains: [
      "appwrite.coolify.pixeldesign.site",
    ], // Allowed image domains
  },
};

export default nextConfig;
