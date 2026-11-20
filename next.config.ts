import type { NextConfig } from "next";

// Website được build thành file tĩnh (thư mục `out/`) nên chạy được trên mọi gói Hostinger.
// Khi đưa lên GitHub Pages (github.io/<tên-repo>/), workflow đặt NEXT_PUBLIC_BASE_PATH="/<tên-repo>".
// Để trống khi chạy ở tên miền riêng / Hostinger.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
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
