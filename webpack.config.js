const path = require('path');


module.exports = {
    entry: {
        popup: './src/popup.js',
        background: './src/background.js',
    },
    mode: 'development',
    output: {
        filename: '[name].js',
        path: __dirname,
    },
    devtool: 'cheap-module-source-map',
};
