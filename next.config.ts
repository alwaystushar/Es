import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  /* Off until Next.js client RSC navigation is stable — soft Link clicks were 404ing while refresh worked. */
  cacheComponents: false,
  partialPrefetching: false,
  images: {
    qualities: [75, 90],
  },
  turbopack: {
    root: projectRoot,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
