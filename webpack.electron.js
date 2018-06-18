const webpack = require('webpack');
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HappyPack = require('happypack');
// const WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = {
  target: 'electron-main',
  entry: 'main.ts',
  devtool: 'eval-source-map',
  // watch: true,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: ['node_modules'],
    plugins: [
      new TsconfigPathsPlugin({ configFile: './tsconfig.electron.json' })
    ]
  },
  plugins: [
    // parrellization of build
    new HappyPack({
      id: 'ts',
      threads: 2,
      loaders: [
        {
          loader: 'ts-loader',
          options: { happyPackMode: true }
        }
      ]
    }),
    new HappyPack({
      id: 'nodeloader',
      threads: 2,
      loaders: [
        {
          loader: 'node-loader',
        }
      ]
    }),

  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'happypack/loader?id=ts',
      },
      {
        test: /\.node$/,
        loader: 'happypack/loader?id=nodeloader',
      }
    ]
  }
};
