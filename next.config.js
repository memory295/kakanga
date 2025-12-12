/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  distDir: 'dist',
  images: {
    domains: ['localhost'],
    unoptimized: true
  },
  // Handle CSS imports
  transpilePackages: ['lucide-react'],
}

module.exports = nextConfig