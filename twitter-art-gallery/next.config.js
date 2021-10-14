/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    ENDPOINT: process.env.ENDPOINT,
  },
 async headers () {
   return [
     {
      source: '/(.*).(jpg|png)',
      headers: [
        {
          key: 'Cache-Control',
          value:
            'public, max-age=30, s-maxage=30',
        },
      ],
     }
   ]
  }
}
