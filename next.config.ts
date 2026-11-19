import type { NextConfig } from "next";

// Website được build thành file tĩnh (thư mục `out/`) nên chạy được trên mọi gói Hostinger.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
