const path = require('path');
const config = {
    entry: path.resolve(__dirname, 'src/index.ts'),
    output: {
        path: __dirname + '/dist',
        filename: 'immview-react-connect.js',
        library: 'immview-react-connect',
        libraryTarget: 'umd',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '']
    },
    externals: {
        react: 'react',
        immview: 'immview',
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            },
        ],
    },
    devtool: 'source-map',
    plugins: []
};

if (process.env.NODE_ENV === 'production') {
    const webpack = require('webpack')

    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compressor: {
            pure_getters: true,
            unsafe: true,
            unsafe_comps: true,
            screw_ie8: true,
            warnings: false
        }
    }))
}

module.exports = config