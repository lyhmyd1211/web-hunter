const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

//功能已更新，与官网文档不同

module.exports = {
  entry: {
    'web-hunter':'./index.js',
    },
    output: {
        filename: 'web-hunter.min.js',
        path: path.resolve(__dirname, 'dist')
    },
  plugins: [
            
            
    ],
    module: {
        rules: [
          //css配置
          //安装了style-loader css-loader方可配置
           {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
          //图片和字体文件配置
          //安装了file-loader方可配置
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            },
           {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
        ]
    }
};