var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var BrowserSyncPlugin = require('browser-sync-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')

// Phaser webpack config
//var phaserModule = path.join(__dirname, '/node_modules/phaser/')
//var phaser = path.join(phaserModule, 'src/phaser.js')

var definePlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
    WEBGL_RENDERER: true, // I did this to make webpack work, but I'm not really sure it should always be true
    CANVAS_RENDERER: true // I did this to make webpack work, but I'm not really sure it should always be true
})

module.exports = {
    mode: 'development',
    entry: {
        GridPhysics: './src/main.js',
        demo: [
            'babel-polyfill',
            path.resolve(__dirname, 'example/js/main.js')
        ],
        vendor: ['phaser', 'dat.gui']
    },
    devtool: 'cheap-source-map',
    output: {
        pathinfo: true,
        path: path.resolve(__dirname, 'dev'),
        publicPath: './dev/',
        library: '[name]',
        libraryTarget: 'umd',
        filename: '[name].js'
    },
    watch: true,
    plugins: [
        definePlugin,
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './example/index.html',
            chunks: ['vendor', 'gridPhysics', 'demo'],
            chunksSortMode: 'manual',
            minify: {
                removeAttributeQuotes: false,
                collapseWhitespace: false,
                html5: false,
                minifyCSS: false,
                minifyJS: false,
                minifyURLs: false,
                removeComments: false,
                removeEmptyAttributes: false
            },
            hash: false
        }),
        new CopyWebpackPlugin([{
                from: 'example/assets',
                to: 'assets'
            },
            {
                from: 'example/js',
                to: 'js'
            }
        ]),
        new BrowserSyncPlugin({
            host: process.env.IP || 'localhost',
            port: process.env.PORT || 3000,
            server: {
                baseDir: ['./', './dev']
            }
        })
    ],
    /*optimization: {
        namedModules: true,
        splitChunks: {
            name: 'vendor',
            filename: 'vendor.bundle.js'
        },
        noEmitOnErrors: true, // NoEmitOnErrorsPlugin
        concatenateModules: true //ModuleConcatenationPlugin
    },*/
    module: {
        rules: [{
                test: /\.js$/, // Check for all js files
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }]
            },
            // { test: /\.js$/, use: ['babel-loader'], include: path.join(__dirname, 'src') },
            {
                test: /phaser-split\.js$/,
                use: ['expose-loader?Phaser']
            },
            {
                test: [/\.vert$/, /\.frag$/],
                use: 'raw-loader'
            }
        ]
    },
    /*node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },*/
    /*resolve: {
        alias: {
            //'GridPhysics': GridPhysics,
        }
    },*/
    performance: {
        hints: false
    }
}