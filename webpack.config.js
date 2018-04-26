'use strict'

const fs = require('fs')
const path = require('path')
const glob = require("glob")
const webpack = require("webpack")

module.exports = {
    entry: './components/vueInstance.js',
    mode: 'production',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'build')
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
                'scss': 'vue-style-loader!css-loader!sass-loader',
                'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
            }
          }
        },
        {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: { presets: [ 'es2015' ] }
        },
        {
          test: /\.css$/,
          use: [
            { loader: 'style-loader' },
            {
              loader: 'css-loader'
            }
          ]
        },
        {
            test: /\.(png|jpe?g|gif|svg|ico)$/,
            loaders: [
                'url-loader?limit=5000&name=images/[name].[ext]',
                'image-webpack-loader'
            ]
        },
        {
            test: /https:\/\/drive\.google\.com\/uc*/,
            loader: 'file-loader',
            options: { name: 'images/[name]' }
        },
        {
            test: /\.styl$/,
            loader: ['style-loader', 'css-loader', 'stylus-loader']
        }
      ]
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
}
}
