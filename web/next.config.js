/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Serve external logos directly from the browser rather than via the Next
    // optimizer proxy — simpler, avoids a server round-trip, and degrades
    // gracefully if a logo host is unreachable.
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'unavatar.io' },
      { protocol: 'https', hostname: 'i.pravatar.cc' },
    ],
  },
};

module.exports = nextConfig;
