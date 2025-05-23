/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['blob.v0.dev', 'localhost', 'vercel.app'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Disable CSS optimization that requires critters
  optimizeCss: false,
  experimental: {
    // Remove optimizeCss which requires critters
    optimizeServerReact: true,
  },
};

export default nextConfig;
