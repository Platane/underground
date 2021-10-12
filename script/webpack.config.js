const fs = require('fs')
const path = require('path')
const WebpackAssetsManifest = require('webpack-assets-manifest')
const {DefinePlugin} = require('webpack')

const production = process.env.NODE_ENV === 'production'

const publicPath = process.env.PUBLIC_PATH || '/'

module.exports = {
  entry: {
    index: [
      path.join(__dirname, '../src/index.js'),
      path.join(__dirname, '../src/index.html'),
    ],
  },

  output: {
    path: path.join(__dirname, '../dist'),
    filename: production ? '[name]-[hash:8].js' : '[name].js',
    publicPath: publicPath,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },

      {
        test: [/\.html?$/],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },

      {
        test: [/\.bmp/, /\.gif/, /\.jpe?g/, /\.png/, /\.otf/, /\.svg/],
        loader: 'file-loader',
        options: {
          name: production ? '[hash:8].[ext]' : '[name].[hash:8].[ext]',
        },
      },
    ],
  },

  plugins: [
    new WebpackAssetsManifest({
      output: path.resolve(__dirname, '../dist', 'assetManifest.json'),
    }),
    new DefinePlugin({
      'process.env.PUBLIC_PATH': JSON.stringify(publicPath),
    }),
  ].filter(Boolean),

  devtool: production ? 'source-map' : false,

  devServer: {
    port: 8083,
    open: '/underground',
    historyApiFallback: {
      rewrites: [
        { from: /^\/underground\/.*/, to: '/underground/index.html' },
      ],
    },
    watchOptions: {
      ignored: /node_modules/,
    },
  },
}
