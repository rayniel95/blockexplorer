/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: '/blockexplorer',
    assetPrefix:'/blockexplorer/',
    experimental: {
        appDir: true,
    },
    webpack(config) {
        // config.output.webassemblyModuleFilename = 'static/wasm/[modulehash].wasm'
        config.experiments = { asyncWebAssembly: true }
        return config
    },
}

module.exports = nextConfig
