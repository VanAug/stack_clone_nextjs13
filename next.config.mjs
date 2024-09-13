/** @type {import('next').NextConfig} */
const nextConfig = {
  serverActions: true,
  mdx: true,
  serverComponentsExternalPackages: ["mongoose"],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
};

export default nextConfig;
