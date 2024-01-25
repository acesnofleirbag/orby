const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    target: "web",
    entry: { main: path.resolve(__dirname, "lib", "index.ts") },
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-typescript']
                    }
                }
            },
        ],
    },
    resolve: {
        extensions: [ ".tsx", ".ts", ".js" ],
    },
    devServer: {
        port: 8081,
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "orby.js",
        library: "@acesnofleirbag/orby",
        libraryTarget: "umd",
        globalObject: "this",
        umdNamedDefine: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.resolve(__dirname, "index.html"),
        }),
    ],
};
