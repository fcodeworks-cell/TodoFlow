import type { NextConfig } from "next";
import path from "path";
const nextConfig: NextConfig = {
  transpilePackages: ['three'],
  turbopack: {
    rules: {
      "*.svg": {
        loaders: [
          {
            loader: "@svgr/webpack",
            options: {
              icon: true,
            },
          },
        ],
        as: "*.ts",
      },
    },
    root: path.join(__dirname, ".."),
  },
};

export default nextConfig;
