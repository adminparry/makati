// const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    // mode: 'production',
    // output: {
    //     publicPath: ''
    // },
    module: {
        rules: [
            
            {
                test: /\.styl$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'stylus-loader',
                        options:{

                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'less-loader',
                        options:{

                        }
                    }
                ]
            }
        ]
    }
}