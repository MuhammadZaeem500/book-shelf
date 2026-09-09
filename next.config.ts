import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: "../",
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;