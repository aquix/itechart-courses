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
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    },
    externals: {
        angular: 'angular',
        lodash: '_'
    },
    noParse: /angular\/angular.js/
};