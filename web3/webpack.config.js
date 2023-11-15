const path = require('path');

module.exports = {
    mode: 'development',  // добавлен режим разработки
    entry: './src/main/webapp/resources/scripts/main.js', // входной файл
    output: {
        filename: 'bundle.js',  // выходной файл
        path: path.resolve(__dirname, './src/main/webapp')
    },
    module: {
        rules: [
            {
                test: /\.js$/,    // для всех .js файлов
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};
