const path = require('path')

const buildPath = path.resolve(__dirname, 'dist');

const server = () => ({
    entry: './server/server.ts',
    output: {
        path: path.resolve(buildPath, 'server'),
        filename: 'server.js',
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['ts-loader'],
                exclude: /node_modules/,
            }
        ]
    },
    optimization: {
        minimize: true
    },
    resolve: {
        extensions: ['.ts', '.js'],
    }
})

const client = () => ({
    entry: './client/client.ts',
    output: {
        path: path.resolve(buildPath, 'client'),
        filename: 'client.js',
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['ts-loader'],
                exclude: /node_modules/,
            }
        ]
    },
    optimization: {
        minimize: true
    },
    resolve: {
        extensions: ['.ts', '.js'],
    }
})

module.exports = [server, client]