import type { NextConfig } from "next";

const proxy: string = process.env.NODE_ENV.toLocaleLowerCase() === 'production' ? '/pdsi' : '';

const nextConfig: NextConfig = {
    assetPrefix: proxy,
    basePath: proxy,
    compiler: {
        styledComponents: true,
    },
    images: {
        unoptimized: true,
    },
    output: 'export',
};

export default nextConfig;
