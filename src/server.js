import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import proxy from 'http-proxy-middleware';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka() // You can also use Express
  .use(
    proxy('/masstagger', {
      pathRewrite: { '^/masstagger' : '' },
      target: 'https://masstagger.com',
      ws: false,
      changeOrigin: true,
    }),
    proxy('/api-pushshift', {
      pathRewrite: { '^/api-pushshift' : '' },
      target: 'https://api.pushshift.io',
      ws: false,
      changeOrigin: true,
    }),
    proxy('/api-imgur', {
      pathRewrite: { '^/api-imgur' : '' },
      target: 'https://api.imgur.com/',
      ws: false,
      changeOrigin: true,
    }),
    // we'll just use the on-production one since the
    // netlify local test server doesnt work
    // and its basically just a proxy
    proxy('/.netlify/functions', {
      // pathRewrite: { '^/.netlify/functions/' : '' },
      // target: 'https://api.tumblr.com/v2',
      // target: 'http://127.0.0.1:9000',
      target: 'https://sappit.netlify.com',
      ws: false,
      changeOrigin: true,
    }),
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sapper.middleware()
  )
  .listen(PORT, err => {
    if (err) console.log('error', err);
  });
