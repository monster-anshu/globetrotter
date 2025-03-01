import type { NextConfig } from 'next';

export const API_URL = process.env.API_URL as string;

const rewrites = async () => {
  return [
    {
      source: '/api/:path*',
      destination: API_URL + '/api/:path*',
    },
  ];
};

const nextConfig: NextConfig = {
  /* config options here */
  rewrites: rewrites,
};

export default nextConfig;
