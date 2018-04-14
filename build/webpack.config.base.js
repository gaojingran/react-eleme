
const path = require('path')
const Happypack = require('happypack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  output: {
    filename: '[name].[hash:8].js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'src': path.join(__dirname, '../src'),
      'assets': path.join(__dirname, '../src/assets'),
      'components': path.join(__dirname, '../src/components')
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        use: 'happypack/loader?id=js',
        include: path.join(__dirname, '../src')
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: path.join(__dirname, '../src/assets/svg'),
        options: {
          name: '[name]',
          prefixize: true
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        exclude: path.join(__dirname, '../src/assets/svg'),
        options: {
          name: 'static/[name].[ext]?[hash:8]'
        }
      }
    ]
  },
  plugins: [
    new Happypack({
      id: 'js',
      threads: 4,
      loaders: ['babel-loader']
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, '../static'),
        to: path.join(__dirname, '../dist/static')
      }
    ])
  ]
}
