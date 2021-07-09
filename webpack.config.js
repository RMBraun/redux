const path = require('path')
const glob = require('glob')

const baseConfig = {
  mode: 'production',
  name: 'redux',
  entry: glob
    .sync(path.join(__dirname, '*.js'))
    .filter(source => !source.includes('webpack.config'))
    .reduce((entries, source) => {
      entries[path.basename(source).replace('.js', '')] = source

      return entries
    }, {}),
  externals: {
    // Use external version of React
    react: 'React',
    'react-dom': 'ReactDOM',
    redux: 'Redux',
    lenses: 'L',
  },
  output: {
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /tests|node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: { ie: '11' } }]],
            plugins: ['@babel/plugin-transform-arrow-functions'],
          },
        },
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
  module: {},
}

module.exports = [webMin, webDev]
