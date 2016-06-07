const Webpack = require('webpack');
const path = require('path');
const mainPath = path.resolve(__dirname, 'src', 'index.js');

module.exports = {
  //the entry point for webpack to start its process
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    mainPath
  ],
  //sets the name and path where we want the bundle saved
  output: {
    //absolute path to the folder where the bundle will be saved
    //eg: this will be saved in root
    path: __dirname,
    //publicPath is needed if we want to use dev server. dev server will server static files from the page
    //eg: http://your-domain/public/ < refers to the root
    publicPath: '/',
    filename: 'bundle.js'
  },
  //source mapping
  devtool: 'eval',

  //REMEMBER TO LOAD REACT PRESET FOR JSX
  module: {
    loaders: [{
      //match both .js and .jsx files
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'stage-1', 'react']
      }
    }]
  },
  //contains module directories/extensions. it is an array of directories/extensions where webpack will search modiles
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
    //add proxy because to server dynanmic data from our own server
    // proxy: [{
    //   path: '/*/',
    //   target: 'http://localhost:3000'
    // }]
  },
  // We have to manually add the Hot Replacement plugin when running
  // from Node
  plugins: [new Webpack.HotModuleReplacementPlugin()]
};
