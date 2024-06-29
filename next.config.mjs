/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qteefmlwxyvxjvehgjvp.supabase.co",
      },
    ],
  },
};

export default nextConfig;
