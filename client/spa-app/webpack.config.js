const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")
const webpack = require("webpack")
const path = require("path")

function srcPaths(src) {
    return path.join(__dirname, src)
}

const isEnvProduction = process.env.NODE_ENV === "production"
const isEnvDevelopment = process.env.NODE_ENV === "development"

// #region Common settings
const commonConfig = {
    mode: isEnvProduction ? "production" : "development",
    devtool: isEnvDevelopment ? "source-map" : false,
    entry: ["./src/index"],
    target: "web",

    node: {
        global: true,
        net: "empty",
        tls: "empty",
        dns: "empty",

        // __dirname: false,
        // __filename: false,
    },

    output: {
        filename: "renderer.bundle.js",
        chunkFilename: "[chunkhash].js",
        path: srcPaths("dist"),
        publicPath: "/",
    },

    resolve: {
        extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
        mainFields: ["module", "browser", "main"],

        alias: {
            // For new react hot fixes
            // "react-dom": "@hot-loader/react-dom",

            styles: srcPaths("src/assets/styles"),
            // images: srcPaths("src/assets/images"),
            // icons: srcPaths("src/assets/icons"),

            // middlewares: srcPaths("src/middlewares"),
            components: srcPaths("src/components"),
            containers: srcPaths("src/containers"),
            reducers: srcPaths("src/reducers"),
            // services: srcPaths("src/services"),
            // locales: srcPaths("src/locales"),
            actions: srcPaths("src/actions"),
            // models: srcPaths("src/models"),
            store: srcPaths("src/store"),
            // utils: srcPaths("src/utils"),
            // api: srcPaths("src/api"),
        },
    },

    devServer: {
        contentBase: path.join(__dirname, "./src/"),
        historyApiFallback: { disableDotRule: true },
        inline: true,
        hot: true,
    },

    optimization: {
        minimizer: [new TerserPlugin()],

        splitChunks: {
            name: true,
            cacheGroups: {
                commons: {
                    chunks: "initial",
                    minChunks: 2,
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                    priority: -10,
                },
            },
        },

        runtimeChunk: true,
    },

    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),

        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./src/index.html"),
        }),
    ],

    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.css$/,
                use: [
                    // fallback to style-loader in development
                    isEnvDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                ],
            },
            {
                test: /\.(sass|scss)$/,
                use: [
                    // fallback to style-loader in development
                    isEnvDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.(jpg|png|svg|ico|icns|otf|ttf|woff|woff2|eot)$/,
                loader: "file-loader",
                options: {
                    name: "[path][name].[ext]",
                },
            },
        ],
    },
}

// module.exports = [mainConfig, rendererConfig]
module.exports = commonConfig
