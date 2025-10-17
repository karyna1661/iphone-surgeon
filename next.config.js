/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Enable experimental features for App Router optimizations
    optimizeCss: true,
    optimizePackageImports: ['lucide-react'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  webpack: (config) => {
    // Configure webpack for font loading if needed
    return config;
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
};

module.exports = nextConfig;
