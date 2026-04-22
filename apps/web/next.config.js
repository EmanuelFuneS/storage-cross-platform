/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/env"],
  output: "standalone",
};

export default nextConfig;
