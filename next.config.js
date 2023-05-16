const withImages = require('next-images');

/** @type {import('next').NextConfig} */
const nextConfig = withImages({
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
})

module.exports = nextConfig
