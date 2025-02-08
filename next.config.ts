import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co'
      },
    ],
  },
  devIndicators: {
    appIsrStatus: false, // Disable the "ISR" indicator
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb'
    },
  },
}

export default nextConfig