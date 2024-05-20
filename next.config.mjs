/** @type {import('next').NextConfig} */
const nextConfig = {};

// Configuration object tells the next-pwa plugin
import withPWA from "next-pwa";

const pwaConfig = withPWA({
  dest: "public", // Destination directory for the PWA files
  disable: process.env.NODE_ENV === "development", // Disable PWA in development mode
  register: true, // Register the PWA service worker
  skipWaiting: true, // Skip waiting for service worker activation
});

// Export the combined configuration for Next.js with PWA support
// module.exports = withPWA(nextConfig);
export default pwaConfig(nextConfig);
