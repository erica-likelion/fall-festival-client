import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tsConfigPaths from 'vite-tsconfig-paths';
import { compression } from 'vite-plugin-compression2';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    server: {
      port: 8080,
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
        },
      },
    },
    preview: {
      port: 8080,
    },
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
          svgoConfig: {
            floatPrecision: 2,
            plugins: [
              {
                name: 'preset-default',
                params: {
                  overrides: {
                    removeViewBox: false,
                  },
                },
              },
            ],
          },
        },
      }),
      compression(),
      tsConfigPaths(),
      VitePWA({
        strategies: 'injectManifest',
        srcDir: 'src',
        filename: 'sw.ts',
        registerType: 'autoUpdate',
        injectRegister: false,

        pwaAssets: {
          disabled: true,
        },

        manifest: {
          name: 'ESPERO',
          short_name: 'ESPERO',
          description: 'HYU-ERICA 2025 ESPERO 가을 축제 웹앱',
          theme_color: '#7E419A',
          background_color: '#301B3B',
          start_url: '/',
          display: 'standalone',
          display_override: ['window-controls-overlay', 'standalone'],
          // 운세 카드 회전 (사파리) 활성화
          orientation: 'any',
          icons: [
            {
              src: 'icons/icon-48x48.webp',
              sizes: '48x48',
              type: 'image/webp',
            },
            {
              src: 'icons/icon-72x72.webp',
              sizes: '72x72',
              type: 'image/webp',
            },
            {
              src: 'icons/icon-96x96.webp',
              sizes: '96x96',
              type: 'image/webp',
            },
            {
              src: 'icons/icon-128x128.webp',
              sizes: '128x128',
              type: 'image/webp',
            },
            {
              src: 'icons/icon-144x144.webp',
              sizes: '144x144',
              type: 'image/webp',
            },
            {
              src: 'icons/icon-152x152.webp',
              sizes: '152x152',
              type: 'image/webp',
            },
            {
              src: 'icons/icon-192x192.webp',
              sizes: '192x192',
              type: 'image/webp',
            },
            {
              src: 'icons/icon-256x256.webp',
              sizes: '256x256',
              type: 'image/webp',
            },
            {
              src: 'icons/icon-384x384.webp',
              sizes: '384x384',
              type: 'image/webp',
            },
            {
              src: 'icons/icon-512x512.webp',
              sizes: '512x512',
              type: 'image/webp',
            },
          ],
        },

        injectManifest: {
          globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
          maximumFileSizeToCacheInBytes: 50 * 1024 * 1024, // 50 MB로 제한 증가
        },

        devOptions: {
          enabled: true,
          navigateFallback: 'index.html',
          suppressWarnings: true,
          type: 'module',
        },
      }),
    ],
    resolve: {
      alias: [
        {
          find: '@',
          replacement: '/src',
        },
      ],
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            // React 관련 라이브러리를 별도 청크로 분리
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],

            // UI 라이브러리들을 별도 청크로 분리
            'ui-vendor': ['styled-components', 'framer-motion'],

            // 유틸리티 라이브러리들을 별도 청크로 분리
            'utils-vendor': ['axios', 'zustand'],

            // 이미지/미디어 관련 라이브러리들을 별도 청크로 분리
            'media-vendor': ['react-lottie-player', 'react-slick', 'slick-carousel'],
          },
        },
      },
      // 청크 크기 경고 제한을 조정 (기본값 500KB에서 1MB로 증가)
      chunkSizeWarningLimit: 1000,
    },
  };
});
