var path = require('path');
var glob = require('glob');
var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');

function generatorEntry() {
    var entry = {};
    var rootPath = __dirname + '/src/js';
    var files = glob.sync(path.join(rootPath, '**/main.+(js|jsx)'));
    
    files.forEach(function(file) {
        var fileBasePath = file.replace('/main.js', '');
        var folderName = path.relative(rootPath, fileBasePath) || path.basename(fileBasePath);
        
        entry[folderName] = file;
    });

    return entry;
}

function generatorJs() {
    var outputObj = {
        path: path.join(__dirname, '/build/'),
        filename: '[name].js'
    };
    
    return outputObj;
}

var config = {
    context: path.join(__dirname, '/'),
    entry: generatorEntry(),
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            sass: path.join(__dirname, './src/sass')
        }
    },
    output: generatorJs(),
    module: {
      loaders: [
        {
            test: /\.js\w?$/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react', 'stage-0']
            }
        },
        {
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass']
        }
      ]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin()
    ]
}

module.exports = config;