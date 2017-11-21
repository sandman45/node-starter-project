
const config = {
    entry: './app/Main.js',

    output: {
        path: '/app/',
        filename: 'index.js',
    },

    devServer: {
        inline: true,
        port: 3000,
        hot: true,
        contentBase: './app',
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react'],
                },
            },
        ],
    },
};

module.exports = config;
