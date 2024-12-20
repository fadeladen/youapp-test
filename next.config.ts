import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/", // Root path
        destination: "/profile", // Redirect to `/login`
        permanent: false, // Set to true for a permanent redirect (308)
      },
    ]
  },
};

export default nextConfig;
