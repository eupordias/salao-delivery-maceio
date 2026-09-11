/** @type {import('next').NextConfig} */
const isGhPages = process.env.NEXT_PUBLIC_GH_PAGES === 'true';

const nextConfig = {
  basePath: isGhPages ? '/salao-delivery-maceio' : '',
  ...(isGhPages
    ? {
        output: 'export',
        images: { unoptimized: true },
      }
    : {
        rewrites: async () => [
          {
            source: '/api/:path*',
            destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/:path*`,
          },
        ],
        images: {
          remotePatterns: [
            { protocol: 'http', hostname: 'localhost' },
            { protocol: 'https', hostname: 'res.cloudinary.com' },
          ],
        },
      }),
};

module.exports = nextConfig;
