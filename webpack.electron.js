const webpack = require('webpack');
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HappyPack = require('happypack');
const WebpackShellPlugin = require('webpack-shell-plugin');

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
    // HMR support
    // new webpack.NamedModulesPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
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

    // triggers electron
    new WebpackShellPlugin({ onBuildEnd:['npx electron .']}),

    // order <ForkTs> important [excludeWarnings, skipFirstNotification, alwaysNotify, skipSuccessful]
    // new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }),
    // notification plugin
    new ForkTsCheckerNotifierWebpackPlugin({
      alwaysNotify: true,
      title: 'electron'
    })
    // </ForkTs>
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
