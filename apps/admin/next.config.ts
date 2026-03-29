import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'www.nordmatengros.no',
      },
      {
        protocol: 'https',
        hostname: 'nordmatengros.no',
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
