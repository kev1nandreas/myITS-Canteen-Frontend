import { ENV } from "@/configs/environment";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: ENV.URI.BASE_IMAGE_URL.split('/')[2],
        port: '',
        pathname: '/storage/**',
      },
    ],
  },
};

export default nextConfig;
