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
                hostname: 'api.replicate.delivery',
            },
            {
                hostname: 'api.replicate.com',
            }
        ],
        //domains: ['api.replicate.delivery', 'api.replicate.com']
    },
    transpilePackages: ['@trigger.dev/react']
};

export default nextConfig;