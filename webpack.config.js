const slsw = require('serverless-webpack')

module.exports = {
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  entry: slsw.lib.entries,
  devtool: 'source-map',
  resolve: { extensions: ['.js', '.json', '.ts'] },
  target: 'node',
  module: { rules: [{ test: /\.tsx?$/, loader: 'ts-loader' }] },
  externals: [require('webpack-node-externals')()]
}
