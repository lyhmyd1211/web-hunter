const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

//功能已更新，与官网文档不同

module.exports = {
  entry: {
    index:'./index.js',
    test: './src/js/test.js',
    page:'./src/js/page.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
  plugins: [
          new HtmlWebpackPlugin({
            // filename: 'test.html',
            template: './src/views/test.html',
            inject: true,
            // minify: {
            //   // 压缩html
            //   collapseWhitespace: true, // 压缩空白
            //   removeComments: true // 去除注释
            // },
            chunks: ['index','test']
          }),
            new HtmlWebpackPlugin({
              filename: 'page.html',
              template: './src/views/page.html',
              inject: true,
              // minify: {
              //   // 压缩html
              //   collapseWhitespace: true, // 压缩空白
              //   removeComments: true // 去除注释
              // },
              chunks: ['index','page']
            }),
            
            
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