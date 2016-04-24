var path = require('path');
module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: __dirname + '/dist',
        filename: 'immview-react-connect.js',
        library: 'immview-react-connect',
        libraryTarget: 'umd',
    },
    externals: {
        immutable: 'immutable',
        react: 'react',
        immview: 'immview',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'uglify',
            },
            {
                test: /\.js$/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'stage-0', 'react'],
                },
            },
        ],
    },
    devtool: 'source-map',
};
