var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

var BUILD_DIRECTORY = './dist'

module.exports = {
  entry: {
    index: [
      './src/index.js'
    ]
  },
  output: {
    path: BUILD_DIRECTORY,
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      },
      {
        include: /\.json$/,
        loader: ['json-loader']
      },
      {
        test: /\.pug$/,
        loaders: ['file-loader?name=../index.html', 'extract-loader', 'html-loader', 'pug-html-loader?exports=false']
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('style', 'css!less')
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      // {
      //   test: /\.png$/,
      //   loader: "url-loader?limit=100000"
      // },
      {
        test: /\.jpg$/,
        loader: "file-loader?name=[name].[ext]"
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: "file-loader?name=[name].[ext]"
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json']
  },
  plugins: [
    new ExtractTextPlugin('[name].css', { allowChunks: true }),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
        jquery: 'jquery'
    })
  ]
};
