/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router only configuration
  experimental: {
    appDir: true,
  },
  
  // Ensure proper file extensions
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  
  // Build configuration
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  
  // App Router optimizations
  swcMinify: true,
  
  // Remove any Page Router references
  trailingSlash: false,
}

export default nextConfig
