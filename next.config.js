/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only use static export for production builds when explicitly requested
  // Dashboard pages need dynamic rendering for authentication and real-time data
  ...(process.env.NODE_ENV === 'production' && process.env.STATIC_EXPORT === 'true' && {
    output: 'export',
    trailingSlash: true,
    distDir: 'dist',
  }),
  images: {
    domains: ['localhost', 'mdmrdtzjwygevqxdzsmf.supabase.co'],
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