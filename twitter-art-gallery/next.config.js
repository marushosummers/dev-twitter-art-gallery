/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    ENDPOINT: process.env.ENDPOINT,
  },
  images: {
    domains: ['pbs.twimg.com'],
  },
}
