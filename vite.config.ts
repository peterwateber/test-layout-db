import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';

// https://vite.dev/config/

export default defineConfig(() => {
    return {
        plugins: [mkcert(), tailwindcss(), react()],
        server: {
            proxy: {
                '/proxy': {
                    target: 'https://api-testing.early.app/',
                    rewrite: (path) => path.replace(/\/proxy/, ''),
                    changeOrigin: true,
                    secure: false,
                    configure: (proxy) => {
                        proxy.on('proxyReq', (proxyReq, _req, _res) => {
                            proxyReq.setHeader(
                                'Origin',
                                'https://product-testing.early.app'
                            );
                        });
                    },
                },
            },
        },
    };
});
