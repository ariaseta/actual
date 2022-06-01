let path = require('path');
let webpack = require('webpack');

module.exports = {
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  target: 'node',
  entry: path.join(__dirname, '../src/server/main.js'),
  output: {
    path: path.resolve(path.join(__dirname, '/../lib-dist')),
    filename: 'bundle.mobile.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.mobile.js', '.electron.js', '.js', '.ts', '.json'],
    alias: {
      'perf-deets': require.resolve('perf-deets/noop')
    }
  },
  externals: ['better-sqlite3', 'rn-bridge'],
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.m?js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-jwl-app']
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: 'bundle.mobile.js.map',
      sourceRoot: 'app://'
    })
  ],
  node: {
    __dirname: false
  }
};
