/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  distDir: 'dist',
  images: {
    domains: ['localhost'],
    unoptimized: true
  },
  eslint: {
    // Prevent ESLint config format issues from failing production builds
    ignoreDuringBuilds: true,
  },
  // Handle CSS imports
  transpilePackages: ['lucide-react'],
}

module.exports = nextConfig