const path = require('path');
// const fs = require('fs');

const nodeEnv = process.env.NODE_ENV || 'development';
const isDev = nodeEnv === 'development';

const cssLoaders = [
  {
    loader: 'isomorphic-style-loader',
  },
  {
    loader: 'css-loader',
    options: {
      modules: true,
      sourceMap: isDev,
      minimize: !isDev,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      plugins: () => [require('autoprefixer')]
    }
  },
];

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
  },
  output: {
    path: path.resolve('build'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: cssLoaders,
      },
      {
        test: /\.scss$/,
        use: cssLoaders.concat({
          loader: 'sass-loader',
        }),
      },
    ],
  },
  mode: nodeEnv,
  stats: {
    colors: true,
  },
};
