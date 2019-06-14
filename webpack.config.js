const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractCssChunksPlugin = require("extract-css-chunks-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "app.js",
    },
    module: {
        rules: [
            { test: /\.tsx?$/, use: "ts-loader" },
            {
                test: /.css$/,
                use: [
                    ExtractCssChunksPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName: "[local]--[hash:base64:5]",
                            },
                            url: true,
                            importLoaders: 1,
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json", ".css"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/html/index.html",
        }),
        new ExtractCssChunksPlugin(
            {
              // Options similar to the same options in webpackOptions.output
              // both options are optional
              filename: "[name].css",
              chunkFilename: "[id].css",
              hot: true, // if you want HMR - we try to automatically inject hot reloading but if it's not working, add it to the config
              orderWarning: true, // Disable to remove warnings about conflicting order between imports
              reloadAll: true, // when desperation kicks in - this is a brute force HMR flag
              cssModules: true // if you use cssModules, this can help.
            }
        ),
    ]
};
