const path = require('path');

module.exports = {
    mode: 'development',  // добавлен режим разработки
    entry: './web1/scripts/main.js',  // входной файл
    output: {
        filename: 'bundle.js',  // выходной файл
        path: path.resolve(__dirname, 'web1')
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
    },
    devServer: {
        static: path.join(__dirname, 'web1'),
        port: 2326,
        proxy: {
            '/web1/backend/': {
                target: 'http://localhost:8003',
                secure: false,
                changeOrigin: true
            }
        }
    }
};
