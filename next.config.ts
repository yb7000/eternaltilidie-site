import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // The intake launched briefly at /portal before it was named Reflector.
    return [{ source: "/portal", destination: "/reflector", permanent: true }];
  },
};

export default nextConfig;
