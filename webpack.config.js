var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

// if (process.env.NODE_ENV !== 'production') {
  // const DotenvPlugin = require('webpack-dotenv-plugin');
// }

var config = {
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ]},
      { test: /\.png$/, loader: "url-loader?mimetype=image/png" }
    ]
  },
  // devServer: {
  //   historyApiFallback: true,
  //   contentBase: './',
  //   hot: true
  // },
  plugins: 
  [new HtmlWebpackPlugin({
    template: 'app/index.html'
    })]
  [new DotenvPlugin({
    sample: './.env.default',
    path: './.env'
    })]
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })
  )
}

module.exports = config;