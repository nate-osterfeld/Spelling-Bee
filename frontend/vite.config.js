import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		host: '0.0.0.0', // uses computer's IP, e.g. '192.168.86.162' to access on phone or other device
	},
	build: {
		rollupOptions: {
			input: {
				main: 'index.html',
				home: 'home.html',
			},
		},
	},
	resolve: {
		alias: [{ find: '@', replacement: path.resolve('./src') }],
	},
})
