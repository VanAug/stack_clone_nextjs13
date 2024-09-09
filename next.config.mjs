/** @type {import('next').NextConfig} */
const nextConfig = {
  serverActions: true,
  mdx: true,
  serverComponentsExternalPackages: ["mongoose"],
};

export default nextConfig;
