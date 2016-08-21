var webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: './dist',
        filename: 'script.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /\/node_modules\//,
                loader: 'babel'
            },
            { test: /\.css$/, loader: "style-loader!css-loader" },
            {
                test: /\.html$/,
                exclude: /index.html/,
                loader: "ngtemplate!raw"
            }
        ]
    },
    externals: {
        angular: 'angular',
        lodash: '_'
    },
    noParse: /angular\/angular.js/,
    // watch: true,
    devtool: 'source-map'
    // plugins: [
    //     new webpack.optimize.UglifyJsPlugin({
    //         compress: {
    //             warnings: false
    //         }
    //     })
    // ]
};