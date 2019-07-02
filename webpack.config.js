const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJs = require("uglifyjs-webpack-plugin");
const UglifyCss = require("optimize-css-assets-webpack-plugin");
const CleanPlugin = require("clean-webpack-plugin");
const { DevUtil } = require("./config/utils");
const FriendlyErrors = require("friendly-errors-webpack-plugin");
module.exports = {
  mode: "development",
  optimization: {
    minimizer: [new UglifyJs({}), new UglifyCss({})]
  },
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: "html-withimg-loader"
      },
      {
        test: /\.(png|jpeg)$/,
        use: "url-loader"
      },
      {
        test: /\.jsx?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"]
          }
        },
        include: [path.resolve("./src")],
        exclude: /nodu_modules/
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx", ".scss", "css", "less"],
    alias: {}
  },
  resolveLoader: {
    moduleExtensions: ["-loader"]
  },
  devServer: {
    port: 8081,
    open: true,
    contentBase: "./dist",
    hot: true,
    noInfo: true,
    host: DevUtil.getLocalHost()
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./template/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "css/main.css"
    }),
    new CleanPlugin(),
    new FriendlyErrors({
      compilationSuccessInfo: {
        messages: [`编译成功 代码运行在 ${DevUtil.getLocalHost()}:8080`]
      }
    })
  ]
};
