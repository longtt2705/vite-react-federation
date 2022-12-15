import { defineConfig } from 'vite';
import svgrPlugin from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';
import path from 'path';
import { VitePluginFonts } from 'vite-plugin-fonts';
import federation from "@originjs/vite-plugin-federation";
import dns from 'dns'

// const deps = require("./package.json").dependencies;

dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig({
  // This changes the out put dir from dist to build
  // comment this out if that isn't relevant for your project
  build: {
    outDir: 'build',
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  plugins: [
    react(),
    svgrPlugin({
      svgrOptions: {
        icon: true
        // ...svgr options (https://react-svgr.com/docs/options/)
      }
    }),
    VitePluginFonts({
      google: {
        families: ['Play']
      }
    }),
    federation({
      name: 'portal',
      filename: 'remoteEntry.js',
      // Modules to expose
      remotes: {
        gameplay: "http://localhost:3001/assets/remoteEntry.js"
      },
      exposes: {},
      shared: ['react']
    })
  ],
  resolve: {
    alias: {
      './runtimeConfig': './runtimeConfig.browser',
      src: path.resolve(__dirname, './src')
    }
  },
  server: {
    open: true
  },
  preview: {
    host: 'localhost',
    port: 3000,
    strictPort: true,
  },
});
