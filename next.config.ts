import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	// experimental: {
	// 	reactCompiler: true
	// },
	images: {
		unoptimized: true,

		remotePatterns: [
			{
				protocol: "https",
				hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com",
				port: "",
			},
			{
				protocol: "https",
				hostname: "raw.githubusercontent.com",
				port: "",
			},
			{
				protocol: "https",
				hostname: "logo.clearbit.com",
				port: "",
			},
			{
				protocol: "https",
				hostname: "images.unsplash.com",
				port: "",
			},

			{
				protocol: "https",
				hostname: "unsplash.com",
				port: "",
			},
			{
				protocol: "https",
				hostname: "appwrite.coolify.pixeldesign.site",
				port: "",
			},

			{
				protocol: "https",
				hostname: "source.unsplash.com",
				port: "",
			},

			{
				protocol: "https",
				hostname: "www.carlogos.org",
				port: "",
			},
		],
	},
	typescript: {
		ignoreBuildErrors: true, // Ignore TypeScript errors during build
	},
	eslint: {
		ignoreDuringBuilds: true, // Disable ESLint during build
	},
};

export default nextConfig;
