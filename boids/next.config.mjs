/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: "canvas" }];
    return config;
  },
  experimental: {
    esmExternals: "loose",
  },
};

export default nextConfig;
