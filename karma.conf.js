var webpack = require('webpack');

module.exports = function(config) {
  config.set({

    basePath: '',

    frameworks: ['mocha'],

    files: [
      'tests/index.js',
    ],

    exclude: [
    ],

    preprocessors: {
      'tests/index.js': ['webpack'],
    },

    webpack: {
      module: {
        loaders: [{
          test: /\.jsx?$/,
          ignore: /node_modules/,
          loader: 'babel-loader',
        }, {
          test: /\.json$/,
          loader: 'json-loader',
        }],
      },
      externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      }
    },

    webpackMiddleware: {
      noInfo: true,
    },

    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['Chrome'],

    singleRun: false,

    concurrency: Infinity,
  })
}
