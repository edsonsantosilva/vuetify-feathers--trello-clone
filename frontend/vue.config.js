const fs = require('fs');
const path = require('path');
const webpack = require('webpack'); // eslint-disable-line import/no-extraneous-dependencies

const packageJson = fs.readFileSync('./package.json');
const version = JSON.parse(packageJson).version || '0.0.0';

module.exports = {
  devServer: {
    port: 8080,
  },

  pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js',
      exclude: [
        /\.map$/,
        /manifest\.json$/
      ],
    },
  },

  transpileDependencies: [
    'feathers-vuex',
  ],

  configureWebpack: {
    devtool: 'source-map',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          PACKAGE_VERSION: `"${version}"`,
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src/')
      }
    }
  },
  chainWebpack: config => {
    config.plugins.delete('prefetch');
  }
};
