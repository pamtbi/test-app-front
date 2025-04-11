 // import path from 'path';
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, 'src'),
//     },
//   },
//   build: {
//     rollupOptions: {
//       output: {
//         manualChunks: undefined,
//         entryFileNames: 'assets/index.js',
//         assetFileNames: (assetInfo: any) => {
//           if (assetInfo.name.endsWith('.css')) {
//             return 'assets/style.css';
//           }
//           return 'assets/[name].[ext]';
//         },
//       },
//     },
//   },
// });

/* eslint-disable @typescript-eslint/no-explicit-any */

import {defineConfig} from "vite"
import react from "@vitejs/plugin-react"
import path from 'path';

export default defineConfig({
    plugins: [
      react()
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    build: {
        rollupOptions: {
            output: {
                assetFileNames: (e: any) => {
                    if (e.name.endsWith(".svg")) {
                        return "icons/[name].[hash][extname]"
                    } else if (
                        e.name.endsWith(".png") ||
                        e.name.endsWith(".jpg") ||
                        e.name.endsWith(".jpeg") ||
                        e.name.endsWith(".gif") ||
                        e.name.endsWith(".webp")
                    ) {
                        return "img/[name].[hash][extname]"
                    } else if (
                        e.name.endsWith(".mp4") ||
                        e.name.endsWith(".webm")) {
                        return "video/[name].[hash][extname]"
                    } else if (
                        e.name.endsWith(".otf") ||
                        e.name.endsWith(".OTF") ||
                        e.name.endsWith(".ttf") ||
                        e.name.endsWith(".woff") ||
                        e.name.endsWith(".eot") ||
                        e.name.endsWith(".woff2")
                    ) {
                        return "fonts/[name].[hash][extname]"
                    } else if (e.name.endsWith(".css")) {
                        return "css/style.min.css"
                    } else {
                        return "assets/[name].[hash][extname]"
                    }
                },
                chunkFileNames: "js/main.min.js",
                entryFileNames: "js/main.min.js",
            },
        },
        minify: "terser",
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
                passes: 3,
            },
            mangle: true,
            format: {
                comments: false,
            },
        },
        cssCodeSplit: true,
    },
})

