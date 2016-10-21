var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

var BUILD_DIRECTORY = './dist'

module.exports = {
  entry: {
    index: [
      './src/js/index.js'
    ]
  },
  output: {
    path: BUILD_DIRECTORY,
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.jade$/,
        loader: 'jade'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ]
};
