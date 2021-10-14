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
 async headers () {
   return [
     {
      source: '/(.*).(jpg|png)',
      headers: [
        {
          key: 'Cache-Control',
          value:
            'public, no-cache, max-age=0, s-maxage=0',
        },
      ],
     }
   ]
  }
}
