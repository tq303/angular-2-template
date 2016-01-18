// converts TypeScript files to webpacked files
var webpack = require('webpack');

module.exports = {
    entry: {
        'app': './src/ts/boot.ts',
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
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.CommonsChunkPlugin("vendor", /* filename= */"./dist/js/vendor.js")
    ],
    devtool: 'source-map',
    resolve: {
        // ensure loader extensions match
        extensions: ['','.ts','.js','.json','.css','.html']
    },
    module: {
        loaders: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.tsx?$/, loader: 'ts-loader' }
        ]
    }
}
