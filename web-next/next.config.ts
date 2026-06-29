import type { NextConfig } from "next";

const backendURL =
  process.env.NEXT_PUBLIC_API_URL || "https://all-web-1.onrender.com";
const IsDEV = backendURL.startsWith("http://localhost");

const nextConfig: NextConfig = {
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,

  /* config options here */
  images: {
    dangerouslyAllowLocalIP: IsDEV,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'all-web-1.onrender.com',
        pathname: '/uploads/**',
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com" // domain
      },
      // {..}
    ]
  }
};

export default nextConfig;
