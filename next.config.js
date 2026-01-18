/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  serverExternalPackages: ["pino-pretty", "lokijs", "encoding"],
};

module.exports = nextConfig;
