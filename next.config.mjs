/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Ensure both App Router and Pages Router work together
    appDir: true,
  },
  // Ensure API routes are included in build
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
