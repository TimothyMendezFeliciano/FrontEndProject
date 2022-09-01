/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: [
            'images.unsplash.com', 'localhost', 'scontent.fsig3-1.fna.fbcdn.net'
        ]
    }
}

module.exports = nextConfig
