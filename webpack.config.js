'use strict';

const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    watch: false,
    context: `${__dirname}/src/`,
    entry: {
        GridPhysics: './main.js',
        'GridPhysics.min': './main.js'
        /*app: [
            // 'babel-preset-es2015',
            path.resolve(__dirname, 'src/main.js'),
            
        ],*/
    },

    output: {
        path: `${__dirname}/dist/`,
        filename: '[name].js',
        library: 'GridPhysics',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },

    plugins: [
        


        new UglifyJSPlugin({
            include: /\.min\.js$/,
            parallel: true,
            sourceMap: false,
            uglifyOptions: {
                compress: true,
                ie8: false,
                ecma: 5,
                output: {
                    comments: false
                },
                warnings: false
            },
            warningsFilter: (src) => false
        })

    ],
    optimization: {
        namedModules: true, // NamedModulesPlugin()
        splitChunks: { // CommonsChunkPlugin()
            name: 'vendor',
            minChunks: 2
        },
        noEmitOnErrors: true, // NoEmitOnErrorsPlugin
        concatenateModules: true //ModuleConcatenationPlugin
    }
    module: {
        rules: [
          {
            test: /\.js$/, // Check for all js files
            exclude: /node_modules/,
            use: [{
              loader: 'babel-loader',
              options: { presets: ['es2015'] }
            }]
          }
        ]
      },
/*    rules: [
        {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }
    ]*/


};
