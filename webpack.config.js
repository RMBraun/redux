const path = require('path')
const glob = require('glob')

const baseConfig = {
  mode: 'production',
  name: 'redux',
  entry: [
    path.join(__dirname, 'redux-web.js'),
    path.join(__dirname, 'listener.jsx'),
    path.join(__dirname, 'redux.devtool.loader.js'),
    path.join(__dirname, 'redux.devtool.jsx'),
  ].reduce((entries, source) => {
    entries[path.basename(source).replace('.jsx', '').replace('.js', '').replace('redux-web', 'redux')] = source

    return entries
  }, {}),
  externals: {
    redux: 'Redux',
  },
  output: {
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /tests|node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: { ie: '11' } }]],
            plugins: ['@babel/plugin-transform-arrow-functions'],
          },
        },
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        options: {
          presets: [['@babel/preset-env', { modules: false }], '@babel/preset-react'],
          plugins: [
            ['@emotion', { autoLabel: 'always' }],
            '@babel/plugin-proposal-object-rest-spread',
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-proposal-class-properties',
            ['transform-react-remove-prop-types', { removeImport: true }],
            '@babel/plugin-transform-react-inline-elements',
            '@babel/plugin-transform-react-constant-elements',
          ],
          cacheDirectory: true,
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
}

const webMin = {
  ...baseConfig,
  name: 'redux-web-min',
  output: {
    path: path.resolve('dist'),
    filename: '[name].min.js',
  },
}

const webDev = {
  ...baseConfig,
  name: 'redux-web-dev',
  optimization: {
    minimize: false,
  },
  output: {
    path: path.resolve('dist'),
  },
}

module.exports = [webMin, webDev]
