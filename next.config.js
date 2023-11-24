/** @type {import('next').NextConfig} */
// const nextConfig = {
//     images:{
//         domains:["images.pexels.com","lh3.googleusercontent.com","firebasestorage.googleapis.com","127.0.0.1"]
//       }
// }

// module.exports = nextConfig

// module.exports = {
//   eslint: {
//     // Warning: This allows production builds to successfully complete even if
//     // your project has ESLint errors.
//     ignoreDuringBuilds: true,
//   },
 

// }
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  experimental: {
    appDir: true,
  },
  images: {
 
    domains:['http://13.127.188.63',"images.pexels.com","lh3.googleusercontent.com","firebasestorage.googleapis.com","127.0.0.1"]
  },
};



module.exports = nextConfig
module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: '3.6.48.19',
          pathname: '**',
        },
      ],
    },
    eslint: {
          // Warning: This allows production builds to successfully complete even if
          // your project has ESLint errors.
          ignoreDuringBuilds: true,
        },
  
  };
  
