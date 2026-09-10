import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vespera.hr',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};

export default nextConfig;
