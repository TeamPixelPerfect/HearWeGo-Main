/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hwgbucket.s3.ap-south-1.amazonaws.com",
        port: "",
        pathname: "",
      },
    ],
  },
  env: {
    s3_bucket: "hwgbucket",
    region: "ap-south-1",
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
    AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
  },
  swcMinify: true,
  fastRefresh: true,
  concurrentFeatures: true,
  productionBrowserSourceMaps: false, 
  optimizeFonts: false,
  minify: false,
};

export default nextConfig;
