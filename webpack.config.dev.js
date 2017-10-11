import webpack from 'webpack'
import path from 'path'

export default {
  devtool: 'inline-source-map',

  entry: [
    path.resolve(__dirname, 'app/index.js') 
  ],

  output: {
    path: path.resolve(__dirname, 'app'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader'] }
    ]
  }
}