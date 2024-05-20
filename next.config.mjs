/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'replicate.delivery',
                port: ''
            },
            {
                protocol: 'https',
                hostname: 'api.replicate.delivery',
                port: ''
            },
            {
                protocol: 'https',
                hostname: 'api.replicate.com',
                port: ''
            }
        ],
        //domains: ['api.replicate.delivery', 'api.replicate.com']
    },
    transpilePackages: ['@trigger.dev/react']
};

export default nextConfig;