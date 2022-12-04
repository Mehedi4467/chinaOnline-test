/** @type {import('next').NextConfig} */
const path = require('path');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const nextConfig = withBundleAnalyzer({
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_ENV: 'PRODUCTION',
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles/scss')],
  },
  images: {
    domains: ['chinaonlineapi.com'],
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
});

module.exports = nextConfig;
