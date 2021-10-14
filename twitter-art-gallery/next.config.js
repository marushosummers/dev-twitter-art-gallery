/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    ENDPOINT: process.env.ENDPOINT,
  },
  images: {
        minimumCacheTTL: 60,
    domains: ['pbs.twimg.com','abs.twimg.com'],
  },
}
