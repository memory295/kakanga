/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    unoptimized: true
  },
  // Handle CSS imports
  transpilePackages: ['lucide-react'],
}

module.exports = nextConfig