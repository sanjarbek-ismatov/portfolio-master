/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  redirects() {
    return [
      {
        source: "/",
        destination: "/page/1",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
