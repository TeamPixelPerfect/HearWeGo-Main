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
};

export default nextConfig;
