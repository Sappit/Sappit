require('dotenv').config()
const webpack = require('webpack');
const path = require('path');
const config = require('sapper/config/webpack.js');
const pkg = require('./package.json');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');

const mode = process.env.NODE_ENV;
const dev = mode === 'development';

const alias = { svelte: path.resolve('node_modules', 'svelte'), '~': `${__dirname}/src` };
const extensions = ['.mjs', '.js', '.json', '.svelte', '.html'];
const mainFields = ['svelte', 'module', 'browser', 'main'];

const preprocess = require('svelte-preprocess')({ /* options */ });

module.exports = {
  client: {
    entry: config.client.entry(),
    output: config.client.output(),
    resolve: { alias, extensions, mainFields },
    module: {
      rules: [
        {
          test: /\.(svelte|html)$/,
          use: {
            loader: 'svelte-loader',
            options: {
              dev,
              hydratable: true,
              hotReload: false, // pending https://github.com/sveltejs/svelte/issues/2377
              preprocess,
            }
          }
        }
      ]
    },
    mode,
    plugins: [
      // pending https://github.com/sveltejs/svelte/issues/2377
      // dev && new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.browser': true,
        'process.env.NODE_ENV': JSON.stringify(mode),
        'process.env.imgurClientId': JSON.stringify(process.env.IMGUR_CLIENT_ID),
        'process.env.SENTRY_DSN': JSON.stringify(process.env.SENTRY_DSN),
        'process.env.redditClientId': JSON.stringify(process.env.REDDIT_CLIENT_ID),
        'process.env.redditRedirectUri': JSON.stringify(process.env.REDDIT_REDIRECT_URI ||
          'http://localhost:10080/auth/reddit/callback'),
      }),
      new SentryWebpackPlugin({
        include: '.',
        ignoreFile: '.sentrycliignore',
        ignore: ['node_modules', 'webpack.config.js'],
        configFile: 'sentry.properties'
      })
    ].filter(Boolean),
    devtool: dev && 'inline-source-map'
  },

  server: {
    entry: config.server.entry(),
    output: config.server.output(),
    target: 'node',
    resolve: { alias, extensions, mainFields },
    externals: Object.keys(pkg.dependencies).concat('encoding'),
    module: {
      rules: [
        {
          test: /\.(svelte|html)$/,
          use: {
            loader: 'svelte-loader',
            options: {
              css: false,
              generate: 'ssr',
              dev,
              preprocess,
            }
          }
        }
      ]
    },
    mode: process.env.NODE_ENV,
    plugins: [
      // pending https://github.com/sveltejs/svelte/issues/2377
      // dev && new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.browser': false,
        'process.env.NODE_ENV': JSON.stringify(mode),
        'process.env.imgurClientId': JSON.stringify(process.env.IMGUR_CLIENT_ID),
        'process.env.SENTRY_DSN': JSON.stringify(process.env.SENTRY_DSN),
        'process.env.redditClientId': JSON.stringify(process.env.REDDIT_CLIENT_ID),
        'process.env.redditRedirectUri': JSON.stringify(process.env.REDDIT_REDIRECT_URI ||
          'http://localhost:10080/auth/reddit/callback'),
      }),
    ].filter(Boolean),
    performance: {
      hints: false // it doesn't matter if server.js is large
    }
  },

  serviceworker: {
    entry: config.serviceworker.entry(),
    output: config.serviceworker.output(),
    mode: process.env.NODE_ENV
  }
};
