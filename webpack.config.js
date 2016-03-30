module.exports = {
  entry: './app-client',
  output: {
    filename: 'public/bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        exclude: /(node_modules|app-server.js)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-2']
        }
      }
    ]
  }
};
