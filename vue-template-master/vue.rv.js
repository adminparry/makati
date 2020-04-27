
module.exports = {
    mode: 'development',
    // mode: 'production',
    // output: {
    //     publicPath: ''
    // },
    module: {
        rules: [
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