/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: [
      "@prisma/client",
      "@prisma/adapter-libsql",
      "@libsql/client",
      "libsql",
    ],
  },
};

module.exports = nextConfig;
