/** @type {import('next').NextConfig} */

const nextConfig = {
  transpilePackages: ["@repo/env"],
  output: "standalone",
  images: {
    remotePatterns: [
      ...(process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN
        ? [
            {
              protocol: "https",
              hostname: process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN,
              port: "",
              pathname: "/**",
            },
          ]
        : []),
    ],
  },
};

export default nextConfig;
