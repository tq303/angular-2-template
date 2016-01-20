// converts TypeScript files to webpacked files
var webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    debug: true, // set false in production
    cache: true,
    entry: {
        'app': './src/ts/index.ts',
        'vendor': [
            'es6-shim',
            'es6-promise',
            'es7-reflect-metadata/dist/browser',
            'zone.js/lib/browser/zone-microtask',
            'angular2/core',
            'angular2/platform/common_dom',
            'angular2/platform/browser',
            'angular2/router',
            'angular2/http',
            'rxjs'
        ]
    },
    output: {
        filename: './dist/js/[name].js'
    },
    plugins: (process.env.NODE_ENV === 'production') ? [
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.CommonsChunkPlugin("vendor", /* filename= */"./dist/js/vendor.js"),
        new webpack.optimize.UglifyJsPlugin({minimize: true}),
        new webpack.DefinePlugin({
            BASE_URI: 'http://localhost:8888/'
        })
    ] : [
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.CommonsChunkPlugin("vendor", /* filename= */"./dist/js/vendor.js"),
        new webpack.DefinePlugin({
            BASE_URI: 'http://localhost:8888/'
        })
    ],
    resolve: {
        extensions: ['','.ts','.js']
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: [ /\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/ ]
            }
        ]
    },
    node: {global: 'window', progress: false, crypto: 'empty', module: false, clearImmediate: false, setImmediate: false}
}
