import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const clarityScript = `
  <script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "u0ddcocw2r");
  </script>
`;

function viteClarityPlugin() {
  return {
    name: 'vite-plugin-ms-clarity-manual',
    transformIndexHtml(html) {
      return html.replace('</head>', `${clarityScript}</head>`);
    },
  };
}

export default defineConfig(({ mode }) => {
    const plugins = [react()];
    if (mode === 'production') {
      plugins.push(viteClarityPlugin());
    }
    return {
      base: '/',
      server: {
        port: 3001,
        host: '0.0.0.0',
        proxy: {
          '/.netlify/functions': {
            target: 'http://localhost:8888',
            changeOrigin: true,
          },
        },
      },
      plugins,
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
