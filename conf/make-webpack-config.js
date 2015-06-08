var fs = require('fs');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

function extractForProduction(loaders) {
  return ExtractTextPlugin.extract('style', loaders.substr(loaders.indexOf('!')));
}

module.exports = function(options) {
  options.lint = fs.existsSync(__dirname + '/../.eslintrc') && options.lint !== false;

  var cssLoaders = 'style!css!autoprefixer?browsers=last 2 versions';
  var scssLoaders = cssLoaders + '!sass';
  var sassLoaders = scssLoaders + '?indentedSyntax=sass';
  var lessLoaders = cssLoaders + '!less';

  if (options.production) {
    cssLoaders = extractForProduction(cssLoaders);
    sassLoaders = extractForProduction(sassLoaders);
    scssLoaders = extractForProduction(scssLoaders);
    lessLoaders = extractForProduction(lessLoaders);
  }

  var jsLoaders = ['babel'];

  // Look at the options and figure out what's really going on. :)
  var site = options.site;
  var library = !options.site;
  var productionSite = options.site && options.production;
  var developmentSite = options.site && !options.production;
  
  var path;
  var filename;
  if (site) {
    path = productionSite ? './site-dist' : './site-build';
    filename = productionSite ? 'app.[hash].js' : 'app.js';
  } else {
    path = './library-build';
    filename = 'HzTable.min.js';
  }
  
  var output = {
    path: path,
    publicPath: productionSite ? '' : 'http://localhost:8080/',
    filename: filename,
  };

  if (library) {
    output.libraryTarget = "umd";
    output.library = "HzTable";
  }

  // Important to keep React file size down
  var definePlugin = new webpack.DefinePlugin({
    "process.env": {
      "NODE_ENV": JSON.stringify("production"),
    },
  });
  var developmentHtmlWebpackPlugin = new HtmlWebpackPlugin({
      template: './conf/tmpl.html',
    });
  var productionHtmlWebpackPlugin = new HtmlWebpackPlugin({
    template: './conf/tmpl.html',
    production: true,
  });
  var dedupePlugin = new webpack.optimize.DedupePlugin();
  var uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  });
  var extractTextPlugin = new ExtractTextPlugin("app.[hash].css");

  var plugins;

  if (developmentSite) {
    plugins = [developmentHtmlWebpackPlugin];
  } else if (productionSite) {
    plugins = [productionHtmlWebpackPlugin, dedupePlugin, uglifyJsPlugin, extractTextPlugin];
  } else if (library) {
    plugins = [dedupePlugin, uglifyJsPlugin];
  } else {
    throw "Must be either development site, production site, or library build.";
  }

  var externals;

  if (library) {
    externals = [{
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      }
    }];
  }

  return {
    entry: site ? './app/index.jsx' : './app/components/HzTable.jsx',
    debug: developmentSite,
    devtool: options.devtool,
    output: output,
    externals: externals,
    module: {
      preLoaders: options.lint ? [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'eslint',
        },
      ] : [],
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loaders: jsLoaders,
        },
        {
          test: /\.jsx$/,
          exclude: /node_modules/,
          loaders: developmentSite ? ['react-hot'].concat(jsLoaders) : jsLoaders,
        },
        {
          test: /\.css$/,
          loader: cssLoaders,
        },
        {
          test: /\.sass$/,
          loader: sassLoaders,
        },
        {
          test: /\.scss$/,
          loader: scssLoaders,
        },
        {
          test: /\.less$/,
          loader: lessLoaders,
        },
        {
          test: /\.png$/,
          loader: "url?limit=100000&mimetype=image/png",
        },
        {
          test: /\.svg$/,
          loader: "url?limit=100000&mimetype=image/svg+xml",
        },
        {
          test: /\.gif$/,
          loader: "url?limit=100000&mimetype=image/gif",
        },
        {
          test: /\.jpg$/,
          loader: "file",
        },
      ],
    },
    resolve: {
      extensions: ['', '.js', '.jsx'],
    },
    plugins: plugins,
  };
};
