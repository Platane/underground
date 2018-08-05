const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
const WebpackAssetsManifest = require('webpack-assets-manifest')

module.exports = {
  entry: {
    index: [
      path.join(__dirname, '../src/__tests__/index.js'),
      path.join(__dirname, '../src/index.html'),
    ],
  },

  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: '/',
  },

  resolve: {
    alias: {
      tape: 'browser-tap',
    },
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
    ],
  },

  devtool: false,

  devServer: {
    before: app =>
      app.get('/api-tfl-gov-uk-proxy/*', async (req, res) => {
        const path = req.url.split('api-tfl-gov-uk-proxy/')[1]

        const x = await fetch('https://api.tfl.gov.uk/' + path).then(res =>
          res.json()
        )

        res.json(x)
      }),
  },
}
