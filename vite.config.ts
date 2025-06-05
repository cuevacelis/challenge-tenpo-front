import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";


// https://vite.dev/config/
export default defineConfig({
  plugins: [
		TanStackRouterVite({
			target: "react",
			autoCodeSplitting: true,
			routeToken: "layout",
			indexToken: "page",
		}),
		react(),
		tailwindcss(),
	],
  resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	base: "/",
	build: {
		cssCodeSplit: true,
		sourcemap: true,
		manifest: false,
		rollupOptions: {
			output: {
				entryFileNames: "assets/js/[name].[hash].js",
				chunkFileNames: "assets/js/[name].[hash].js",
				assetFileNames: "assets/css/[name].[hash].[ext]",
			},
		}
	},
})
