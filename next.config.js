/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: '/blockexplorer',
    assetPrefix:'/blockexplorer/',
    experimental: {
        appDir: true,
    },
}

module.exports = nextConfig
