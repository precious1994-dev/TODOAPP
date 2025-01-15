/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Ensure trailing slashes for better compatibility
  trailingSlash: true,
  // Disable server components since we're doing static export
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig 