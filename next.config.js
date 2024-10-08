/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? {
          exclude: ['warn'],
        }
        : false,
  },
  output: 'standalone',
}

module.exports = nextConfig
