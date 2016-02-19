var path = require('path');

module.exports = {
    entry: {
        app: './src/entry.ts'
    },
    output: {
        filename: './dist/bundle.js'
    },
    resolve: {
        root: [
            path.resolve('./src/my_modules'),
            path.resolve('node_modules')
        ],
        extensions: ['', '.ts', '.js']
    },
    module: {
        loaders: [{
            test: /\.tsx?$/,
            loader: 'ts-loader'
        }]
    }
};