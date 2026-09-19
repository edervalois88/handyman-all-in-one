import type { NextConfig } from "next";

// Every route is statically prerendered and there are no runtime services, so
// there is very little to configure. `turbopack.root` is pinned because the
// project sits inside a larger authoring workspace whose root lockfile would
// otherwise be picked up.
const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    // Local brand artwork only; no remote patterns needed.
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        // Brand artwork is content-addressed by name and never edited in place.
        source: "/brand/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
