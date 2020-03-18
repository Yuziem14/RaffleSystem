const path = require('path')

function scriptRules() {
  return [
    {
      test: /\.js$/,
      exclude: [/node_modules/],
      loader: 'babel-loader',
      options: { presets: ['@babel/env'] }
    }
  ]
}

module.exports = {
  entry: ['./resources/assets/scripts/formatDates.js'],
  output: {
    path: path.join(__dirname, 'public', 'js'),
    filename: 'formatDates.js'
  },
  module: {
    rules: scriptRules()
  }
}
