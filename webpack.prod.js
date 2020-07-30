const HtmlWebPackPlugin= require('html-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const OptimizeCssAssetsPlugin=require('optimize-css-assets-webpack-plugin');

const MinifyPlugin = require('babel-minify-webpack-plugin');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {

    mode : 'production',
    optimization:{
        minimizer: [ new OptimizeCssAssetsPlugin() ]
    },
    output: {
        filename: 'main.[contentHash].js'
    },
    module: {
        rules : [
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                use: [
                    'babel-loader'
                ]
            },
            {

                test: /\.css$/,
                exclude : /styles\.css$/,
                use : [
                    'style-loader',
                    'css-loader'
                ]
            },

                 {

                test: /styles\.css$/,
                use : [
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ]
            },

            {
                // condicion que aplique esta regla si es un archivo con .html
                test: /\.html$/,
                use:[
                    {
                    loader : 'html-loader',
                    // para borrar comentarios
                    options: { minimize: false }
                    }
                ]
            },

            {
                test: /\.(png|svg|jpe?g|gif)$/,
                use : [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            name: 'assets/img/[name].[ext]'
                        }
                    }
                ]
            },

            {
                test: /\.(ttf|woff|otf)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[contenthash].[ext]',
                      outputPath: 'assets/fonts/',
                      esModule: false // <- here
                    }
                  }
                ]
              }


           
       
        ]
    },
    plugins : [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html',
        }),
        new MiniCssExtractPlugin({

            filename : '[name].[contentHash].css',
            ignoreOrder: false
        }),
        new MinifyPlugin(),
        new CleanWebpackPlugin()
 
    ]


}