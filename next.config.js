/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    TOKEN: process.env.TOKEN,
    MONGO_URI: process.env.MONGO_URI,
    FRONTEND: process.env.FRONTEND,
    BACKEND: process.env.BACKEND
  }
}

module.exports = nextConfig;