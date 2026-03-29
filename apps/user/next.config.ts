import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'http',
        hostname: 'www.nordmatengros.com',
      },
      {
        protocol: 'https',
        hostname: 'nordmatengros.com',
      },
      {
        protocol: 'https',
        hostname: 'www.nordmatengros.com',
      },
      {
        protocol: 'https',
        hostname:
          'baladi-prod-baladibucket-fedmxzsx.s3.eu-central-1.amazonaws.com',
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
