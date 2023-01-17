/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_KEY: process.env.API_KEY
  },
  images: {
    domains: ['images.pokemontcg.io']
  }
}

module.exports = nextConfig
